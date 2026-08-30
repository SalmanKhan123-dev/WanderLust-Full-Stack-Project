const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    listing: {
      type: Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },

    checkIn: {
      type: Date,
      required: true,
    },

    checkOut: {
      type: Date,
      required: true,
    },

    guests: {
      type: Number,
      required: true,
      min: 1,
    },

    nights: {
      type: Number,
      required: true,
      min: 1,
    },

    pricePerNight: {
      type: Number,
      required: true,
      min: 0,
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    serviceFee: {
      type: Number,
      required: true,
      min: 0,
    },

    tax: {
      type: Number,
      required: true,
      min: 0,
    },

    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
    },
  },
  {
    timestamps: true,
  }
);


/*
 * Useful indexes for faster booking queries.
 */
bookingSchema.index({
  listing: 1,
  checkIn: 1,
  checkOut: 1,
});

bookingSchema.index({
  user: 1,
  createdAt: -1,
});


module.exports = mongoose.model("Booking", bookingSchema);