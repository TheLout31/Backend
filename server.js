const express = require("express");
const app = express();
const PORT = 3000;
const CourseRouter = require("./routes/course.routes");
const rateLimit = require("express-rate-limit");
const connectTODB = require("./config/mongodb.config");

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   limit: 7, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
//   standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
//   legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
//   ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
//   // store: ... , // Redis, Memcached, etc. See below.
// });

//connect mongoose

connectTODB();
// Apply the rate limiting middleware to all requests.

// app.use(limiter);

// Middleware to parse JSON body
app.use(express.json());

//Course Routes
app.use("/courses", CourseRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
