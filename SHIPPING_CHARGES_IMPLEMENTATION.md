# Dynamic Shipping Charges Implementation

## Overview
Shipping charges now dynamically increase based on the total number of items in the cart, rather than using a flat ₹50 charge.

## Shipping Tier Pricing

| Items Count | Shipping Charge |
|-------------|-----------------|
| 1-4 items   | ₹50             |
| 5-9 items   | ₹99             |
| 10-14 items | ₹149            |
| 15-19 items | ₹199            |
| 20+ items   | ₹199 + additional charges |

## Files Modified

### 1. **src/utils/shippingCalculator.ts** (NEW)
- Core utility for calculating shipping charges
- `calculateShippingCharge(totalItems)` - Returns shipping cost based on item count
- `getShippingTiers()` - Returns array of tier information for display

### 2. **src/contexts/CartContext.tsx**
- Added `getShippingCharge()` method to CartContext
- Automatically calculates shipping based on total items in cart
- Returns the appropriate shipping charge for the current cart

### 3. **src/pages/Checkout.tsx**
- Updated to use `getShippingCharge()` instead of hardcoded ₹50
- Displays shipping charge with item count: "Shipping (5 items) ₹99"
- Correctly calculates final total with dynamic shipping

### 4. **src/components/CartComponent.tsx**
- Shows actual shipping charges instead of "Free"
- Updates automatically when cart items change
- Displays correct total with shipping included

### 5. **src/components/CartSidebar.tsx**
- Added shipping breakdown in cart summary
- Shows subtotal, shipping, and total
- Updates in real-time as items are added/removed

## How It Works

1. **Item Counting**: When items are added to/removed from cart, `getTotalItems()` is calculated
2. **Shipping Calculation**: The shipping charge is automatically calculated based on total items
3. **Real-time Updates**: All components display the correct shipping charge
4. **Order Creation**: When orders are placed, the correct shipping charge is sent to the backend

## Usage Example

```typescript
import { useCart } from '../contexts/CartContext';
import { calculateShippingCharge } from '../utils/shippingCalculator';

const MyComponent = () => {
  const { getTotalItems, getShippingCharge } = useCart();
  
  const items = getTotalItems();           // e.g., 7
  const shipping = getShippingCharge();    // e.g., ₹99
  
  return <div>Shipping: ₹{shipping}</div>;
};
```

## Testing Checklist

- [ ] Add 1-4 items → Verify ₹50 shipping
- [ ] Add 5-9 items → Verify ₹99 shipping
- [ ] Add 10-14 items → Verify ₹149 shipping
- [ ] Add 15-19 items → Verify ₹199 shipping
- [ ] Add 20+ items → Verify ₹199+ shipping
- [ ] Check cart page shows correct shipping
- [ ] Check cart sidebar shows correct shipping
- [ ] Check checkout page shows correct shipping
- [ ] Verify order creation with correct shipping charge
- [ ] Test that shipping updates as items are added/removed

## Notes

- The shipping calculator is independent and can be used anywhere in the app
- Backend API should expect the `shippingCharge` value from the order payload
- Coupons/discounts are applied AFTER shipping calculation
- Empty cart (0 items) returns ₹0 shipping
