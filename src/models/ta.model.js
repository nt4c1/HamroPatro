//teacher assignment model
const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Teacher = require("./t.model");

const TeachingAssignment = sequelize.define("TeachingAssignment", {
  subject: DataTypes.STRING,
  classNumber: DataTypes.INTEGER,
  section: DataTypes.STRING,
});

// Relations
Teacher.hasMany(TeachingAssignment);
TeachingAssignment.belongsTo(Teacher);


module.exports = TeachingAssignment;
