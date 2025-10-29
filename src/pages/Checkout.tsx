import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Alert, AlertDescription } from '../components/ui/alert';
import { useNavigate } from 'react-router-dom';
import { AuthModal } from '../components/auth/AuthModal';
import LazyImage from '../components/LazyImage';
import { toast } from 'sonner';

export const Checkout: React.FC = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isGuestCheckout, setIsGuestCheckout] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProceedToCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate shipping info
    if (!shippingInfo.fullName || !shippingInfo.email || !shippingInfo.phone ||
        !shippingInfo.address || !shippingInfo.city || !shippingInfo.state || !shippingInfo.pincode) {
      toast.error('Please fill all shipping details');
      return;
    }

    // If COD is selected, process order directly (no login required)
    if (paymentMethod === 'cod') {
      await handlePlaceOrder();
      return;
    }

    // If online payment and user is already logged in, proceed to payment
    if (paymentMethod === 'online' && user) {
      await handlePlaceOrder();
      return;
    }

    // If online payment and not logged in, show modal to choose between guest checkout and login
    if (paymentMethod === 'online' && !user) {
      setShowCheckoutModal(true);
      return;
    }
  };

  const handlePlaceOrder = async (isGuest: boolean = isGuestCheckout) => {
    // For COD, allow without login (guest checkout)
    // For online payment, if not logged in and not guest checkout, show auth modal
    if (paymentMethod === 'online' && !user && !isGuest) {
      setShowAuthModal(true);
      return;
    }

    setIsProcessing(true);

    try {
      const totalAmount = getTotalPrice() + 50 - discount;
      const orderId = `ORD-${Date.now()}`;

      // If COD, save order directly and show confirmation (no login required)
      if (paymentMethod === 'cod') {
        const order = {
          id: orderId,
          items: items,
          shippingInfo,
          paymentMethod,
          total: totalAmount,
          orderDate: new Date().toISOString(),
          status: 'confirmed',
          coupon: couponApplied ? coupon : null,
          discount,
          userId: user?.id || null, // Optional: link to user if logged in
          userEmail: user?.email || shippingInfo.email // Track email for both logged-in and guest
        };
        const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        existingOrders.push(order);
        localStorage.setItem('orders', JSON.stringify(existingOrders));
        clearCart();
        setOrderPlaced(true);
        setIsProcessing(false);
        toast.success('Order placed successfully!');
        return;
      }

      // For online payment, create Razorpay order
      if (paymentMethod === 'online') {
        const response = await fetch('http://localhost:5000/api/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: totalAmount,
            currency: 'INR',
            receipt: orderId
          })
        });

        const data = await response.json();
        if (!data.success) {
          throw new Error('Failed to create order');
        }

        // Open Razorpay checkout
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_xxxxxxxxxxxxxxxx',
          amount: data.order.amount,
          currency: 'INR',
          name: 'Makario',
          description: 'Premium Makhana Order',
          order_id: data.order.id,
          handler: async function (response: any) {
            try {
              // Verify payment on backend
              const verifyResponse = await fetch('http://localhost:5000/api/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  orderDetails: {
                    orderId,
                    amount: totalAmount,
                    products: items.map(item => ({
                      id: item.product.id,
                      name: item.product.name,
                      sku: item.product.id,
                      quantity: item.quantity,
                      price: item.product.price
                    })),
                    customer: {
                      name: shippingInfo.fullName,
                      email: shippingInfo.email,
                      phone: shippingInfo.phone,
                      address: shippingInfo.address,
                      city: shippingInfo.city,
                      state: shippingInfo.state,
                      pincode: shippingInfo.pincode
                    }
                  }
                })
              });

              const verifyData = await verifyResponse.json();
              if (verifyData.success) {
                // Save order to localStorage
                const order = {
                  id: orderId,
                  items: items,
                  shippingInfo,
                  paymentMethod,
                  total: totalAmount,
                  orderDate: new Date().toISOString(),
                  status: 'confirmed',
                  coupon: couponApplied ? coupon : null,
                  discount,
                  paymentId: response.razorpay_payment_id,
                  shipmentData: verifyData.shipment,
                  userId: user?.id || null,
                  userEmail: user?.email || shippingInfo.email
                };
                const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
                existingOrders.push(order);
                localStorage.setItem('orders', JSON.stringify(existingOrders));
                clearCart();
                setOrderPlaced(true);
                toast.success('Payment successful! Shipment created on iThink Logistics.');
              } else {
                throw new Error(verifyData.message || 'Payment verification failed');
              }
            } catch (error) {
              toast.error(`Error: ${error instanceof Error ? error.message : 'Payment verification failed'}`);
            } finally {
              setIsProcessing(false);
            }
          },
          prefill: {
            name: shippingInfo.fullName,
            email: shippingInfo.email,
            contact: shippingInfo.phone
          },
          theme: {
            color: '#D4A574'
          }
        };

        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
      }
    } catch (error) {
      toast.error(`Error: ${error instanceof Error ? error.message : 'Something went wrong'}`);
      setIsProcessing(false);
    }
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">No items to checkout</h2>
            <Button onClick={() => navigate('/products')}>
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto text-center">
          <CardContent className="pt-6">
            <div className="text-green-600 text-6xl mb-4">✓</div>
            <h2 className="text-3xl font-semibold mb-4">Order Placed Successfully!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for your order. You will receive a confirmation email shortly.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => navigate('/products')}>
                Continue Shopping
              </Button>
              <Button variant="outline" onClick={() => navigate('/')}>
                Go to Homepage
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleProceedToCheckout} className="space-y-6">
            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={shippingInfo.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={shippingInfo.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={shippingInfo.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    name="state"
                    value={shippingInfo.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="pincode">Pincode *</Label>
                  <Input
                    id="pincode"
                    name="pincode"
                    value={shippingInfo.pincode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod">Cash on Delivery</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="online" id="online" />
                    <Label htmlFor="online">Online Payment (Razorpay - UPI, Card, NetBanking)</Label>
                  </div>
                </RadioGroup>

                {paymentMethod === 'online' && (
                  <Alert className="mt-4 bg-blue-50 border-blue-200">
                    <AlertDescription className="text-blue-800">
                      ✅ Razorpay integration active! Pay securely via UPI, Credit/Debit Card, or Net Banking.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Submit Button - Inside Form */}
            <Button
              type="submit"
              className="w-full mt-6"
              size="lg"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Order Items */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="w-16 h-16 flex-shrink-0">
                      <LazyImage
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.product.name}</h4>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="text-sm font-medium">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator />
              
              {/* Coupon Input */}
              <div className="mb-4">
                <Label htmlFor="coupon">Discount Coupon</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="coupon"
                    value={coupon}
                    onChange={e => setCoupon(e.target.value)}
                    placeholder="Enter coupon code"
                    disabled={couponApplied}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    disabled={couponApplied || !coupon}
                    onClick={() => {
                      if (coupon.toUpperCase() === "MAKARIO10") {
                        setDiscount(Math.round(getTotalPrice() * 0.1));
                        setCouponApplied(true);
                      } else {
                        setDiscount(0);
                        setCouponApplied(false);
                        alert("Invalid coupon code");
                      }
                    }}
                  >
                    {couponApplied ? "Applied" : "Apply"}
                  </Button>
                </div>
                {couponApplied && (
                  <div className="text-green-600 text-sm mt-2">Coupon applied! You saved ₹{discount}.</div>
                )}
              </div>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{getTotalPrice().toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₹50</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>₹{(getTotalPrice() + 50 - discount).toLocaleString()}</span>
                </div>
              {/* End of order summary content */}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Checkout Options Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle className="text-center">Choose Checkout Option</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-muted-foreground mb-6">
                Would you like to continue as a guest or login to your account?
              </p>

              <Button
                onClick={async () => {
                  setShowCheckoutModal(false);
                  await handlePlaceOrder(true);
                }}
                className="w-full"
                size="lg"
                variant="outline"
              >
                👤 Continue as Guest
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              <Button
                onClick={() => {
                  setShowCheckoutModal(false);
                  setShowAuthModal(true);
                }}
                className="w-full"
                size="lg"
              >
                🔐 Login to Account
              </Button>

              <Button
                onClick={() => setShowCheckoutModal(false)}
                className="w-full"
                variant="ghost"
              >
                Cancel
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialView="login"
      />
      </div>
      <Footer />
    </>
  );
}