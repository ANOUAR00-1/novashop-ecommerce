# NovaShop - Modern eCommerce Platform

A complete, production-ready eCommerce web application built with React, TypeScript, Redux Toolkit, and Tailwind CSS.

## 🚀 Features

### Customer Features
- **Product Browsing**
  - Grid and list view options
  - Advanced filtering (category, price range, rating, stock)
  - Search with live suggestions
  - Sorting options (price, rating, newest)
  - Pagination support

- **Product Details**
  - Image gallery
  - Product variants (size, color)
  - Customer reviews and ratings
  - Stock availability
  - Related products

- **Shopping Cart**
  - Persistent cart (localStorage)
  - Quantity management
  - Real-time total calculation
  - Shipping cost calculation

- **Checkout**
  - Multi-step checkout process
  - Shipping information form
  - Multiple payment methods (mock)
  - Order confirmation

- **User Account**
  - User registration and login
  - Profile management
  - Order history
  - Wishlist functionality
  - Password recovery

### Admin Features
- **Dashboard**
  - Revenue analytics
  - Sales charts
  - Top products
  - Customer growth metrics

- **Product Management**
  - View all products
  - Add/Edit/Delete products
  - Stock management
  - Category management

- **Order Management**
  - View all orders
  - Order status tracking
  - Customer details

- **User Management**
  - View all users
  - Role-based access control

- **Coupons & Promotions**
  - Discount codes
  - Usage tracking

- **Analytics**
  - Sales trends
  - Revenue breakdown
  - Category performance

### Additional Features
- **Dark/Light Mode** - Toggle between themes
- **Responsive Design** - Mobile, tablet, and desktop optimized
- **Toast Notifications** - User feedback for actions
- **Error Boundaries** - Graceful error handling
- **Loading States** - Skeleton screens and spinners
- **Protected Routes** - Authentication-based access
- **Role-based Authorization** - Admin vs. User access

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **React Router DOM** - Navigation
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons
- **Recharts** - Charts and analytics
- **Sonner** - Toast notifications

### Architecture
- **Redux Slices** - Modular state management
- **Context API** - Auth and theme management
- **Custom Hooks** - Reusable logic
- **Mock API Layer** - Simulated backend

## 📁 Project Structure

