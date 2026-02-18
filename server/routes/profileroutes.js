const express = require("express");
const router = express.Router();
const { getProfile, upsertProfile, deleteProfile } = require("../controllers/profileController");

router.get("/", getProfile);
router.put("/", upsertProfile);
router.post("/", upsertProfile);
router.delete("/:id", deleteProfile);

module.exports = router;
