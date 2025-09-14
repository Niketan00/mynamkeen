import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ordersAPI } from '../utils/api';
import { FaCreditCard, FaMoneyBillWave, FaLock, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import './Checkout.css';

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India'
    }
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!formData.address.street.trim()) {
      newErrors['address.street'] = 'Street address is required';
    }

    if (!formData.address.city.trim()) {
      newErrors['address.city'] = 'City is required';
    }

    if (!formData.address.state.trim()) {
      newErrors['address.state'] = 'State is required';
    }

    if (!formData.address.pincode.trim()) {
      newErrors['address.pincode'] = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.address.pincode)) {
      newErrors['address.pincode'] = 'Pincode must be 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      const orderData = {
        customer: formData,
        items: items.map(item => ({
          product: item.product._id,
          quantity: item.quantity
        })),
        paymentMethod
      };

      const response = await ordersAPI.create(orderData);
      
      if (response.data.success) {
        clearCart();
        // Redirect to order confirmation page
        window.location.href = `/order-confirmation?orderId=${response.data.data.orderId}`;
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="checkout">
        <div className="checkout-header">
          <div className="container">
            <h1 className="page-title">Checkout</h1>
          </div>
        </div>
        
        <div className="empty-cart">
          <div className="container">
            <div className="empty-cart-content">
              <h2>Your cart is empty</h2>
              <p>Please add some items to your cart before proceeding to checkout.</p>
              <a href="/products" className="btn btn-primary">
                Continue Shopping
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout">
      <div className="checkout-header">
        <div className="container">
          <h1 className="page-title">Checkout</h1>
          <p className="page-subtitle">Complete your order securely</p>
        </div>
      </div>

      <div className="checkout-content">
        <div className="container">
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="checkout-layout">
              {/* Customer Information */}
              <div className="checkout-section">
                <div className="section-header">
                  <h2>
                    <FaUser className="section-icon" />
                    Customer Information
                  </h2>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`form-input ${errors.name ? 'error' : ''}`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      placeholder="Enter your email"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`form-input ${errors.phone ? 'error' : ''}`}
                    placeholder="Enter your 10-digit phone number"
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
              </div>

              {/* Delivery Address */}
              <div className="checkout-section">
                <div className="section-header">
                  <h2>
                    <FaMapMarkerAlt className="section-icon" />
                    Delivery Address
                  </h2>
                </div>

                <div className="form-group">
                  <label className="form-label">Street Address *</label>
                  <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleInputChange}
                    className={`form-input ${errors['address.street'] ? 'error' : ''}`}
                    placeholder="Enter your street address"
                  />
                  {errors['address.street'] && <span className="error-message">{errors['address.street']}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">City *</label>
                    <input
                      type="text"
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleInputChange}
                      className={`form-input ${errors['address.city'] ? 'error' : ''}`}
                      placeholder="Enter your city"
                    />
                    {errors['address.city'] && <span className="error-message">{errors['address.city']}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">State *</label>
                    <input
                      type="text"
                      name="address.state"
                      value={formData.address.state}
                      onChange={handleInputChange}
                      className={`form-input ${errors['address.state'] ? 'error' : ''}`}
                      placeholder="Enter your state"
                    />
                    {errors['address.state'] && <span className="error-message">{errors['address.state']}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Pincode *</label>
                    <input
                      type="text"
                      name="address.pincode"
                      value={formData.address.pincode}
                      onChange={handleInputChange}
                      className={`form-input ${errors['address.pincode'] ? 'error' : ''}`}
                      placeholder="Enter 6-digit pincode"
                    />
                    {errors['address.pincode'] && <span className="error-message">{errors['address.pincode']}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Country</label>
                    <input
                      type="text"
                      name="address.country"
                      value={formData.address.country}
                      onChange={handleInputChange}
                      className="form-input"
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="checkout-section">
                <div className="section-header">
                  <h2>
                    <FaCreditCard className="section-icon" />
                    Payment Method
                  </h2>
                </div>

                <div className="payment-methods">
                  <div className="payment-option">
                    <input
                      type="radio"
                      id="cod"
                      name="paymentMethod"
                      value="COD"
                      checked={paymentMethod === 'COD'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label htmlFor="cod" className="payment-label">
                      <FaMoneyBillWave className="payment-icon" />
                      <div className="payment-info">
                        <div className="payment-name">Cash on Delivery</div>
                        <div className="payment-description">Pay when your order arrives</div>
                      </div>
                    </label>
                  </div>

                  <div className="payment-option">
                    <input
                      type="radio"
                      id="online"
                      name="paymentMethod"
                      value="Online"
                      checked={paymentMethod === 'Online'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label htmlFor="online" className="payment-label">
                      <FaCreditCard className="payment-icon" />
                      <div className="payment-info">
                        <div className="payment-name">Online Payment</div>
                        <div className="payment-description">Pay securely with Razorpay</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="order-summary">
              <div className="summary-header">
                <h3>Order Summary</h3>
              </div>

              <div className="summary-items">
                {items.map(item => (
                  <div key={item.product._id} className="summary-item">
                    <div className="item-info">
                      <div className="item-name">{item.product.name}</div>
                      <div className="item-quantity">Qty: {item.quantity}</div>
                    </div>
                    <div className="item-price">₹{item.product.price * item.quantity}</div>
                  </div>
                ))}
              </div>

              <div className="summary-totals">
                <div className="total-row">
                  <span>Subtotal:</span>
                  <span>₹{getTotalPrice()}</span>
                </div>
                <div className="total-row">
                  <span>Delivery:</span>
                  <span className="free">FREE</span>
                </div>
                <div className="total-row">
                  <span>Tax:</span>
                  <span>₹0</span>
                </div>
                <div className="total-row final">
                  <span>Total:</span>
                  <span>₹{getTotalPrice()}</span>
                </div>
              </div>

              <div className="summary-actions">
                <button
                  type="submit"
                  className="btn btn-primary btn-large"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="loading-spinner"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaLock />
                      Place Order
                    </>
                  )}
                </button>
              </div>

              <div className="security-note">
                <FaLock className="security-icon" />
                <span>Your payment information is secure and encrypted</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;