```
/
├── components/
│   ├── layout/
│   │   ├── Header.tsx           # Main navigation
│   │   ├── Footer.tsx           # Footer links
│   │   ├── SearchBar.tsx        # Search with suggestions
│   │   └── MobileMenu.tsx       # Mobile navigation
│   ├── products/
│   │   ├── ProductCard.tsx      # Product grid item
│   │   ├── ProductListItem.tsx  # Product list item
│   │   └── FilterSidebar.tsx    # Filters sidebar
│   ├── ui/                      # shadcn/ui components
│   ├── ErrorBoundary.tsx        # Error handling
│   ├── ProtectedRoute.tsx       # Auth guard
│   └── Pagination.tsx           # Pagination component
├── pages/
│   ├── HomePage.tsx             # Landing page
│   ├── ProductsPage.tsx         # Product catalog
│   ├── ProductDetailPage.tsx    # Single product
│   ├── CartPage.tsx             # Shopping cart
│   ├── CheckoutPage.tsx         # Checkout flow
│   ├── OrderConfirmationPage.tsx
│   ├── auth/
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── ForgotPasswordPage.tsx
│   ├── user/
│   │   ├── ProfilePage.tsx
│   │   ├── OrdersPage.tsx
│   │   └── WishlistPage.tsx
│   ├── admin/
│   │   ├── AdminDashboard.tsx
│   │   ├── AdminProducts.tsx
│   │   ├── AdminOrders.tsx
│   │   ├── AdminUsers.tsx
│   │   ├── AdminCoupons.tsx
│   │   └── AdminAnalytics.tsx
│   └── NotFoundPage.tsx
├── store/
│   ├── index.ts                 # Store configuration
│   └── slices/
│       ├── cartSlice.ts
│       ├── wishlistSlice.ts
│       ├── productsSlice.ts
│       ├── ordersSlice.ts
│       └── filtersSlice.ts
├── contexts/
│   ├── AuthContext.tsx          # Authentication
│   └── ThemeContext.tsx         # Dark/light mode
├── services/
│   └── api.ts                   # Mock API services
├── layouts/
│   ├── MainLayout.tsx
│   └── AdminLayout.tsx
└── App.tsx                      # Main app component
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ installed
- Modern web browser

### Installation

This application is designed to run in the Figma Make environment. No additional installation is required.

### Running the Application

The application will automatically start in the Figma Make preview environment.

### Troubleshooting

If you see a 404 "Page Not Found" error:

1. **Check the URL** - Make sure you're accessing the root path `/` 
2. **Open Browser Console** (F12) - Look for initialization messages and errors
3. **Visit Test Page** - Navigate to `/test` to verify routing works
4. **Visit Diagnostic Page** - Navigate to `/diagnostic` to check full system status
5. **Read TROUBLESHOOTING.md** - See `/TROUBLESHOOTING.md` for detailed debugging guide

The app logs useful information on startup:
- 🔍 Startup validation results
- ✅ NovaShop App Initialized
- 📍 Current Path and Full URL
- 🏪 Redux Store State
- 💡 Quick navigation links

**Quick Debug Routes:**
- `/test` - Simple test page (always works if routing is functional)
- `/diagnostic` - Full system diagnostics and status
- `/` - Homepage (main application entry point)

### Demo Credentials

**Admin Account:**
- Email: `admin@novashop.com`
- Password: `admin123`

**Regular User:**
- Email: Any valid email
- Password: Any password (6+ characters)

## 🎨 Key Features Walkthrough

### For Customers

1. **Browse Products**
   - Navigate to the Products page
   - Use filters to narrow down products
   - Switch between grid and list view
   - Click on a product for details

2. **Shopping Cart**
   - Add products to cart from any page
   - View cart and adjust quantities
   - Proceed to checkout

3. **Checkout**
   - Enter shipping information
   - Select payment method
   - Review and confirm order

4. **Account Management**
   - Register or login
   - View order history
   - Manage wishlist
   - Update profile

### For Admins

1. **Access Admin Dashboard**
   - Login with admin credentials
   - Navigate to `/admin`

2. **Manage Products**
   - View all products
   - Add new products
   - Edit or delete existing products
   - Track inventory

3. **Monitor Orders**
   - View all customer orders
   - Update order status
   - Access customer information

4. **Analytics**
   - View sales trends
   - Monitor revenue
   - Track top products

## 🔐 Authentication & Authorization

The application uses a mock authentication system with the following features:

- **JWT-style token management** (mock)
- **Role-based access control** (user, admin, superadmin)
- **Protected routes** - Certain pages require authentication
- **Persistent sessions** - Uses localStorage

## 💾 State Management

### Redux Store Structure

- **cart** - Shopping cart items and total
- **wishlist** - User's favorite products
- **products** - Product catalog and current product
- **orders** - Order history and current order
- **filters** - Product filtering state

### Context Providers

- **AuthContext** - User authentication state
- **ThemeContext** - Dark/light mode preference

## 🎯 Mock Data & API

The application uses mock API services that simulate real backend interactions:

- **productsApi** - Product CRUD operations
- **ordersApi** - Order management
- **authApi** - Authentication
- **reviewsApi** - Product reviews
- **analyticsApi** - Dashboard statistics

All API calls include simulated delays for realistic UX.

## 🌐 Connecting to a Real Backend

To connect this frontend to a real backend:

1. **Replace Mock API**
   - Update `/services/api.ts` with real API endpoints
   - Add proper error handling
   - Implement authentication headers

2. **Environment Variables**
   - Create `.env` file with API URLs
   - Add API keys (if needed)

3. **Authentication**
   - Implement real JWT token handling
   - Add token refresh logic
   - Secure sensitive routes

4. **Data Persistence**
   - Connect cart to backend
   - Sync wishlist with server
   - Store orders in database

## 🚀 Suggested Backend Options

1. **Supabase** - PostgreSQL database with auth, storage, and real-time features
2. **Firebase** - Google's backend-as-a-service platform
3. **Node.js/Express** - Custom REST API
4. **GraphQL** - Apollo Server or similar
5. **Strapi** - Headless CMS with eCommerce plugins

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: 1024px+

## ♿ Accessibility

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance
- Focus indicators

## 🔮 Future Enhancements

- [ ] Real backend integration
- [ ] Payment gateway (Stripe/PayPal)
- [ ] Email notifications
- [ ] Live chat support
- [ ] Product recommendations AI
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] PWA features
- [ ] Advanced analytics
- [ ] Inventory alerts
- [ ] Bulk operations
- [ ] Export functionality
- [ ] Advanced search (Elasticsearch)
- [ ] Product variations management
- [ ] Customer reviews moderation
- [ ] Loyalty program
- [ ] Affiliate system

## 📄 License

This project is built as a demo application for Figma Make.

## 👥 Contributing

This is a demo project. For production use, please fork and customize according to your needs.

## 🙏 Acknowledgments

- Icons by Lucide React
- UI components from shadcn/ui
- Charts by Recharts
- Toast notifications by Sonner

---

**Built with ❤️ using Figma Make**
