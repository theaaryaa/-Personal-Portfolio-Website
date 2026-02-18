const Skills = require("../models/Skills");

async function getSkills(req, res, next) {
  try {
    const skills = await Skills.find().sort({ category: 1, proficiency: -1 });
    res.json(skills);
  } catch (error) {
    next(error);
  }
}

async function createSkill(req, res, next) {
  try {
    const skill = await Skills.create(req.body);
    res.status(201).json(skill);
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
}

async function createManySkills(req, res, next) {
  try {
    if (!Array.isArray(req.body) || req.body.length === 0) {
      return res.status(400).json({ message: "Body must be a non-empty array" });
    }

    await Skills.deleteMany({});
    const skills = await Skills.insertMany(req.body);
    res.status(201).json(skills);
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
}

async function deleteSkill(req, res, next) {
  try {
    const deleted = await Skills.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.json({ message: "Skill deleted successfully" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getSkills,
  createSkill,
  createManySkills,
  deleteSkill
};
