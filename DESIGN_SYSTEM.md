# 🎨 NovaShop Design System

## Color Palette

### Primary Colors
```css
--color-dark-gray: #1C1C1C
--color-orange: #FF7A00
--color-white: #F5F5F5
```

### Extended Palette

#### Orange (Primary)
- `orange-50`: #FFF7ED
- `orange-100`: #FFEDD5
- `orange-200`: #FED7AA
- `orange-300`: #FDBA74
- `orange-400`: #FB923C
- `orange-500`: #FF7A00 (Primary)
- `orange-600`: #EA5500
- `orange-700`: #C23D00
- `orange-800`: #9A2F00
- `orange-900`: #7C2400

#### Dark Gray (Secondary)
- `gray-50`: #F9FAFB
- `gray-100`: #F5F5F5 (Background Light)
- `gray-200`: #E5E7EB
- `gray-300`: #D1D5DB
- `gray-400`: #9CA3AF
- `gray-500`: #6B7280
- `gray-600`: #4B5563
- `gray-700`: #374151
- `gray-800`: #1F2937
- `gray-900`: #1C1C1C (Primary Dark)

#### Semantic Colors
- **Success**: #10B981
- **Warning**: #F59E0B
- **Error**: #EF4444
- **Info**: #3B82F6

### Gradients
```css
/* Primary Gradient */
background: linear-gradient(135deg, #FF7A00 0%, #EA5500 100%);

/* Hero Gradient */
background: linear-gradient(135deg, #1C1C1C 0%, #374151 100%);

/* Card Hover Gradient */
background: linear-gradient(180deg, rgba(255,122,0,0.1) 0%, transparent 100%);
```

### Shadows
```css
/* Soft Shadow */
box-shadow: 0 2px 8px rgba(28, 28, 28, 0.08);

/* Medium Shadow */
box-shadow: 0 4px 16px rgba(28, 28, 28, 0.12);

/* Strong Shadow */
box-shadow: 0 8px 32px rgba(28, 28, 28, 0.16);

/* Glow Shadow (CTA) */
box-shadow: 0 4px 24px rgba(255, 122, 0, 0.3);
```

### Button States
```css
/* Primary Button */
Normal: bg-orange-500, shadow-md
Hover: bg-orange-600, shadow-glow, transform scale(1.02)
Active: bg-orange-700, shadow-sm, transform scale(0.98)
Disabled: bg-gray-300, opacity-50, cursor-not-allowed

/* Secondary Button */
Normal: bg-gray-900, text-white
Hover: bg-gray-800, shadow-md
Active: bg-gray-700
Disabled: bg-gray-300, opacity-50
```

---

## Typography

### Option 1: Inter + Poppins (Recommended)
**Best for:** Modern, clean, highly readable e-commerce

```css
/* Headings */
font-family: 'Poppins', sans-serif;
H1: 48px / 700 / 1.2 / -0.02em
H2: 36px / 600 / 1.3 / -0.01em
H3: 28px / 600 / 1.4 / normal
H4: 20px / 600 / 1.5 / normal

/* Body */
font-family: 'Inter', sans-serif;
Body Large: 18px / 400 / 1.6
Body: 16px / 400 / 1.6
Body Small: 14px / 400 / 1.5
Caption: 12px / 400 / 1.4
```

### Option 2: Montserrat + Roboto
**Best for:** Bold, impactful headlines with clean body text

```css
/* Headings */
font-family: 'Montserrat', sans-serif;
H1: 48px / 800 / 1.2 / -0.02em
H2: 36px / 700 / 1.3 / -0.01em
H3: 28px / 600 / 1.4 / normal
H4: 20px / 600 / 1.5 / normal

/* Body */
font-family: 'Roboto', sans-serif;
Body Large: 18px / 400 / 1.6
Body: 16px / 400 / 1.6
Body Small: 14px / 400 / 1.5
Caption: 12px / 400 / 1.4
```

### Option 3: Manrope + SF Pro
**Best for:** Premium, Apple-like aesthetic

