if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");

const initData = require("./data.js");
const Listing = require("../models/listing.js");

const dbUrl = process.env.ATLASDB_URL;

// ============================================================
// CONNECT TO DATABASE
// ============================================================

async function main() {
  await mongoose.connect(dbUrl);
  console.log("MongoDB connected successfully");
}

// ============================================================
// ADD SAMPLE LISTINGS
// ============================================================

const initDB = async () => {
  try {
    await main();

    console.log("Connected to MongoDB");

    // --------------------------------------------------------
    // DO NOT DELETE EXISTING LISTINGS
    // --------------------------------------------------------

    let addedCount = 0;
    let skippedCount = 0;

    for (const obj of initData.data) {
      // Check whether same listing already exists
      const existingListing = await Listing.findOne({
        title: obj.title,
        location: obj.location,
        country: obj.country,
      });

      // ------------------------------------------------------
      // Skip duplicate listings
      // ------------------------------------------------------

      if (existingListing) {
        skippedCount++;

        continue;
      }

      // ------------------------------------------------------
      // Add owner
      // ------------------------------------------------------

      const listingData = {
        ...obj,

        owner: "6a94251b2be10b6a19a55fb1",

        // Default guest capacity
        maxGuests: obj.maxGuests || 10,
      };

      // ------------------------------------------------------
      // Insert listing
      // ------------------------------------------------------

      await Listing.create(listingData);

      addedCount++;

      console.log(`Added: ${listingData.title} - ${listingData.location}`);
    }

    // ========================================================
    // RESULT
    // ========================================================

    console.log("---------------------------------------");

    console.log(`New listings added: ${addedCount}`);

    console.log(`Duplicate listings skipped: ${skippedCount}`);

    const totalListings = await Listing.countDocuments();

    console.log(`Total listings in database: ${totalListings}`);

    console.log("---------------------------------------");
  } catch (error) {
    console.error("Database initialization error:", error);
  } finally {
    await mongoose.connection.close();

    console.log("Database connection closed");
  }
};

// ============================================================
// RUN
// ============================================================

initDB();
