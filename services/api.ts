// Mock API Service Layer
// In production, replace these with actual API calls to your backend

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    image: string;
    images: string[];
    category: string;
    rating: number;
    reviews: number;
    stock: number;
    variants?: {
      sizes?: string[];
      colors?: string[];
    };
    features?: string[];
    specifications?: Record<string, string>;
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
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
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
    role: 'user' | 'admin' | 'superadmin';
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
  
  // Mock Data
  const MOCK_PRODUCTS: Product[] = [
    {
      id: '1',
      name: 'Wireless Noise-Canceling Headphones',
      description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life.',
      price: 299.99,
      originalPrice: 399.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600',
      ],
      category: 'Electronics',
      rating: 4.8,
      reviews: 1247,
      stock: 45,
      variants: {
        colors: ['Black', 'Silver', 'Navy Blue'],
      },
      features: [
        'Active Noise Cancellation',
        '30-hour battery life',
        'Premium sound quality',
        'Foldable design',
        'Touch controls',
      ],
      specifications: {
        'Battery Life': '30 hours',
        'Charging Time': '2 hours',
        'Weight': '250g',
        'Bluetooth': '5.0',
      },
    },
    {
      id: '2',
      name: 'Smart Watch Pro',
      description: 'Advanced fitness tracking with heart rate monitoring, GPS, and sleep analysis.',
      price: 399.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
      images: [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
        'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600',
      ],
      category: 'Wearables',
      rating: 4.6,
      reviews: 892,
      stock: 32,
      variants: {
        sizes: ['40mm', '44mm'],
        colors: ['Space Gray', 'Silver', 'Gold'],
      },
      features: [
        'Heart rate monitoring',
        'GPS tracking',
        'Water resistant',
        'Sleep tracking',
        '7-day battery',
      ],
    },
    {
      id: '3',
      name: 'Ultra-Slim Laptop 15"',
      description: 'Powerful performance in a sleek design. Perfect for professionals and creators.',
      price: 1299.99,
      originalPrice: 1499.99,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600',
      images: [
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600',
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600',
      ],
      category: 'Computers',
      rating: 4.9,
      reviews: 2103,
      stock: 18,
      variants: {
        colors: ['Silver', 'Space Gray'],
      },
      features: [
        '15.6" 4K Display',
        '16GB RAM',
        '512GB SSD',
        '10-hour battery',
        'Backlit keyboard',
      ],
      specifications: {
        Processor: 'Intel Core i7',
        RAM: '16GB',
        Storage: '512GB SSD',
        Display: '15.6" 4K',
        Weight: '1.8kg',
      },
    },
    {
      id: '4',
      name: 'Wireless Charging Pad',
      description: 'Fast wireless charging for all compatible devices. Sleek and efficient.',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1591290619762-c588e7bbfc76?w=600',
      images: ['https://images.unsplash.com/photo-1591290619762-c588e7bbfc76?w=600'],
      category: 'Accessories',
      rating: 4.5,
      reviews: 456,
      stock: 120,
      features: ['15W fast charging', 'LED indicator', 'Non-slip surface', 'Universal compatibility'],
    },
    {
      id: '5',
      name: 'Premium Leather Backpack',
      description: 'Handcrafted leather backpack with laptop compartment and premium finish.',
      price: 179.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600',
      images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600'],
      category: 'Fashion',
      rating: 4.7,
      reviews: 324,
      stock: 28,
      variants: {
        colors: ['Black', 'Brown', 'Tan'],
      },
      features: ['Genuine leather', 'Laptop compartment', 'Multiple pockets', 'Water resistant'],
    },
    {
      id: '6',
      name: '4K Webcam Pro',
      description: 'Crystal clear 4K video calls with auto-focus and built-in noise-canceling mic.',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600',
      images: ['https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600'],
      category: 'Electronics',
      rating: 4.6,
      reviews: 678,
      stock: 67,
      features: ['4K resolution', 'Auto-focus', 'Noise-canceling mic', 'Low-light correction'],
    },
  ];
  
  // Simulate API delay
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  
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
    }) => {
      await delay(500);
      
      let filtered = [...MOCK_PRODUCTS];
  
      // Filter by category
      if (params.category) {
        filtered = filtered.filter((p) => p.category === params.category);
      }
  
      // Filter by search
      if (params.search) {
        const searchLower = params.search.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(searchLower) ||
            p.description.toLowerCase().includes(searchLower)
        );
      }
  
      // Filter by price
      if (params.minPrice !== undefined) {
        filtered = filtered.filter((p) => p.price >= params.minPrice!);
      }
      if (params.maxPrice !== undefined) {
        filtered = filtered.filter((p) => p.price <= params.maxPrice!);
      }
  
      // Sort
      if (params.sort) {
        switch (params.sort) {
          case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
          case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
          case 'newest':
          default:
            break;
        }
      }
  
      // Pagination
      const page = params.page || 1;
      const limit = params.limit || 12;
      const start = (page - 1) * limit;
      const end = start + limit;
      const paginated = filtered.slice(start, end);
  
      return {
        products: paginated,
        pagination: {
          page,
          limit,
          total: filtered.length,
          totalPages: Math.ceil(filtered.length / limit),
        },
      };
    },
  
    getById: async (id: string) => {
      await delay(300);
      const product = MOCK_PRODUCTS.find((p) => p.id === id);
      if (!product) throw new Error('Product not found');
      return product;
    },
  
    create: async (product: Partial<Product>) => {
      await delay(500);
      const newProduct: Product = {
        id: Date.now().toString(),
        ...product,
      } as Product;
      MOCK_PRODUCTS.push(newProduct);
      return newProduct;
    },
  
    update: async (id: string, updates: Partial<Product>) => {
      await delay(500);
      const index = MOCK_PRODUCTS.findIndex((p) => p.id === id);
      if (index === -1) throw new Error('Product not found');
      MOCK_PRODUCTS[index] = { ...MOCK_PRODUCTS[index], ...updates };
      return MOCK_PRODUCTS[index];
    },
  
    delete: async (id: string) => {
      await delay(500);
      const index = MOCK_PRODUCTS.findIndex((p) => p.id === id);
      if (index === -1) throw new Error('Product not found');
      MOCK_PRODUCTS.splice(index, 1);
      return { success: true };
    },
  };
  
  // Orders API
  export const ordersApi = {
    getAll: async () => {
      await delay(500);
      const mockOrders: Order[] = [
        {
          id: 'ORD-001',
          userId: 'user-1',
          items: [
            {
              productId: '1',
              name: 'Wireless Headphones',
              price: 299.99,
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200',
            },
          ],
          total: 299.99,
          status: 'delivered',
          shippingAddress: {
            fullName: 'John Doe',
            address: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'USA',
            phone: '+1234567890',
          },
          paymentMethod: 'Credit Card',
          createdAt: '2024-10-15T10:30:00Z',
          updatedAt: '2024-10-20T14:20:00Z',
        },
      ];
      return mockOrders;
    },
  
    getById: async (id: string) => {
      await delay(300);
      const orders = await ordersApi.getAll();
      const order = orders.find((o) => o.id === id);
      if (!order) throw new Error('Order not found');
      return order;
    },
  
    create: async (orderData: any) => {
      await delay(800);
      const newOrder: Order = {
        id: `ORD-${Date.now()}`,
        ...orderData,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return newOrder;
    },
  
    updateStatus: async (id: string, status: Order['status']) => {
      await delay(500);
      return { id, status, updatedAt: new Date().toISOString() };
    },
  };
  
  // Auth API
  export const authApi = {
    login: async (email: string, password: string) => {
      await delay(800);
      
      // Mock authentication
      if (email === 'admin@novashop.com' && password === 'admin123') {
        return {
          user: {
            id: 'admin-1',
            email: 'admin@novashop.com',
            firstName: 'Admin',
            lastName: 'User',
            role: 'admin' as const,
            createdAt: '2024-01-01T00:00:00Z',
          },
          token: 'mock-admin-token-' + Date.now(),
          refreshToken: 'mock-refresh-token',
        };
      }
      
      return {
        user: {
          id: 'user-1',
          email,
          firstName: 'John',
          lastName: 'Doe',
          role: 'user' as const,
          createdAt: '2024-01-01T00:00:00Z',
        },
        token: 'mock-token-' + Date.now(),
        refreshToken: 'mock-refresh-token',
      };
    },
  
    register: async (data: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    }) => {
      await delay(800);
      return {
        user: {
          id: 'user-' + Date.now(),
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          role: 'user' as const,
          createdAt: new Date().toISOString(),
        },
        token: 'mock-token-' + Date.now(),
        refreshToken: 'mock-refresh-token',
      };
    },
  
    forgotPassword: async (_email: string) => {
      await delay(500);
      return { message: 'Password reset email sent' };
    },
  
    resetPassword: async (_token: string, _newPassword: string) => {
      await delay(500);
      return { message: 'Password reset successful' };
    },
  
    verifyToken: async (_token: string) => {
      await delay(300);
      return { valid: true };
    },
  };
  
  // Reviews API
  export const reviewsApi = {
    getByProductId: async (productId: string) => {
      await delay(500);
      const mockReviews: Review[] = [
        {
          id: 'rev-1',
          productId,
          userId: 'user-1',
          userName: 'Sarah Johnson',
          rating: 5,
          comment: 'Absolutely love this product! Exceeded my expectations.',
          createdAt: '2024-10-20T10:30:00Z',
        },
        {
          id: 'rev-2',
          productId,
          userId: 'user-2',
          userName: 'Mike Chen',
          rating: 4,
          comment: 'Great quality, fast shipping. Would recommend!',
          createdAt: '2024-10-18T14:20:00Z',
        },
      ];
      return mockReviews;
    },
  
    create: async (review: Partial<Review>) => {
      await delay(500);
      const newReview: Review = {
        id: 'rev-' + Date.now(),
        ...review,
        createdAt: new Date().toISOString(),
      } as Review;
      return newReview;
    },
  };
  
  // Analytics API (for admin)
  export const analyticsApi = {
    getDashboardStats: async () => {
      await delay(500);
      return {
        totalRevenue: 125430.50,
        totalOrders: 1247,
        totalCustomers: 892,
        averageOrderValue: 100.58,
        revenueGrowth: 12.5,
        ordersGrowth: 8.3,
        customersGrowth: 15.2,
        topProducts: MOCK_PRODUCTS.slice(0, 5).map((p) => ({
          id: p.id,
          name: p.name,
          sales: Math.floor(Math.random() * 500) + 100,
          revenue: p.price * (Math.floor(Math.random() * 500) + 100),
        })),
        salesChart: Array.from({ length: 12 }, (_, i) => ({
          month: new Date(2024, i, 1).toLocaleDateString('en', { month: 'short' }),
          sales: Math.floor(Math.random() * 20000) + 5000,
        })),
      };
    },
  };
  
