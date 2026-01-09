//student routes
const express = require("express");
const Student = require("../models/s.model");
const roleCheck = require("../middleware/role");

const router = express.Router();

// GET /api/students
router.get("/", async (req, res) => {
  const { classNumber, section } = req.query;
  const where = {};

  if (classNumber) where.classNumber = classNumber;
  if (section) where.section = section;

  const students = await Student.findAll({ where });
  res.json(students);
});

// GET /api/students/:id
router.get("/:id", async (req, res) => {
  const student = await Student.findByPk(req.params.id);
  res.json(student);
});

// POST (teachers only)
router.post("/", roleCheck, async (req, res) => {
  const student = await Student.create(req.body);
  res.status(201).json(student);
});

// PUT
router.put("/", roleCheck, async (req, res) => {
  await Student.update(req.body, { where: { id: req.body.id } });
  res.json({ message: "Student updated" });
});

// PATCH contact only as an example
router.patch("/:id", roleCheck, async (req, res) => {
  await Student.update(
    { contactDetails: req.body.contactDetails },
    { where: { id: req.params.id } }
  );
  res.json({ message: "Contact updated" });
});

// DELETE
router.delete("/:id", roleCheck, async (req, res) => {
  await Student.destroy({ where: { id: req.params.id } });
  res.json({ message: "Student deleted" });
});

module.exports = router;
