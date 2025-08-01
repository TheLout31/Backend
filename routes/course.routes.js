const express = require("express");
const CourseRouter = express.Router();
const fs = require("fs");
const {
  getCourses,
  postCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/course.controller");
const dataCheck = require("../models/course.data.check");

CourseRouter.get("/all-courses", getCourses);

// ✅ Apply dataCheck only to POST route
CourseRouter.post("/add-courses", postCourse);

CourseRouter.put("/update-courses/:id", updateCourse);

CourseRouter.delete("/delete-courses/:id", deleteCourse);

module.exports = CourseRouter;
