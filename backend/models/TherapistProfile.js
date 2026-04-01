const mongoose = require("mongoose");

const therapistProfileSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, unique: true },
    specialization: { type: String, default: "" },
    licenseNumber: { type: String, default: "" },
    yearsOfExperience: { type: Number, default: 0, min: 0 },
    availability: [{ type: String }],
    role: {
      type: String,
      enum: ["therapist", "admin", "caregiver", "patient"],
      default: "therapist",
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TherapistProfile", therapistProfileSchema);
