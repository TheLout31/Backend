const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    instructor: { type: String, required: true },
    description: String,
    duration: String,
    category: String,
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advance"],
    },
  },
  { timestamps: true }
);

const courseModel = mongoose.model("Course", courseSchema);

module.exports = courseModel;
