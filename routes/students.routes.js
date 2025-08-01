const express = require("express");
const {
  getStudents,
  postStudent,
  updateStudent,
  deleteStudent,
  enrollStudentInCourses,
} = require("../controllers/student.controller");
const StudentsRouter = express.Router();

StudentsRouter.get("/all-students", getStudents);

// ✅ Apply dataCheck only to POST route
StudentsRouter.post("/add-student", postStudent);

StudentsRouter.put("/update-student/:id", updateStudent);

StudentsRouter.delete("/delete-student/:id", deleteStudent);

StudentsRouter.put("/assign-course", enrollStudentInCourses);

module.exports = StudentsRouter;
