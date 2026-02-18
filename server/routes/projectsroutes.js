const express = require("express");
const router = express.Router();
const {
    getProjects,
    getFeaturedProjects,
    createProject,
    createManyProjects,
    updateProject,
    deleteProject
} = require("../controllers/projectsController");

// Get all projects - GET /api/projects
router.get("/", getProjects);

// Get featured projects - GET /api/projects/featured
router.get("/featured", getFeaturedProjects);

// Create single project - POST /api/projects
router.post("/", createProject);

// Bulk create projects - POST /api/projects/bulk
router.post("/bulk", createManyProjects);

// Update project - PUT /api/projects/:id
router.put("/:id", updateProject);

// Delete project - DELETE /api/projects/:id
router.delete("/:id", deleteProject);

module.exports = router;
