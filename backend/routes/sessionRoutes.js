const express = require("express");
const Session = require("../models/Session");
const { authenticate } = require("../middleware/therapistAuthMiddleware");

const router = express.Router();

router.get("/", authenticate, async (req, res, next) => {
  try {
    const query = {};
    if (req.query.therapistId) query.therapistId = req.query.therapistId;
    if (req.query.status) query.status = req.query.status;
    const sessions = await Session.find(query).sort({ sessionDate: -1 });
    res.json(sessions);
  } catch (error) {
    next(error);
  }
});

router.get("/therapist/:therapistId", authenticate, async (req, res, next) => {
  try {
    const sessions = await Session.find({ therapistId: req.params.therapistId }).sort({ sessionDate: -1 });
    res.json(sessions);
  } catch (error) {
    next(error);
  }
});

router.get("/date/:date", authenticate, async (req, res, next) => {
  try {
    const start = new Date(req.params.date);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    const sessions = await Session.find({ sessionDate: { $gte: start, $lt: end } }).sort({ sessionDate: 1 });
    res.json(sessions);
  } catch (error) {
    next(error);
  }
});

router.post("/", authenticate, async (req, res, next) => {
  try {
    const created = await Session.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", authenticate, async (req, res, next) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found" });
    res.json(session);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authenticate, async (req, res, next) => {
  try {
    const updated = await Session.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Session not found" });
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/attendance", authenticate, async (req, res, next) => {
  try {
    const updated = await Session.findByIdAndUpdate(
      req.params.id,
      { attendance: req.body.attendance },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Session not found" });
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/status", authenticate, async (req, res, next) => {
  try {
    const updated = await Session.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Session not found" });
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authenticate, async (req, res, next) => {
  try {
    const deleted = await Session.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Session not found" });
    res.json({ message: "Session deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
