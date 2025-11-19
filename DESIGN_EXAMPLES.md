# 🎨 NovaShop Design System - Implementation Examples

This file contains ready-to-use React/TypeScript components implementing the NovaShop Design System.

---

## Button Components

### Primary Button (Orange CTA)
```tsx
<button className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl shadow-md hover:bg-orange-600 hover:shadow-glow transition-all duration-300 hover:scale-102 active:scale-98">
  Add to Cart
</button>
```

### Secondary Button (Dark Gray)
```tsx
<button className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl shadow-md hover:bg-gray-800 transition-all duration-300">
  View Details
</button>
```

### Outline Button
```tsx
<button className="px-6 py-3 border-2 border-orange-500 text-orange-500 font-semibold rounded-xl hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-all duration-300">
  Add to Wishlist
</button>
```

### Disabled Button
```tsx
<button className="px-6 py-3 bg-gray-300 text-gray-500 font-semibold rounded-xl cursor-not-allowed opacity-50" disabled>
  Out of Stock
</button>
```

---

## Product Card Styles

### Style 1: Enhanced Standard Card (Recommended)
```tsx
<div className="group bg-white dark:bg-gray-800 rounded-xl shadow-soft hover:shadow-strong transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
  {/* Image Container */}
  <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
    <img 
      src="/product.jpg" 
      alt="Product" 
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
    />
    
    {/* Badges */}
    <span className="absolute top-4 right-4 px-3 py-1 bg-orange-500 text-white text-sm font-semibold rounded-full shadow-md">
      -20%
    </span>
    
    {/* Quick Actions (Show on Hover) */}
    <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2">
      <button className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:bg-orange-50 dark:hover:bg-orange-500/20 transition-colors">
        <Heart className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>
      <button className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:bg-orange-50 dark:hover:bg-orange-500/20 transition-colors">
        <Eye className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>
    </div>
  </div>
  
  {/* Content */}
  <div className="p-6">
    {/* Category */}
    <span className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">Electronics</span>
    
    {/* Title */}
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-orange-500 transition-colors">
      Premium Wireless Headphones
    </h3>
    
    {/* Rating */}
    <div className="flex items-center gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < 4 ? 'fill-orange-500 text-orange-500' : 'text-gray-300'}`} />
      ))}
      <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">(124)</span>
    </div>
    
    {/* Price & Action */}
    <div className="flex items-center justify-between">
      <div>
        <span className="text-2xl font-bold text-gray-900 dark:text-white">$79.99</span>
        <span className="text-sm text-gray-400 line-through ml-2">$99.99</span>
      </div>
      <button className="p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 hover:scale-102 transition-all shadow-md hover:shadow-glow">
        <ShoppingCart className="w-5 h-5" />
      </button>
    </div>
  </div>
</div>
```

### Style 2: Minimal Card
```tsx
<div className="group cursor-pointer">
  {/* Image */}
  <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700 mb-4">
    <img 
      src="/product.jpg" 
      alt="Product" 
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  </div>
  
  {/* Content */}
  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-orange-500 transition-colors">
    Modern Chair
  </h3>
  <p className="text-lg font-bold text-orange-500">$249.00</p>
</div>
```

### Style 3: Horizontal Card (Cart/Wishlist)
```tsx
<div className="flex gap-4 bg-white dark:bg-gray-800 rounded-xl shadow-soft p-4 hover:shadow-md transition-all border border-gray-200 dark:border-gray-700">
  {/* Image */}
  <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
    <img 
      src="/product.jpg" 
      alt="Product" 
      className="w-full h-full object-cover" 
    />
  </div>
  
  {/* Content */}
  <div className="flex-1 flex flex-col">
    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Premium T-Shirt</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Size: M, Color: Black</p>
    <div className="mt-auto flex items-center justify-between">
      <span className="text-lg font-bold text-orange-500">$29.99</span>
      <div className="flex items-center gap-2">
        <button className="p-1 hover:text-orange-500 transition-colors">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</div>
