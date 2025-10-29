# 🚀 Razorpay + iThink Logistics Integration Guide

## Complete Setup for Makario eCommerce Platform

---

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Razorpay Setup](#razorpay-setup)
3. [iThink Logistics Setup](#ithink-logistics-setup)
4. [Backend Configuration](#backend-configuration)
5. [Frontend Configuration](#frontend-configuration)
6. [Running the Application](#running-the-application)
7. [Testing the Flow](#testing-the-flow)
8. [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisites

- Node.js (v16+)
- npm or yarn
- Razorpay Account
- iThink Logistics Account
- Postman (for API testing - optional)

---

## 💳 Razorpay Setup

### Step 1: Create Razorpay Account
1. Go to [https://razorpay.com](https://razorpay.com)
2. Sign up and verify your email
3. Complete KYC verification

### Step 2: Get API Keys
1. Login to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Navigate to **Settings → API Keys**
3. Copy your:
   - **Key ID** (starts with `rzp_test_` or `rzp_live_`)
   - **Key Secret**

### Step 3: Test Mode
- Use **Test Mode** for development
- Test credentials are provided by default
- Switch to **Live Mode** only after thorough testing

---

## 📦 iThink Logistics Setup

### Step 1: Create iThink Account
1. Go to [https://www.ithinklogistics.com](https://www.ithinklogistics.com)
2. Sign up as a seller/shipper
3. Complete business verification

### Step 2: Get API Credentials
1. Login to iThink Dashboard
2. Go to **Settings → API Settings** or **Integration**
3. Copy:
   - **API Key**
   - **Secret Key**
   - **Channel ID** (your company/channel name)
   - **API Endpoint URL**

### Step 3: Configure Warehouse
1. Add your warehouse details in iThink dashboard
2. Note down:
   - Warehouse name
   - Address
   - City, State, Pincode
   - Phone number

---

## ⚙️ Backend Configuration

### Step 1: Install Dependencies
```bash
npm install
```

This will install:
- `express` - Web framework
- `razorpay` - Razorpay SDK
- `axios` - HTTP client
- `cors` - Cross-origin support
- `dotenv` - Environment variables
- `body-parser` - Request parsing

### Step 2: Create `.env` File
Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Edit `.env`:
```
# Razorpay
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_secret_key_here

# iThink Logistics
ITHINK_API_KEY=your_api_key_here
ITHINK_SECRET_KEY=your_secret_key_here
ITHINK_CHANNEL_ID=your_channel_id_here
ITHINK_API_URL=https://pre-alpha.ithinklogistics.com/api_v3/shipments

# Warehouse Info
STORE_NAME=Makario
WAREHOUSE_ADDRESS=Darbhanga, Bihar, India
WAREHOUSE_CITY=Darbhanga
WAREHOUSE_PINCODE=846001
WAREHOUSE_STATE=Bihar
WAREHOUSE_PHONE=9953240031

# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:8080
```

### Step 3: Start Backend Server
```bash
npm run server
```

Or with auto-reload:
```bash
npm run server:dev
```

Expected output:
```
🚀 Server running on http://localhost:5000
📝 Razorpay Key ID: ✅ Configured
📦 iThink API Key: ✅ Configured
```

---

## 🎨 Frontend Configuration

### Step 1: Update `.env` File
Edit `.env` in root directory:

```
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxxxx
VITE_API_URL=http://localhost:5000
```

### Step 2: Start Frontend
```bash
npm run dev
```

Frontend will run on `http://localhost:8080`

---

## 🏃 Running the Application

### Terminal 1: Backend Server
```bash
npm run server:dev
```

### Terminal 2: Frontend Development
```bash
npm run dev
```

### Access the Application
- Frontend: http://localhost:8080
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/api/health

---

## 🧪 Testing the Flow

### Test Scenario: Complete Order with Razorpay + iThink

1. **Add Products to Cart**
   - Go to http://localhost:8080/products
   - Add items to cart

2. **Go to Checkout**
   - Click "Checkout" button
   - Fill shipping information
   - Select "Online Payment (Razorpay)"

3. **Complete Payment**
   - Click "Proceed to Payment"
   - Razorpay modal opens
   - Use test credentials:
     - **Card**: 4111 1111 1111 1111
     - **Expiry**: Any future date (e.g., 12/25)
     - **CVV**: Any 3 digits (e.g., 123)
     - **OTP**: 123456

4. **Verify Results**
   - Payment success message appears
   - Order saved to localStorage
   - Shipment created on iThink Logistics
   - Check iThink dashboard for shipment

### Test Razorpay Payment Credentials
```
Card Number: 4111 1111 1111 1111
Expiry: 12/25
CVV: 123
OTP: 123456
```

### API Endpoints

#### 1. Create Order
```bash
POST http://localhost:5000/api/create-order
Content-Type: application/json

{
  "amount": 1000,
  "currency": "INR",
  "receipt": "ORD-123456"
}
```

#### 2. Verify Payment & Create Shipment
```bash
POST http://localhost:5000/api/verify-payment
Content-Type: application/json

{
  "razorpay_order_id": "order_xxxxx",
  "razorpay_payment_id": "pay_xxxxx",
  "razorpay_signature": "signature_xxxxx",
  "orderDetails": {
    "orderId": "ORD-123456",
    "amount": 1000,
    "products": [
      {
        "id": "1",
        "name": "Premium Makhana",
        "sku": "SKU-001",
        "quantity": 2,
        "price": 500
      }
    ],
    "customer": {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "9999999999",
      "address": "123 Main St",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pincode": "400001"
    }
  }
}
```

#### 3. Health Check
```bash
GET http://localhost:5000/api/health
```

---

## 🐛 Troubleshooting

### Issue: "Razorpay Key ID: ❌ Missing"
**Solution**: Check `.env` file has `RAZORPAY_KEY_ID` set correctly

### Issue: "iThink API Key: ❌ Missing"
**Solution**: Check `.env` file has `ITHINK_API_KEY` and `ITHINK_SECRET_KEY` set

### Issue: CORS Error
**Solution**: Ensure backend is running on port 5000 and frontend on 8080

### Issue: Payment Modal Not Opening
**Solution**: 
- Check Razorpay script is loaded in `index.html`
- Verify `VITE_RAZORPAY_KEY_ID` in `.env`
- Check browser console for errors

### Issue: Shipment Not Created on iThink
**Solution**:
- Verify iThink credentials in `.env`
- Check warehouse details are correct
- Ensure pincode is valid in iThink service area
- Check iThink API endpoint URL

### Issue: "Invalid Signature" Error
**Solution**: 
- Verify `RAZORPAY_KEY_SECRET` is correct
- Ensure payment verification happens on backend only
- Check signature calculation logic

---

## 📊 Order Flow Diagram

```
User → Add to Cart → Checkout
         ↓
    Select Payment Method
         ↓
    Online Payment (Razorpay)
         ↓
    Frontend calls /api/create-order
         ↓
    Backend creates Razorpay order
         ↓
    Razorpay modal opens
         ↓
    User completes payment
         ↓
    Frontend calls /api/verify-payment
         ↓
    Backend verifies signature
         ↓
    Backend calls iThink API
         ↓
    Shipment created on iThink
         ↓
    Order confirmed ✅
```

---

## 🔐 Security Best Practices

1. **Never expose API keys in frontend code**
   - Keep keys in `.env` file
   - Use `VITE_` prefix for frontend variables only

2. **Always verify signatures on backend**
   - Never trust payment data from frontend
   - Verify Razorpay signature using secret key

3. **Use HTTPS in production**
   - Razorpay requires HTTPS for live mode
   - iThink API also requires HTTPS

4. **Validate all input data**
   - Validate pincode before sending to iThink
   - Validate order amount matches cart total

5. **Handle errors gracefully**
   - Show user-friendly error messages
   - Log errors for debugging

---

## 📞 Support

- **Razorpay Support**: https://razorpay.com/support
- **iThink Support**: https://www.ithinklogistics.com/support
- **Documentation**: Check respective dashboards

---

## ✨ Next Steps

1. ✅ Backend server running
2. ✅ Frontend integrated with Razorpay
3. ✅ iThink Logistics integration ready
4. 🔄 Test complete flow
5. 🚀 Deploy to production
6. 📊 Monitor orders and shipments

---

**Last Updated**: 2025-10-24
**Status**: ✅ Ready for Testing

