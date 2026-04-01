const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true, trim: true },
    therapistId: { type: String, required: true },
    sessionDate: { type: Date, required: true },
    durationMinutes: { type: Number, default: 45 },
    sessionType: {
      type: String,
      enum: ["individual", "group", "assessment", "consultation"],
      default: "individual",
    },
    status: {
      type: String,
      enum: ["scheduled", "in-progress", "completed", "cancelled"],
      default: "scheduled",
    },
    attendance: {
      type: String,
      enum: ["pending", "present", "absent", "late"],
      default: "pending",
    },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

sessionSchema.index({ therapistId: 1, sessionDate: -1 });

module.exports = mongoose.model("Session", sessionSchema);
