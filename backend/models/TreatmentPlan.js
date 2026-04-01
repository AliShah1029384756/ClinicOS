const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    targetDate: { type: Date },
    status: {
      type: String,
      enum: ["not-started", "in-progress", "completed", "on-hold"],
      default: "not-started",
    },
    progressPercentage: { type: Number, default: 0, min: 0, max: 100 },
  },
  { _id: false }
);

const treatmentPlanSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true },
    therapistId: { type: String, required: true },
    diagnosis: { type: String, default: "" },
    goals: [goalSchema],
    interventions: [{ type: String }],
    status: {
      type: String,
      enum: ["draft", "active", "completed", "archived"],
      default: "draft",
    },
  },
  { timestamps: true }
);

treatmentPlanSchema.index({ therapistId: 1, createdAt: -1 });

module.exports = mongoose.model("TreatmentPlan", treatmentPlanSchema);
