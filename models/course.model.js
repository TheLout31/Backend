const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  instructor: String,
  desc: String,
  duration: String,
});

const courseModel = mongoose.model("Course", courseSchema);



module.exports = courseModel;
