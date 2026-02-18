const Project = require("../models/Project");

async function getProjects(req, res, next) {
  try {
    const projects = await Project.find().sort({ featured: -1, updatedAt: -1 });
    res.json(projects);
  } catch (error) {
    next(error);
  }
}

async function getFeaturedProjects(req, res, next) {
  try {
    const projects = await Project.find({ featured: true }).sort({ updatedAt: -1 });
    res.json(projects);
  } catch (error) {
    next(error);
  }
}

async function createProject(req, res, next) {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
}

async function createManyProjects(req, res, next) {
  try {
    if (!Array.isArray(req.body) || req.body.length === 0) {
      return res.status(400).json({ message: "Body must be a non-empty array" });
    }

    await Project.deleteMany({});
    const inserted = await Project.insertMany(req.body);
    res.status(201).json(inserted);
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
}

async function updateProject(req, res, next) {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(updated);
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
}

async function deleteProject(req, res, next) {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProjects,
  getFeaturedProjects,
  createProject,
  createManyProjects,
  updateProject,
  deleteProject
};
