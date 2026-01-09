//roleCheck middleware (teachers only)
module.exports = function (req, res, next) {
  const role = req.headers["x-role"];
  if (role !== "teacher") {
    return res.status(403).json({
      message: "Only teachers can modify student data",
    });
  }
  next();
};
