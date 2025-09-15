import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaStar, FaQuoteLeft, FaArrowRight } from 'react-icons/fa';
import { getFeaturedProducts } from '../data/products';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      try {
        // Simulate API delay
        setTimeout(() => {
          setFeaturedProducts(getFeaturedProducts());
          
          // Sample testimonials data
          setTestimonials([
            {
              _id: "1",
              customerName: "Priya Sharma",
              message: "The masala mathri is absolutely delicious! Just like my grandmother used to make. Will definitely order again.",
              rating: 5
            },
            {
              _id: "2", 
              customerName: "Rajesh Kumar",
              message: "Fast delivery and excellent quality. The kaju katli was fresh and tasted amazing. Highly recommended!",
              rating: 5
            },
            {
              _id: "3",
              customerName: "Sunita Patel",
              message: "Great variety of namkeen and sweets. The packaging was perfect and everything arrived fresh. Thank you!",
              rating: 4
            }
          ]);
          
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Authentic Indian <span className="highlight">Namkeen</span>
            </h1>
            <p className="hero-subtitle">
              Experience the rich flavors of traditional Indian snacks made with love and premium ingredients
            </p>
            <div className="hero-buttons">
              <Link to="/products" className="btn btn-primary">
                <FaShoppingCart className="btn-icon" />
                Shop Now
              </Link>
              <Link to="/about" className="btn btn-secondary">
                Learn More
                <FaArrowRight className="btn-icon" />
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-image-placeholder">
              <div className="namkeen-bowl">
                <div className="bowl"></div>
                <div className="snacks"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose MyNamkeen?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🌿</div>
              <h3>Fresh Ingredients</h3>
              <p>Made with the finest, freshest ingredients sourced from trusted suppliers</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏠</div>
              <h3>Traditional Recipes</h3>
              <p>Authentic recipes passed down through generations for authentic taste</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Quick and reliable delivery to your doorstep with proper packaging</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💯</div>
              <h3>Quality Assured</h3>
              <p>Rigorous quality checks ensure you get the best products every time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          {loading ? (
            <div className="loading">Loading products...</div>
          ) : (
            <div className="products-grid">
              {featuredProducts.map(product => (
                <div key={product._id} className="product-card">
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-rating">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={i < product.rating ? 'star filled' : 'star'} 
                        />
                      ))}
                      <span className="rating-text">({product.reviewCount})</span>
                    </div>
                    <div className="product-price">₹{product.price}</div>
                    <Link to={`/products/${product._id}`} className="btn btn-outline">
                      View Product
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="section-footer">
            <Link to="/products" className="btn btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="testimonials-grid">
            {testimonials.map(testimonial => (
              <div key={testimonial._id} className="testimonial-card">
                <FaQuoteLeft className="quote-icon" />
                <p className="testimonial-text">{testimonial.message}</p>
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={i < testimonial.rating ? 'star filled' : 'star'} 
                    />
                  ))}
                </div>
                <div className="testimonial-author">
                  <strong>{testimonial.customerName}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Taste the Difference?</h2>
            <p>Join thousands of satisfied customers who trust MyNamkeen for their snack needs</p>
            <Link to="/products" className="btn btn-primary btn-large">
              Start Shopping Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;






