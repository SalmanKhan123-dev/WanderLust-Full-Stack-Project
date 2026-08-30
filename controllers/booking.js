const Booking = require("../models/booking.js");
const Listing = require("../models/listing.js");


/*
 * Convert YYYY-MM-DD into a UTC date.
 * Using UTC avoids timezone problems with
 * date-only booking fields.
 */
function parseDate(dateString) {

  if (!dateString) {
    return null;
  }

  const date = new Date(`${dateString}T00:00:00.000Z`);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}


/*
 * Number of nights between two dates.
 */
function calculateNights(checkIn, checkOut) {

  const millisecondsPerDay =
    1000 * 60 * 60 * 24;

  return Math.ceil(
    (checkOut - checkIn) /
      millisecondsPerDay
  );
}


/*
 * GET availability
 *
 * Used by the booking form to check whether
 * the selected dates are already reserved.
 */
module.exports.checkAvailability = async (
  req,
  res
) => {

  const { listingId } = req.params;

  const {
    checkIn,
    checkOut,
  } = req.query;


  const listing = await Listing.findById(
    listingId
  );


  if (!listing) {

    return res.status(404).json({
      available: false,
      message: "Listing not found.",
    });

  }


  const startDate = parseDate(checkIn);

  const endDate = parseDate(checkOut);


  if (!startDate || !endDate) {

    return res.status(400).json({
      available: false,
      message: "Please select valid dates.",
    });

  }


  if (endDate <= startDate) {

    return res.status(400).json({
      available: false,
      message:
        "Check-out must be after check-in.",
    });

  }


  /*
   * Overlap rule:
   *
   * Existing check-in < requested check-out
   * AND
   * Existing check-out > requested check-in
   *
   * This catches every overlapping reservation.
   */
  const conflictingBooking =
    await Booking.findOne({

      listing: listingId,

      status: "confirmed",

      checkIn: {
        $lt: endDate,
      },

      checkOut: {
        $gt: startDate,
      },

    });


  const nights = calculateNights(
    startDate,
    endDate
  );


  return res.json({

    available: !conflictingBooking,

    nights,

    pricePerNight: listing.price,

    message: conflictingBooking
      ? "These dates are already booked."
      : "These dates are available.",

  });

};


/*
 * CREATE BOOKING
 */
