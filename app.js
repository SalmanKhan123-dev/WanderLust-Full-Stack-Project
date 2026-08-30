// ============================================================
// ENVIRONMENT CONFIGURATION
// ============================================================

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// ============================================================
// IMPORTS
// ============================================================

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const engine = require("ejs-mate");

const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");

const ExpressError = require("./utils/ExpressError.js");

const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const chatRouter = require("./routes/chat.js");

// ============================================================
// APP CONFIGURATION
// ============================================================

const app = express();

const PORT = process.env.PORT || 8080;

const dbURL = process.env.ATLASDB_URL;

// ============================================================
// VIEW ENGINE
// ============================================================

app.engine("ejs", engine);

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

// ============================================================
// DATABASE CONNECTION
// ============================================================

async function connectDB() {
  try {
    await mongoose.connect(dbURL);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);

    process.exit(1);
  }
}

connectDB();

// ============================================================
// BASIC MIDDLEWARE
// ============================================================

// Parse form data
app.use(
  express.urlencoded({
    extended: true,
  }),
);

// Parse JSON requests
app.use(express.json());

// Method override
app.use(methodOverride("_method"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// ============================================================
// SESSION STORE
// ============================================================

const store = MongoStore.create({
  mongoUrl: dbURL,

  crypto: {
    secret: process.env.SECRET,
  },

  touchAfter: 24 * 3600,
});

// Session store error handling
store.on("error", (err) => {
  console.error("MongoDB Session Store Error:", err);
});

// ============================================================
// SESSION CONFIGURATION
// ============================================================

app.use(
  session({
    store,

    secret: process.env.SECRET,

    resave: false,

    saveUninitialized: false,

    cookie: {
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,

      maxAge: 7 * 24 * 60 * 60 * 1000,

      httpOnly: true,

      secure: process.env.NODE_ENV === "production",
    },
  }),
);

// ============================================================
// FLASH MESSAGES
// ============================================================

app.use(flash());

// ============================================================
// PASSPORT AUTHENTICATION
// ============================================================

app.use(passport.initialize());

app.use(passport.session());

// Local authentication strategy
passport.use(new LocalStrategy(User.authenticate()));

// Serialize user
passport.serializeUser(User.serializeUser());

// Deserialize user
passport.deserializeUser(User.deserializeUser());

// ============================================================
// GLOBAL RESPONSE LOCALS
// ============================================================

app.use((req, res, next) => {
  res.locals.success = req.flash("success");

  res.locals.error = req.flash("error");

  res.locals.currUser = req.user;

  next();
});

// ============================================================
// HEALTH CHECK
// ============================================================

app.get(
  "/health",

  (req, res) => {
    res.status(200).json({
      status: "OK",

      message: "WanderLust server is running",

      database:
        mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    });
  },
);

// ============================================================
// ROUTER CHECK
// ============================================================

console.log("========== ROUTER CHECK ==========");
console.log("listingRouter:", typeof listingRouter);
console.log("reviewRouter:", typeof reviewRouter);
console.log("userRouter:", typeof userRouter);
console.log("chatRouter:", typeof chatRouter);
console.log("==================================");

// ============================================================
// MAIN ROUTES
// ============================================================

// ------------------------------------------------------------
// LISTINGS
// ------------------------------------------------------------

app.use("/listings", listingRouter);

// ------------------------------------------------------------
// REVIEWS
// ------------------------------------------------------------

app.use("/listings/:id/reviews", reviewRouter);

// ------------------------------------------------------------
// AI CHATBOT
// ------------------------------------------------------------

// IMPORTANT:
// Session + Passport middleware are already loaded above.
// Therefore chatRouter can safely access req.user if needed.

app.use("/chat", chatRouter);

// ------------------------------------------------------------
// AUTHENTICATION / USERS
// ------------------------------------------------------------

app.use("/", userRouter);

// ============================================================
// HOME ROUTE
// ============================================================

app.get(
  "/",

  (req, res) => {
    res.redirect("/listings");
  },
);

// ============================================================
// 404 HANDLER
// ============================================================

app.all(
  "*",

  (req, res, next) => {
    next(new ExpressError(404, "Page not found!"));
  },
);

// ============================================================
// GLOBAL ERROR HANDLER
// ============================================================

app.use((err, req, res, next) => {
  console.error("Application Error:", err);

  const { statusCode = 500, message = "Something went wrong!" } = err;

  res.status(statusCode).render("error.ejs", {
    err: {
      statusCode,
      message,
    },
  });
});

// ============================================================
// START SERVER
// ============================================================

app.listen(
  PORT,

  () => {
    console.log(`WanderLust server running on port ${PORT}`);
  },
);
