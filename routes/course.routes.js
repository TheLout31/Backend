const express = require("express");
const CourseRouter = express.Router();
const fs = require("fs");


CourseRouter.use(express.json());

CourseRouter.get("/all-courses", (req, res) => {
  try {
    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    let course = data.course;
    console.log(course);
    res.json({ msg: "sucessfully fetched all courses", course });
  } catch (error) {
    res.json({ msg: "failed to load all courses", error: error });
  }
});

CourseRouter.post("/add-courses", (req, res) => {
  try {
    let newCourse = req.body;
    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    let course = data.course || [];
    let id = course.length > 0 ? course[course.length - 1].id + 1 : 1;
    let newData = { id, ...newCourse };
    course.push(newData);
    data.courses = course;
    fs.writeFileSync("./db.json", JSON.stringify(data, null, 2));
    res.json({ msg: "New course added successfully", course: newData });
  } catch (error) {
    res.status(500).json({ msg: "Error adding course", error });
  }
});

CourseRouter.put("/update-courses/:id", (req, res) => {
  let id = Number(req.params.id);
  let newCourse = req.body;
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let course = data.course;
  let idx = course.findIndex((course) => course.id === id);
  if (idx === -1) {
    res.json({ msg: "Course not found" });
  } else {
    let updatedCourse = course.map((el) => el.id === id ? { ...el, ...newCourse } : el);
    data.courses = updatedCourse;
    fs.writeFileSync("./db.json", JSON.stringify(data, null, 2));
    res.json({ msg: "Course updated successfully", course: updatedCourse });
  }
});


CourseRouter.delete("/delete-courses/:id", (req, res) => {
  let id = Number(req.params.id);
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let course = data.course;
  let idx = course.findIndex((course) => course.id === id);
  if (idx === -1) {
    res.json({ msg: "Course not found" });
  } else {
    let updatedCourse = course.filter((el) => el.id !== id);
    data.courses = updatedCourse;
    fs.writeFileSync("./db.json", JSON.stringify(data, null, 2));
    res.json({ msg: "Course deleted successfully", course: updatedCourse });
  }
});
