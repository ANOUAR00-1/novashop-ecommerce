# NovaShop Backend API

RESTful API backend for NovaShop e-commerce platform built with Node.js, Express, and PostgreSQL.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+

### Installation

1. **Install dependencies**
```bash
npm install
```

2. **Setup environment variables**
```bash
cp .env.example .env
```

Edit `.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=novashop
DB_USER=postgres
DB_PASSWORD=your_password

PORT=5000
NODE_ENV=development

JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

API_VERSION=v1
CLIENT_URL=http://localhost:5173
```

3. **Setup database**
```bash
# Create database
createdb novashop

# Run schema
psql -U postgres -d novashop -f database/schema.sql

# Run migrations
psql -U postgres -d novashop -f database/migrations/add-product-types.sql

# Seed data (optional)
psql -U postgres -d novashop -f database/seed.sql

# Create admin user
node create-admin.js
```

4. **Start server**
```bash
# Development
npm run dev

# Production
npm start
```

Server runs at: http://localhost:5000

## 📚 API Endpoints

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication
- `POST /auth/register` - Register user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create product (admin)
- `PUT /products/:id` - Update product (admin)
- `DELETE /products/:id` - Delete product (admin)

### Categories
- `GET /categories` - Get all categories
- `GET /categories/:id` - Get category by ID
- `POST /categories` - Create category (admin)

### Orders
- `GET /orders` - Get user orders
- `POST /orders` - Create order
- `PUT /orders/:id/status` - Update status (admin)

### Upload
- `POST /upload/image` - Upload image (admin)
- `POST /upload/images` - Upload multiple images (admin)

### Analytics
- `GET /analytics/dashboard` - Dashboard stats (admin)

## 🔐 Authentication

All protected routes require JWT token in header:
```
Authorization: Bearer <token>
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/      # Route handlers
│   ├── models/          # Sequelize models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth, upload, errors
│   └── app.js           # Express app
├── database/
│   ├── schema.sql       # Database schema
│   ├── migrations/      # SQL migrations
│   └── seed.sql         # Sample data
├── uploads/             # Uploaded files
├── .env                 # Environment variables
└── server.js            # Entry point
```

## 🛠️ Tech Stack

- **Node.js** - Runtime
- **Express** - Web framework
- **PostgreSQL** - Database
- **Sequelize** - ORM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads
- **Helmet** - Security
- **CORS** - Cross-origin

## 🔧 Useful Scripts

```bash
# Development with auto-restart
npm run dev

# Production
npm start

# Create admin user
node create-admin.js

# Check products
node check-products.js

# Fix product categories
node fix-product-categories.js
```

## 🔑 Default Admin

```
Email: admin@novashop.com
Password: admin123
```

## 📊 Database Schema

Main tables:
- `users` - User accounts
- `products` - Product catalog
- `categories` - Product categories
- `orders` - Customer orders
- `order_items` - Order line items
- `reviews` - Product reviews
- `coupons` - Discount codes

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check PostgreSQL is running
pg_isready

# Test connection
psql -U postgres -d novashop
```

### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000
```

## 📄 License

MIT License
