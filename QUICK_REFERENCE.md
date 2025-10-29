# 📋 Quick Reference Card

## 🎯 Your Credentials

### Razorpay
```
Key ID:     rzp_test_RXAojQvSDL4Fe2
Key Secret: mf91Xp7xp4tbYuqk8qXYSNyh
Mode:       Test (Development)
```

### iThink Logistics
```
API Key:    dffdac69328bf82a4f8ef5a1fafddfa8
Secret Key: 1843b2b25ace21f83431f2c8b6d630ce
Channel ID: www.makario.in
Store URL:  www.makario.in
```

---

## 🚀 Quick Start Commands

### Terminal 1 - Backend
```bash
# Copy backend configuration
cp backend.env .env

# Install dependencies (first time only)
npm install

# Start backend server
npm run server:dev
```

### Terminal 2 - Frontend
```bash
# Start frontend
npm run dev
```

---

## 🧪 Test Payment Details

```
Card Number: 4111 1111 1111 1111
Expiry:      12/25
CVV:         123
OTP:         123456
```

---

## 🔗 Important URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:8080 |
| Backend | http://localhost:5000 |
| Razorpay Dashboard | https://dashboard.razorpay.com |
| iThink Dashboard | https://www.ithinklogistics.com |
| Health Check | http://localhost:5000/api/health |

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `server.js` | Backend Express server |
| `.env` | Backend configuration |
| `backend.env` | Backend config template |
| `.env` (frontend) | Frontend configuration |
| `src/pages/Checkout.tsx` | Payment integration |
| `index.html` | Razorpay script |

---

## 🔌 API Endpoints

### Create Order
```bash
POST http://localhost:5000/api/create-order
Content-Type: application/json

{
  "amount": 1000,
  "currency": "INR",
  "receipt": "ORD-123"
}
```

### Verify Payment
```bash
POST http://localhost:5000/api/verify-payment
Content-Type: application/json

{
  "razorpay_order_id": "order_xxxxx",
  "razorpay_payment_id": "pay_xxxxx",
  "razorpay_signature": "signature_xxxxx",
  "orderDetails": {
    "orderId": "ORD-123",
    "amount": 1000,
    "products": [...],
    "customer": {...}
  }
}
```

### Health Check
```bash
GET http://localhost:5000/api/health
```

---

## ✅ Verification Steps

1. **Backend Running?**
   ```bash
   curl http://localhost:5000/api/health
   ```

2. **Frontend Running?**
   - Open http://localhost:8080

3. **Razorpay Configured?**
   - Check browser console
   - Look for Razorpay script loaded

4. **iThink Configured?**
   - Check backend logs
   - Look for "✅ Configured" message

---

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| Module not found | `npm install` |
| CORS error | Check ports (5000, 8080) |
| Razorpay modal not opening | Check browser console |
| Payment verification failed | Check RAZORPAY_KEY_SECRET |
| Shipment not created | Check iThink credentials |

---

## 📊 Payment Flow

```
1. User adds products
2. User goes to checkout
3. User selects "Online Payment"
4. User clicks "Proceed to Payment"
5. Razorpay modal opens
6. User enters payment details
7. Payment processed
8. Backend verifies signature
9. Backend creates shipment on iThink
10. Order confirmed ✅
```

---

## 🔐 Security Checklist

- [ ] API keys in `.env` file
- [ ] `.env` not committed to git
- [ ] HTTPS enabled (production)
- [ ] CORS properly configured
- [ ] Signature verification enabled
- [ ] Error logging enabled

---

## 📞 Support Links

- **Razorpay**: https://razorpay.com/support
- **iThink**: https://www.ithinklogistics.com/support
- **Documentation**: See other .md files

---

## 🎊 Next Steps

1. ✅ Copy `backend.env` to `.env`
2. ✅ Run `npm install`
3. ✅ Start backend: `npm run server:dev`
4. ✅ Start frontend: `npm run dev`
5. ✅ Test payment flow
6. ✅ Check iThink dashboard

---

**Status**: ✅ Ready to Test
**Last Updated**: 2025-10-24

