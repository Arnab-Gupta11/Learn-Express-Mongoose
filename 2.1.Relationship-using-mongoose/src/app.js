const express = require("express");
// const router = require("./routes/staff.routes");
const staffRoutes = require("./routes/staff.routes");
const rightsRoutes = require("./routes/rights.routes");
const app = express();

app.use(express.json());

app.use("/api/v1/staff", staffRoutes);
app.use("/api/v1/rights", rightsRoutes);

module.exports = app;
