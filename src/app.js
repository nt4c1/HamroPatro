const express = require("express");
const sequelize = require("./db");

const studentRoutes = require("./routes/s.routes");
const teacherRoutes = require("./routes/t.routes");
const dashboardRoutes = require("./routes/dashboard");
const statsRoutes = require("./routes/stats");

const app = express();
app.use(express.json());

app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/stats", statsRoutes);

sequelize.authenticate()
  .then(() => console.log("PostgreSQL connected successfully"))
  .catch(err => console.error("DB connection failed:", err));


sequelize.sync().then(() => {
  app.listen(3000, () => console.log("Server running on port 3000"));
});

sequelize.sync()
