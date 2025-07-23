const express = require("express");
const app = express();
const PORT = 3000;

const { eventEmitter } = require("./eventLogger");
const delay = require("./delay");
const { filterData } = require("./filterData");

// Route: /test
app.get("/test", (req, res) => {
  res.send("Test route is working!");
});

// Route: /emit?message=YourMessage
app.get("/emit", (req, res) => {
  const { message } = req.query;

  if (!message) {
    return res.status(400).json({ error: "Missing 'message' query parameter" });
  }

  eventEmitter.emit("log", message);
  res.json({ status: "Log event emitted", message });
});

// Route: /delay?message=Hello&time=2000
app.get("/delay", async (req, res) => {
  const { message, time } = req.query;

  if (!message || !time) {
    return res
      .status(400)
      .json({ error: "Missing 'message' or 'time' query parameter" });
  }

  const ms = parseInt(time, 10);
  if (isNaN(ms)) {
    return res
      .status(400)
      .json({ error: "'time' must be a number in milliseconds" });
  }

  try {
    const result = await delay(message, ms);
    res.json({ delayedMessage: result });
  } catch (err) {
    res.status(500).json({ error: "Delay failed" });
  }
});

app.get("/products", (req, res) => {
  const { category } = req.query;
  if (!category) {
    return res.status(400).json({ error: "Missing category query parameter" });
  } else {
    console.log(typeof(category))
    const result = filterData(category);
    res.json(result);
  }
});
// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
