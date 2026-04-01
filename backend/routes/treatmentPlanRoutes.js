const express = require("express");
const TreatmentPlan = require("../models/TreatmentPlan");
const { authenticate } = require("../middleware/therapistAuthMiddleware");

const router = express.Router();

router.get("/", authenticate, async (req, res, next) => {
  try {
    const query = {};
    if (req.query.therapistId) query.therapistId = req.query.therapistId;
    if (req.query.status) query.status = req.query.status;
    const plans = await TreatmentPlan.find(query).sort({ createdAt: -1 });
    res.json(plans);
  } catch (error) {
    next(error);
  }
});

router.get("/therapist/:therapistId", authenticate, async (req, res, next) => {
  try {
    const plans = await TreatmentPlan.find({ therapistId: req.params.therapistId }).sort({ createdAt: -1 });
    res.json(plans);
  } catch (error) {
    next(error);
  }
});

router.post("/", authenticate, async (req, res, next) => {
  try {
    const created = await TreatmentPlan.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", authenticate, async (req, res, next) => {
  try {
    const plan = await TreatmentPlan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: "Treatment plan not found" });
    res.json(plan);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authenticate, async (req, res, next) => {
  try {
    const updated = await TreatmentPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Treatment plan not found" });
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/progress", authenticate, async (req, res, next) => {
  try {
    const updated = await TreatmentPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Treatment plan not found" });
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/status", authenticate, async (req, res, next) => {
  try {
    const updated = await TreatmentPlan.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Treatment plan not found" });
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

router.post("/:id/goals", authenticate, async (req, res, next) => {
  try {
    const plan = await TreatmentPlan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: "Treatment plan not found" });
    plan.goals.push(req.body);
    await plan.save();
    res.status(201).json(plan);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authenticate, async (req, res, next) => {
  try {
    const deleted = await TreatmentPlan.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Treatment plan not found" });
    res.json({ message: "Treatment plan deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
