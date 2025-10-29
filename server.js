import express from "express";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import crypto from "crypto";
import axios from "axios";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Razorpay setup
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ============================================
// 1. CREATE RAZORPAY ORDER
// ============================================
app.post("/api/create-order", async (req, res) => {
  try {
    const { amount, currency = "INR", receipt } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const options = {
      amount: Math.round(amount * 100), // Convert to paise
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ============================================
// 2. VERIFY PAYMENT & CREATE SHIPMENT
// ============================================
app.post("/api/verify-payment", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderDetails,
    } = req.body;

    // Verify Razorpay signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({
        success: false,
        message: "Invalid Signature - Payment verification failed",
      });
    }

    console.log("✅ Payment verified successfully!");

    // ============================================
    // 3. CREATE SHIPMENT ON iTHINK LOGISTICS
    // ============================================
    const shipmentData = {
      shipments: [
        {
          orderid: orderDetails.orderId,
          channel: process.env.ITHINK_CHANNEL_ID,
          paymentmode: "Prepaid",
          totalamount: orderDetails.amount,
          codamount: 0,
          productdetail: orderDetails.products.map((p) => ({
            name: p.name,
            sku: p.sku || `SKU-${p.id}`,
            quantity: p.quantity,
            price: p.price,
            length: 10,
            breadth: 10,
            height: 5,
            weight: 0.5,
          })),
          consignee: {
            name: orderDetails.customer.name,
            address: orderDetails.customer.address,
            city: orderDetails.customer.city,
            pincode: orderDetails.customer.pincode,
            state: orderDetails.customer.state,
            phone: orderDetails.customer.phone,
            email: orderDetails.customer.email,
          },
          pickup: {
            warehouse_name: "Main Warehouse",
            name: process.env.STORE_NAME || "Makario",
            address: process.env.WAREHOUSE_ADDRESS || "Darbhanga, Bihar",
            city: process.env.WAREHOUSE_CITY || "Darbhanga",
            pincode: process.env.WAREHOUSE_PINCODE || "846001",
            state: process.env.WAREHOUSE_STATE || "Bihar",
            phone: process.env.WAREHOUSE_PHONE || "9953240031",
          },
        },
      ],
    };

    console.log("📦 Creating shipment on iThink Logistics...");

    const iThinkResponse = await axios.post(
      process.env.ITHINK_API_URL ||
        "https://pre-alpha.ithinklogistics.com/api_v3/shipments",
      shipmentData,
      {
        headers: {
          "Content-Type": "application/json",
          "API-Key": process.env.ITHINK_API_KEY,
          "Secret-Key": process.env.ITHINK_SECRET_KEY,
        },
      }
    );

    console.log("✅ Shipment created on iThink:", iThinkResponse.data);

    res.json({
      success: true,
      message: "Payment verified & Shipment created successfully",
      payment: {
        razorpay_order_id,
        razorpay_payment_id,
      },
      shipment: iThinkResponse.data,
    });
  } catch (err) {
    console.error("Error verifying payment or creating shipment:", err);
    res.status(500).json({
      success: false,
      message: "Error processing payment",
      error: err.message,
    });
  }
});

// ============================================
// 4. HEALTH CHECK
// ============================================
app.get("/api/health", (req, res) => {
  res.json({
    status: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// ============================================
// 5. START SERVER
// ============================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Razorpay Key ID: ${process.env.RAZORPAY_KEY_ID ? "✅ Configured" : "❌ Missing"}`);
  console.log(`📦 iThink API Key: ${process.env.ITHINK_API_KEY ? "✅ Configured" : "❌ Missing"}`);
});