```css
/* Headings */
font-family: 'Manrope', sans-serif;
H1: 48px / 800 / 1.2 / -0.02em
H2: 36px / 700 / 1.3 / -0.01em
H3: 28px / 600 / 1.4 / normal
H4: 20px / 600 / 1.5 / normal

/* Body */
font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
Body Large: 18px / 400 / 1.6
Body: 16px / 400 / 1.6
Body Small: 14px / 400 / 1.5
Caption: 12px / 400 / 1.4
```

---

## Spacing System

Based on 4pt grid:

```
4px   (0.5 rem) - xs
8px   (1 rem)   - sm
12px  (1.5 rem) - md
16px  (2 rem)   - lg
24px  (3 rem)   - xl
32px  (4 rem)   - 2xl
48px  (6 rem)   - 3xl
64px  (8 rem)   - 4xl
96px  (12 rem)  - 5xl
128px (16 rem)  - 6xl
```

### Component Spacing
- **Card Padding**: 24px
- **Section Padding**: 64px (desktop), 32px (mobile)
- **Grid Gap**: 24px
- **Button Padding**: 12px 24px
- **Input Padding**: 12px 16px

---

## Border Radius

```
4px   - sm (inputs, tags)
8px   - md (cards, small buttons)
12px  - lg (medium cards)
16px  - xl (product cards)
24px  - 2xl (hero sections, large cards)
9999px - full (pills, circular buttons)
```

---

## Component Library

### 1. Buttons

#### Primary Button
```html
<button class="px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl shadow-md hover:bg-orange-600 hover:shadow-glow transition-all duration-300 hover:scale-102 active:scale-98">
  Add to Cart
</button>
```

#### Secondary Button
```html
<button class="px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl shadow-md hover:bg-gray-800 transition-all duration-300">
  View Details
</button>
```

#### Outline Button
```html
<button class="px-6 py-3 border-2 border-orange-500 text-orange-500 font-semibold rounded-xl hover:bg-orange-50 transition-all duration-300">
  Add to Wishlist
</button>
```

#### Icon Button
```html
<button class="p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-500 transition-all duration-300">
  <svg><!-- Icon --></svg>
</button>
```

### 2. Product Cards

#### Style 1: Standard Card
```html
<div class="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200">
  <div class="relative aspect-square overflow-hidden bg-gray-100">
    <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
    <span class="absolute top-4 right-4 px-3 py-1 bg-orange-500 text-white text-sm font-semibold rounded-full">
      -20%
    </span>
  </div>
  <div class="p-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-2">Product Name</h3>
    <p class="text-sm text-gray-600 mb-4">Category</p>
    <div class="flex items-center justify-between">
      <div>
        <span class="text-2xl font-bold text-gray-900">$49.99</span>
        <span class="text-sm text-gray-400 line-through ml-2">$59.99</span>
      </div>
      <button class="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
        <svg><!-- Cart Icon --></svg>
      </button>
    </div>
  </div>
</div>
```

#### Style 2: Minimal Card
```html
<div class="group">
  <div class="relative aspect-square overflow-hidden rounded-xl bg-gray-100 mb-4">
    <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
  </div>
  <h3 class="text-base font-semibold text-gray-900 mb-1">Product Name</h3>
  <p class="text-lg font-bold text-orange-500">$49.99</p>
</div>
```

#### Style 3: Horizontal Card
```html
<div class="flex gap-4 bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
  <div class="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
    <img class="w-full h-full object-cover" />
  </div>
  <div class="flex-1">
    <h3 class="font-semibold text-gray-900 mb-1">Product Name</h3>
    <p class="text-sm text-gray-600 mb-2">Description...</p>
    <span class="text-lg font-bold text-orange-500">$49.99</span>
  </div>
</div>
```

### 3. Form Inputs

```html
<!-- Text Input -->
<div class="relative">
  <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
  <input 
    type="text" 
    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
    placeholder="Enter your email"
  />
</div>

<!-- Search Bar -->
<div class="relative">
  <input 
    type="search" 
    class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
    placeholder="Search products..."
  />
  <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
    <!-- Search Icon -->
  </svg>
</div>

<!-- Select -->
<select class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none bg-white">
  <option>Select category</option>
</select>
```

### 4. Header/Navbar

