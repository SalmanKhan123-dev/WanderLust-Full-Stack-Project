const Listing = require("../models/listing.js");

function detectCategory(listing) {
  const text = `
    ${listing.title || ""}
    ${listing.description || ""}
    ${listing.location || ""}
  `.toLowerCase();

  if (
    text.includes("mountain") ||
    text.includes("manali") ||
    text.includes("shimla") ||
    text.includes("himachal") ||
    text.includes("uttarakhand") ||
    text.includes("hill") ||
    text.includes("valley")
  ) {
    return "mountains";
  }

  if (
    text.includes("beach") ||
    text.includes("goa") ||
    text.includes("pondicherry") ||
    text.includes("varkala") ||
    text.includes("sea") ||
    text.includes("coastal")
  ) {
    return "beach";
  }

  if (
    text.includes("hotel") ||
    text.includes("resort") ||
    text.includes("palace")
  ) {
    return "hotels";
  }

  if (
    text.includes("farm") ||
    text.includes("plantation") ||
    text.includes("organic")
  ) {
    return "farms";
  }

  if (
    text.includes("cabin") ||
    text.includes("wooden") ||
    text.includes("cottage")
  ) {
    return "cabins";
  }

  if (
    text.includes("room") ||
    text.includes("apartment") ||
    text.includes("studio")
  ) {
    return "rooms";
  }

  if (
    text.includes("desert") ||
    text.includes("jaisalmer") ||
    text.includes("rajasthan")
  ) {
    return "desert";
  }

  if (
    text.includes("lake") ||
    text.includes("dal lake") ||
    text.includes("lakeview")
  ) {
    return "lake";
  }

  if (
    text.includes("mumbai") ||
    text.includes("delhi") ||
    text.includes("bangalore") ||
    text.includes("bengaluru") ||
    text.includes("hyderabad") ||
    text.includes("kolkata") ||
    text.includes("chennai") ||
    text.includes("city")
  ) {
    return "cities";
  }

  return "trending";
}


module.exports.index = async (req, res) => {
  const limit = 9;

  let currentPage = parseInt(req.query.page, 10) || 1;

  if (currentPage < 1) {
    currentPage = 1;
  }

  const search = req.query.search || "";
  const category = req.query.category || "";

  let filter = {};

  if (search.trim() !== "") {
    filter.$or = [
      {
        title: {
          $regex: search,
          $options: "i"
        }
      },
      {
        location: {
          $regex: search,
          $options: "i"
        }
      },
      {
        country: {
          $regex: search,
          $options: "i"
        }
      },
      {
        description: {
          $regex: search,
          $options: "i"
        }
      }
    ];
  }

  if (category && category !== "trending") {
    filter.category = category;
  }

  const totalListings = await Listing.countDocuments(filter);

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
    category
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
    .populate({
      path: "reviews",
      populate: {
        path: "author"
      }
    })
    .populate("owner");

  if (!listing) {
    req.flash(
      "error",
      "Listing you requested for does not exists"
    );

    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", {
    listing
  });
};


module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;

  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash(
      "error",
      "Listing you requested for does not exists"
    );

    return res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;

  originalImageUrl = originalImageUrl.replace(
    "/upload",
    "/upload/h_250,w_250"
  );

  res.render("listings/edit.ejs", {
    listing,
    originalImageUrl
  });
};


module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

  let listing = await Listing.findByIdAndUpdate(
    id,
    {
      ...req.body.listing
    },
    {
      new: true
    }
  );

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;

    listing.image = {
      url,
      filename
    };

    await listing.save();
  }

  req.flash(
    "success",
    "Listing updated"
  );

  res.redirect(`/listings/${id}`);
};


module.exports.createNewListing = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;

  const newListing = new Listing(
    req.body.listing
  );

  newListing.owner = req.user._id;

  newListing.image = {
    url,
    filename
  };

  newListing.geometry = {
    type: "Point",
    coordinates: [0, 0]
  };

  let savedlisting = await newListing.save();

  console.log(savedlisting);

  req.flash(
    "success",
    "New Listing Created"
  );

  res.redirect("/listings");
};


module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;

  let deletedlisting =
    await Listing.findByIdAndDelete(id);

  req.flash(
    "success",
    "Listing is Deleted!"
  );

  console.log(deletedlisting);

  res.redirect("/listings");
};