//dashboard routes
const express = require("express");
const Student = require("../models/s.model");
const TeachingAssignment = require("../models/ta.model");
const Teacher = require("../models/t.model");

const router = express.Router();

router.get("/", async (req, res) => {
  const students = await Student.findAll();
  const assignments = await TeachingAssignment.findAll({
    include: Teacher,
  });

  const classMap = {};

  students.forEach(s => {
    const key = `${s.classNumber}${s.section}`;
    if (!classMap[key]) {
      classMap[key] = {
        class: key,
        subjects: [],
        total_students: 0,
      };
    }
    classMap[key].total_students++;
  });

  assignments.forEach(a => {
    const key = `${a.classNumber}${a.section}`;
    if (classMap[key]) {
      classMap[key].subjects.push({
        subject: a.subject,
        teacher: a.Teacher.name,
      });
    }
  });

  const response = Object.keys(classMap).map(k => ({
    [`${k}_id`]: classMap[k],
  }));

  res.json(response);
});

module.exports = router;