module.exports.createBooking = async (
  req,
  res
) => {

  const { listingId } = req.params;


  const {
    checkIn,
    checkOut,
    guests,
  } = req.body;


  const listing = await Listing.findById(
    listingId
  );


  if (!listing) {

    req.flash(
      "error",
      "Listing not found."
    );

    return res.redirect("/listings");

  }


  /*
   * Parse dates.
   */
  const startDate = parseDate(checkIn);

  const endDate = parseDate(checkOut);


  if (!startDate || !endDate) {

    req.flash(
      "error",
      "Please select valid check-in and check-out dates."
    );

    return res.redirect(
      `/listings/${listingId}`
    );

  }


  /*
   * Check-out must be after check-in.
   */
  if (endDate <= startDate) {

    req.flash(
      "error",
      "Check-out date must be after check-in date."
    );

    return res.redirect(
      `/listings/${listingId}`
    );

  }


  /*
   * Do not allow bookings in the past.
   */
  const today = new Date();

  today.setUTCHours(
    0,
    0,
    0,
    0
  );


  if (startDate < today) {

    req.flash(
      "error",
      "Check-in date cannot be in the past."
    );

    return res.redirect(
      `/listings/${listingId}`
    );

  }


  /*
   * Validate guests.
   */
  const guestCount = Number(guests);

  const maxGuests =
    listing.maxGuests || 10;


  if (
    !Number.isInteger(guestCount) ||
    guestCount < 1 ||
    guestCount > maxGuests
  ) {

    req.flash(
      "error",
      `This property allows up to ${maxGuests} guests.`
    );

    return res.redirect(
      `/listings/${listingId}`
    );

  }


  /*
   * Check for overlapping booking.
   */
  const conflictingBooking =
    await Booking.findOne({

      listing: listingId,

      status: "confirmed",

      checkIn: {
        $lt: endDate,
      },

      checkOut: {
        $gt: startDate,
      },

    });


  if (conflictingBooking) {

    req.flash(
      "error",
      "Sorry, those dates have just been booked. Please choose different dates."
    );

    return res.redirect(
      `/listings/${listingId}`
    );

  }


  /*
   * Calculate pricing.
   */
  const nights = calculateNights(
    startDate,
    endDate
  );


  const pricePerNight =
    Number(listing.price) || 0;


  const subtotal =
    pricePerNight * nights;


  /*
   * Platform service fee.
   *
   * Kept as a separate field so it can
   * easily be changed later.
   */
  const serviceFee =
    Math.round(
      subtotal * 0.05
    );


  /*
   * Demo tax configuration.
   *
   * Set BOOKING_TAX_RATE in .env.
   *
   * Example:
   * BOOKING_TAX_RATE=0.18
   *
   * If not supplied, tax defaults to 0.
   */
  const taxRate =
    Number(
      process.env.BOOKING_TAX_RATE || 0
    );


  const tax =
    Math.round(
      subtotal * taxRate
    );


  const totalPrice =
    subtotal +
    serviceFee +
    tax;


  /*
   * Create booking.
   */
  const booking =
    new Booking({

      user: req.user._id,

      listing: listingId,

      checkIn: startDate,

      checkOut: endDate,

      guests: guestCount,

      nights,

      pricePerNight,

      subtotal,

      serviceFee,

      tax,

      totalPrice,

      status: "confirmed",

    });


  await booking.save();


  req.flash(
    "success",
    "Your reservation has been confirmed!"
  );


  res.redirect(
    `/bookings/${booking._id}`
  );

};


/*
 * SHOW USER'S BOOKINGS
 */
module.exports.myBookings = async (
  req,
  res
) => {

  const bookings =
    await Booking.find({
      user: req.user._id,
    })
      .populate("listing")
      .sort({
        createdAt: -1,
      });


  res.render(
    "bookings/index.ejs",
    {
      bookings,
    }
  );

};


/*
 * SHOW ONE BOOKING
 */
module.exports.showBooking = async (
  req,
  res
) => {

  const { id } = req.params;


  const booking =
    await Booking.findById(id)
      .populate("listing")
      .populate("user");


  if (!booking) {

    req.flash(
      "error",
      "Booking not found."
    );

    return res.redirect(
      "/bookings"
    );

  }


  /*
   * Only the booking owner can
   * view the reservation.
   */
  if (
    !booking.user._id.equals(
      req.user._id
    )
  ) {

    req.flash(
      "error",
      "You are not authorized to view this booking."
    );

    return res.redirect(
      "/bookings"
    );

  }


  res.render(
    "bookings/show.ejs",
    {
      booking,
    }
  );

};


/*
 * CANCEL BOOKING
 */
module.exports.cancelBooking = async (
  req,
  res
) => {

  const { id } = req.params;


  const booking =
    await Booking.findById(id)
      .populate("listing");


  if (!booking) {

    req.flash(
      "error",
      "Booking not found."
    );

    return res.redirect(
      "/bookings"
    );

  }


  /*
   * Only booking owner can cancel.
   */
  if (
    !booking.user.equals(
      req.user._id
    )
  ) {

    req.flash(
      "error",
      "You are not authorized to cancel this booking."
    );

    return res.redirect(
      "/bookings"
    );

  }


  if (
    booking.status === "cancelled"
  ) {

    req.flash(
      "error",
      "This booking is already cancelled."
    );

    return res.redirect(
      `/bookings/${id}`
    );

  }


  booking.status =
    "cancelled";


  await booking.save();


  req.flash(
    "success",
    "Your booking has been cancelled."
  );


  res.redirect(
    `/bookings/${id}`
  );

};