```

---

## Form Components

### Input Field with Label
```tsx
<div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
    Email Address
  </label>
  <input 
    type="email" 
    placeholder="Enter your email"
    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
  />
</div>
```

### Search Bar
```tsx
<div className="relative">
  <input 
    type="search" 
    placeholder="Search products..."
    className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
  />
  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
</div>
```

### Select Dropdown
```tsx
<select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none cursor-pointer">
  <option>Select category</option>
  <option>Electronics</option>
  <option>Fashion</option>
  <option>Home & Garden</option>
</select>
```

### Checkbox
```tsx
<label className="flex items-center gap-3 cursor-pointer">
  <input 
    type="checkbox" 
    className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500 focus:ring-offset-0 cursor-pointer"
  />
  <span className="text-gray-700 dark:text-gray-300">I agree to the terms and conditions</span>
</label>
```

---

## Header Component (Enhanced)

```tsx
<header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 shadow-soft">
  <div className="container mx-auto px-4">
    {/* Top Bar */}
    <div className="flex items-center justify-between h-20">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 group">
        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-md group-hover:shadow-glow group-hover:scale-102 transition-all"></div>
        <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
          NovaShop
        </span>
      </Link>
      
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-1">
        <Link to="/" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-xl font-medium transition-all">
          Home
        </Link>
        <Link to="/shop" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-xl font-medium transition-all">
          Shop
        </Link>
        <Link to="/categories" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-xl font-medium transition-all">
          Categories
        </Link>
        <Link to="/about" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-xl font-medium transition-all">
          About
        </Link>
      </nav>
      
      {/* Actions */}
      <div className="flex items-center gap-3">
        <button className="p-3 text-gray-700 dark:text-gray-300 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-xl transition-all">
          <Search className="w-5 h-5" />
        </button>
        
        <button className="p-3 text-gray-700 dark:text-gray-300 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-xl transition-all relative">
          <Heart className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            2
          </span>
        </button>
        
        <button className="p-3 text-gray-700 dark:text-gray-300 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-xl transition-all relative">
          <ShoppingCart className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </button>
        
        <button className="px-6 py-2.5 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 hover:shadow-glow hover:scale-102 active:scale-98 transition-all">
          Sign In
        </button>
      </div>
    </div>
  </div>
