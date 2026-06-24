const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Submit contact form
router.post('/submit', contactController.submitContactForm);

// Get all contact submissions (admin only - would need auth in production)
router.get('/submissions', contactController.getContactSubmissions);

// Get specific submission by ID
router.get('/submissions/:id', contactController.getSubmissionById);

module.exports = router;
