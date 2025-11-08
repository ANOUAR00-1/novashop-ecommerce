# NovaShop Development Guidelines

## 🎯 Project Overview

NovaShop is a modern, production-ready eCommerce platform built with React, TypeScript, Redux Toolkit, and Tailwind CSS. This document provides guidelines for maintaining and extending the application.

## 📐 Architecture Principles

### 1. Component Structure
- **Presentational Components**: Pure UI components in `/components`
- **Page Components**: Route-level components in `/pages`
- **Layout Components**: Shared layouts in `/layouts`
- **Keep components focused**: Each component should have a single responsibility

### 2. State Management
- **Redux Toolkit**: Use for global state (cart, products, orders, filters, wishlist)
- **Context API**: Use for app-wide concerns (auth, theme)
- **Local State**: Use `useState` for component-specific state
- **Server State**: Use Redux async thunks for API data

### 3. Routing
- **Public Routes**: Accessible to all users (products, home, login)
- **Protected Routes**: Require authentication (checkout, profile, orders)
- **Admin Routes**: Require admin role (dashboard, product management)

## 🛠️ Development Best Practices

### TypeScript
```typescript
// ✅ DO: Define interfaces for props
interface ProductCardProps {
  product: Product;
  onAddToCart?: (id: string) => void;
}

// ✅ DO: Use type inference where possible
const [count, setCount] = useState(0); // Type is inferred as number

// ❌ DON'T: Use 'any' type
// ❌ const data: any = fetchData();
```

### Component Guidelines
```tsx
// ✅ DO: Use functional components with hooks
export default function ProductCard({ product }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  // ...
}

// ✅ DO: Extract complex logic into custom hooks
function useProductFilters() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(state => state.filters);
  // ...
  return { filters, updateFilters };
}

// ❌ DON'T: Use class components unless absolutely necessary
```

### Redux Patterns
```typescript
// ✅ DO: Use Redux Toolkit's createSlice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Synchronous actions
  },
  extraReducers: (builder) => {
    // Async thunk handlers
  }
});

// ✅ DO: Use typed hooks
const products = useAppSelector(state => state.products.items);
const dispatch = useAppDispatch();

// ❌ DON'T: Mutate state directly (Redux Toolkit uses Immer internally)
```

### Styling Guidelines
```tsx
// ✅ DO: Use Tailwind utility classes
<div className="flex items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-lg">

// ✅ DO: Support dark mode
<p className="text-gray-900 dark:text-white">

// ✅ DO: Use responsive classes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// ❌ DON'T: Use inline styles unless absolutely necessary
// ❌ <div style={{ color: 'red' }}>
```

## 🔐 Security Best Practices

### Authentication
- Store JWT tokens in localStorage (for demo purposes)
- In production, use httpOnly cookies
- Implement token refresh mechanism
- Clear sensitive data on logout

### Protected Routes
```tsx
// ✅ DO: Wrap protected routes with ProtectedRoute component
<Route path="profile" element={
  <ProtectedRoute>
    <ProfilePage />
  </ProtectedRoute>
} />

// ✅ DO: Check roles for admin routes
<ProtectedRoute requiredRole="admin">
  <AdminDashboard />
</ProtectedRoute>
```

### API Security
```typescript
// ✅ DO: Validate and sanitize user inputs
// ✅ DO: Handle errors gracefully
try {
  const response = await api.call();
  return response;
} catch (error) {
  toast.error('Operation failed');
  console.error(error);
}
```

## 📝 Code Organization

### File Naming
- **Components**: PascalCase - `ProductCard.tsx`
- **Utilities**: camelCase - `formatPrice.ts`
- **Constants**: UPPER_SNAKE_CASE - `API_ENDPOINTS.ts`
- **Types**: PascalCase - `Product`, `User`, `Order`

### Import Order
```typescript
// 1. React and third-party libraries
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// 2. Redux/Store
import { useAppDispatch, useAppSelector } from '../store';
import { fetchProducts } from '../store/slices/productsSlice';

// 3. Components
import ProductCard from '../components/products/ProductCard';

// 4. Utilities and services
import { productsApi } from '../services/api';

// 5. Types
import { Product } from '../types';
```

## 🎨 UI/UX Guidelines

### Responsiveness
- **Mobile First**: Design for mobile, then scale up
- **Breakpoints**: Use Tailwind's standard breakpoints (sm, md, lg, xl, 2xl)
- **Touch Targets**: Minimum 44x44px for buttons on mobile

### Accessibility
- Use semantic HTML elements (`<nav>`, `<main>`, `<article>`)
- Provide alt text for images
- Ensure keyboard navigation works
- Maintain color contrast ratios (WCAG AA)
- Use ARIA labels where necessary

### Loading States
```tsx
// ✅ DO: Show loading indicators
{loading ? (
  <div className="flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
) : (
  <ProductList products={products} />
)}
```

