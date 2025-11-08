# 🔌 Backend Integration Guide
## Complete API Implementation Reference

---

## 📋 Table of Contents
1. [API Endpoints Overview](#api-endpoints-overview)
2. [Authentication Flow](#authentication-flow)
3. [Request/Response Formats](#requestresponse-formats)
4. [Error Handling](#error-handling)
5. [Implementation Steps](#implementation-steps)
6. [Testing Checklist](#testing-checklist)

---

## 🌐 API Endpoints Overview

### Base URL Configuration

```typescript
// src/config/api.ts
export const API_CONFIG = {
  BASE_URL: process.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
};
```

---

## 1️⃣ Authentication Endpoints

### POST /api/auth/login
**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user",
    "avatar": "https://...",
    "createdAt": "2025-01-01T00:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### POST /api/auth/register
**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:** Same as login

### POST /api/auth/refresh
**Request:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### POST /api/auth/logout
**Request:** None (token in header)

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

---

## 2️⃣ Product Endpoints

### GET /api/products
**Query Parameters:**
```typescript
{
  page?: number;        // Default: 1
  limit?: number;       // Default: 12
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'price_asc' | 'price_desc' | 'name' | 'rating';
}
```

**Response:**
```json
{
  "products": [
    {
      "id": "prod_123",
      "name": "Product Name",
      "description": "Product description",
      "price": 299.99,
      "originalPrice": 399.99,
      "image": "https://...",
      "images": ["https://...", "https://..."],
      "category": "Electronics",
      "rating": 4.8,
      "reviews": 1247,
      "stock": 45,
      "variants": {
        "sizes": ["S", "M", "L"],
        "colors": ["Black", "White"]
      },
      "features": ["Feature 1", "Feature 2"],
      "specifications": {
        "Brand": "BrandName",
        "Model": "Model123"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 150,
    "totalPages": 13
  }
}
```

### GET /api/products/:id
**Response:**
```json
{
  "id": "prod_123",
  "name": "Product Name",
  // ... all product fields
}
```

### POST /api/products (Admin Only)
**Request:**
```json
{
  "name": "New Product",
  "description": "Product description",
  "price": 99.99,
  "originalPrice": 149.99,
  "image": "https://...",
  "images": ["https://..."],
  "category": "Electronics",
  "stock": 100,
  "variants": {
    "sizes": ["S", "M", "L"],
    "colors": ["Black", "White"]
  }
}
```

**Response:** Created product object

### PUT /api/products/:id (Admin Only)
**Request:** Same as POST

**Response:** Updated product object

### DELETE /api/products/:id (Admin Only)
**Response:**
```json
{
  "message": "Product deleted successfully"
}
```

---

## 3️⃣ Order Endpoints

### GET /api/orders
**Headers:** `Authorization: Bearer {token}`

**Response:**
```json
[
  {
    "id": "ord_123",
    "userId": "user_123",
    "items": [
      {
        "productId": "prod_123",
        "name": "Product Name",
        "price": 299.99,
        "quantity": 2,
        "image": "https://..."
      }
    ],
    "total": 659.98,
    "status": "processing",
    "shippingAddress": {
      "fullName": "John Doe",
      "address": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA",
      "phone": "+1234567890"
    },
    "paymentMethod": "Credit Card",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
]
```

### GET /api/orders/:id
**Response:** Single order object

### POST /api/orders
**Request:**
```json
{
  "items": [
    {
      "productId": "prod_123",
      "name": "Product Name",
      "price": 299.99,
      "quantity": 2,
      "image": "https://..."
    }
  ],
  "total": 659.98,
  "shippingAddress": {
    "fullName": "John Doe",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA",
    "phone": "+1234567890"
  },
  "paymentMethod": "Credit Card"
}
```

**Response:** Created order object

### PATCH /api/orders/:id/status (Admin Only)
**Request:**
```json
{
  "status": "shipped"
}
```

**Response:** Updated order object

---

## 4️⃣ User Endpoints

### GET /api/users/profile
**Headers:** `Authorization: Bearer {token}`

**Response:**
```json
{
  "id": "user_123",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "user",
  "avatar": "https://...",
  "phone": "+1234567890",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001"
  },
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

### PUT /api/users/profile
**Request:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001"
  }
}
```

**Response:** Updated user object

### GET /api/users (Admin Only)
**Response:** Array of user objects

---

## 5️⃣ Review Endpoints

### GET /api/reviews/product/:productId
**Response:**
```json
[
  {
    "id": "rev_123",
    "productId": "prod_123",
    "userId": "user_123",
    "userName": "John Doe",
    "rating": 5,
    "comment": "Great product!",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
]
```

### POST /api/reviews
**Request:**
```json
{
  "productId": "prod_123",
  "rating": 5,
  "comment": "Great product!"
}
```

**Response:** Created review object

---

## 🔐 Authentication Flow

### JWT Token Management

```typescript
// src/utils/tokenManager.ts
class TokenManager {
  private token: string | null = null;
  private refreshToken: string | null = null;

  setTokens(token: string, refreshToken: string) {
    this.token = token;
    this.refreshToken = refreshToken;
    // Store in httpOnly cookies (recommended) or secure storage
  }

  getToken(): string | null {
    return this.token;
  }

  async refreshAccessToken(): Promise<string> {
    // Call refresh endpoint
    // Return new access token
  }
}
```

### API Client with Auto-Refresh

```typescript
// src/services/apiClient.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
});

// Request interceptor - Add token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('novashop_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle 401 and refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('novashop_refresh_token');
        const response = await axios.post(`${API_CONFIG.BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        const { token } = response.data;
        localStorage.setItem('novashop_token', token);

        originalRequest.headers.Authorization = `Bearer ${token}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Redirect to login
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
```

---

## ⚠️ Error Handling

### Standard Error Response Format

```json
{
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password",
    "details": {
      "field": "password",
      "reason": "Password is incorrect"
    }
  }
}
```

### Error Codes
```typescript
enum ErrorCode {
  // Authentication
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  UNAUTHORIZED = 'UNAUTHORIZED',
  
  // Validation
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  MISSING_FIELD = 'MISSING_FIELD',
  
  // Resources
  NOT_FOUND = 'NOT_FOUND',
  ALREADY_EXISTS = 'ALREADY_EXISTS',
  
  // Permissions
  FORBIDDEN = 'FORBIDDEN',
  INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS',
  
  // Server
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
}
```

---

## 📝 Implementation Steps

### Step 1: Update API Service

Replace `services/api.ts` mock implementations:

```typescript
// OLD: Mock implementation
export const productsApi = {
  getAll: async (params) => {
    await delay(500);
    return MOCK_PRODUCTS;
  }
};

// NEW: Real API implementation
import apiClient from './apiClient';

export const productsApi = {
  getAll: async (params: ProductQueryParams) => {
    const response = await apiClient.get('/products', { params });
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },
  
  create: async (data: CreateProductDto) => {
    const response = await apiClient.post('/products', data);
    return response.data;
  },
  
  update: async (id: string, data: UpdateProductDto) => {
    const response = await apiClient.put(`/products/${id}`, data);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await apiClient.delete(`/products/${id}`);
    return response.data;
  }
};
```

### Step 2: Environment Variables

Create `.env` file:

```bash
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=NovaShop
VITE_ENABLE_ANALYTICS=true
```

### Step 3: Update Auth Context

```typescript
// contexts/AuthContext.tsx
const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.post('/auth/login', { email, password });
    const { user, token, refreshToken } = response.data;
    
    setUser(user);
    setToken(token);
    localStorage.setItem('novashop_user', JSON.stringify(user));
    localStorage.setItem('novashop_token', token);
    localStorage.setItem('novashop_refresh_token', refreshToken);
    
    toast.success('Welcome back!');
  } catch (error) {
    toast.error('Login failed. Please check your credentials.');
    throw error;
  }
};
```

---

## ✅ Testing Checklist

### Pre-Integration Tests
- [ ] All mock API calls work correctly
- [ ] State management is functioning
- [ ] UI components render properly
- [ ] Routing works as expected
- [ ] Protected routes redirect correctly

### Post-Integration Tests

**Authentication:**
- [ ] User can register successfully
- [ ] User can login successfully
- [ ] Token refresh works automatically
- [ ] User can logout
- [ ] Protected routes block unauthenticated users
- [ ] Admin routes block non-admin users

**Products:**
- [ ] Products list loads correctly
- [ ] Filters and search work
- [ ] Pagination works
- [ ] Product details load
- [ ] Admin can create products
- [ ] Admin can edit products
- [ ] Admin can delete products

**Shopping Cart:**
- [ ] Add to cart works
- [ ] Update quantity works
- [ ] Remove from cart works
- [ ] Cart persists on reload
- [ ] Cart clears after order

**Checkout:**
- [ ] Checkout validates cart
- [ ] Shipping form validates
- [ ] Order creation works
- [ ] Order confirmation displays
- [ ] Cart clears after successful order

**Orders:**
- [ ] User can view their orders
- [ ] Order details display correctly
- [ ] Admin can view all orders
- [ ] Admin can update order status

**Profile:**
- [ ] User can view profile
- [ ] User can update profile
- [ ] Changes persist

---

## 🔒 Security Best Practices

1. **Use httpOnly Cookies for tokens** (instead of localStorage)
2. **Implement CSRF protection**
3. **Use HTTPS in production**
4. **Sanitize all user inputs**
5. **Implement rate limiting**
6. **Add request signing for sensitive operations**
7. **Use environment variables for secrets**
8. **Implement proper CORS policies**

---

## 📊 Performance Optimization

1. **Implement caching** (Redis for backend, React Query for frontend)
2. **Use pagination** for all list endpoints
3. **Optimize images** (CDN, compression, lazy loading)
4. **Implement debouncing** for search inputs
5. **Use code splitting** and lazy loading
6. **Enable gzip/brotli compression**
7. **Implement service workers** for offline support

---

## 🚀 Deployment Checklist

- [ ] Environment variables configured
- [ ] API base URL updated
- [ ] Error tracking setup (Sentry)
- [ ] Analytics setup (Google Analytics)
- [ ] HTTPS configured
- [ ] CORS configured
- [ ] Rate limiting enabled
- [ ] Database indexes created
- [ ] Backup strategy in place
- [ ] Monitoring setup
- [ ] Load testing completed
- [ ] Security audit completed

---

**Ready for Integration!** 🎉

Follow these steps systematically, test thoroughly, and your e-commerce platform will be production-ready.
