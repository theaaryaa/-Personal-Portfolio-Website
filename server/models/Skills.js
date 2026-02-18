const mongoose = require("mongoose");

const skillsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["frontend", "backend", "tools", "other"],
      required: true
    },
    proficiency: { type: Number, min: 0, max: 100, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skills", skillsSchema);
