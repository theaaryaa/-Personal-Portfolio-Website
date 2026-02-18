const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    bio: { type: String, required: true, trim: true },
    location: { type: String, trim: true },
    avatar: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    social: {
      github: { type: String, trim: true },
      linkedin: { type: String, trim: true },
      twitter: { type: String, trim: true }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
