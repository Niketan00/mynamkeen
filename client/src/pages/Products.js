import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { sampleProducts, categories, getProductsByCategory } from '../data/products';
import { FaShoppingCart, FaStar, FaFilter, FaSearch } from 'react-icons/fa';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);
  
  const { addToCart } = useCart();


  const sortOptions = [
    { value: 'createdAt', label: 'Newest First' },
    { value: 'name', label: 'Name A-Z' },
    { value: 'price', label: 'Price Low to High' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  const fetchProducts = useCallback(() => {
    setLoading(true);
    try {
      // Simulate API delay
      setTimeout(() => {
        let filteredProducts = getProductsByCategory(selectedCategory);
        
        // Apply search filter
        if (searchTerm) {
          filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        
        // Apply sorting
        filteredProducts.sort((a, b) => {
          switch (sortBy) {
            case 'name':
              return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            case 'price':
              return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
            case 'rating':
              return sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating;
            default:
              return 0;
          }
        });
        
        setProducts(filteredProducts);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  }, [selectedCategory, searchTerm, sortBy, sortOrder]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    // You can add a toast notification here
    alert(`${product.name} added to cart!`);
  };

  const handleSortChange = (newSortBy) => {
    if (newSortBy === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };

  return (
    <div className="products">
      <div className="products-header">
        <div className="container">
          <h1 className="page-title">Our Products</h1>
          <p className="page-subtitle">
            Discover our wide range of authentic Indian snacks and namkeen
          </p>
        </div>
      </div>

      <div className="products-content">
        <div className="container">
          {/* Filters and Search */}
          <div className="products-controls">
            <div className="search-section">
              <div className="search-box">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            <div className="filters-section">
              <button
                className="filter-toggle"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FaFilter />
                Filters
              </button>

              {showFilters && (
                <div className="filters-panel">
                  <div className="filter-group">
                    <label>Category:</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="filter-select"
                    >
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="filter-group">
                    <label>Sort by:</label>
                    <select
                      value={sortBy}
                      onChange={(e) => handleSortChange(e.target.value)}
                      className="filter-select"
                    >
                      {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="loading">
              <div className="loading-spinner"></div>
              <p>Loading products...</p>
            </div>
          ) : (
            <>
              <div className="products-info">
                <p>
                  Showing {products.length} products
                </p>
              </div>

              {products.length === 0 ? (
                <div className="no-products">
                  <h3>No products found</h3>
                  <p>Try adjusting your search or filter criteria</p>
                </div>
              ) : (
                <div className="products-grid">
                  {products.map(product => (
                    <div key={product._id} className="product-card">
                      <div className="product-image">
                        <img src={product.image} alt={product.name} />
                        <div className="product-badge">
                          {product.category}
                        </div>
                      </div>
                      
                      <div className="product-info">
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-description">
                          {product.description.length > 100 
                            ? `${product.description.substring(0, 100)}...` 
                            : product.description
                          }
                        </p>
                        
                        <div className="product-rating">
                          {[...Array(5)].map((_, i) => (
                            <FaStar 
                              key={i} 
                              className={i < product.rating ? 'star filled' : 'star'} 
                            />
                          ))}
                          <span className="rating-text">({product.reviewCount})</span>
                        </div>

                        <div className="product-details">
                          <div className="product-weight">{product.weight}</div>
                          <div className="product-price">₹{product.price}</div>
                        </div>

                        <div className="product-actions">
                          <button
                            className="add-to-cart-btn"
                            onClick={() => handleAddToCart(product)}
                            disabled={!product.inStock}
                          >
                            <FaShoppingCart />
                            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                          </button>
                          <Link to={`/products/${product._id}`} className="btn btn-outline">
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;




