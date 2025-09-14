const Order = require('../models/Order');
const Product = require('../models/Product');
const Razorpay = require('razorpay');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create new order
const createOrder = async (req, res) => {
  try {
    const { customer, items, paymentMethod } = req.body;
    
    // Validate items and calculate total
    let totalAmount = 0;
    const validatedItems = [];
    
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(400).json({
          success: false,
          message: `Product with ID ${item.product} not found`
        });
      }
      
      if (!product.inStock) {
        return res.status(400).json({
          success: false,
          message: `Product ${product.name} is out of stock`
        });
      }
      
      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;
      
      validatedItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price
      });
    }
    
    const order = new Order({
      customer,
      items: validatedItems,
      totalAmount,
      paymentMethod
    });
    
    await order.save();
    
    // If payment method is online, create Razorpay order
    if (paymentMethod === 'Online') {
      const razorpayOrder = await razorpay.orders.create({
        amount: totalAmount * 100, // Convert to paise
        currency: 'INR',
        receipt: order.orderId,
        notes: {
          orderId: order.orderId
        }
      });
      
      order.razorpayOrderId = razorpayOrder.id;
      await order.save();
      
      return res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: {
          order,
          razorpayOrder
        }
      });
    }
    
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: error.message
    });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product', 'name image price');
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching order',
      error: error.message
    });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: status },
      { new: true, runValidators: true }
    );
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating order status',
      error: error.message
    });
  }
};

// Verify payment
const verifyPayment = async (req, res) => {
  try {
    const { orderId, paymentId, signature } = req.body;
    
    const order = await Order.findOne({ razorpayOrderId: orderId });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    // Verify payment signature
    const crypto = require('crypto');
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');
    
    if (expectedSignature === signature) {
      order.paymentStatus = 'Paid';
      order.paymentId = paymentId;
      order.orderStatus = 'Confirmed';
      await order.save();
      
      res.json({
        success: true,
        message: 'Payment verified successfully',
        data: order
      });
    } else {
      order.paymentStatus = 'Failed';
      await order.save();
      
      res.status(400).json({
        success: false,
        message: 'Payment verification failed'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error verifying payment',
      error: error.message
    });
  }
};

module.exports = {
  createOrder,
  getOrderById,
  updateOrderStatus,
  verifyPayment
};



