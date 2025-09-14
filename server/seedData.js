const mongoose = require('mongoose');
const Product = require('./models/Product');
const Testimonial = require('./models/Testimonial');

// Sample products data
const sampleProducts = [
  {
    name: "Masala Peanuts",
    description: "Crispy and spicy peanuts with a perfect blend of Indian spices. A perfect snack for any time of the day.",
    price: 120,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
    category: "Namkeen",
    weight: "200g",
    ingredients: ["Peanuts", "Salt", "Red Chili Powder", "Turmeric", "Oil"],
    nutritionalInfo: {
      calories: 567,
      protein: 25.8,
      carbs: 16.1,
      fat: 49.2
    },
    rating: 4.5,
    reviewCount: 23,
    inStock: true
  },
  {
    name: "Namkeen Mix",
    description: "A delightful mix of various namkeen items including sev, chana, and peanuts. Perfect for parties and gatherings.",
    price: 180,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
    category: "Namkeen",
    weight: "300g",
    ingredients: ["Sev", "Chana", "Peanuts", "Cashews", "Spices"],
    nutritionalInfo: {
      calories: 520,
      protein: 18.5,
      carbs: 45.2,
      fat: 32.1
    },
    rating: 4.3,
    reviewCount: 18,
    inStock: true
  },
  {
    name: "Gujarati Fafda",
    description: "Traditional Gujarati fafda made with gram flour and spices. Crispy and delicious snack from Gujarat.",
    price: 150,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
    category: "Namkeen",
    weight: "250g",
    ingredients: ["Gram Flour", "Oil", "Salt", "Turmeric", "Asafoetida"],
    nutritionalInfo: {
      calories: 480,
      protein: 15.2,
      carbs: 65.8,
      fat: 18.5
    },
    rating: 4.7,
    reviewCount: 31,
    inStock: true
  },
  {
    name: "Mathri",
    description: "Crispy and flaky mathri made with refined flour and spices. A popular North Indian snack.",
    price: 100,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
    category: "Namkeen",
    weight: "200g",
    ingredients: ["Refined Flour", "Oil", "Salt", "Cumin Seeds", "Ajwain"],
    nutritionalInfo: {
      calories: 520,
      protein: 8.5,
      carbs: 58.2,
      fat: 28.9
    },
    rating: 4.2,
    reviewCount: 15,
    inStock: true
  },
  {
    name: "Kaju Katli",
    description: "Premium cashew fudge made with pure cashews and sugar. A luxurious sweet treat for special occasions.",
    price: 350,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
    category: "Sweets",
    weight: "250g",
    ingredients: ["Cashews", "Sugar", "Ghee", "Cardamom", "Saffron"],
    nutritionalInfo: {
      calories: 450,
      protein: 12.5,
      carbs: 35.8,
      fat: 32.1
    },
    rating: 4.8,
    reviewCount: 42,
    inStock: true
  },
  {
    name: "Besan Ladoo",
    description: "Traditional besan ladoo made with gram flour, ghee, and sugar. A classic Indian sweet.",
    price: 200,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
    category: "Sweets",
    weight: "300g",
    ingredients: ["Gram Flour", "Ghee", "Sugar", "Cardamom", "Almonds"],
    nutritionalInfo: {
      calories: 480,
      protein: 15.2,
      carbs: 45.8,
      fat: 28.5
    },
    rating: 4.4,
    reviewCount: 28,
    inStock: true
  },
  {
    name: "Coconut Barfi",
    description: "Soft and delicious coconut barfi made with fresh coconut and condensed milk.",
    price: 180,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
    category: "Sweets",
    weight: "250g",
    ingredients: ["Coconut", "Condensed Milk", "Sugar", "Ghee", "Cardamom"],
    nutritionalInfo: {
      calories: 420,
      protein: 8.5,
      carbs: 52.1,
      fat: 22.8
    },
    rating: 4.6,
    reviewCount: 35,
    inStock: true
  },
  {
    name: "Cream Biscuits",
    description: "Delicious cream-filled biscuits perfect for tea time. Available in vanilla and chocolate flavors.",
    price: 80,
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400",
    category: "Biscuits",
    weight: "150g",
    ingredients: ["Flour", "Sugar", "Butter", "Vanilla", "Cream"],
    nutritionalInfo: {
      calories: 480,
      protein: 6.5,
      carbs: 68.2,
      fat: 18.9
    },
    rating: 4.1,
    reviewCount: 22,
    inStock: true
  }
];

// Sample testimonials data
const sampleTestimonials = [
  {
    customerName: "Priya Sharma",
    message: "The masala peanuts are absolutely delicious! Perfect blend of spices and great quality. Will definitely order again.",
    rating: 5,
    isApproved: true,
    customerEmail: "priya.sharma@email.com"
  },
  {
    customerName: "Rajesh Kumar",
    message: "Excellent service and fast delivery. The namkeen mix was fresh and tasty. Highly recommended!",
    rating: 5,
    isApproved: true,
    customerEmail: "rajesh.kumar@email.com"
  },
  {
    customerName: "Anita Patel",
    message: "The Gujarati fafda brought back childhood memories. Authentic taste and great packaging. Thank you!",
    rating: 4,
    isApproved: true,
    customerEmail: "anita.patel@email.com"
  },
  {
    customerName: "Vikram Singh",
    message: "Quality products and reasonable prices. The mathri was crispy and perfectly spiced. Will be a regular customer.",
    rating: 4,
    isApproved: true,
    customerEmail: "vikram.singh@email.com"
  },
  {
    customerName: "Sunita Reddy",
    message: "The kaju katli was simply amazing! Premium quality and authentic taste. Perfect for gifting.",
    rating: 5,
    isApproved: true,
    customerEmail: "sunita.reddy@email.com"
  }
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mynamkeen');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await Testimonial.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log('Inserted sample products');

    // Insert sample testimonials
    await Testimonial.insertMany(sampleTestimonials);
    console.log('Inserted sample testimonials');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function if this file is executed directly
if (require.main === module) {
  require('dotenv').config();
  seedDatabase();
}

module.exports = { seedDatabase, sampleProducts, sampleTestimonials };




