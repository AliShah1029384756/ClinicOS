const express = require("express");
const Session = require("../models/Session");
const TherapistProfile = require("../models/TherapistProfile");
const { authenticate, requireRole } = require("../middleware/therapistAuthMiddleware");

const router = express.Router();

async function getTherapistProfile(req) {
  if (req.user.role !== "therapist") return null;
  return TherapistProfile.findOne({ email: req.user.email, role: "therapist" });
}

async function authorizeSession(req, session) {
  if (req.user.role === "admin") return true;
  const therapist = await getTherapistProfile(req);
  return Boolean(therapist && session && String(session.therapistId) === String(therapist._id));
}

router.get("/", authenticate, async (req, res, next) => {
  try {
    const query = {};
    if (req.user.role === "therapist") {
      const therapist = await getTherapistProfile(req);
      if (!therapist) return res.status(403).json({ message: "Therapist profile not found" });
      query.therapistId = therapist._id;
    } else if (req.query.therapistId) {
      query.therapistId = req.query.therapistId;
    }
    if (req.query.status) query.status = req.query.status;
    const sessions = await Session.find(query).sort({ sessionDate: -1 });
    res.json(sessions);
  } catch (error) {
    next(error);
  }
});

router.get("/therapist/:therapistId", authenticate, async (req, res, next) => {
  try {
    if (req.user.role === "therapist") {
      const therapist = await getTherapistProfile(req);
      if (!therapist || String(therapist._id) !== String(req.params.therapistId)) {
        return res.status(403).json({ message: "You can only access your own sessions" });
      }
    }
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
    const query = { sessionDate: { $gte: start, $lt: end } };
    if (req.user.role === "therapist") {
      const therapist = await getTherapistProfile(req);
      if (!therapist) return res.status(403).json({ message: "Therapist profile not found" });
      query.therapistId = therapist._id;
    }
    const sessions = await Session.find(query).sort({ sessionDate: 1 });
    res.json(sessions);
  } catch (error) {
    next(error);
  }
});

router.post("/", authenticate, requireRole("admin", "therapist"), async (req, res, next) => {
  try {
    const payload = { ...req.body };
    if (req.user.role === "therapist") {
      const therapist = await getTherapistProfile(req);
      if (!therapist) return res.status(403).json({ message: "Therapist profile not found" });
      payload.therapistId = therapist._id;
    }
    const created = await Session.create(payload);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", authenticate, async (req, res, next) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found" });
    if (!(await authorizeSession(req, session))) {
      return res.status(403).json({ message: "You can only access your own sessions" });
    }
    res.json(session);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authenticate, requireRole("admin", "therapist"), async (req, res, next) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found" });
    if (!(await authorizeSession(req, session))) {
      return res.status(403).json({ message: "You can only modify your own sessions" });
    }

    const updates = { ...req.body };
    if (req.user.role === "therapist") {
      const therapist = await getTherapistProfile(req);
      updates.therapistId = therapist._id;
    }

    const updated = await Session.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/attendance", authenticate, requireRole("admin", "therapist"), async (req, res, next) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found" });
    if (!(await authorizeSession(req, session))) {
      return res.status(403).json({ message: "You can only modify your own sessions" });
    }
    const updated = await Session.findByIdAndUpdate(
      req.params.id,
      { attendance: req.body.attendance },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/status", authenticate, requireRole("admin", "therapist"), async (req, res, next) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found" });
    if (!(await authorizeSession(req, session))) {
      return res.status(403).json({ message: "You can only modify your own sessions" });
    }
    const updated = await Session.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authenticate, requireRole("admin"), async (req, res, next) => {
  try {
    const deleted = await Session.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Session not found" });
    res.json({ message: "Session deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
