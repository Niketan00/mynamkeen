const express = require('express');
const router = express.Router();
const {
  submitContact,
  getAllContacts,
  markAsRead
} = require('../controllers/contactController');

// Public routes
router.post('/', submitContact);

// Admin routes
router.get('/', getAllContacts);
router.put('/:id/read', markAsRead);

module.exports = router;



