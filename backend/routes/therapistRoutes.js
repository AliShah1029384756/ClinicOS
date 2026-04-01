const express = require("express");
const TherapistProfile = require("../models/TherapistProfile");
const Session = require("../models/Session");
const TreatmentPlan = require("../models/TreatmentPlan");
const { authenticate, requireRole } = require("../middleware/therapistAuthMiddleware");

const router = express.Router();

router.get("/", authenticate, async (req, res, next) => {
  try {
    const therapists = await TherapistProfile.find().sort({ createdAt: -1 });
    res.json(therapists);
  } catch (error) {
    next(error);
  }
});

router.post("/", authenticate, requireRole("admin"), async (req, res, next) => {
  try {
    const created = await TherapistProfile.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", authenticate, async (req, res, next) => {
  try {
    const therapist = await TherapistProfile.findById(req.params.id);
    if (!therapist) return res.status(404).json({ message: "Therapist not found" });
    res.json(therapist);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authenticate, async (req, res, next) => {
  try {
    const updated = await TherapistProfile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Therapist not found" });
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/availability", authenticate, async (req, res, next) => {
  try {
    const updated = await TherapistProfile.findByIdAndUpdate(
      req.params.id,
      { availability: req.body.availability || [] },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Therapist not found" });
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/stats", authenticate, async (req, res, next) => {
  try {
    const therapist = await TherapistProfile.findById(req.params.id);
    if (!therapist) return res.status(404).json({ message: "Therapist not found" });

    const [totalSessions, completedSessions, activePlans] = await Promise.all([
      Session.countDocuments({ therapistId: String(req.params.id) }),
      Session.countDocuments({ therapistId: String(req.params.id), status: "completed" }),
      TreatmentPlan.countDocuments({ therapistId: String(req.params.id), status: "active" }),
    ]);

    res.json({
      therapistId: req.params.id,
      totalSessions,
      completedSessions,
      activePlans,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authenticate, requireRole("admin"), async (req, res, next) => {
  try {
    const deleted = await TherapistProfile.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Therapist not found" });
    res.json({ message: "Therapist deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
