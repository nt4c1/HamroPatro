//extra stats routes 
const express = require("express");
const Student = require("../models/s.model");
const Teacher = require("../models/t.model");
const TeachingAssignment = require("../models/ta.model");

const router = express.Router();

router.get("/", async (req, res) => {
  const students = await Student.findAll();
  const teachers = await Teacher.findAll();
  const assignments = await TeachingAssignment.findAll();

  const classCounts = {};
  students.forEach(s => {
    const key = `${s.classNumber}${s.section}`;
    classCounts[key] = (classCounts[key] || 0) + 1;
  });

  const avgClassSize =
    Object.values(classCounts).reduce((a, b) => a + b, 0) /
    Object.values(classCounts).length;

  const subjectCount = {};
  assignments.forEach(a => {
    subjectCount[a.subject] = (subjectCount[a.subject] || 0) + 1;
  });

  const mostPopularSubject =
    Object.entries(subjectCount).sort((a, b) => b[1] - a[1])[0]?.[0];

  res.json({
    total_students: students.length,
    total_teachers: teachers.length,
    average_class_size: avgClassSize || 0,
    most_popular_subject: mostPopularSubject || "N/A",
  });
});

module.exports = router;
