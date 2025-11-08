import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Toaster } from 'sonner';
import { validateStartup, logValidationResults } from './utils/startupValidator';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages
import HomePage from './pages/HomePage';
import TestPage from './pages/TestPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ProfilePage from './pages/user/ProfilePage';
import OrdersPage from './pages/user/OrdersPage';
import WishlistPage from './pages/user/WishlistPage';
import NotFoundPage from './pages/NotFoundPage';
import DiagnosticPage from './pages/DiagnosticPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import AdminCoupons from './pages/admin/AdminCoupons';
import AdminAnalytics from './pages/admin/AdminAnalytics';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

function AppContent() {
  useEffect(() => {
    try {
      // Run startup validation
      const validationResults = validateStartup();
      logValidationResults(validationResults);
      
      console.log('='.repeat(50));
      console.log('✅ NovaShop App Initializing...');
      console.log('='.repeat(50));
      console.log('📍 Current Path:', window.location.pathname);
      console.log('🌐 Full URL:', window.location.href);
      
      const storeState = store.getState();
      console.log('🏪 Redux Store State:', {
        cart: storeState.cart.items.length + ' items',
        wishlist: storeState.wishlist.items.length + ' items',
        products: storeState.products.items.length + ' products loaded',
      });
      
      console.log('🎨 Theme:', localStorage.getItem('novashop_theme') || 'light');
      console.log('👤 User:', localStorage.getItem('novashop_user') ? 'Logged in' : 'Not logged in');
      console.log('='.repeat(50));
      console.log('💡 Quick Links:');
      console.log('   • /test - Simple test page');
      console.log('   • /diagnostic - Full system diagnostics');
      console.log('   • / - Homepage');
      console.log('='.repeat(50));
      console.log('✅ App Initialized Successfully!');
    } catch (error) {
      console.error('❌ Error during initialization:', error);
    }
  }, []);

  return (
    <>
      <Toaster position="top-right" richColors />
      <Routes>
        {/* Test Route - Temporary */}
        <Route path="/test" element={<TestPage />} />
        
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="diagnostic" element={<DiagnosticPage />} />
          
          {/* Protected User Routes */}
          <Route path="checkout" element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          } />
          <Route path="order-confirmation/:orderId" element={
            <ProtectedRoute>
              <OrderConfirmationPage />
            </ProtectedRoute>
          } />
          <Route path="profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="orders" element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          } />
          <Route path="wishlist" element={
            <ProtectedRoute>
              <WishlistPage />
            </ProtectedRoute>
          } />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="coupons" element={<AdminCoupons />} />
          <Route path="analytics" element={<AdminAnalytics />} />
        </Route>

        {/* 404 - This should be last */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default function App() {
  console.log('🚀 App component rendering...');
  
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <AuthProvider>
            <Router>
              <AppContent />
            </Router>
          </AuthProvider>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}
