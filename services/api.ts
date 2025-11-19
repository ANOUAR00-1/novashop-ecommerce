// Real Backend API Service Layer
// Connected to Express.js + PostgreSQL backend

import { http } from "./httpClient";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string | { id: string; name: string; slug: string } | null;
  categoryId?: string;
  rating: number;
  reviews?: number; // deprecated, use reviewCount
  reviewCount?: number;
  stock: number;
  isActive?: boolean;
  productType?: 'simple' | 'variable' | 'affiliate' | 'soldout' | 'countdown';
  affiliateLink?: string;
  countdownEnd?: string;
  variants?: {
    sizes?: string[];
    colors?: string[];
  };
  features?: string[];
  specifications?: Record<string, string>;
  createdAt?: string;
  updatedAt?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
  };
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "user" | "admin" | "superadmin";
  avatar?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

// Products API
export const productsApi = {
  getAll: async (params: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
    rating?: number;
    inStock?: boolean;
  }) => {
    return await http<{
      products: Product[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    }>("/products", {
      query: {
        page: params.page,
        limit: params.limit,
        category: params.category,
        search: params.search,
        minPrice: params.minPrice,
        maxPrice: params.maxPrice,
        sort: params.sort,
        rating: params.rating,
        inStock: params.inStock,
      },
    });
  },

  getById: async (id: string) => {
    return await http<Product>(`/products/${id}`);
  },

  create: async (product: Partial<Product>) => {
    return await http<Product>("/products", {
      method: "POST",
      body: product,
    });
  },

  update: async (id: string, updates: Partial<Product>) => {
    return await http<Product>(`/products/${id}`, {
      method: "PUT",
      body: updates,
    });
  },

  delete: async (id: string) => {
    return await http<{ success: boolean }>(`/products/${id}`, {
      method: "DELETE",
    });
  },
};

// Categories API
export const categoriesApi = {
  getAll: async () => {
    return await http<Category[]>("/categories");
  },

  getById: async (id: string) => {
    return await http<Category>(`/categories/${id}`);
  },

  create: async (category: Partial<Category>) => {
    return await http<Category>("/categories", {
      method: "POST",
      body: category,
    });
  },

  update: async (id: string, updates: Partial<Category>) => {
    return await http<Category>(`/categories/${id}`, {
      method: "PUT",
      body: updates,
    });
  },

  delete: async (id: string) => {
    return await http<{ success: boolean }>(`/categories/${id}`, {
      method: "DELETE",
    });
  },
};

// Orders API
export const ordersApi = {
  getAll: async () => {
    const response = await http<{ orders: Order[]; pagination: any }>("/orders");
    return response.orders || [];
  },

  getById: async (id: string) => {
    return await http<Order>(`/orders/${id}`);
  },

  create: async (orderData: any) => {
    return await http<Order>("/orders", { method: "POST", body: orderData });
  },

  updateStatus: async (id: string, status: Order["status"]) => {
    return await http<{
      id: string;
      status: Order["status"];
      updatedAt: string;
    }>(`/orders/${id}/status`, { method: "PUT", body: { status } });
  },
};

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    return await http<{ user: User; token: string; refreshToken: string }>(
      "/auth/login",
      { method: "POST", body: { email, password } }
    );
  },

  register: async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    return await http<{ user: User; token: string; refreshToken: string }>(
      "/auth/register",
      { method: "POST", body: data }
    );
  },

  forgotPassword: async (email: string) => {
    return await http<{ message: string }>("/auth/forgot-password", {
      method: "POST",
      body: { email },
    });
  },

  resetPassword: async (token: string, newPassword: string) => {
    return await http<{ message: string }>(`/auth/reset-password/${token}`, {
      method: "POST",
      body: { password: newPassword },
    });
  },

  verifyToken: async (token: string) => {
    return await http<{ valid: boolean }>("/auth/verify-token", {
      method: "POST",
      body: { token },
    });
  },

  getProfile: async () => {
    return await http<User>("/auth/profile");
  },
};

// Reviews API
export const reviewsApi = {
  getByProductId: async (productId: string) => {
    const response = await http<{ reviews: Review[]; pagination: any }>(`/reviews/product/${productId}`);
    return response.reviews || [];
  },

  getAll: async () => {
    const response = await http<{ reviews: Review[]; pagination: any }>("/reviews");
    return response.reviews || [];
  },

  create: async (review: Partial<Review>) => {
    return await http<Review>("/reviews", {
      method: "POST",
      body: review,
    });
  },

  update: async (id: string, updates: Partial<Review>) => {
    return await http<Review>(`/reviews/${id}`, {
      method: "PUT",
      body: updates,
    });
  },

  delete: async (id: string) => {
    return await http<{ success: boolean }>(`/reviews/${id}`, {
      method: "DELETE",
    });
  },
};

// Analytics API (for admin)
export const analyticsApi = {
  getDashboardStats: async () => {
    return await http<{
      totalRevenue: number;
      totalOrders: number;
      totalCustomers: number;
      averageOrderValue: number;
      revenueGrowth: number;
      ordersGrowth: number;
      customersGrowth: number;
      topProducts: Array<{
        id: string;
        name: string;
        sales: number;
        revenue: number;
      }>;
      salesChart: Array<{
        month: string;
        sales: number;
      }>;
      recentOrders?: any[];
      lowStock?: any[];
      pendingReviews?: number;
    }>("/analytics/dashboard");
  },
};

// Users API (admin)
export const usersApi = {
  getAll: async () => {
    const response = await http<{ users: User[]; pagination: any }>("/users");
    return response.users || [];
  },

  getById: async (id: string) => {
    return await http<User>(`/users/admin/users/${id}`);
  },

  updateRole: async (id: string, role: string) => {
    return await http<User>(`/users/admin/users/${id}/role`, {
      method: "PUT",
      body: { role },
    });
  },

  delete: async (id: string) => {
    return await http<{ success: boolean }>(`/users/admin/users/${id}`, {
      method: "DELETE",
    });
  },
};

// Coupons API
export const couponsApi = {
  validate: async (code: string) => {
    return await http<{ valid: boolean; discount: number }>(
      "/coupons/validate",
      {
        method: "POST",
        body: { code },
      }
    );
  },

  getAll: async () => {
    const response = await http<{ coupons: any[]; pagination: any }>("/coupons");
    return response.coupons || [];
  },

  create: async (coupon: any) => {
    return await http<any>("/coupons/admin", {
      method: "POST",
      body: coupon,
    });
  },

  update: async (id: string, updates: any) => {
    return await http<any>(`/coupons/admin/${id}`, {
      method: "PUT",
      body: updates,
    });
  },

  delete: async (id: string) => {
    return await http<{ success: boolean }>(`/coupons/admin/${id}`, {
      method: "DELETE",
    });
  },
};
