const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Review = require("./review.js");

const listingSchema = new Schema({

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  image: {
    url: String,
    filename: String,
  },

  price: {
    type: Number,
    min: 0,
  },

  location: {
    type: String,
  },

  country: {
    type: String,
  },

  category: {
    type: String,
    enum: [
      "trending",
      "rooms",
      "mountains",
      "hotels",
      "beach",
      "cabins",
      "farms",
      "cities",
      "desert",
      "lake"
    ],
    default: "trending",
  },

  maxGuests: {
    type: Number,
    min: 1,
    default: 10,
  },

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  geometry: {
    type: {
      type: String,
      enum: ["Point"],
    },

    coordinates: {
      type: [Number],
      required: true,
    },
  },

});

listingSchema.post(
  "findOneAndDelete",
  async (listing) => {

    if (listing) {
      await Review.deleteMany({
        _id: {
          $in: listing.reviews,
        },
      });
    }

  }
);

const Listing = mongoose.model(
  "Listing",
  listingSchema
);

module.exports = Listing;