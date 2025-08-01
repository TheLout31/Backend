const studentModel = require("../models/student.model");

const getStudents = async (req, res) => {
  try {
    const student = await studentModel.find({});
    res.status(200).json({ msg: "List of students", student });
  } catch (error) {
    console.error("Error finding students:", error);
    res.json({ msg: error });
  }
};

const postStudent = async (req, res) => {
  try {
    let student = await studentModel.create(req.body);
    res.status(201).json({ msg: "New student Added!!", student });
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

const updateStudent = async (req, res) => {
  try {
    const id = req.params.id; // Leave as string for ObjectId
    const updatedStudent = await studentModel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true } // Return the updated document
    );

    if (updatedStudent) {
      console.log("student updated successfully:", updatedStudent);
      res
        .status(200)
        .json({ msg: "student updated successfully", updatedStudent });
    } else {
      console.log("student not found.");
      res.status(404).json({ msg: "student not found" });
    }
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const id = req.params.id; // Leave as string for ObjectId
    const deletedStudent = await studentModel.findByIdAndDelete(id);

    if (deletedStudent) {
      console.log("student updated successfully:", deletedStudent);
      res
        .status(200)
        .json({ msg: "student deleted successfully", deletedStudent });
    } else {
      console.log("student not found.");
      res.status(404).json({ msg: "student not found" });
    }
  } catch (error) {
    console.error("Error deleted student:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

const enrollStudentInCourses = async (req, res) => {
  const { studentId, courseIds } = req.body;

  try {
    const updatedStudent = await studentModel
      .findByIdAndUpdate(
        studentId,
        { $addToSet: { enrolledCourses: { $each: courseIds } } },
        { new: true }
      )
      .populate("enrolledCourses");

    res.status(200).json({ msg: "Student enrolled", student: updatedStudent });
  } catch (error) {
    res.status(500).json({ msg: "Enrollment failed", error: error.message });
  }
};

module.exports = {
  getStudents,
  postStudent,
  updateStudent,
  deleteStudent,
  enrollStudentInCourses,
};
