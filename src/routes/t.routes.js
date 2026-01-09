//teacher routes
const express = require("express");
const Teacher = require("../models/t.model");

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await Teacher.findAll());
});

router.get("/:id", async (req, res) => {
  res.json(await Teacher.findByPk(req.params.id));
});

module.exports = router;
