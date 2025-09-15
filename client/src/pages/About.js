import React from 'react';
import { FaHeart, FaAward, FaUsers, FaLeaf, FaClock, FaShieldAlt } from 'react-icons/fa';
import './About.css';

const About = () => {
  return (
    <div className="about">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">About MyNamkeen</h1>
            <p className="hero-subtitle">
              Crafting authentic Indian snacks with love, tradition, and uncompromising quality
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                MyNamkeen was born from a simple yet powerful vision - to bring the authentic taste 
                of traditional Indian snacks to every household. Founded in 2020, we started as a 
                small family business with recipes passed down through generations.
              </p>
              <p>
                What began as a passion project in our kitchen has grown into a trusted brand that 
                serves thousands of customers across the country. We believe that every bite should 
                tell a story of tradition, quality, and love.
              </p>
              <p>
                Today, we continue to honor our roots while embracing modern techniques to ensure 
                that every product meets the highest standards of quality and freshness.
              </p>
            </div>
            <div className="story-image">
              <div className="image-placeholder">
                <div className="traditional-kitchen">
                  <div className="stove"></div>
                  <div className="pots"></div>
                  <div className="spices"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="container">
          <div className="mv-grid">
            <div className="mv-card">
              <div className="mv-icon">
                <FaHeart />
              </div>
              <h3>Our Mission</h3>
              <p>
                To preserve and share the rich culinary heritage of India by creating authentic, 
                high-quality namkeen and snacks that bring families together and create lasting memories.
              </p>
            </div>
            <div className="mv-card">
              <div className="mv-icon">
                <FaAward />
              </div>
              <h3>Our Vision</h3>
              <p>
                To become the most trusted and beloved brand for authentic Indian snacks, 
                recognized globally for our commitment to quality, tradition, and customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title">Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <FaLeaf className="value-icon" />
              <h4>Quality First</h4>
              <p>We use only the finest ingredients and maintain strict quality control at every step of production.</p>
            </div>
            <div className="value-card">
              <FaClock className="value-icon" />
              <h4>Tradition</h4>
              <p>Our recipes are time-tested, passed down through generations to preserve authentic flavors.</p>
            </div>
            <div className="value-card">
              <FaUsers className="value-icon" />
              <h4>Customer Focus</h4>
              <p>Your satisfaction is our priority. We listen, learn, and continuously improve based on your feedback.</p>
            </div>
            <div className="value-card">
              <FaShieldAlt className="value-icon" />
              <h4>Trust & Transparency</h4>
              <p>We maintain complete transparency in our processes and ingredients, building trust through honesty.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="quality-section">
        <div className="container">
          <div className="quality-content">
            <div className="quality-text">
              <h2>Quality Standards</h2>
              <p>
                At MyNamkeen, quality is not just a goal - it's our foundation. We maintain the 
                highest standards throughout our entire production process.
              </p>
              <ul className="quality-list">
                <li>Fresh ingredients sourced from trusted suppliers</li>
                <li>Hygienic production facilities with regular inspections</li>
                <li>Rigorous quality testing at every stage</li>
                <li>Proper packaging to maintain freshness</li>
                <li>Cold chain storage and transportation</li>
                <li>Regular staff training on quality protocols</li>
              </ul>
            </div>
            <div className="quality-image">
              <div className="image-placeholder">
                <div className="quality-badge">
                  <div className="badge-circle">
                    <FaAward />
                  </div>
                  <div className="badge-text">Quality Assured</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title">Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-card">
              <div className="team-avatar">
                <div className="avatar-placeholder">👨‍🍳</div>
              </div>
              <h4>Rajesh Kumar</h4>
              <p className="team-role">Master Chef & Founder</p>
              <p className="team-bio">
                With over 20 years of experience in traditional Indian cooking, 
                Rajesh brings authentic recipes and culinary expertise to every product.
              </p>
            </div>
            <div className="team-card">
              <div className="team-avatar">
                <div className="avatar-placeholder">👩‍💼</div>
              </div>
              <h4>Priya Sharma</h4>
              <p className="team-role">Quality Manager</p>
              <p className="team-bio">
                Priya ensures that every product meets our strict quality standards 
                and maintains consistency across all our offerings.
              </p>
            </div>
            <div className="team-card">
              <div className="team-avatar">
                <div className="avatar-placeholder">👨‍💻</div>
              </div>
              <h4>Amit Patel</h4>
              <p className="team-role">Operations Head</p>
              <p className="team-bio">
                Amit oversees our production processes and ensures efficient 
                operations while maintaining the highest quality standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Experience the MyNamkeen Difference</h2>
            <p>Join thousands of satisfied customers who trust us for authentic Indian snacks</p>
            <div className="cta-buttons">
              <a href="/products" className="btn btn-primary">Shop Now</a>
              <a href="/contact" className="btn btn-secondary">Get in Touch</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;






