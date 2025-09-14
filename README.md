# MyNamkeen - Authentic Indian Snacks E-commerce Website

A full-stack web application for a Namkeen (Indian snacks) business built with React.js, Node.js, Express, and MongoDB. The website features a modern, responsive design with complete e-commerce functionality.

## 🚀 Features

### Frontend (React.js)
- **Home Page**: Attractive banner with product showcase and business introduction
- **About Us**: Business story, vision, mission, and quality standards
- **Products Page**: Complete product catalog with search, filtering, and cart functionality
- **Shopping Cart**: Add/remove items, quantity controls, and total calculation
- **Checkout**: Customer information form with payment options
- **Contact Page**: Contact form, business information, and WhatsApp integration
- **Order Confirmation**: Detailed order summary and tracking information
- **Responsive Design**: Mobile-first approach with modern UI/UX

### Backend (Node.js + Express)
- **RESTful API**: Complete API endpoints for all functionality
- **MongoDB Integration**: Mongoose ODM for database operations
- **Payment Integration**: Razorpay payment gateway with COD option
- **Order Management**: Complete order processing and tracking
- **Contact Management**: Contact form submissions and management
- **Testimonials**: Customer review system

### Database (MongoDB)
- **Products Collection**: Product information, pricing, and inventory
- **Orders Collection**: Customer orders, payment status, and delivery tracking
- **Testimonials Collection**: Customer reviews and ratings
- **Contact Collection**: Contact form submissions

## 🛠️ Technology Stack

### Frontend
- React.js 19.1.1
- React Router DOM
- Axios for API calls
- React Icons
- CSS3 with modern features

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Razorpay for payments
- CORS for cross-origin requests
- Dotenv for environment variables

## 📁 Project Structure

```
mynamkeen/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context (Cart)
│   │   ├── utils/         # Utility functions
│   │   └── assets/        # Static assets
│   └── package.json
├── server/                # Node.js backend
│   ├── controllers/       # Route controllers
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── server.js         # Main server file
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mynamkeen
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the server directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/mynamkeen
   JWT_SECRET=your_jwt_secret_key_here
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   PORT=5000
   ```

5. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd server
   npm run dev
   ```
   The server will start on `http://localhost:5000`

2. **Start the Frontend Development Server**
   ```bash
   cd client
   npm start
   ```
   The frontend will start on `http://localhost:3000`

3. **Access the Application**
   Open your browser and navigate to `http://localhost:3000`

## 🔧 Available Scripts

### Frontend (Client)
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

### Backend (Server)
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## 📊 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders/verify-payment` - Verify payment
- `PUT /api/orders/:id/status` - Update order status (Admin)

### Cart
- `POST /api/cart/validate` - Validate cart items

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact messages (Admin)
- `PUT /api/contact/:id/read` - Mark contact as read (Admin)

### Testimonials
- `GET /api/testimonials` - Get approved testimonials
- `POST /api/testimonials` - Submit testimonial
- `GET /api/testimonials/all` - Get all testimonials (Admin)
- `PUT /api/testimonials/:id/approve` - Approve testimonial (Admin)
- `DELETE /api/testimonials/:id` - Delete testimonial (Admin)

## 🎨 Features Overview

### E-commerce Functionality
- Product catalog with search and filtering
- Shopping cart with persistent storage
- Secure checkout process
- Order tracking and confirmation
- Payment integration (Razorpay + COD)

### User Experience
- Responsive design for all devices
- Modern and intuitive UI
- Fast loading and smooth animations
- Error handling and loading states
- Form validation and feedback

### Business Features
- Contact form with WhatsApp integration
- Customer testimonials system
- Business information and hours
- Social media integration
- SEO optimization ready

## 🔒 Security Features

- Input validation and sanitization
- CORS configuration
- Environment variable protection
- Secure payment processing
- Error handling without sensitive data exposure

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🚀 Deployment

### Frontend Deployment
1. Build the React app:
   ```bash
   cd client
   npm run build
   ```

2. Deploy the `build` folder to your hosting service (Netlify, Vercel, etc.)

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Deploy to services like Heroku, DigitalOcean, or AWS
3. Ensure MongoDB connection is configured

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 📞 Support

For support, email support@mynamkeen.com or contact us through the website.

## 🙏 Acknowledgments

- React.js community for excellent documentation
- MongoDB for robust database solutions
- Razorpay for payment gateway integration
- All open-source contributors

---

**Built with ❤️ for authentic Indian snacks lovers**