const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    age: Number,
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course", 
      },
    ],
  },
  { timestamps: true }
);

const studentModel = mongoose.model("students", studentSchema);

module.exports = studentModel;
