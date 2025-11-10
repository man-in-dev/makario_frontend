# Modal Debugging Guide

## Issue
Wishlist sidebar and Login popup are not displaying when buttons are clicked.

## Debug Steps Taken

### 1. Added Console Logging
Added `console.log` statements in:
- `Header.tsx` - Wishlist button click handler
- `Header.tsx` - Login button click handler  
- `WishlistSidebar.tsx` - Component render
- `AuthModal.tsx` - Component render

### 2. Added Visual Debug Indicators
Added red/blue overlay divs that will show if the state is properly being set:
- Red overlay appears when wishlist state is true
- Blue overlay appears when auth modal state is true

## To Test:

### Step 1: Open Browser Console
1. Open the app in browser
2. Press F12 to open Developer Tools
3. Go to Console tab

### Step 2: Test Wishlist
1. Click the heart icon in the header
2. Check console for: "Wishlist button clicked"
3. Look for: "WishlistSidebar - isWishlistOpen: true"
4. If console shows "true" but no red overlay appears = Sheet component issue
5. If red overlay appears = Sheet component not rendering

### Step 3: Test Login
1. Click the Login button in the header
2. Check console for: "Login button clicked, setting showAuthModal to true"
3. Look for: "AuthModal - isOpen: true"
4. If console shows "true" but no blue overlay appears = Dialog component issue
5. If blue overlay appears = Dialog component not rendering

## Possible Issues & Solutions

### Issue A: State not updating
- **Symptom**: No console logs appearing
- **Fix**: Check if button onClick handlers are being registered

### Issue B: State updates but components not showing
- **Symptom**: Console shows "true" but no overlay appears
- **Fix**: Sheet/Dialog Radix UI components may need:
  - Check if Radix UI Dialog/Drawer dependencies are correct
  - Check if Portal is rendering to correct DOM location
  - Verify z-index values

### Issue C: Console shows error
- Document the exact error message

## Next Steps
1. Run the app with npm run dev
2. Perform the test steps above
3. Share console output and which overlays appear/don't appear
4. Share any error messages

## Files Modified for Debugging
- `/src/components/Header.tsx` - Added debug logs and overlays
- `/src/components/WishlistSidebar.tsx` - Added debug log
- `/src/components/auth/AuthModal.tsx` - Added debug log
