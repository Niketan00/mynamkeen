import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaPlus, FaMinus, FaTrash, FaShoppingBag, FaArrowLeft } from 'react-icons/fa';
import './Cart.css';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId) => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      removeFromCart(productId);
    }
  };

  if (items.length === 0) {
    return (
      <div className="cart">
        <div className="cart-header">
          <div className="container">
            <h1 className="page-title">Shopping Cart</h1>
          </div>
        </div>
        
        <div className="empty-cart">
          <div className="container">
            <div className="empty-cart-content">
              <FaShoppingBag className="empty-cart-icon" />
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added any items to your cart yet.</p>
              <Link to="/products" className="btn btn-primary">
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart-header">
        <div className="container">
          <h1 className="page-title">Shopping Cart</h1>
          <p className="page-subtitle">
            {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
      </div>

      <div className="cart-content">
        <div className="container">
          <div className="cart-layout">
            {/* Cart Items */}
            <div className="cart-items">
              <div className="cart-items-header">
                <h2>Cart Items</h2>
                <Link to="/products" className="continue-shopping">
                  <FaArrowLeft />
                  Continue Shopping
                </Link>
              </div>

              <div className="cart-items-list">
                {items.map(item => (
                  <div key={item.product._id} className="cart-item">
                    <div className="item-image">
                      <img src={item.product.image} alt={item.product.name} />
                    </div>

                    <div className="item-details">
                      <h3 className="item-name">{item.product.name}</h3>
                      <p className="item-description">{item.product.description}</p>
                      <div className="item-weight">{item.product.weight}</div>
                      <div className="item-price">₹{item.product.price}</div>
                    </div>

                    <div className="item-quantity">
                      <label>Quantity:</label>
                      <div className="quantity-controls">
                        <button
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                        >
                          <FaMinus />
                        </button>
                        <span className="quantity-value">{item.quantity}</span>
                        <button
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>

                    <div className="item-total">
                      <div className="total-label">Total:</div>
                      <div className="total-amount">₹{item.product.price * item.quantity}</div>
                    </div>

                    <div className="item-actions">
                      <button
                        className="remove-btn"
                        onClick={() => handleRemoveItem(item.product._id)}
                        title="Remove item"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="cart-summary">
              <div className="summary-card">
                <h3>Order Summary</h3>
                
                <div className="summary-details">
                  <div className="summary-row">
                    <span>Items ({getTotalItems()}):</span>
                    <span>₹{getTotalPrice()}</span>
                  </div>
                  
                  <div className="summary-row">
                    <span>Delivery:</span>
                    <span className="free">FREE</span>
                  </div>
                  
                  <div className="summary-row">
                    <span>Tax:</span>
                    <span>₹0</span>
                  </div>
                  
                  <div className="summary-divider"></div>
                  
                  <div className="summary-row total">
                    <span>Total:</span>
                    <span>₹{getTotalPrice()}</span>
                  </div>
                </div>

                <div className="summary-actions">
                  <Link to="/checkout" className="btn btn-primary btn-large">
                    Proceed to Checkout
                  </Link>
                  
                  <Link to="/products" className="btn btn-outline">
                    Continue Shopping
                  </Link>
                </div>

                <div className="summary-benefits">
                  <div className="benefit">
                    <span className="benefit-icon">🚚</span>
                    <span>Free delivery on orders above ₹500</span>
                  </div>
                  <div className="benefit">
                    <span className="benefit-icon">💳</span>
                    <span>Secure payment options</span>
                  </div>
                  <div className="benefit">
                    <span className="benefit-icon">🔄</span>
                    <span>Easy returns & exchanges</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;






