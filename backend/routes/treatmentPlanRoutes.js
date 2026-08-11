const express = require("express");
const TreatmentPlan = require("../models/TreatmentPlan");
const { authenticate, requireRole } = require("../middleware/therapistAuthMiddleware");

const router = express.Router();

const canAccessPlan = (req, plan) =>
  req.user.role === "admin" || String(plan.therapistId) === String(req.user.id);

router.get("/", authenticate, async (req, res, next) => {
  try {
    const query = {};
    if (req.user.role !== "admin") {
      query.therapistId = req.user.id;
    } else if (req.query.therapistId) {
      query.therapistId = req.query.therapistId;
    }
    if (req.query.status) query.status = req.query.status;
    const plans = await TreatmentPlan.find(query).sort({ createdAt: -1 });
    res.json(plans);
  } catch (error) {
    next(error);
  }
});

router.get("/therapist/:therapistId", authenticate, async (req, res, next) => {
  try {
    if (req.user.role !== "admin" && String(req.user.id) !== String(req.params.therapistId)) {
      return res.status(403).json({ message: "Access denied" });
    }
    const plans = await TreatmentPlan.find({ therapistId: req.params.therapistId }).sort({ createdAt: -1 });
    res.json(plans);
  } catch (error) {
    next(error);
  }
});

router.post("/", authenticate, requireRole("admin", "therapist"), async (req, res, next) => {
  try {
    const payload = { ...req.body };
    if (req.user.role !== "admin") payload.therapistId = req.user.id;
    const created = await TreatmentPlan.create(payload);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", authenticate, async (req, res, next) => {
  try {
    const plan = await TreatmentPlan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: "Treatment plan not found" });
    if (!canAccessPlan(req, plan)) return res.status(403).json({ message: "Access denied" });
    res.json(plan);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authenticate, requireRole("admin", "therapist"), async (req, res, next) => {
  try {
    const plan = await TreatmentPlan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: "Treatment plan not found" });
    if (!canAccessPlan(req, plan)) return res.status(403).json({ message: "Access denied" });

    const updates = { ...req.body };
    if (req.user.role !== "admin") delete updates.therapistId;
    const updated = await TreatmentPlan.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/progress", authenticate, requireRole("admin", "therapist"), async (req, res, next) => {
  try {
    const plan = await TreatmentPlan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: "Treatment plan not found" });
    if (!canAccessPlan(req, plan)) return res.status(403).json({ message: "Access denied" });
    const updated = await TreatmentPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/status", authenticate, requireRole("admin", "therapist"), async (req, res, next) => {
  try {
    const plan = await TreatmentPlan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: "Treatment plan not found" });
    if (!canAccessPlan(req, plan)) return res.status(403).json({ message: "Access denied" });
    const updated = await TreatmentPlan.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

router.post("/:id/goals", authenticate, requireRole("admin", "therapist"), async (req, res, next) => {
  try {
    const plan = await TreatmentPlan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: "Treatment plan not found" });
    if (!canAccessPlan(req, plan)) return res.status(403).json({ message: "Access denied" });
    plan.goals.push(req.body);
    await plan.save();
    res.status(201).json(plan);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authenticate, requireRole("admin"), async (req, res, next) => {
  try {
    const deleted = await TreatmentPlan.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Treatment plan not found" });
    res.json({ message: "Treatment plan deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
