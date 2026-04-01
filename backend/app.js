const express = require("express");
const cors = require("cors");

const sessionRoutes = require("./routes/sessionRoutes");
const treatmentPlanRoutes = require("./routes/treatmentPlanRoutes");
const therapistRoutes = require("./routes/therapistRoutes");

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json({ limit: "2mb" }));

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "ClinicOS API" });
});

app.use("/api/sessions", sessionRoutes);
app.use("/api/treatment-plans", treatmentPlanRoutes);
app.use("/api/therapists", therapistRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Internal server error" });
});

module.exports = app;
