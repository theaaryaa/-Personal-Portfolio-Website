const Contact = require("../models/contact");
const { sendContactNotification, canSendEmail } = require("../services/mailService");

function validateContact(data) {
  const errors = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters long.");
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Email must be a valid address.");
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push("Message must be at least 10 characters long.");
  }

  return errors;
}

async function getContacts(req, res, next) {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    next(error);
  }
}

async function submitContact(req, res, next) {
  try {
    const errors = validateContact(req.body);
    if (errors.length) {
      return res.status(400).json({ message: errors.join(" ") });
    }

    const payload = {
      name: req.body.name.trim(),
      email: req.body.email.trim(),
      message: req.body.message.trim()
    };

    const contact = await Contact.create(payload);

    let emailStatus = "not-configured";
    if (canSendEmail()) {
      try {
        await sendContactNotification(payload);
        emailStatus = "sent";
      } catch (error) {
        emailStatus = "failed";
        console.error("Contact email failed:", error.message);
      }
    }

    res.status(201).json({
      message: "Thank you. Your message has been received.",
      emailStatus,
      contactId: contact._id
    });
  } catch (error) {
    next(error);
  }
}

async function deleteContact(req, res, next) {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getContacts,
  submitContact,
  deleteContact
};
