# Modal Visibility Fix

## Problem
The Wishlist sidebar and Login popup were not showing when users clicked the respective buttons, even though the cart was working properly.

## Root Cause
Z-index layering issue. The components were using inconsistent z-index values:
- Cart overlay: `z-40`
- Cart sidebar: `z-50`
- Dialog/Sheet overlay: `z-50`
- Dialog/Sheet content: `z-50`

This created stacking context conflicts where modals would render behind the cart or fail to appear.

## Solution
Standardized all z-index values across modals and sidebars:

**Updated Files:**

### 1. `src/components/CartSidebar.tsx`
- Overlay: `z-40` → `z-[99]`
- Sidebar: `z-50` → `z-[100]`

### 2. `src/components/ui/dialog.tsx`
- DialogOverlay: `z-50` → `z-[99]`
- DialogContent: `z-50` → `z-[100]`

### 3. `src/components/ui/sheet.tsx`
- SheetOverlay: `z-50` → `z-[99]`
- SheetContent: `z-50` → `z-[100]`

### 4. `src/components/auth/AuthModal.tsx`
- DialogContent: Added `z-[100]` class
- Background: `bg-transparent` → `bg-white` (for visibility)

## Z-Index Hierarchy
```
Base layer:           z-10 (Header)
Overlay background:   z-[99]
Modal/Sidebar:        z-[100]
```

## Testing
- Click the heart icon to open Wishlist sidebar
- Click the Login button to open Auth modal
- Both should now display properly above all other content
- Cart sidebar remains fully functional

## Files Modified
1. `src/components/CartSidebar.tsx`
2. `src/components/ui/dialog.tsx`
3. `src/components/ui/sheet.tsx`
4. `src/components/auth/AuthModal.tsx`
