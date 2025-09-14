import React, { useState } from 'react';
import { contactAPI } from '../utils/api';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp, FaPaperPlane } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

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

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
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
      const response = await contactAPI.submit(formData);
      
      if (response.data.success) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="contact">
        <div className="contact-header">
          <div className="container">
            <h1 className="page-title">Contact Us</h1>
          </div>
        </div>
        
        <div className="success-message">
          <div className="container">
            <div className="success-content">
              <div className="success-icon">✓</div>
              <h2>Message Sent Successfully!</h2>
              <p>Thank you for contacting us. We will get back to you within 24 hours.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="btn btn-primary"
              >
                Send Another Message
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact">
      <div className="contact-header">
        <div className="container">
          <h1 className="page-title">Contact Us</h1>
          <p className="page-subtitle">We'd love to hear from you. Send us a message!</p>
        </div>
      </div>

      <div className="contact-content">
        <div className="container">
          <div className="contact-layout">
            {/* Contact Form */}
            <div className="contact-form-section">
              <div className="form-card">
                <h2>Send us a Message</h2>
                <form onSubmit={handleSubmit} className="contact-form">
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

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`form-input ${errors.phone ? 'error' : ''}`}
                        placeholder="Enter your phone number"
                      />
                      {errors.phone && <span className="error-message">{errors.phone}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Subject *</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className={`form-input ${errors.subject ? 'error' : ''}`}
                        placeholder="Enter message subject"
                      />
                      {errors.subject && <span className="error-message">{errors.subject}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`form-textarea ${errors.message ? 'error' : ''}`}
                      placeholder="Enter your message here..."
                      rows="5"
                    />
                    {errors.message && <span className="error-message">{errors.message}</span>}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-large"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="loading-spinner"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="contact-info-section">
              <div className="info-card">
                <h2>Get in Touch</h2>
                <p>We're here to help and answer any question you might have. We look forward to hearing from you!</p>

                <div className="contact-methods">
                  <div className="contact-method">
                    <div className="method-icon">
                      <FaPhone />
                    </div>
                    <div className="method-info">
                      <h4>Phone</h4>
                      <p>+91 12345 67890</p>
                      <p>+91 98765 43210</p>
                    </div>
                  </div>

                  <div className="contact-method">
                    <div className="method-icon">
                      <FaEnvelope />
                    </div>
                    <div className="method-info">
                      <h4>Email</h4>
                      <p>info@mynamkeen.com</p>
                      <p>support@mynamkeen.com</p>
                    </div>
                  </div>

                  <div className="contact-method">
                    <div className="method-icon">
                      <FaMapMarkerAlt />
                    </div>
                    <div className="method-info">
                      <h4>Address</h4>
                      <p>123 Namkeen Street</p>
                      <p>City, State 123456</p>
                      <p>India</p>
                    </div>
                  </div>

                  <div className="contact-method">
                    <div className="method-icon">
                      <FaClock />
                    </div>
                    <div className="method-info">
                      <h4>Business Hours</h4>
                      <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                      <p>Saturday: 9:00 AM - 6:00 PM</p>
                      <p>Sunday: 10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="whatsapp-section">
                  <h3>Quick Contact via WhatsApp</h3>
                  <p>For immediate assistance, message us on WhatsApp</p>
                  <a
                    href="https://wa.me/1234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-btn"
                  >
                    <FaWhatsapp />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="map-section">
            <h2>Find Us</h2>
            <div className="map-container">
              <div className="map-placeholder">
                <div className="map-content">
                  <FaMapMarkerAlt className="map-icon" />
                  <h3>Our Location</h3>
                  <p>123 Namkeen Street, City, State 123456, India</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;




