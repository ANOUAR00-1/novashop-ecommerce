# 🚀 NovaShop Quick Debug Reference

## 🔥 Seeing 404? Follow This:

### 1️⃣ Open Console (Press F12)
Look for this:
```
✅ App Initialized Successfully!
```

### 2️⃣ Try These URLs

| URL | Purpose | Expected |
|-----|---------|----------|
| `/test` | Basic routing test | Simple page with path info |
| `/diagnostic` | Full system status | Detailed diagnostics |
| `/` | Homepage | Full application |

### 3️⃣ Check Console Output

**✅ GOOD** - You should see:
```
🔍 NOVASHOP STARTUP VALIDATION
✅ localStorage: Available and working
✅ window: Browser environment detected
✅ routing: Current path: /
✅ react: React is available
✅ ALL VALIDATION CHECKS PASSED

✅ NovaShop App Initialized Successfully!
```

**❌ BAD** - Red errors or missing messages = problem

### 4️⃣ Quick Fixes

```bash
# Clear everything and reload
localStorage.clear(); location.reload();

# Check current path
console.log(window.location.pathname);

# Check if React loaded
console.log('React:', typeof React);
```

## 🎯 Debug Routes

- 🧪 `/test` → Minimal test page (routing check)
- 🔍 `/diagnostic` → Full system diagnostics
- 🏠 `/` → Homepage (main app)
- 📦 `/products` → Product catalog
- 🛒 `/cart` → Shopping cart

## 📋 Checklist

- [ ] Console shows "App Initialized Successfully!"
- [ ] No red errors in console
- [ ] `/test` page loads correctly
- [ ] Can navigate between routes
- [ ] Dark mode toggle works

## 🆘 Common Issues

**Issue**: Stuck on 404
**Fix**: Click "Back to Home" on 404 page or go to `/test`

**Issue**: Console errors
**Fix**: Read the error, check TROUBLESHOOTING.md

**Issue**: Blank screen
**Fix**: Check if JavaScript enabled, try different browser

## 📖 Full Documentation

- `/TROUBLESHOOTING.md` - Detailed troubleshooting
- `/FIX_SUMMARY.md` - Technical details
- `/README.md` - Full documentation

## 💡 Pro Tips

1. **Always check console first** - Most issues show errors there
2. **Use /test for routing issues** - Bypasses complex components
3. **Use /diagnostic for state issues** - Shows full system status
4. **Hard refresh if stuck** - Ctrl+Shift+R (Cmd+Shift+R on Mac)

---

**TL;DR**: Open console (F12), look for errors, try `/test`, then `/diagnostic`, then check TROUBLESHOOTING.md
