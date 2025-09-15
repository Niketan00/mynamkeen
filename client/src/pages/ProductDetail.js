import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getProductById } from '../data/products';
import { FaShoppingCart, FaStar, FaArrowLeft, FaHeart, FaShare } from 'react-icons/fa';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = () => {
      setLoading(true);
      setTimeout(() => {
        const foundProduct = getProductById(id);
        if (foundProduct) {
          setProduct(foundProduct);
          setSelectedImage(0);
        } else {
          navigate('/products');
        }
        setLoading(false);
      }, 500);
    };

    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      alert(`${product.name} (${quantity} ${quantity > 1 ? 'items' : 'item'}) added to cart!`);
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="product-detail">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail">
        <div className="error-container">
          <h2>Product Not Found</h2>
          <p>The product you're looking for doesn't exist.</p>
          <Link to="/products" className="btn btn-primary">
            <FaArrowLeft className="btn-icon" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <div className="product-detail-header">
        <div className="container">
          <Link to="/products" className="back-link">
            <FaArrowLeft className="back-icon" />
            Back to Products
          </Link>
        </div>
      </div>

      <div className="product-detail-content">
        <div className="container">
          <div className="product-detail-layout">
            {/* Product Images */}
            <div className="product-images">
              <div className="main-image">
                <img src={product.image} alt={product.name} />
                <div className="product-badge">
                  {product.category}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="product-info">
              <div className="product-header">
                <h1 className="product-title">{product.name}</h1>
                <div className="product-rating">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={i < Math.floor(product.rating) ? 'star filled' : 'star'} 
                    />
                  ))}
                  <span className="rating-text">({product.reviewCount} reviews)</span>
                </div>
              </div>

              <div className="product-price">
                <span className="current-price">₹{product.price}</span>
                <span className="weight">per {product.weight}</span>
              </div>

              <div className="product-description">
                <p>{product.description}</p>
              </div>

              {/* Product Details */}
              <div className="product-details">
                <div className="detail-item">
                  <span className="detail-label">Weight:</span>
                  <span className="detail-value">{product.weight}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Shelf Life:</span>
                  <span className="detail-value">{product.shelfLife}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Origin:</span>
                  <span className="detail-value">{product.origin}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Availability:</span>
                  <span className={`detail-value ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Ingredients */}
              <div className="ingredients">
                <h3>Ingredients</h3>
                <div className="ingredients-list">
                  {product.ingredients.map((ingredient, index) => (
                    <span key={index} className="ingredient-tag">
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="product-actions">
                <div className="quantity-selector">
                  <label>Quantity:</label>
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn" 
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity-value">{quantity}</span>
                    <button 
                      className="quantity-btn" 
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= 10}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="action-buttons">
                  <button 
                    className="btn btn-primary btn-large"
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                  >
                    <FaShoppingCart className="btn-icon" />
                    Add to Cart
                  </button>
                  
                  <button className="btn btn-outline">
                    <FaHeart className="btn-icon" />
                    Wishlist
                  </button>
                  
                  <button className="btn btn-outline">
                    <FaShare className="btn-icon" />
                    Share
                  </button>
                </div>
              </div>

              {/* Total Price */}
              <div className="total-price">
                <span className="total-label">Total:</span>
                <span className="total-value">₹{product.price * quantity}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
