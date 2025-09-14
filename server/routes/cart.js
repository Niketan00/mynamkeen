const express = require('express');
const router = express.Router();

// Cart functionality will be handled on the frontend using localStorage
// This route can be used for cart validation or server-side cart management if needed

// Validate cart items
router.post('/validate', async (req, res) => {
  try {
    const { items } = req.body;
    const Product = require('../models/Product');
    
    const validatedItems = [];
    let totalAmount = 0;
    
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
        product: {
          _id: product._id,
          name: product.name,
          image: product.image,
          price: product.price
        },
        quantity: item.quantity,
        price: product.price
      });
    }
    
    res.json({
      success: true,
      data: {
        items: validatedItems,
        totalAmount
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error validating cart',
      error: error.message
    });
  }
});

module.exports = router;



