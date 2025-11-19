# 🔍 VS Code Find & Replace Commands

Use these in VS Code (Ctrl+Shift+H for Find & Replace in Files)

## Quick Reference

**Search in:** `components, pages, layouts, contexts`  
**File pattern:** `*.tsx, *.ts, *.jsx, *.js`

---

## Color Replacements (Do in this order)

### 1. Background Colors
```
Find: bg-blue-600
Replace: bg-orange-500

Find: bg-blue-50
Replace: bg-orange-50

Find: bg-blue-900/20
Replace: bg-orange-500/10
```

### 2. Text Colors
```
Find: text-blue-600
Replace: text-orange-500

Find: text-blue-400
Replace: text-orange-400
```

### 3. Hover States
```
Find: hover:text-blue-600
Replace: hover:text-orange-500

Find: hover:bg-blue-50
Replace: hover:bg-orange-50

Find: hover:bg-blue-900/20
Replace: hover:bg-orange-500/10
```

### 4. Border Colors
```
Find: border-blue-400
Replace: border-orange-500

Find: hover:border-blue-400
Replace: hover:border-orange-500
```

### 5. Gradients (Blue → Orange)
```
Find: from-blue-600
Replace: from-orange-500

Find: to-purple-600
Replace: to-orange-600

Find: via-purple-600
Replace: via-orange-500
```

### 6. Hero Gradients (Blue → Dark Gray)
```
Find: from-blue-900/80
Replace: from-gray-900/90

Find: via-purple-900/70
Replace: via-gray-800/80

Find: from-pink-900/80
Replace: from-gray-900/90

Find: via-rose-900/70
Replace: via-gray-800/80

Find: from-indigo-900/80
Replace: from-gray-900/90

Find: via-blue-900/70
Replace: via-gray-800/80
```

### 7. Focus/Ring Colors
```
Find: ring-blue-500
Replace: ring-orange-500

Find: focus:ring-blue-500
Replace: focus:ring-orange-500

Find: focus:border-blue-500
Replace: focus:border-orange-500
```

---

## Option 1: Run PowerShell Script (RECOMMENDED)

```powershell
# Open PowerShell in project root and run:
.\update-colors.ps1
```

## Option 2: Manual VS Code Replace

1. Press `Ctrl+Shift+H` (Find & Replace in Files)
2. Enter each Find/Replace pair above
3. Click "Replace All" for each
4. Review changes before committing

---

**Estimated Time:** 
- PowerShell Script: 10 seconds ⚡
- Manual Replace: 15-20 minutes
