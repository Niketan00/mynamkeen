import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ordersAPI } from '../utils/api';
import { FaCheckCircle, FaShoppingBag, FaHome, FaPhone, FaEnvelope } from 'react-icons/fa';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const orderId = searchParams.get('orderId');

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    } else {
      setError('No order ID provided');
      setLoading(false);
    }
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const response = await ordersAPI.getById(orderId);
      if (response.data.success) {
        setOrder(response.data.data);
      } else {
        setError('Order not found');
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      setError('Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="order-confirmation">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="order-confirmation">
        <div className="error-container">
          <h2>Order Not Found</h2>
          <p>{error || 'The order you are looking for could not be found.'}</p>
          <Link to="/" className="btn btn-primary">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="order-confirmation">
      <div className="confirmation-header">
        <div className="container">
          <div className="success-icon">
            <FaCheckCircle />
          </div>
          <h1 className="page-title">Order Confirmed!</h1>
          <p className="page-subtitle">
            Thank you for your order. We've received your order and will process it shortly.
          </p>
        </div>
      </div>

      <div className="confirmation-content">
        <div className="container">
          <div className="confirmation-layout">
            {/* Order Details */}
            <div className="order-details">
              <div className="details-card">
                <h2>Order Details</h2>
                
                <div className="order-info">
                  <div className="info-row">
                    <span className="label">Order ID:</span>
                    <span className="value">{order.orderId}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Order Date:</span>
                    <span className="value">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="label">Payment Method:</span>
                    <span className="value">{order.paymentMethod}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Payment Status:</span>
                    <span className={`value status ${order.paymentStatus.toLowerCase()}`}>
                      {order.paymentStatus}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="label">Order Status:</span>
                    <span className={`value status ${order.orderStatus.toLowerCase()}`}>
                      {order.orderStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="details-card">
                <h2>Customer Information</h2>
                
                <div className="customer-info">
                  <div className="info-row">
                    <span className="label">Name:</span>
                    <span className="value">{order.customer.name}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Email:</span>
                    <span className="value">{order.customer.email}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Phone:</span>
                    <span className="value">{order.customer.phone}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Address:</span>
                    <span className="value">
                      {order.customer.address.street}, {order.customer.address.city}, 
                      {order.customer.address.state} - {order.customer.address.pincode}, 
                      {order.customer.address.country}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="details-card">
                <h2>Order Items</h2>
                
                <div className="order-items">
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <div className="item-image">
                        <img src={item.product.image} alt={item.product.name} />
                      </div>
                      <div className="item-details">
                        <h4 className="item-name">{item.product.name}</h4>
                        <div className="item-meta">
                          <span className="item-quantity">Qty: {item.quantity}</span>
                          <span className="item-price">₹{item.price} each</span>
                        </div>
                      </div>
                      <div className="item-total">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-total">
                  <div className="total-row">
                    <span>Subtotal:</span>
                    <span>₹{order.totalAmount}</span>
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
                    <span>₹{order.totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="next-steps">
              <div className="steps-card">
                <h2>What's Next?</h2>
                
                <div className="steps-list">
                  <div className="step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h4>Order Confirmation</h4>
                      <p>We've received your order and will start processing it.</p>
                    </div>
                  </div>
                  
                  <div className="step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h4>Preparation</h4>
                      <p>Our team will prepare your order with care and quality.</p>
                    </div>
                  </div>
                  
                  <div className="step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h4>Delivery</h4>
                      <p>Your order will be delivered to your address within 2-3 business days.</p>
                    </div>
                  </div>
                </div>

                <div className="contact-support">
                  <h3>Need Help?</h3>
                  <p>If you have any questions about your order, feel free to contact us:</p>
                  
                  <div className="support-methods">
                    <a href="tel:+911234567890" className="support-method">
                      <FaPhone />
                      <span>+91 12345 67890</span>
                    </a>
                    <a href="mailto:support@mynamkeen.com" className="support-method">
                      <FaEnvelope />
                      <span>support@mynamkeen.com</span>
                    </a>
                  </div>
                </div>

                <div className="action-buttons">
                  <Link to="/products" className="btn btn-primary">
                    <FaShoppingBag />
                    Continue Shopping
                  </Link>
                  <Link to="/" className="btn btn-outline">
                    <FaHome />
                    Go to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;




