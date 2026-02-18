const express = require("express");
const router = express.Router();
const {
  getSkills,
  createSkill,
  createManySkills,
  deleteSkill
} = require("../controllers/skillsController");

router.get("/", getSkills);
router.post("/", createSkill);
router.post("/bulk", createManySkills);
router.delete("/:id", deleteSkill);

module.exports = router;
