import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { productsAPI } from '../utils/api';
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

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'Namkeen', label: 'Namkeen' },
    { value: 'Sweets', label: 'Sweets' },
    { value: 'Snacks', label: 'Snacks' },
    { value: 'Biscuits', label: 'Biscuits' },
    { value: 'Other', label: 'Other' }
  ];

  const sortOptions = [
    { value: 'createdAt', label: 'Newest First' },
    { value: 'name', label: 'Name A-Z' },
    { value: 'price', label: 'Price Low to High' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  useEffect(() => {
    fetchProducts();
  }, [sortBy, sortOrder]);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, selectedCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getAll({
        category: selectedCategory === 'all' ? undefined : selectedCategory,
        search: searchTerm || undefined,
        sortBy,
        sortOrder
      });
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  };

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
                  Showing {filteredProducts.length} of {products.length} products
                </p>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="no-products">
                  <h3>No products found</h3>
                  <p>Try adjusting your search or filter criteria</p>
                </div>
              ) : (
                <div className="products-grid">
                  {filteredProducts.map(product => (
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

                        <button
                          className="add-to-cart-btn"
                          onClick={() => handleAddToCart(product)}
                          disabled={!product.inStock}
                        >
                          <FaShoppingCart />
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
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




