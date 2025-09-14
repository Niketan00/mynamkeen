const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrderById,
  updateOrderStatus,
  verifyPayment
} = require('../controllers/orderController');

// Public routes
router.post('/', createOrder);
router.get('/:id', getOrderById);
router.post('/verify-payment', verifyPayment);

// Admin routes
router.put('/:id/status', updateOrderStatus);

module.exports = router;



