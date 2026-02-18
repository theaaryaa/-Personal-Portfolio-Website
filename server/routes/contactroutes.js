const express = require("express");
const router = express.Router();
const {
  getContacts,
  submitContact,
  deleteContact
} = require("../controllers/contactController");

// Get all contacts - GET /api/contact
router.get("/", getContacts);

// Submit contact form - POST /api/contact
router.post("/", submitContact);

// Delete contact - DELETE /api/contact/:id
router.delete("/:id", deleteContact);

module.exports = router;
