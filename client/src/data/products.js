export const sampleProducts = [
  {
    _id: "1",
    name: "Masala Mathri",
    description: "Crispy and flavorful traditional mathri with aromatic spices. Perfect for tea time or as a snack.",
    price: 120,
    category: "Namkeen",
    weight: "250g",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    ingredients: ["Wheat flour", "Ghee", "Cumin seeds", "Coriander seeds", "Red chili powder", "Salt"],
    shelfLife: "45 days",
    origin: "Rajasthan"
  },
  {
    _id: "2",
    name: "Aloo Bhujia",
    description: "Thin, crispy potato noodles seasoned with traditional spices. A classic namkeen favorite.",
    price: 80,
    category: "Namkeen",
    weight: "200g",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
    rating: 4.3,
    reviewCount: 95,
    inStock: true,
    ingredients: ["Potato", "Besan", "Rice flour", "Turmeric", "Red chili powder", "Salt", "Oil"],
    shelfLife: "60 days",
    origin: "Gujarat"
  },
  {
    _id: "3",
    name: "Moong Dal Namkeen",
    description: "Crunchy moong dal pieces with a perfect blend of spices. High in protein and delicious.",
    price: 150,
    category: "Namkeen",
    weight: "300g",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
    rating: 4.7,
    reviewCount: 156,
    inStock: true,
    ingredients: ["Moong dal", "Oil", "Turmeric", "Red chili powder", "Cumin", "Salt"],
    shelfLife: "90 days",
    origin: "Punjab"
  },
  {
    _id: "4",
    name: "Kaju Katli",
    description: "Premium cashew fudge with silver leaf decoration. Rich, creamy, and melt-in-mouth texture.",
    price: 350,
    category: "Sweets",
    weight: "250g",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    rating: 4.8,
    reviewCount: 89,
    inStock: true,
    ingredients: ["Cashews", "Sugar", "Ghee", "Cardamom", "Silver leaf"],
    shelfLife: "30 days",
    origin: "Delhi"
  },
  {
    _id: "5",
    name: "Besan Ladoo",
    description: "Traditional gram flour ladoos with ghee and cardamom. Perfect for festivals and celebrations.",
    price: 180,
    category: "Sweets",
    weight: "500g",
    image: "https://images.unsplash.com/photo-1609501676725-7186f757a64d?w=400&h=300&fit=crop",
    rating: 4.4,
    reviewCount: 112,
    inStock: true,
    ingredients: ["Besan", "Ghee", "Sugar", "Cardamom", "Almonds"],
    shelfLife: "45 days",
    origin: "Uttar Pradesh"
  },
  {
    _id: "6",
    name: "Namak Para",
    description: "Crispy diamond-shaped snacks with a perfect balance of salt and spices. Great for munching.",
    price: 90,
    category: "Namkeen",
    weight: "200g",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    rating: 4.2,
    reviewCount: 67,
    inStock: true,
    ingredients: ["Wheat flour", "Oil", "Cumin seeds", "Ajwain", "Salt"],
    shelfLife: "60 days",
    origin: "Haryana"
  },
  {
    _id: "7",
    name: "Chana Chur",
    description: "Spicy mixture of fried gram, peanuts, and spices. A popular street food snack.",
    price: 110,
    category: "Snacks",
    weight: "250g",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
    rating: 4.6,
    reviewCount: 143,
    inStock: true,
    ingredients: ["Fried gram", "Peanuts", "Onion", "Green chili", "Coriander", "Lemon juice"],
    shelfLife: "30 days",
    origin: "Maharashtra"
  },
  {
    _id: "8",
    name: "Gulab Jamun",
    description: "Soft, spongy milk dumplings soaked in rose-flavored sugar syrup. A classic Indian dessert.",
    price: 200,
    category: "Sweets",
    weight: "400g",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop",
    rating: 4.9,
    reviewCount: 201,
    inStock: true,
    ingredients: ["Milk powder", "All-purpose flour", "Ghee", "Sugar", "Rose water", "Cardamom"],
    shelfLife: "7 days",
    origin: "West Bengal"
  },
  {
    _id: "9",
    name: "Coconut Biscuits",
    description: "Crunchy coconut-flavored biscuits perfect for tea time. Made with real coconut.",
    price: 75,
    category: "Biscuits",
    weight: "200g",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    rating: 4.1,
    reviewCount: 78,
    inStock: true,
    ingredients: ["Wheat flour", "Coconut", "Sugar", "Butter", "Baking powder", "Salt"],
    shelfLife: "90 days",
    origin: "Kerala"
  },
  {
    _id: "10",
    name: "Mixed Namkeen",
    description: "A delightful mix of various namkeen items including mathri, bhujia, and sev. Perfect variety pack.",
    price: 180,
    category: "Namkeen",
    weight: "500g",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
    rating: 4.5,
    reviewCount: 167,
    inStock: true,
    ingredients: ["Mixed namkeen", "Various spices", "Oil", "Salt"],
    shelfLife: "60 days",
    origin: "Rajasthan"
  }
];

export const categories = [
  { value: 'all', label: 'All Products' },
  { value: 'Namkeen', label: 'Namkeen' },
  { value: 'Sweets', label: 'Sweets' },
  { value: 'Snacks', label: 'Snacks' },
  { value: 'Biscuits', label: 'Biscuits' }
];

export const getProductsByCategory = (category) => {
  if (category === 'all') return sampleProducts;
  return sampleProducts.filter(product => product.category === category);
};

export const getProductById = (id) => {
  return sampleProducts.find(product => product._id === id);
};

export const getFeaturedProducts = () => {
  return sampleProducts.filter(product => product.rating >= 4.5).slice(0, 4);
};
