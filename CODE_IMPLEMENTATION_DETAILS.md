# Code Implementation Details

## 1. ProductDetail.tsx - Buy Now Handler

### Import Changes
```typescript
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from '../components/auth/AuthModal';
```

### State Addition
```typescript
const [showAuthModal, setShowAuthModal] = useState(false);
const { user } = useAuth();
```

### Handler Update
```typescript
const handleBuyNow = () => {
    if (!user) {
        setShowAuthModal(true);
        return;
    }
    addToCart(displayProduct, quantity);
    navigate('/checkout');
};
```

### Modal Addition (at end of component)
```typescript
{/* Login Modal */}
<AuthModal 
    isOpen={showAuthModal} 
    onClose={() => setShowAuthModal(false)}
    initialView="login"
/>
```

---

## 2. CartComponent.tsx - Proceed to Checkout

### Import Changes
```typescript
import { useState } from 'react';
import { AuthModal } from './auth/AuthModal';
```

### State Addition
```typescript
const [showAuthModal, setShowAuthModal] = useState(false);
```

### Handler Update
```typescript
const handleCheckout = () => {
    if (!user) {
        setShowAuthModal(true);
        return;
    }
    navigate('/checkout');
};
```

### Modal Addition
```typescript
{/* Login Modal */}
<AuthModal 
    isOpen={showAuthModal} 
    onClose={() => setShowAuthModal(false)}
    initialView="login"
/>
```

---

## 3. CartSidebar.tsx - Same Pattern

### Import Changes
```typescript
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from './auth/AuthModal';
```

### State Addition
```typescript
const { user } = useAuth();
const [showAuthModal, setShowAuthModal] = useState(false);
```

### Handler Update
```typescript
const handleCheckout = () => {
    if (!user) {
        setShowAuthModal(true);
        return;
    }
    closeCart();
    navigate('/checkout');
};
```

---

## 4. Checkout.tsx - Redirect for Non-Authenticated Users

### Added Check Before Rendering
```typescript
// Redirect to login if user is not authenticated
if (!user) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto text-center">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">You must login to proceed with checkout.</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button variant="outline" onClick={() => navigate('/signup')}>
              Sign Up
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

---

## 5. ProductCard.tsx - Optional Enhancement

### Import Changes
```typescript
import { useAuth } from '../../contexts/AuthContext';
import { AuthModal } from '../auth/AuthModal';
```

### State Addition
```typescript
const { user } = useAuth();
const [showAuthModal, setShowAuthModal] = useState(false);
```

### Handler Update
```typescript
const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
        setShowAuthModal(true);
        return;
    }
    console.log('Buy now clicked for product:', product.id);
    if (!isInCart(product.id)) {
        addToCart(product);
    }
    navigate('/checkout');
};
```

---

## AuthModal Component Usage

The `AuthModal` component (already existing) is used across all these files:

```typescript
<AuthModal 
    isOpen={showAuthModal}           // Controls visibility
    onClose={() => setShowAuthModal(false)}  // Closes modal
    initialView="login"             // Shows login form first (or "signup")
/>
```

### Features:
- Switches between Login and Signup forms
- Auto-closes on successful authentication
- User persists in AuthContext
- Can switch views without closing modal
- Clean overlay blocking background interaction

---

## Authentication Flow with useAuth Hook

```typescript
const { user } = useAuth();

// user is null if not logged in
if (!user) {
    // Show login required UI
}

// After successful login/signup via AuthModal:
// - AuthContext updates with user object
// - Component re-renders with user data
// - handleCheckout/handleBuyNow can proceed normally
```

---

## State Management Pattern

Each component follows this pattern:

```typescript
// 1. Get user auth state
const { user } = useAuth();

// 2. Manage modal visibility
const [showAuthModal, setShowAuthModal] = useState(false);

// 3. Check auth before navigation
const handleAction = () => {
    if (!user) {
        setShowAuthModal(true);
        return;
    }
    // Proceed with original action
    navigate('/checkout');
};

// 4. Render modal conditionally
<AuthModal 
    isOpen={showAuthModal}
    onClose={() => setShowAuthModal(false)}
    initialView="login"
/>
```

---

## Testing Code Snippets

### Test Non-Authenticated Buy Now
```typescript
// In your test/browser console:
// 1. Open DevTools -> Network tab
// 2. Go to product page
// 3. Click "Buy Now"
// 4. Verify AuthModal appears
// 5. Verify clicking "Login" or "Sign Up" opens respective form
```

### Test Authenticated Flow
```typescript
// 1. Login first via Login page
// 2. Add product to cart
// 3. Click "Buy Now" or "Proceed to Checkout"
// 4. Should go directly to /checkout (no modal)
// 5. Verify checkout form displays with user data pre-filled
```

### Verify AuthContext Integration
```typescript
// In browser console:
// Check if user persists:
JSON.parse(localStorage.getItem('makario_user'));
// Check token:
localStorage.getItem('makario_token');
```

---

## Common Issues & Solutions

### Issue: Modal not appearing
**Check:**
- Is `showAuthModal` state being set to `true`?
- Is `AuthModal` component imported?
- Is modal rendered in JSX?

### Issue: Modal closes immediately
**Check:**
- Is successful login in AuthContext updating `user`?
- Is `onClose` being called prematurely?

### Issue: Button actions not working
**Check:**
- Is `useAuth()` hook imported?
- Is user check happening before navigation?

### Issue: Redirect on Checkout not working
**Check:**
- Is the `if (!user)` check at the right place (before form render)?
- Is it returning the JSX element?
- Does Header/Footer render properly in fallback?

---

## Build Status
✅ Build successful - No TypeScript errors
✅ All imports resolved
✅ All components properly typed
✅ Production build created successfully
