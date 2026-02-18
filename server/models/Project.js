const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    technologies: [{ type: String, trim: true }],
    image: { type: String, trim: true },
    featured: { type: Boolean, default: false },
    liveLink: { type: String, trim: true },
    githubLink: { type: String, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
