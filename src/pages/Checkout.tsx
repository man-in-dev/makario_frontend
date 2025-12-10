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
import { useNavigate } from 'react-router-dom';
import LazyImage from '../components/LazyImage';
import { toast } from 'sonner';
import api from '../utils/api';
import { loadCashfreeScript, initializeCashfree } from '../utils/loadCashfree';

export const Checkout: React.FC = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('online');

  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });


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

    // Process order based on payment method
    // if (paymentMethod === 'cod') {
    //   await handlePlaceOrder();
    // } else {
      await handleOnlinePayment();
    // }
  };

  // const handlePlaceOrder = async () => {
  //   setIsProcessing(true);

  //   try {
  //     const totalAmount = getTotalPrice() + 50 - discount;

  //     const orderData = {
  //       items: items.map(item => ({
  //         productId: item.product.id,
  //         name: item.product.name,
  //         price: item.product.price,
  //         quantity: item.quantity,
  //         image: item.product.image,
  //       })),
  //       shippingInfo,
  //       paymentMethod: 'cod',
  //       subtotal: getTotalPrice(),
  //       shippingCharge: 50,
  //       discount,
  //       coupon: couponApplied ? coupon : null,
  //       total: totalAmount,
  //     };

  //     const response = await api.post('/orders', orderData);
      
  //     if (response.data.success) {
  //       clearCart();
  //       setOrderPlaced(true);
  //       setIsProcessing(false);
  //       toast.success('Order placed successfully!', {
  //         description: `Order ID: ${response.data.data.order.orderId}`,
  //       });
      
  //       // Navigate to order confirmation after a delay
  //       setTimeout(() => {
  //         navigate(`/orders/${response.data.data.order.orderId}`);
  //       }, 2000);
  //     } else {
  //       throw new Error(response.data.message || 'Failed to create order');
  //     }
  //   } catch (error: any) {
  //     console.error('Order creation error:', error);
  //     toast.error('Failed to place order', {
  //       description: error.response?.data?.message || 'Please try again',
  //     });
  //     setIsProcessing(false);
  //   }
  // };

  const handleOnlinePayment = async () => {
    setIsProcessing(true);

    try {
      const totalAmount = getTotalPrice() + 50 - discount;

      // First, create the order in our database with pending payment status
      const orderData = {
        items: items.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image,
        })),
        shippingInfo,
        paymentMethod: 'online',
        paymentDetails: {
          paymentStatus: 'pending',
        },
        subtotal: getTotalPrice(),
        shippingCharge: 50,
        discount,
        coupon: couponApplied ? coupon : null,
        total: totalAmount,
      };

      const orderResponse = await api.post('/orders', orderData);
      
      if (!orderResponse.data.success) {
        throw new Error(orderResponse.data.message || 'Failed to create order');
      }

      const order = orderResponse.data.data.order;
      const orderId = order.orderId;

      // Create payment session with Cashfree
      const paymentSessionResponse = await api.post('/payments/create-session', {
        orderId,
        amount: 1,
        customerDetails: {
          customerId: user?.id || shippingInfo.email,
          customerEmail: shippingInfo.email,
          customerPhone: shippingInfo.phone,
          customerName: shippingInfo.fullName,
        },
        orderNote: `Order ${orderId} - ${items.length} item(s)`,
      });

      if (!paymentSessionResponse.data.success) {
        throw new Error(paymentSessionResponse.data.message || 'Failed to create payment session');
      }

      const paymentSessionId = paymentSessionResponse.data.data.paymentSessionId;

      // Load Cashfree script and initialize
      await loadCashfreeScript();
      
      const cashfreeMode = import.meta.env.VITE_CASHFREE_ENV === 'production' ? 'production' : 'sandbox';
      const cashfree = initializeCashfree(cashfreeMode);

      // Get return URL
      const returnUrl = `${window.location.origin}/payment/callback?orderId=${orderId}`;

      // Open Cashfree checkout
      cashfree.checkout({
        paymentSessionId,
        returnUrl,
      }).then((result: any) => {
        // Payment successful or redirected
        console.log('Payment result:', result);
        if (result.error) {
          toast.error('Payment failed', {
            description: result.error.message || 'Please try again',
          });
          setIsProcessing(false);
        }
      }).catch((error: any) => {
        console.error('Cashfree checkout error:', error);
        toast.error('Payment initialization failed', {
          description: error.message || 'Please try again',
        });
        setIsProcessing(false);
      });

    } catch (error: any) {
      console.error('Online payment error:', error);
      toast.error('Failed to initiate payment', {
        description: error.response?.data?.message || error.message || 'Please try again',
      });
      setIsProcessing(false);
    }
  };

  // Redirect to login if user is not authenticated
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">Login Required</h2>
            <p className="text-gray-600 mb-6">You must login to proceed with checkout.</p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button variant="outline" onClick={() => navigate('/signup')}>
                Sign Up
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">No items to checkout</h2>
            <Button onClick={() => navigate('/shop')}>
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
              <Button onClick={() => navigate('/shop')}>
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
                <RadioGroup value={paymentMethod} onValueChange={(value: 'cod' | 'online') => setPaymentMethod(value)}>
                  {/* <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="cursor-pointer flex-1">
                      <div className="font-medium">Cash on Delivery (COD)</div>
                      <p className="text-sm text-gray-500">Pay when you receive your order</p>
                    </Label>
                  </div> */}
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer mt-2">
                    <RadioGroupItem value="online" id="online" />
                    <Label htmlFor="online" className="cursor-pointer flex-1">
                      <div className="font-medium">Online Payment (Cashfree)</div>
                      <p className="text-sm text-gray-500">Pay securely with cards, UPI, netbanking, and more</p>
                    </Label>
                  </div>
                </RadioGroup>
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

      </div>
      <Footer />
    </>
  );
}