</header>
```

---

## Hero Section (Modern)

```tsx
<section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
  {/* Background Pattern */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute inset-0" style={{
      backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
      backgroundSize: '40px 40px'
    }}></div>
  </div>
  
  <div className="container mx-auto px-4 py-24 relative z-10">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Content */}
      <div>
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 text-orange-400 rounded-full text-sm font-semibold mb-6 border border-orange-500/30">
          <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
          NEW COLLECTION 2024
        </span>
        
        <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Discover Premium
          <span className="block text-orange-500">Quality Products</span>
        </h1>
        
        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
          Shop the latest collection with exclusive deals up to 50% off. Limited time offer!
        </p>
        
        <div className="flex flex-wrap gap-4">
          <button className="px-8 py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 shadow-glow hover:scale-102 transition-all">
            Shop Now
          </button>
          <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-gray-900 transition-all">
            Learn More
          </button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-gray-700">
          <div>
            <div className="text-3xl font-bold text-orange-500 mb-1">10K+</div>
            <div className="text-sm text-gray-400">Products</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-500 mb-1">50K+</div>
            <div className="text-sm text-gray-400">Customers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-500 mb-1">4.9★</div>
            <div className="text-sm text-gray-400">Rating</div>
          </div>
        </div>
      </div>
      
      {/* Image */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent rounded-2xl blur-3xl"></div>
        <img 
          src="/hero-product.jpg" 
          alt="Hero Product" 
          className="relative w-full h-auto rounded-2xl shadow-strong"
        />
      </div>
    </div>
  </div>
</section>
```

---

## Filter Sidebar

```tsx
<aside className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6 h-full overflow-y-auto">
  {/* Header */}
  <div className="flex items-center justify-between mb-6">
    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Filters</h3>
    <button className="text-sm text-orange-500 hover:text-orange-600 font-medium">
      Clear All
    </button>
  </div>
  
  {/* Categories */}
  <div className="mb-8">
    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Categories</h4>
    <div className="space-y-3">
      {['All Products', 'Electronics', 'Fashion', 'Home & Garden', 'Sports'].map((cat) => (
        <label key={cat} className="flex items-center gap-3 cursor-pointer group">
          <input 
            type="radio" 
            name="category" 
            className="w-4 h-4 text-orange-500 focus:ring-orange-500 cursor-pointer"
          />
          <span className="text-gray-700 dark:text-gray-300 group-hover:text-orange-500 transition-colors">
            {cat}
          </span>
        </label>
      ))}
    </div>
  </div>
  
  {/* Price Range */}
  <div className="mb-8">
    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Price Range</h4>
    <div className="space-y-4">
      <div>
        <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Min: $0</label>
        <input 
          type="range" 
          min="0" 
          max="1000" 
          className="w-full accent-orange-500"
        />
      </div>
      <div>
        <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Max: $1000</label>
        <input 
          type="range" 
          min="0" 
          max="1000" 
          className="w-full accent-orange-500"
        />
      </div>
    </div>
  </div>
  
  {/* Rating */}
  <div className="mb-8">
    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Rating</h4>
    <div className="space-y-3">
      {[4, 3, 2, 1].map((rating) => (
        <label key={rating} className="flex items-center gap-3 cursor-pointer group">
          <input 
            type="checkbox" 
            className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500 cursor-pointer"
          />
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < rating ? 'fill-orange-500 text-orange-500' : 'text-gray-300'}`} 
              />
            ))}
            <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">& Up</span>
          </div>
        </label>
      ))}
    </div>
  </div>
</aside>
```

---

## Footer Component

```tsx
<footer className="bg-gray-900 text-white">
  <div className="container mx-auto px-4 py-16">
    {/* Main Footer Content */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
      {/* Brand Column */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl"></div>
          <span className="text-xl font-bold">NovaShop</span>
        </div>
        <p className="text-gray-400 mb-6 leading-relaxed">
          Your trusted destination for premium quality products with exceptional service.
        </p>
        <div className="flex gap-3">
          <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>
      
      {/* Quick Links */}
      <div>
        <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
        <ul className="space-y-3">
          {['About Us', 'Contact', 'Careers', 'Blog'].map((link) => (
            <li key={link}>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Support */}
      <div>
        <h3 className="text-lg font-semibold mb-6">Support</h3>
        <ul className="space-y-3">
          {['Help Center', 'Shipping Info', 'Returns', 'Track Order'].map((link) => (
            <li key={link}>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Newsletter */}
      <div>
        <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
        <p className="text-gray-400 mb-4">Subscribe for exclusive offers</p>
        <div className="flex gap-2">
          <input 
            type="email" 
            placeholder="Your email" 
            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white placeholder-gray-500"
          />
          <button className="px-4 py-2 bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors">
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
    
    {/* Bottom Bar */}
    <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-gray-400 text-sm">© 2024 NovaShop. All rights reserved.</p>
      <div className="flex gap-6">
        <a href="#" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">Privacy</a>
        <a href="#" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">Terms</a>
        <a href="#" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">Cookies</a>
      </div>
    </div>
  </div>
</footer>
```

---

## Additional Utilities

### Loading Spinner
```tsx
<div className="flex items-center justify-center">
  <div className="w-12 h-12 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin"></div>
</div>
```

### Badge/Tag
```tsx
<span className="inline-flex items-center px-3 py-1 bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 text-sm font-semibold rounded-full">
  New
</span>
```

### Alert/Banner
```tsx
<div className="px-4 py-3 bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/30 rounded-xl flex items-center gap-3">
  <AlertCircle className="w-5 h-5 text-orange-500" />
  <p className="text-sm text-orange-900 dark:text-orange-400">
    Limited time offer! Get 20% off your first purchase.
  </p>
</div>
```

---

**Ready to implement! Copy and paste any component into your project.** 🚀
