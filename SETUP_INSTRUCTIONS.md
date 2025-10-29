# 🚀 Setup Instructions - Razorpay + iThink Integration

## ✅ Your Credentials Are Configured!

Your API credentials have been successfully added to the configuration files:

### ✅ Frontend Configuration (`.env`)
```
VITE_RAZORPAY_KEY_ID=rzp_test_RXAojQvSDL4Fe2
VITE_API_URL=http://localhost:5000
```

### ✅ Backend Configuration (`backend.env`)
```
RAZORPAY_KEY_ID=rzp_test_RXAojQvSDL4Fe2
RAZORPAY_KEY_SECRET=mf91Xp7xp4tbYuqk8qXYSNyh
ITHINK_API_KEY=dffdac69328bf82a4f8ef5a1fafddfa8
ITHINK_SECRET_KEY=1843b2b25ace21f83431f2c8b6d630ce
ITHINK_CHANNEL_ID=www.makario.in
```

---

## 🎯 Next Steps

### Step 1: Copy Backend Configuration
```bash
# Copy backend.env to .env for the server to use
cp backend.env .env
```

Or manually create `.env` in the root directory with the content from `backend.env`.

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Backend Server
```bash
# Terminal 1
npm run server:dev
```

You should see:
```
🚀 Server running on http://localhost:5000
📝 Razorpay Key ID: ✅ Configured
📦 iThink API Key: ✅ Configured
```

### Step 4: Start Frontend (New Terminal)
```bash
# Terminal 2
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:8080/
```

### Step 5: Test the Integration

1. **Open Browser**: http://localhost:8080
2. **Add Products to Cart**: Click on products and add to cart
3. **Go to Checkout**: Click checkout button
4. **Fill Shipping Details**: Enter your address
5. **Select Online Payment**: Choose "Online Payment (Razorpay)"
6. **Click "Proceed to Payment"**: Opens Razorpay modal
7. **Use Test Card**:
   - Card: `4111 1111 1111 1111`
   - Expiry: `12/25`
   - CVV: `123`
   - OTP: `123456`
8. **Complete Payment**: Click Pay
9. **Verify Success**: 
   - Order should be saved
   - Shipment should be created on iThink
   - Success message should appear

---

## 🔍 Verification Checklist

### Backend Verification
```bash
# Check if backend is running
curl http://localhost:5000/api/health

# Expected response:
# {"status":"Server is running","timestamp":"2025-10-24T..."}
```

### Frontend Verification
- [ ] Frontend loads at http://localhost:8080
- [ ] Products display correctly
- [ ] Cart functionality works
- [ ] Checkout page loads
- [ ] Razorpay modal opens on payment

### Payment Verification
- [ ] Test payment completes successfully
- [ ] Order is saved to localStorage
- [ ] Shipment appears on iThink dashboard
- [ ] Success message displays

---

## 📊 Expected Flow

```
1. User adds products to cart
   ↓
2. User goes to checkout
   ↓
3. User fills shipping details
   ↓
4. User selects "Online Payment"
   ↓
5. User clicks "Proceed to Payment"
   ↓
6. Frontend calls: POST /api/create-order
   ↓
7. Backend creates Razorpay order
   ↓
8. Razorpay modal opens
   ↓
9. User enters payment details
   ↓
10. Razorpay processes payment
    ↓
11. Frontend calls: POST /api/verify-payment
    ↓
12. Backend verifies signature
    ↓
13. Backend calls iThink API
    ↓
14. iThink creates shipment
    ↓
15. Order confirmed ✅
```

---

## 🐛 Troubleshooting

### Issue: "Cannot find module"
**Solution**: Run `npm install`

### Issue: "CORS error"
**Solution**: Make sure backend is running on port 5000 and frontend on port 8080

### Issue: "Razorpay modal not opening"
**Solution**: 
- Check browser console for errors
- Verify `VITE_RAZORPAY_KEY_ID` in `.env`
- Check if Razorpay script loaded in index.html

### Issue: "Payment verification failed"
**Solution**:
- Check if `RAZORPAY_KEY_SECRET` is correct in backend `.env`
- Verify backend is receiving the payment details
- Check backend logs for errors

### Issue: "Shipment not created on iThink"
**Solution**:
- Verify `ITHINK_API_KEY` and `ITHINK_SECRET_KEY` are correct
- Check if pincode is valid
- Verify `ITHINK_CHANNEL_ID` matches your iThink account
- Check backend logs for iThink API errors

---

## 📝 Important Notes

⚠️ **Security**:
- Never commit `.env` file to git
- Keep API keys confidential
- Use test keys for development
- Switch to live keys only in production

⚠️ **Testing**:
- Use test card: `4111 1111 1111 1111`
- Test mode is enabled by default
- Check iThink dashboard for shipments

⚠️ **Production**:
- Switch Razorpay to live mode
- Update API keys to live keys
- Enable HTTPS
- Update CORS settings
- Setup error logging

---

## 📞 Support

- **Razorpay Support**: https://razorpay.com/support
- **iThink Support**: https://www.ithinklogistics.com/support
- **Documentation**: See other .md files in this directory

---

## ✨ You're Ready!

Everything is configured. Follow the steps above and you'll have a working payment + shipment system in minutes!

**Happy coding! 🚀**

---

**Last Updated**: 2025-10-24
**Status**: ✅ Ready to Test

