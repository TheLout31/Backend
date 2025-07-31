const fs = require("fs");

const getCourses = (req, res) => {
  try {
    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    let course = data.courses || [];
    console.log("getting all courses data ", course);
    res.json({ msg: "Successfully fetched all courses", course });
  } catch (error) {
    res.json({ msg: "Failed to load all courses", error });
  }
};

const postCourse = (req, res) => {
  try {
    let newCourse = req.body;
    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    let course = data.courses || [];
    let id = course.length > 0 ? course[course.length - 1].id + 1 : 1;
    let newData = { id, ...newCourse };
    course.push(newData);
    data.courses = course;
    fs.writeFileSync("./db.json", JSON.stringify(data, null, 2));
    res.json({ msg: "New course added successfully", course: newData });
  } catch (error) {
    res.status(500).json({ msg: "Error adding course", error });
  }
};

const updateCourse = (req, res) => {
  let id = Number(req.params.id);
  let newCourse = req.body;
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let course = data.courses || [];
  let idx = course.findIndex((course) => course.id === id);
  if (idx === -1) {
    res.json({ msg: "Course not found" });
  } else {
    let updatedCourse = course.map((el) =>
      el.id === id ? { ...el, ...newCourse } : el
    );
    data.courses = updatedCourse;
    fs.writeFileSync("./db.json", JSON.stringify(data, null, 2));
    res.json({ msg: "Course updated successfully", course: updatedCourse });
  }
};

const deleteCourse = (req, res) => {
  let id = Number(req.params.id);
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let course = data.courses || [];
  let idx = course.findIndex((course) => course.id === id);
  if (idx === -1) {
    res.json({ msg: "Course not found" });
  } else {
    let updatedCourse = course.filter((el) => el.id !== id);
    data.courses = updatedCourse;
    fs.writeFileSync("./db.json", JSON.stringify(data, null, 2));
    res.json({ msg: "Course deleted successfully", course: updatedCourse });
  }
};

module.exports = { getCourses, postCourse, updateCourse,deleteCourse };
