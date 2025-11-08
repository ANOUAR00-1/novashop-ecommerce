# NovaShop Troubleshooting Guide

## 🔍 Getting a 404 Error on Homepage?

If you're seeing the "404 Page Not Found" screen when trying to access the application, follow these steps:

### Step 1: Check Browser Console

1. Open your browser's Developer Tools (Press `F12` or `Ctrl+Shift+I` / `Cmd+Option+I`)
2. Go to the **Console** tab
3. Look for the NovaShop initialization messages

You should see output like:
```
==================================================
🔍 NOVASHOP STARTUP VALIDATION
==================================================
✅ localStorage: Available and working
✅ window: Browser environment detected
✅ routing: Current path: /
✅ react: React is available
==================================================
✅ ALL VALIDATION CHECKS PASSED

==================================================
✅ NovaShop App Initializing...
==================================================
📍 Current Path: /
🌐 Full URL: http://localhost:...
🏪 Redux Store State: ...
==================================================
✅ App Initialized Successfully!
```

### Step 2: Test Basic Routing

Try these URLs to verify routing works:

1. **Test Page**: `/test` - Simple page that should always work
2. **Diagnostic Page**: `/diagnostic` - Full system status
3. **Homepage**: `/` - Main application

### Step 3: Check for Common Issues

#### Issue: Seeing 404 on root path (`/`)

**Solution**: 
- Click the "Back to Home" button on the 404 page
- Or manually navigate to `/` in the URL bar
- Check console for errors during HomePage rendering

#### Issue: Console shows errors

**Solution**:
- Read the error message carefully
- Check if it's related to:
  - Missing imports
  - API/Network errors
  - Component rendering errors
- Look for red error messages in the console

#### Issue: Nothing renders at all

**Solution**:
- Check if JavaScript is enabled in your browser
- Clear browser cache and hard reload (`Ctrl+Shift+R` / `Cmd+Shift+R`)
- Try a different browser
- Check if you have any browser extensions blocking scripts

### Step 4: Use Diagnostic Tools

Visit `/diagnostic` to see full system status including:
- Redux store state
- Authentication status
- Theme settings
- Available routes
- Environment information

### Step 5: Common Fixes

#### Clear Local Storage
```javascript
// Run in browser console:
localStorage.clear();
location.reload();
```

#### Hard Refresh
- Windows/Linux: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

#### Check Route Structure

The application has these main routes:

**Public Routes** (No authentication required):
- `/` - Homepage
- `/products` - Product catalog
- `/products/:id` - Product details
- `/cart` - Shopping cart
- `/login` - Login page
- `/register` - Registration
- `/test` - Test page (for debugging)
- `/diagnostic` - System diagnostics

**Protected Routes** (Authentication required):
- `/checkout` - Checkout process
- `/profile` - User profile
- `/orders` - Order history
- `/wishlist` - Wishlist

**Admin Routes** (Admin role required):
- `/admin` - Admin dashboard
- `/admin/products` - Product management
- `/admin/orders` - Order management
- `/admin/users` - User management
- `/admin/coupons` - Coupon management
- `/admin/analytics` - Analytics

### Step 6: Verify Components Load

Check the console for these log messages indicating components are mounting:

```
🏗️ MainLayout: Component mounted
🏠 HomePage: Component mounted
✅ TestPage: Rendering (if on /test)
```

If you don't see these messages, there may be an error preventing components from mounting.

## 🐛 Known Issues

### Issue 1: First Load Shows 404

**Cause**: Sometimes the router needs a moment to initialize

**Fix**: 
- Refresh the page
- Navigate using the links on the 404 page

### Issue 2: Dark Mode Not Working

**Cause**: ThemeContext not initializing properly

**Fix**:
```javascript
// Run in browser console:
localStorage.setItem('novashop_theme', 'light');
location.reload();
```

### Issue 3: Redux Store Shows 0 Products

**Cause**: This is normal - products load on demand

**Fix**: Navigate to `/products` page - products will load automatically

## 📊 Diagnostic Information

### Check Redux Store State

Open console and run:
```javascript
// This is logged automatically on app init
// Look for: "🏪 Redux Store State:"
```

### Check Current Route

Open console and run:
```javascript
console.log('Current Path:', window.location.pathname);
console.log('Full URL:', window.location.href);
```

### Verify App Initialized

Look for this message in console:
```
✅ App Initialized Successfully!
```

## 🆘 Still Having Issues?

If none of the above solutions work:

1. **Check the browser console** - Most issues will show error messages there
2. **Try the /test route** - If this works, routing is fine, issue is with HomePage
3. **Try the /diagnostic route** - Shows detailed system status
4. **Check Network tab** - Look for failed requests (F12 → Network tab)
5. **Try incognito/private mode** - Rules out extension conflicts
6. **Try a different browser** - Rules out browser-specific issues

## 📝 Reporting Issues

When reporting an issue, please include:

1. **Current URL** - The full URL you're accessing
2. **Console output** - Any errors or warnings from browser console
3. **Steps to reproduce** - What you did before the error occurred
4. **Browser info** - Browser name and version
5. **Screenshots** - If possible, screenshot of the error

## ✅ Expected Behavior

When the app loads correctly, you should:

1. See the NovaShop homepage with:
   - Header with logo and navigation
   - Hero section with "Welcome to NovaShop"
   - Featured products grid
   - Category cards
   - Footer with links

2. Console should show:
   - Validation checks passing
   - App initialized message
   - Current path and URL
   - Redux store state
   - No error messages

3. Be able to:
   - Click navigation links
   - Browse products
   - Add items to cart
   - Toggle dark/light mode
   - Login/Register

---

**Last Updated**: November 2024
**App Version**: 1.0.0