```html
<header class="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
  <div class="container mx-auto px-4">
    <div class="flex items-center justify-between h-20">
      <!-- Logo -->
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl"></div>
        <span class="text-2xl font-bold text-gray-900">NovaShop</span>
      </div>
      
      <!-- Nav -->
      <nav class="hidden lg:flex items-center gap-8">
        <a href="#" class="text-gray-700 hover:text-orange-500 font-medium transition-colors">Home</a>
        <a href="#" class="text-gray-700 hover:text-orange-500 font-medium transition-colors">Shop</a>
        <a href="#" class="text-gray-700 hover:text-orange-500 font-medium transition-colors">Categories</a>
        <a href="#" class="text-gray-700 hover:text-orange-500 font-medium transition-colors">About</a>
      </nav>
      
      <!-- Actions -->
      <div class="flex items-center gap-4">
        <button class="p-2 text-gray-700 hover:text-orange-500">
          <svg class="w-6 h-6"><!-- Search --></svg>
        </button>
        <button class="p-2 text-gray-700 hover:text-orange-500 relative">
          <svg class="w-6 h-6"><!-- Cart --></svg>
          <span class="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center">3</span>
        </button>
        <button class="px-6 py-2 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors">
          Sign In
        </button>
      </div>
    </div>
  </div>
</header>
```

### 5. Hero Section

```html
<section class="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white">
  <div class="container mx-auto px-4 py-24">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <span class="inline-block px-4 py-2 bg-orange-500/20 text-orange-400 rounded-full text-sm font-semibold mb-6">
          NEW ARRIVAL
        </span>
        <h1 class="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Discover Premium Products
        </h1>
        <p class="text-xl text-gray-300 mb-8">
          Shop the latest collection with up to 50% off
        </p>
        <div class="flex gap-4">
          <button class="px-8 py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 shadow-glow transition-all">
            Shop Now
          </button>
          <button class="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-gray-900 transition-all">
            Learn More
          </button>
        </div>
      </div>
      <div class="relative h-96">
        <img class="w-full h-full object-cover rounded-2xl" />
      </div>
    </div>
  </div>
</section>
```

### 6. Footer

#### 4-Column Footer
```html
<footer class="bg-gray-900 text-white">
  <div class="container mx-auto px-4 py-16">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
      <!-- Column 1: Brand -->
      <div>
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl"></div>
          <span class="text-xl font-bold">NovaShop</span>
        </div>
        <p class="text-gray-400 mb-6">
          Your trusted destination for premium products
        </p>
        <div class="flex gap-4">
          <a href="#" class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors">
            <svg><!-- Facebook --></svg>
          </a>
          <a href="#" class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors">
            <svg><!-- Twitter --></svg>
          </a>
          <a href="#" class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors">
            <svg><!-- Instagram --></svg>
          </a>
        </div>
      </div>
      
      <!-- Column 2: Shop -->
      <div>
        <h3 class="text-lg font-semibold mb-6">Shop</h3>
        <ul class="space-y-3">
          <li><a href="#" class="text-gray-400 hover:text-orange-500 transition-colors">All Products</a></li>
          <li><a href="#" class="text-gray-400 hover:text-orange-500 transition-colors">New Arrivals</a></li>
          <li><a href="#" class="text-gray-400 hover:text-orange-500 transition-colors">Best Sellers</a></li>
          <li><a href="#" class="text-gray-400 hover:text-orange-500 transition-colors">Sale</a></li>
        </ul>
      </div>
      
      <!-- Column 3: Support -->
      <div>
        <h3 class="text-lg font-semibold mb-6">Support</h3>
        <ul class="space-y-3">
          <li><a href="#" class="text-gray-400 hover:text-orange-500 transition-colors">Help Center</a></li>
          <li><a href="#" class="text-gray-400 hover:text-orange-500 transition-colors">Shipping Info</a></li>
          <li><a href="#" class="text-gray-400 hover:text-orange-500 transition-colors">Returns</a></li>
          <li><a href="#" class="text-gray-400 hover:text-orange-500 transition-colors">Contact Us</a></li>
        </ul>
      </div>
      
      <!-- Column 4: Newsletter -->
      <div>
        <h3 class="text-lg font-semibold mb-6">Newsletter</h3>
        <p class="text-gray-400 mb-4">Subscribe for updates and exclusive offers</p>
        <div class="flex gap-2">
          <input 
            type="email" 
            placeholder="Your email" 
            class="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button class="px-4 py-2 bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors">
            <svg><!-- Arrow --></svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Bottom Bar -->
    <div class="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
      <p class="text-gray-400 text-sm">© 2024 NovaShop. All rights reserved.</p>
      <div class="flex gap-6">
        <a href="#" class="text-gray-400 hover:text-orange-500 text-sm transition-colors">Privacy Policy</a>
        <a href="#" class="text-gray-400 hover:text-orange-500 text-sm transition-colors">Terms of Service</a>
        <a href="#" class="text-gray-400 hover:text-orange-500 text-sm transition-colors">Cookie Policy</a>
      </div>
    </div>
  </div>
</footer>
```

