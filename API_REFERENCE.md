# 🔌 API Reference - Razorpay + iThink Integration

## Base URL
```
http://localhost:5000
```

---

## 📋 Endpoints

### 1️⃣ Create Razorpay Order

**Endpoint**: `POST /api/create-order`

**Description**: Creates a Razorpay order for payment processing

**Request Body**:
```json
{
  "amount": 1000,
  "currency": "INR",
  "receipt": "ORD-1234567890"
}
```

**Response (Success)**:
```json
{
  "success": true,
  "order": {
    "id": "order_MxxxxxxxxxxxxxxxY",
    "entity": "order",
    "amount": 100000,
    "amount_paid": 0,
    "amount_due": 100000,
    "currency": "INR",
    "receipt": "ORD-1234567890",
    "status": "created",
    "attempts": 0,
    "notes": [],
    "created_at": 1234567890
  }
}
```

**Response (Error)**:
```json
{
  "success": false,
  "error": "Amount is required"
}
```

**cURL Example**:
```bash
curl -X POST http://localhost:5000/api/create-order \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 1000,
    "currency": "INR",
    "receipt": "ORD-1234567890"
  }'
```

---

### 2️⃣ Verify Payment & Create Shipment

**Endpoint**: `POST /api/verify-payment`

**Description**: Verifies Razorpay payment signature and creates shipment on iThink Logistics

**Request Body**:
```json
{
  "razorpay_order_id": "order_MxxxxxxxxxxxxxxxY",
  "razorpay_payment_id": "pay_MxxxxxxxxxxxxxxxY",
  "razorpay_signature": "signature_hash_here",
  "orderDetails": {
    "orderId": "ORD-1234567890",
    "amount": 1000,
    "products": [
      {
        "id": "prod_1",
        "name": "Premium Makhana 1kg",
        "sku": "SKU-001",
        "quantity": 2,
        "price": 500
      }
    ],
    "customer": {
      "name": "Rajesh Kumar",
      "email": "rajesh@example.com",
      "phone": "9999999999",
      "address": "123 Main Street",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pincode": "400001"
    }
  }
}
```

**Response (Success)**:
```json
{
  "success": true,
  "message": "Payment verified & Shipment created successfully",
  "payment": {
    "razorpay_order_id": "order_MxxxxxxxxxxxxxxxY",
    "razorpay_payment_id": "pay_MxxxxxxxxxxxxxxxY"
  },
  "shipment": {
    "status": "success",
    "shipment_id": "SHP-123456",
    "awb": "AWB123456789",
    "message": "Shipment created successfully"
  }
}
```

**Response (Error - Invalid Signature)**:
```json
{
  "success": false,
  "message": "Invalid Signature - Payment verification failed"
}
```

**Response (Error - iThink API)**:
```json
{
  "success": false,
  "message": "Error processing payment",
  "error": "Invalid pincode or address"
}
```

**cURL Example**:
```bash
curl -X POST http://localhost:5000/api/verify-payment \
  -H "Content-Type: application/json" \
  -d '{
    "razorpay_order_id": "order_MxxxxxxxxxxxxxxxY",
    "razorpay_payment_id": "pay_MxxxxxxxxxxxxxxxY",
    "razorpay_signature": "signature_hash_here",
    "orderDetails": {
      "orderId": "ORD-1234567890",
      "amount": 1000,
      "products": [
        {
          "id": "prod_1",
          "name": "Premium Makhana",
          "sku": "SKU-001",
          "quantity": 1,
          "price": 1000
        }
      ],
      "customer": {
        "name": "Rajesh Kumar",
        "email": "rajesh@example.com",
        "phone": "9999999999",
        "address": "123 Main Street",
        "city": "Mumbai",
        "state": "Maharashtra",
        "pincode": "400001"
      }
    }
  }'
```

---

### 3️⃣ Health Check

**Endpoint**: `GET /api/health`

**Description**: Checks if server is running and APIs are configured

**Response**:
```json
{
  "status": "Server is running",
  "timestamp": "2025-10-24T10:30:00.000Z"
}
```

**cURL Example**:
```bash
curl http://localhost:5000/api/health
```

---

## 🔐 Error Codes

| Code | Message | Solution |
|------|---------|----------|
| 400 | Amount is required | Include `amount` in request body |
| 400 | Invalid Signature | Verify payment signature is correct |
| 500 | Error creating Razorpay order | Check Razorpay credentials in `.env` |
| 500 | Error processing payment | Check iThink credentials and pincode validity |

---

## 📊 Request/Response Flow

```
Frontend
   ↓
POST /api/create-order
   ↓
Backend creates Razorpay order
   ↓
Returns order ID to frontend
   ↓
Frontend opens Razorpay modal
   ↓
User completes payment
   ↓
Frontend receives payment details
   ↓
POST /api/verify-payment
   ↓
Backend verifies signature
   ↓
Backend calls iThink API
   ↓
Shipment created
   ↓
Returns success response
   ↓
Frontend shows confirmation
```

---

## 🧪 Testing with Postman

### Import Collection
1. Open Postman
2. Create new collection "Makario API"
3. Add requests below

### Request 1: Create Order
```
Method: POST
URL: http://localhost:5000/api/create-order
Headers:
  Content-Type: application/json
Body (raw):
{
  "amount": 1000,
  "currency": "INR",
  "receipt": "ORD-TEST-001"
}
```

### Request 2: Verify Payment
```
Method: POST
URL: http://localhost:5000/api/verify-payment
Headers:
  Content-Type: application/json
Body (raw):
{
  "razorpay_order_id": "order_xxxxx",
  "razorpay_payment_id": "pay_xxxxx",
  "razorpay_signature": "signature_xxxxx",
  "orderDetails": {
    "orderId": "ORD-TEST-001",
    "amount": 1000,
    "products": [
      {
        "id": "1",
        "name": "Test Product",
        "sku": "TEST-001",
        "quantity": 1,
        "price": 1000
      }
    ],
    "customer": {
      "name": "Test User",
      "email": "test@example.com",
      "phone": "9999999999",
      "address": "Test Address",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pincode": "400001"
    }
  }
}
```

---

## 🔑 Environment Variables Required

```
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
ITHINK_API_KEY=your_api_key_here
ITHINK_SECRET_KEY=your_secret_key_here
ITHINK_CHANNEL_ID=your_channel_id_here
ITHINK_API_URL=https://pre-alpha.ithinklogistics.com/api_v3/shipments
PORT=5000
```

---

## 📝 Notes

- All amounts are in **paise** (1 INR = 100 paise)
- Razorpay signature verification is **mandatory**
- iThink API requires valid pincode
- All timestamps are in **ISO 8601** format
- Requests must include `Content-Type: application/json` header

---

**Last Updated**: 2025-10-24

