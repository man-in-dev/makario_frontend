# 🧪 TESTING GUIDE - Razorpay + iThink Integration

## ✅ SERVERS ARE RUNNING!

Both backend and frontend servers are now running and ready for testing!

---

## 🌐 Access Points

| Service | URL | Status |
|---------|-----|--------|
| **Frontend** | http://localhost:8080 | ✅ Running |
| **Backend** | http://localhost:5000 | ✅ Running |
| **Health Check** | http://localhost:5000/api/health | ✅ Ready |

---

## 🧪 Complete Testing Workflow

### Step 1: Browse Products
1. Open http://localhost:8080 in your browser
2. You should see the Makario eCommerce platform
3. Browse through available products
4. Look for "Add to Cart" buttons

### Step 2: Add Products to Cart
1. Click on any product
2. Click "Add to Cart" button
3. Repeat for multiple products (optional)
4. You should see cart count increase

### Step 3: Go to Checkout
1. Click "Checkout" button (usually in header or cart)
2. You should see the checkout page
3. Review your cart items

### Step 4: Fill Shipping Details
Fill in the following information:
```
Full Name:    Your Name
Email:        your.email@example.com
Phone:        9999999999
Address:      123 Main Street
City:         Mumbai
State:        Maharashtra
Pincode:      400001
```

### Step 5: Select Payment Method
1. Look for payment method options
2. Select "Online Payment (Razorpay)"
3. You should see Razorpay option selected

### Step 6: Proceed to Payment
1. Click "Proceed to Payment" button
2. Razorpay modal should open
3. You should see payment form

### Step 7: Enter Test Card Details
When Razorpay modal opens, enter:
```
Card Number: 4111 1111 1111 1111
Expiry:      12/25
CVV:         123
OTP:         123456
```

### Step 8: Complete Payment
1. Click "Pay" button
2. Wait for payment processing
3. You should see success message

### Step 9: Verify Order
After successful payment:
1. Order should be saved
2. You should see order confirmation
3. Check browser console for any errors

### Step 10: Verify Shipment
1. Go to iThink Logistics dashboard
2. Login with your credentials
3. Check if shipment was created
4. Look for your order ID

---

## 🔍 Verification Checklist

### Frontend Verification
- [ ] Frontend loads at http://localhost:8080
- [ ] Products display correctly
- [ ] Cart functionality works
- [ ] Checkout page loads
- [ ] Shipping form displays
- [ ] Payment method options show
- [ ] Razorpay modal opens

### Backend Verification
- [ ] Backend running on http://localhost:5000
- [ ] Health check returns success
- [ ] Backend logs show no errors
- [ ] Razorpay Key ID configured
- [ ] iThink API Key configured

### Payment Verification
- [ ] Test card accepted
- [ ] Payment processes successfully
- [ ] Backend verifies signature
- [ ] No CORS errors
- [ ] Success message displays

### Shipment Verification
- [ ] Shipment created on iThink
- [ ] Order ID matches
- [ ] AWB generated
- [ ] Shipment appears in dashboard

---

## 📊 Expected Responses

### Health Check Response
```bash
curl http://localhost:5000/api/health
```

Expected:
```json
{
  "status": "Server is running",
  "timestamp": "2025-10-24T10:30:00.000Z"
}
```

### Create Order Response
```json
{
  "success": true,
  "order": {
    "id": "order_xxxxx",
    "amount": 100000,
    "currency": "INR",
    "receipt": "ORD-123"
  }
}
```

### Verify Payment Response
```json
{
  "success": true,
  "message": "Payment verified & Shipment created successfully",
  "payment": {
    "razorpay_order_id": "order_xxxxx",
    "razorpay_payment_id": "pay_xxxxx"
  },
  "shipment": {
    "shipment_id": "xxxxx",
    "awb": "xxxxx"
  }
}
```

---

## 🐛 Troubleshooting

### Issue: Frontend not loading
**Solution**:
- Check if frontend is running: `npm run dev`
- Check port 8080 is not in use
- Clear browser cache
- Try incognito mode

### Issue: Razorpay modal not opening
**Solution**:
- Check browser console for errors
- Verify Razorpay script loaded
- Check VITE_RAZORPAY_KEY_ID in .env
- Check network tab for failed requests

### Issue: Payment verification failed
**Solution**:
- Check backend logs for errors
- Verify RAZORPAY_KEY_SECRET is correct
- Check if signature validation is working
- Try payment again

### Issue: Shipment not created
**Solution**:
- Check backend logs for iThink errors
- Verify iThink credentials are correct
- Check if pincode is valid
- Verify ITHINK_CHANNEL_ID matches account
- Check iThink API status

### Issue: CORS error
**Solution**:
- Make sure backend on port 5000
- Make sure frontend on port 8080
- Check CORS configuration in server.js
- Check browser console for details

---

## 📝 Test Scenarios

### Scenario 1: Successful Payment
1. Add products
2. Checkout
3. Fill details
4. Select online payment
5. Use test card
6. Complete payment
7. ✅ Order confirmed

### Scenario 2: Failed Payment
1. Add products
2. Checkout
3. Fill details
4. Select online payment
5. Use invalid card
6. ❌ Payment fails
7. Error message shows

### Scenario 3: COD Payment
1. Add products
2. Checkout
3. Fill details
4. Select COD
5. Place order
6. ✅ Order confirmed (no payment)

---

## 📊 Monitoring

### Backend Logs
Watch Terminal 3 for:
- Order creation logs
- Payment verification logs
- iThink API calls
- Error messages

### Frontend Logs
Watch Terminal 4 for:
- Build messages
- Hot reload updates
- Error messages

### Browser Console
Press F12 to open DevTools and check:
- Network requests
- Console errors
- Payment flow logs

---

## 🎯 Success Indicators

✅ **Frontend**
- Page loads without errors
- Products display
- Cart works
- Checkout form displays

✅ **Backend**
- Server starts without errors
- Health check responds
- Razorpay configured
- iThink configured

✅ **Payment**
- Razorpay modal opens
- Payment processes
- Signature verified
- Success message shows

✅ **Shipment**
- Shipment created on iThink
- AWB generated
- Order appears in dashboard

---

## 📞 Support

- **Razorpay**: https://razorpay.com/support
- **iThink**: https://www.ithinklogistics.com/support
- **Documentation**: See other .md files

---

## 🎉 Ready to Test!

Everything is set up and running. Start testing the payment flow now!

**Happy testing! 🚀**

---

**Status**: ✅ READY TO TEST
**Backend**: ✅ RUNNING
**Frontend**: ✅ RUNNING
**Last Updated**: 2025-10-24

