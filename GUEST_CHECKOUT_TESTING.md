# 🧪 GUEST CHECKOUT - TESTING GUIDE

## 🎯 QUICK TESTING CHECKLIST

### Test 1: COD Guest Checkout
- [ ] Open http://localhost:8080
- [ ] Make sure you're NOT logged in
- [ ] Add products to cart
- [ ] Click "Checkout"
- [ ] Fill all shipping details:
  - [ ] Full Name
  - [ ] Email
  - [ ] Phone
  - [ ] Address
  - [ ] City
  - [ ] State
  - [ ] Pincode
- [ ] Select "Cash on Delivery"
- [ ] Click "Proceed to Checkout"
- [ ] ✅ Order Confirmation Page should appear
- [ ] ✅ No login modal should appear
- [ ] ✅ Order should be placed successfully

### Test 2: Online Payment Guest Checkout
- [ ] Open http://localhost:8080
- [ ] Make sure you're NOT logged in
- [ ] Add products to cart
- [ ] Click "Checkout"
- [ ] Fill all shipping details
- [ ] Select "Online Payment (Razorpay - UPI, Card, NetBanking)"
- [ ] Click "Proceed to Checkout"
- [ ] ✅ Checkout Modal should appear with two options:
  - [ ] 👤 Continue as Guest
  - [ ] 🔐 Login to Account
- [ ] Click "Continue as Guest"
- [ ] ✅ Razorpay modal should open
- [ ] Use test card: 4111 1111 1111 1111
- [ ] Expiry: 12/25
- [ ] CVV: 123
- [ ] OTP: 123456
- [ ] ✅ Payment should complete
- [ ] ✅ Order Confirmation Page should appear

### Test 3: Online Payment Guest Login
- [ ] Open http://localhost:8080
- [ ] Make sure you're NOT logged in
- [ ] Add products to cart
- [ ] Click "Checkout"
- [ ] Fill all shipping details
- [ ] Select "Online Payment"
- [ ] Click "Proceed to Checkout"
- [ ] ✅ Checkout Modal should appear
- [ ] Click "Login to Account"
- [ ] ✅ Auth modal should open
- [ ] Sign up with new account or login
- [ ] ✅ Razorpay modal should open
- [ ] Complete payment with test card
- [ ] ✅ Order Confirmation Page should appear

### Test 4: Online Payment Logged-In User
- [ ] Open http://localhost:8080
- [ ] Login to your account
- [ ] Add products to cart
- [ ] Click "Checkout"
- [ ] Fill all shipping details
- [ ] Select "Online Payment"
- [ ] Click "Proceed to Checkout"
- [ ] ✅ Razorpay modal should open immediately
- [ ] ✅ No checkout modal should appear
- [ ] Complete payment with test card
- [ ] ✅ Order Confirmation Page should appear

### Test 5: Validation Error
- [ ] Open http://localhost:8080
- [ ] Add products to cart
- [ ] Click "Checkout"
- [ ] Leave shipping details empty
- [ ] Click "Proceed to Checkout"
- [ ] ✅ Error toast should appear: "Please fill all shipping details"
- [ ] ✅ No modal or payment page should appear

---

## 🧪 ADVANCED TESTING

### Test 6: Partial Shipping Details
- [ ] Fill only some shipping details (e.g., name and email only)
- [ ] Click "Proceed to Checkout"
- [ ] ✅ Error toast should appear
- [ ] ✅ Order should not be placed

### Test 7: Guest Order Tracking
- [ ] Place a guest COD order
- [ ] Open browser DevTools (F12)
- [ ] Go to Application → LocalStorage
- [ ] Find "orders" key
- [ ] ✅ Guest order should be saved
- [ ] ✅ userId should be null
- [ ] ✅ userEmail should be guest email

### Test 8: Multiple Guest Orders
- [ ] Place first guest COD order
- [ ] Go back to checkout
- [ ] Place second guest COD order
- [ ] Check localStorage
- [ ] ✅ Both orders should be saved
- [ ] ✅ Both should have different order IDs

### Test 9: Guest to Logged-In
- [ ] Place guest COD order
- [ ] Login to account
- [ ] Place logged-in COD order
- [ ] Check localStorage
- [ ] ✅ Guest order should have userId: null
- [ ] ✅ Logged-in order should have userId: <user_id>

### Test 10: Payment Verification
- [ ] Place guest online payment order
- [ ] Check backend logs
- [ ] ✅ Payment verification should succeed
- [ ] ✅ iThink shipment should be created
- [ ] ✅ Order should be saved with payment details

---

## 📊 EXPECTED RESULTS

### COD Guest Checkout
```
✅ Order placed successfully
✅ Order Confirmation Page shown
✅ No login required
✅ Order saved to localStorage
✅ Status: confirmed
```

### Online Payment Guest Checkout
```
✅ Checkout Modal shown
✅ Guest option available
✅ Razorpay modal opens
✅ Payment processed
✅ Order saved to localStorage
✅ Status: confirmed
```

### Online Payment Guest Login
```
✅ Checkout Modal shown
✅ Login option available
✅ Auth modal opens
✅ Account created/logged in
✅ Razorpay modal opens
✅ Payment processed
✅ Order saved to localStorage
✅ Status: confirmed
```

### Online Payment Logged-In
```
✅ Razorpay modal opens immediately
✅ No checkout modal shown
✅ Payment processed
✅ Order saved to localStorage
✅ Status: confirmed
```

---

## 🔍 DEBUGGING TIPS

### Issue: "Please login to place your order" still showing
**Solution**: 
- Clear browser cache (Ctrl+Shift+Delete)
- Refresh page (Ctrl+F5)
- Check if code changes were saved

### Issue: Checkout modal not appearing
**Solution**:
- Make sure you're NOT logged in
- Make sure Online Payment is selected
- Check browser console for errors

### Issue: Razorpay modal not opening
**Solution**:
- Check if all shipping details are filled
- Check if Online Payment is selected
- Check browser console for errors
- Check backend logs

### Issue: Order not saved
**Solution**:
- Check localStorage (F12 → Application → LocalStorage)
- Check browser console for errors
- Check backend logs

### Issue: Payment not verifying
**Solution**:
- Check backend logs
- Verify Razorpay credentials in .env
- Check payment response in browser console

---

## 📱 MOBILE TESTING

### Test on Mobile Browser
- [ ] Open http://localhost:8080 on mobile
- [ ] Test COD guest checkout
- [ ] Test online payment guest checkout
- [ ] Test validation error
- [ ] ✅ All should work on mobile

### Test on Different Browsers
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

---

## 🎯 FINAL CHECKLIST

- [ ] COD guest checkout works
- [ ] Online payment guest checkout works
- [ ] Guest login option works
- [ ] Logged-in user checkout works
- [ ] Validation error works
- [ ] Orders saved to localStorage
- [ ] Payment verification works
- [ ] Order confirmation page shows
- [ ] No login alert shown
- [ ] Mobile testing passed
- [ ] Browser testing passed

---

## 🚀 READY TO DEPLOY!

All tests passed? Great! Guest checkout is ready for production!

---

**Last Updated**: 2025-10-24

