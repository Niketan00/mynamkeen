# MyNamkeen Setup Guide

## Quick Setup Instructions

### 1. Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Git

### 2. Installation Steps

```bash
# Clone the repository
git clone <your-repo-url>
cd mynamkeen

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

### 3. Environment Configuration

Create a `.env` file in the `server` directory:

```env
MONGODB_URI=mongodb://localhost:27017/mynamkeen
JWT_SECRET=your_jwt_secret_key_here
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
PORT=5000
```

### 4. Database Setup

```bash
# Start MongoDB (if using local)
mongod

# Seed the database with sample data
cd server
npm run seed
```

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

### 6. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Production Deployment

### Frontend (Netlify/Vercel)
```bash
cd client
npm run build
# Deploy the 'build' folder
```

### Backend (Heroku/DigitalOcean)
```bash
cd server
# Deploy with environment variables configured
```

## Features Included

✅ Complete E-commerce functionality
✅ Responsive design
✅ Payment integration (Razorpay + COD)
✅ Order management
✅ Contact form
✅ Customer testimonials
✅ SEO optimization
✅ PWA support
✅ Sample data included

## Support

For any issues or questions, please refer to the main README.md file or contact support.