---

## Grid System

### 12-Column Grid
```
Container: max-width: 1280px, padding: 0 16px
Columns: 12
Gutter: 24px
```

### Responsive Breakpoints
```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

---

## Icon Style Guide

### Icon Set: Lucide Icons
- **Size**: 20px (small), 24px (default), 32px (large)
- **Stroke Width**: 2px
- **Style**: Outline/stroke-based
- **Color**: Inherit from parent or use gray-600 / orange-500

### Common Icons
- Cart: Shopping Cart
- Wishlist: Heart
- Search: Search
- User: User
- Menu: Menu
- Close: X
- Arrow: Arrow Right
- Check: Check
- Star: Star (for ratings)

---

## Image Style Guide

### Product Images
- **Aspect Ratio**: 1:1 (square)
- **Format**: WebP (fallback: JPG)
- **Resolution**: 800x800px minimum
- **Background**: White or transparent
- **Optimization**: Compress to <100KB

### Banner Images
- **Aspect Ratio**: 16:9 or 21:9
- **Format**: WebP (fallback: JPG)
- **Resolution**: 1920x1080px minimum
- **Style**: High quality, branded

### Hero Images
- **Aspect Ratio**: 16:9
- **Resolution**: 1920x1080px
- **Style**: Lifestyle, in-context product shots
- **Overlay**: Optional gradient overlay for text readability

---

## Responsive Design

### Mobile (< 768px)
- Single column layouts
- Stack navigation in hamburger menu
- Full-width buttons
- Larger touch targets (min 44px)
- Reduced spacing (16px instead of 24px)

### Tablet (768px - 1024px)
- 2-column layouts for cards
- Horizontal navigation possible
- Optimized spacing (20px)

### Desktop (> 1024px)
- 3-4 column layouts
- Full navigation visible
- Hover states active
- Maximum spacing (24px)

---

## Animation Guidelines

### Transitions
```css
/* Default */
transition: all 0.3s ease;

/* Fast (hover states) */
transition: all 0.2s ease;

/* Slow (page transitions) */
transition: all 0.5s ease;
```

### Hover Effects
- **Scale**: 1.02 - 1.05
- **Shadow**: Increase shadow depth
- **Color**: Darken by 10-20%
- **Transform**: translate, scale, or rotate slightly

---

## Accessibility

- **Contrast Ratio**: Minimum 4.5:1 for text
- **Focus States**: Visible orange-500 ring
- **Alt Text**: All images must have descriptive alt text
- **Keyboard Navigation**: All interactive elements accessible
- **Screen Reader**: ARIA labels on icons

---

## UX Guidelines

### Buttons
- Primary action: Orange (CTA)
- Secondary action: Gray
- Minimum size: 44x44px (touch target)
- Clear labels

### Forms
- Labels above fields
- Error messages below fields
- Success states with green accent
- Inline validation

### Loading States
- Skeleton screens for content
- Spinners for actions
- Progress bars for multi-step

### Empty States
- Illustrative icon or image
- Clear message
- CTA to resolve

---

## Export Assets

### Required Exports
1. **Logo**: SVG + PNG (multiple sizes)
2. **Icons**: SVG sprite
3. **Product placeholders**: 800x800px
4. **Banner templates**: 1920x1080px
5. **Social media graphics**: Various sizes

---

**🎨 Design System Version:** 1.0
**Last Updated:** 2024
**Status:** Ready for Implementation
