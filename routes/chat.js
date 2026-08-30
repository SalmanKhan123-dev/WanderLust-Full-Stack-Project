const express = require("express");
const router = express.Router();

const ollama = require("ollama");
const Listing = require("../models/listing.js");


// ============================================================
// WANDERLUST AI CHAT
// ============================================================

router.post("/", async (req, res) => {

  try {

    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter a message."
      });
    }


    // ========================================================
    // STEP 1: GET ALL LISTINGS FROM MONGODB
    // ========================================================

    const listings = await Listing.find({})
      .lean();


    // ========================================================
    // STEP 2: SEARCH LISTINGS USING USER MESSAGE
    // ========================================================

    const userMessage = message.toLowerCase();

    const matchingListings = listings.filter((listing) => {

      const title =
        (listing.title || "").toLowerCase();

      const location =
        (listing.location || "").toLowerCase();

      const country =
        (listing.country || "").toLowerCase();

      const description =
        (listing.description || "").toLowerCase();


      return (
        userMessage.includes(location) ||
        userMessage.includes(country) ||
        userMessage.includes(title) ||
        location.includes(userMessage) ||
        country.includes(userMessage)
      );

    });


    // ========================================================
    // STEP 3: CHECK FOR GUEST NUMBER
    // ========================================================

    const guestMatch = userMessage.match(
      /(\d+)\s*(guest|guests|people|person|traveller|travelers|traveller)/
    );

    let guestCount = null;

    if (guestMatch) {
      guestCount = parseInt(guestMatch[1]);
    }


    // ========================================================
    // STEP 4: FILTER BY GUEST CAPACITY
    // ========================================================

    let filteredListings = matchingListings;

    if (guestCount) {

      filteredListings = matchingListings.filter(
        (listing) => {

          const maxGuests =
            listing.maxGuests || 10;

          return maxGuests >= guestCount;

        }
      );

    }


    // ========================================================
    // STEP 5: CHECK FOR BUDGET
    // ========================================================

    const budgetMatch = userMessage.match(
      /(?:under|below|less than|max|maximum|upto|up to)\s*(?:₹|rs\.?|inr)?\s*(\d+)/i
    );

    let budget = null;

    if (budgetMatch) {
      budget = parseInt(budgetMatch[1]);
    }


    if (budget) {

      filteredListings = filteredListings.filter(
        (listing) => {

          return (
            listing.price &&
            listing.price <= budget
          );

        }
      );

    }


    // ========================================================
    // STEP 6: IF MATCHING LISTINGS EXIST
    // ========================================================

    if (filteredListings.length > 0) {

      const results =
        filteredListings.slice(0, 5);


      let reply =
        `I found ${results.length} WanderLust ${
          results.length === 1
            ? "stay"
            : "stays"
        } that may match your requirements:\n\n`;


      results.forEach((listing, index) => {

        reply +=
          `${index + 1}. ${listing.title || "Beautiful Stay"}\n`;

        reply +=
          `📍 ${listing.location || "Location unavailable"}${
            listing.country
              ? `, ${listing.country}`
              : ""
          }\n`;

        reply +=
          `💰 ₹${listing.price || "Price unavailable"} / night\n`;

        reply +=
          `👥 Up to ${
            listing.maxGuests || 10
          } guests\n\n`;

      });


      reply +=
        "These are actual properties available in the WanderLust database.";


      return res.json({

        success: true,

        reply,

        listings: results.map((listing) => ({

          id: listing._id,

          title: listing.title,

          price: listing.price,

          location: listing.location,

          country: listing.country,

          maxGuests: listing.maxGuests || 10,

          image: listing.image?.url || null

        }))

      });

    }


    // ========================================================
    // STEP 7: NO LISTINGS FOUND
    // ========================================================
    // Instead of saying "I don't know",
    // use Ollama for general travel information.
    // ========================================================


    const listingContext = listings
      .slice(0, 50)
      .map((listing) => {

        return `
Title: ${listing.title || "Unknown"}
Location: ${listing.location || "Unknown"}
Country: ${listing.country || "Unknown"}
Price: ₹${listing.price || "Unknown"} per night
Maximum Guests: ${listing.maxGuests || 10}
`;

      })
      .join("\n");


    // ========================================================
    // STEP 8: GENERAL TRAVEL AI
    // ========================================================

    const systemPrompt = `

You are WanderLust AI, a professional travel assistant
for a travel accommodation website.

The user asked a travel-related question, but there are
currently NO matching WanderLust database listings for
their request.

You should still be helpful.

You can provide GENERAL TRAVEL INFORMATION such as:

- Destination recommendations
- Travel itineraries
- Places to visit
- Things to do
- Suggested areas to stay
- Approximate travel budgets
- Food recommendations
- Travel tips
- Best time to visit
- Family, couple or solo travel suggestions
- 2-day, 3-day or 5-day trip plans

IMPORTANT:

1. Do NOT invent WanderLust listings.

2. Do NOT claim that an external hotel or property is
   available on WanderLust.

3. Clearly distinguish general travel recommendations
   from actual WanderLust properties.

4. If giving prices or budgets, describe them as
   approximate estimates, not live prices.

5. Be concise and professional.

6. If the user asks for a destination such as Goa,
   Manali, Jaipur, Kashmir, Mumbai, Delhi, Dubai,
   Paris, London, etc., you can provide useful
   destination information even if WanderLust has no
   listings there.

7. If appropriate, tell the user:
   "I couldn't find a matching WanderLust stay right now,
   but I can still help you plan your trip."

CURRENT WANDERLUST LISTINGS:

${listingContext}

`;


    // ========================================================
    // STEP 9: CALL OLLAMA
    // ========================================================

    const response = await ollama.chat({

      model: "llama3.2:3b",

      messages: [

        {
          role: "system",
          content: systemPrompt
        },

        {
          role: "user",
          content: message
        }

      ]

    });


    // ========================================================
    // STEP 10: RETURN GENERAL AI RESPONSE
    // ========================================================

    const aiReply =
      response.message.content;


    const finalReply =
      `I couldn't find a matching WanderLust stay right now.\n\n${aiReply}`;


    res.json({

      success: true,

      reply: finalReply,

      listings: []

    });


  } catch (error) {

    console.error(
      "AI CHAT ERROR:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "WanderLust AI is currently unavailable. Please make sure Ollama is running."

    });

  }

});


module.exports = router;