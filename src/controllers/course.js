const Course = require("../models/course");
const Student = require("../models/student");

async function addCourse(req, res) {
  const { code, name, description } = req.body;
  const existCourse = await Course.findById(code).exec();
  if (existCourse) {
    res.status(400).json("course exist");
  }
  const course = new Course({
    code,
    name,
    description
  });
  await course.save();
  return res.json(course);
}

async function getCourse(req, res) {
  const { id: code } = req.params;
  const course = await Course.findById(code)
    .populate("students", "firstName lastName")
    .exec();
  if (!course) {
    return res.status(404).json("course not found");
  }
  return res.json(course);
}

async function getAllCourses(req, res) {
  const courses = await Course.find().exec();
  return res.json(courses);
}

async function updateCourse(req, res) {
  const { id: code } = req.params;
  const { name, description } = req.body;
  const newCourse = await Course.findByIdAndUpdate(
    code,
    { name, description },
    { new: true }
  ).exec();
  if (!newCourse) {
    return res.status(404).json("course not found");
  }
  return res.json(newCourse);
}

async function deleteCourse(req, res) {
  const { id: code } = req.params;
  const course = await Course.findOneAndDelete(code).exec();
  if (!course) {
    return res.status(404).json("course not found");
  }
  await Student.updateMany(
    { id: { $in: course.students } },
    { $pull: { courses: course._id } }
  );
  return res.sendStatus(200);
}

module.exports = {
  addCourse,
  getAllCourses,
  getCourse,
  updateCourse,
  deleteCourse
};
