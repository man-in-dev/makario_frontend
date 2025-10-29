# ⚡ Quick Start Guide - Razorpay + iThink Integration

## 🎯 5-Minute Setup

### Step 1: Get Your API Keys (2 minutes)

#### Razorpay Keys
1. Go to https://dashboard.razorpay.com/app/keys
2. Copy **Key ID** and **Key Secret**

#### iThink Keys
1. Go to https://www.ithinklogistics.com (login)
2. Go to Settings → API Settings
3. Copy **API Key**, **Secret Key**, and **Channel ID**

---

### Step 2: Configure Environment (1 minute)

Create `.env` file in root directory:

```bash
# Copy this and fill in your keys
RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_HERE
RAZORPAY_KEY_SECRET=YOUR_SECRET_HERE

ITHINK_API_KEY=YOUR_API_KEY_HERE
ITHINK_SECRET_KEY=YOUR_SECRET_KEY_HERE
ITHINK_CHANNEL_ID=YOUR_CHANNEL_ID_HERE
ITHINK_API_URL=https://pre-alpha.ithinklogistics.com/api_v3/shipments

STORE_NAME=Makario
WAREHOUSE_ADDRESS=Darbhanga, Bihar, India
WAREHOUSE_CITY=Darbhanga
WAREHOUSE_PINCODE=846001
WAREHOUSE_STATE=Bihar
WAREHOUSE_PHONE=9953240031

PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:8080
```

---

### Step 3: Install & Run (2 minutes)

#### Terminal 1: Backend
```bash
npm install
npm run server:dev
```

Expected output:
```
🚀 Server running on http://localhost:5000
📝 Razorpay Key ID: ✅ Configured
📦 iThink API Key: ✅ Configured
```

#### Terminal 2: Frontend
```bash
npm run dev
```

Expected output:
```
VITE v5.4.19  ready in 234 ms

➜  Local:   http://localhost:8080/
```

---

## 🧪 Test the Integration

### 1. Add Products to Cart
- Go to http://localhost:8080/products
- Add items to cart

### 2. Checkout
- Click "Checkout"
- Fill shipping details
- Select "Online Payment (Razorpay)"

### 3. Complete Payment
- Click "Proceed to Payment"
- Use test card: **4111 1111 1111 1111**
- Expiry: **12/25**
- CVV: **123**
- OTP: **123456**

### 4. Verify Success
- ✅ Payment success message
- ✅ Order saved
- ✅ Shipment created on iThink

---

## 📊 What Happens Behind the Scenes

```
1. User clicks "Proceed to Payment"
   ↓
2. Frontend calls: POST /api/create-order
   ↓
3. Backend creates Razorpay order
   ↓
4. Razorpay modal opens
   ↓
5. User enters payment details
   ↓
6. Payment processed by Razorpay
   ↓
7. Frontend calls: POST /api/verify-payment
   ↓
8. Backend verifies signature
   ↓
9. Backend calls iThink API
   ↓
10. Shipment created on iThink
   ↓
11. Order confirmed ✅
```

---

## 🔍 Check Status

### Backend Health
```bash
curl http://localhost:5000/api/health
```

### Check Logs
- Backend logs show in Terminal 1
- Frontend logs show in Terminal 2

---

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| "Cannot find module 'express'" | Run `npm install` |
| "RAZORPAY_KEY_ID is missing" | Check `.env` file |
| "CORS error" | Ensure backend runs on 5000, frontend on 8080 |
| "Payment modal not opening" | Check browser console for errors |
| "Shipment not created" | Verify iThink credentials and pincode |

---

## 📁 File Structure

```
makario/
├── server.js                    ← Backend server
├── .env                         ← Your API keys (create this)
├── .env.example                 ← Template
├── package.json                 ← Dependencies
├── src/
│   ├── pages/
│   │   └── Checkout.tsx        ← Updated with Razorpay
│   └── ...
├── index.html                   ← Razorpay script added
├── RAZORPAY_ITHINK_SETUP.md    ← Full setup guide
├── API_REFERENCE.md             ← API documentation
└── QUICK_START.md              ← This file
```

---

## 🚀 Next Steps

1. ✅ Setup complete
2. ✅ Backend running
3. ✅ Frontend running
4. 🧪 Test payment flow
5. 📊 Monitor orders
6. 🌐 Deploy to production

---

## 📞 Need Help?

- **Razorpay Docs**: https://razorpay.com/docs/
- **iThink Docs**: https://www.ithinklogistics.com/api-documentation
- **Check logs**: Look at terminal output for errors

---

## ✨ Features Enabled

✅ Razorpay payment gateway
✅ Multiple payment methods (UPI, Card, NetBanking)
✅ Automatic shipment creation on iThink
✅ Order tracking
✅ Payment verification
✅ Error handling

---

**Ready to go! 🎉**

Start with Step 1 above and you'll be processing payments in 5 minutes!

