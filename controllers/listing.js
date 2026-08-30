const Listing = require("../models/listing.js");

function detectCategory(listing) {
  const text = `
    ${listing.title || ""}
    ${listing.description || ""}
    ${listing.location || ""}
    ${listing.country || ""}
  `.toLowerCase();

  if (
    text.includes("mountain") ||
    text.includes("aspen") ||
    text.includes("banff") ||
    text.includes("verbier") ||
    text.includes("montana") ||
    text.includes("highlands") ||
    text.includes("alps") ||
    text.includes("hill") ||
    text.includes("valley") ||
    text.includes("peak") ||
    text.includes("ski")
  ) {
    return "mountains";
  }

  if (
    text.includes("beach") ||
    text.includes("malibu") ||
    text.includes("cancun") ||
    text.includes("miami") ||
    text.includes("bali") ||
    text.includes("phuket") ||
    text.includes("mykonos") ||
    text.includes("fiji") ||
    text.includes("maldives") ||
    text.includes("coast") ||
    text.includes("island") ||
    text.includes("sea") ||
    text.includes("ocean") ||
    text.includes("shore")
  ) {
    return "beach";
  }

  if (
    text.includes("desert") ||
    text.includes("dubai") ||
    text.includes("oasis") ||
    text.includes("sahara") ||
    text.includes("dune")
  ) {
    return "desert";
  }

  if (
    text.includes("treehouse") ||
    text.includes("cabin") ||
    text.includes("cottage") ||
    text.includes("forest") ||
    text.includes("jungle") ||
    text.includes("lake") ||
    text.includes("wood") ||
    text.includes("rustic") ||
    text.includes("eco") ||
    text.includes("costa rica")
  ) {
    return "forest";
  }

  return "trending";
}

module.exports.index = async (req, res) => {
  const limit = 9;

  let currentPage = parseInt(req.query.page, 10) || 1;
  if (currentPage < 1) currentPage = 1;

  const search = req.query.search || "";
  const category = req.query.category || "";

  let filter = {};

  if (search.trim() !== "") {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
      { country: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } }
    ];
  }

  if (category && category !== "trending") {
    filter.category = category;
  }

  let totalListings = await Listing.countDocuments(filter);
  let noMatchNotice = false;

  // If the search/category combo found nothing, fall back to showing everything
  // instead of a dead-end "no results" page.
  if (totalListings === 0 && (search.trim() !== "" || (category && category !== "trending"))) {
    noMatchNotice = true;
    filter = {};
    totalListings = await Listing.countDocuments(filter);
  }

  const totalPages = Math.ceil(totalListings / limit);
  if (totalPages > 0 && currentPage > totalPages) {
    currentPage = totalPages;
  }

  const skip = (currentPage - 1) * limit;

  const allListings = await Listing.find(filter)
    .skip(skip)
    .limit(limit);

  res.render("listings/index.ejs", {
    allListings,
    currentPage,
    totalPages,
    totalListings,
    search,
    category,
    noMatchNotice
  });
};

module.exports.assignCategories = async (req, res) => {
  const listings = await Listing.find({});

  for (const listing of listings) {
    listing.category = detectCategory(listing);
    await listing.save();
  }

  res.send("Categories assigned successfully!");
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;

  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing you requested for does not exists");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing you requested for does not exists");
    return res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_250,w_250");

  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

  let listing = await Listing.findByIdAndUpdate(
    id,
    { ...req.body.listing },
    { new: true }
  );

  listing.category = detectCategory(listing);

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
  }

  await listing.save();

  req.flash("success", "Listing updated");
  res.redirect(`/listings/${id}`);
};

module.exports.createNewListing = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry = { type: "Point", coordinates: [0, 0] };
  newListing.category = detectCategory(newListing);

  let savedlisting = await newListing.save();
  console.log(savedlisting);

  req.flash("success", "New Listing Created");
  res.redirect("/listings");
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  let deletedlisting = await Listing.findByIdAndDelete(id);

  req.flash("success", "Listing is Deleted!");
  console.log(deletedlisting);
  res.redirect("/listings");
};