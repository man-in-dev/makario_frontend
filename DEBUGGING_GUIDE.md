# Debugging Guide - Buy Now Modal Issue

## Steps to Debug

### 1. Open Browser DevTools
- Press `F12` or `Ctrl+Shift+I`
- Go to **Console** tab

### 2. Click Buy Now Button
- Go to Shop page or Home page
- Click "Buy Now" on any product
- Check console for these messages:
  - `"Buy Now clicked - user: [null or user object]"`
  - `"Setting showAuthModal to true"`

### 3. What to Look For

**If you see these logs:**
```
Buy Now clicked - user: null
Setting showAuthModal to true
```
✅ The button handler is working - modal state is being set

**If you don't see these logs:**
❌ The button click is not working - check:
- Is button actually clickable? (not disabled?)
- Is button disabled because product is out of stock?
- Is there a JavaScript error in console?

### 4. Check for Errors
In the Console tab, look for any red errors like:
- `useAuth must be used within an AuthProvider`
- `Cannot read property 'user'`
- `setShowAuthModal is not a function`

### 5. If Modal Still Not Showing
Even if logs appear, if modal doesn't show:

**Check z-index issue:**
- Right-click on page → Inspect
- Look for `<div>` with `z-[99]` or `z-[100]`
- It should appear in the DOM when button is clicked

**Check if modal is rendering:**
- In DevTools Elements tab
- Search for `AuthModal` or `Overlay`
- Should appear when `showAuthModal = true`

---

## Common Issues & Solutions

### Issue: "useAuth must be used within an AuthProvider"
**Solution**: 
- The component is not inside AuthProvider
- Check App.tsx - AuthProvider should wrap all routes
- Status: ✅ Already set up correctly

### Issue: User state is always null
**Solution**:
- User might not be logged in (expected)
- Check if localStorage has `makario_token`
- In console: `localStorage.getItem('makario_token')`

### Issue: Button is disabled
**Solution**:
- Product might be out of stock
- Check the `product.inStock` property
- Button should be enabled if `product.inStock === true`

### Issue: Modal renders but is invisible
**Solution**:
- Check z-index in CSS
- Check if overlay is covering but modal is behind
- Modal should be `z-[99]` (overlay) and `z-[100]` (content)

---

## Console Commands to Test

### Check if user is logged in
```javascript
JSON.parse(localStorage.getItem('makario_user'))
```
Returns: `null` (not logged in) or user object (logged in)

### Check if AuthContext is available
```javascript
// This will show in any component using useAuth
// If error appears in console, context is not set up
```

### Check localStorage token
```javascript
localStorage.getItem('makario_token')
```
Returns: `null` (no token) or token string (logged in)

---

## Expected Behavior

### When NOT logged in and click Buy Now:
1. Console log appears: `"Buy Now clicked - user: null"`
2. Console log appears: `"Setting showAuthModal to true"`
3. Black overlay appears
4. White modal box appears with Login form
5. User can login or switch to signup

### When Logged in and click Buy Now:
1. Console log appears: `"Buy Now clicked - user: {[user object]}"`
2. Console log appears: `"Buy now clicked for product: [product-id]"`
3. Goes directly to /checkout
4. No modal shown

---

## Files to Check

1. **ProductCard.tsx** - Has `handleBuyNow` with logging
2. **FeaturedProductCard.tsx** - Has `handleBuyNow` with logging  
3. **AuthContext.tsx** - Provides `useAuth()` hook
4. **AuthModal.tsx** - The modal component
5. **App.tsx** - AuthProvider wrapping

---

## Next Steps

1. **Clear Console** (Cmd+K or Ctrl+L)
2. **Refresh Page** (F5 or Ctrl+R)
3. **Click Buy Now**
4. **Check console logs** - report what you see

The logs will tell us:
- Is button click detected? → Check logs
- Is state being updated? → Check logs
- Is modal rendering? → Check DOM in DevTools

---

## Quick Checklist

- [ ] Open DevTools Console
- [ ] Click Buy Now button
- [ ] Check for "Buy Now clicked" log
- [ ] Check for "Setting showAuthModal" log
- [ ] Look for any red errors
- [ ] Check if black overlay appears
- [ ] Check if white modal box appears
- [ ] Try logging in through the modal

If all these pass, feature is working! ✅
