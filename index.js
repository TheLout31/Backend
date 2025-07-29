const express = require("express");
const app = express();
const PORT = 3000;
const fs = require("fs");
const courseRouter = require("./routes/course.routes");
// Middleware to parse JSON body
app.use(express.json());

//Course Routes
app.use("/courses", courseRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
