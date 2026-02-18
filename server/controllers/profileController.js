const Profile = require("../models/Profile");

async function getProfile(req, res, next) {
  try {
    const profile = await Profile.findOne().sort({ updatedAt: -1 });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    next(error);
  }
}

async function upsertProfile(req, res, next) {
  try {
    const required = ["name", "title", "bio"];
    const missing = required.filter((field) => !req.body[field] || !String(req.body[field]).trim());

    if (missing.length) {
      return res.status(400).json({ message: `Missing required fields: ${missing.join(", ")}` });
    }

    const existing = await Profile.findOne();

    if (existing) {
      const updated = await Profile.findByIdAndUpdate(existing._id, req.body, {
        new: true,
        runValidators: true
      });
      return res.json(updated);
    }

    const created = await Profile.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
}

async function deleteProfile(req, res, next) {
  try {
    const deleted = await Profile.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProfile,
  upsertProfile,
  deleteProfile
};