### Error Handling
```tsx
// ✅ DO: Use Error Boundaries for React errors
<ErrorBoundary>
  <App />
</ErrorBoundary>

// ✅ DO: Show user-friendly error messages
{error && (
  <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
    {error.message}
  </div>
)}
```

## 🚀 Performance Optimization

### Code Splitting
```tsx
// ✅ DO: Use React.lazy for route-based splitting
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));

// Wrap with Suspense
<Suspense fallback={<Loading />}>
  <AdminDashboard />
</Suspense>
```

### Memoization
```tsx
// ✅ DO: Memoize expensive calculations
const filteredProducts = useMemo(
  () => products.filter(p => p.category === selectedCategory),
  [products, selectedCategory]
);

// ✅ DO: Memoize callbacks passed to child components
const handleAddToCart = useCallback((id: string) => {
  dispatch(addToCart(id));
}, [dispatch]);
```

### Images
- Use appropriate image formats (WebP, AVIF)
- Implement lazy loading for images
- Provide responsive images with srcset
- Use the ImageWithFallback component

## 🧪 Testing Guidelines

### Component Testing
```typescript
// Test user interactions
it('should add product to cart when button clicked', () => {
  render(<ProductCard product={mockProduct} />);
  fireEvent.click(screen.getByText('Add to Cart'));
  expect(mockDispatch).toHaveBeenCalledWith(addToCart(mockProduct));
});
```

### Redux Testing
```typescript
// Test reducers
it('should add item to cart', () => {
  const state = cartReducer(initialState, addToCart(mockItem));
  expect(state.items).toHaveLength(1);
});
```

## 🔌 API Integration

### Connecting Real Backend
When replacing mock APIs with real endpoints:

1. **Update `/services/api.ts`**
```typescript
// Replace mock implementation
const BASE_URL = process.env.VITE_API_URL || 'http://localhost:3000/api';

export const productsApi = {
  getAll: async (params) => {
    const response = await fetch(`${BASE_URL}/products?${new URLSearchParams(params)}`);
    return response.json();
  },
  // ... other methods
};
```

2. **Add authentication headers**
```typescript
const authHeader = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
});
```

3. **Handle errors consistently**
```typescript
async function apiCall(endpoint: string, options?: RequestInit) {
  try {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...authHeader(),
        ...options?.headers,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
```

## 📦 Adding New Features

### Checklist for New Feature
- [ ] Define types/interfaces
- [ ] Create necessary Redux slice (if needed)
- [ ] Build UI components
- [ ] Add routing (if needed)
- [ ] Implement API calls
- [ ] Add loading and error states
- [ ] Test on mobile and desktop
- [ ] Ensure dark mode support
- [ ] Add accessibility features
- [ ] Update documentation

### Example: Adding a "Compare Products" Feature
1. Create slice: `store/slices/compareSlice.ts`
2. Create component: `components/products/CompareButton.tsx`
3. Create page: `pages/ComparePage.tsx`
4. Add route in `App.tsx`
5. Add link in navigation

## 🐛 Debugging Tips

### Common Issues

**Issue: Component not re-rendering**
- Check if Redux state is being mutated directly
- Ensure dependencies array in useEffect is correct
- Verify memo/useMemo dependencies

**Issue: "Cannot read property of undefined"**
- Add optional chaining: `product?.name`
- Provide default values: `products || []`
- Check loading states

**Issue: Dark mode not working**
- Verify ThemeProvider wraps your app
- Check if `dark:` classes are present
- Ensure `dark` class is on document root

## 🔄 Git Workflow

### Commit Messages
```bash
# ✅ Good commit messages
feat: Add product comparison feature
fix: Resolve cart total calculation bug
refactor: Extract product card into reusable component
docs: Update API integration guidelines

# ❌ Bad commit messages
update
fix bug
changes
```

### Branch Naming
- `feature/product-comparison`
- `fix/cart-total-calculation`
- `refactor/product-components`
- `docs/api-guidelines`

## 📚 Resources

### Official Documentation
- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)

### Project-Specific
- See `/README.md` for project overview
- See `/services/api.ts` for API structure
- See `/store` for state management patterns

## ⚡ Quick Reference

### Add a new page
1. Create file in `/pages`
2. Add route in `App.tsx`
3. Import and use

### Add a new component
1. Create file in `/components/[category]`
2. Import where needed
3. Use TypeScript for props

### Add global state
1. Create slice in `/store/slices`
2. Add to store in `/store/index.ts`
3. Use `useAppSelector` and `useAppDispatch`

### Add API endpoint
1. Add function to appropriate API in `/services/api.ts`
2. Create Redux thunk if needed
3. Call from component

---

**Last Updated**: November 2024  
**Version**: 1.0.0  
**Maintainer**: NovaShop Development Team
