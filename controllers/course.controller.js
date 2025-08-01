const fs = require("fs");
const courseModel = require("../models/course.model");

const getCourses = async (req, res) => {
  try {
    const documents = await courseModel.find({});
    res.status(200).json({ msg: "List of courses", documents });
  } catch (error) {
    console.error("Error finding documents:", error);
    res.json({ msg: error });
  }
};

const postCourse = async (req, res) => {
  try {
    let course = await courseModel.create(req.body);
    res.status(200).json({ msg: "New Course Added!!", course });
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

const updateCourse = async (req, res) => {
  try {
    const id = req.params.id; // Leave as string for ObjectId
    const updatedCourse = await courseModel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true } // Return the updated document
    );

    if (updatedCourse) {
      console.log("Course updated successfully:", updatedCourse);
      res
        .status(200)
        .json({ msg: "Course updated successfully", updatedCourse });
    } else {
      console.log("Course not found.");
      res.status(404).json({ msg: "Course not found" });
    }
  } catch (error) {
    console.error("Error updating Course:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const id = req.params.id; // Leave as string for ObjectId
    const deletedUser = await courseModel.findByIdAndDelete(id);

    if (deletedUser) {
      console.log("Course updated successfully:", deletedUser);
      res.status(200).json({ msg: "Course deleted successfully", deletedUser });
    } else {
      console.log("Course not found.");
      res.status(404).json({ msg: "Course not found" });
    }
  } catch (error) {
    console.error("Error deleted Course:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

module.exports = { getCourses, postCourse, updateCourse, deleteCourse };
