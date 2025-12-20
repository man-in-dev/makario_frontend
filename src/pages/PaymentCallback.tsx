import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import api from '../utils/api';
import { useCart } from '../contexts/CartContext';

export const PaymentCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading');
  const [orderId, setOrderId] = useState<string | null>(null);
  const hasVerified = useRef(false);

  useEffect(() => {
    // Prevent multiple verifications
    if (hasVerified.current) {
      return;
    }

    const verifyPayment = async () => {
      const orderIdParam = searchParams.get('orderId');
      
      if (!orderIdParam) {
        toast.error('Order ID not found');
        setStatus('failed');
        return;
      }

      // Mark as verified to prevent re-running
      hasVerified.current = true;
      setOrderId(orderIdParam);

      try {
        // Verify payment with backend
        const response = await api.post('/payments/verify', {
          orderId: orderIdParam,
        });

        if (response.data.success) {
          const paymentStatus = response.data.data.paymentStatus;
          
          if (paymentStatus === 'completed') {
            clearCart();
            setStatus('success');
            toast.success('Payment successful!', {
              description: `Order ID: ${orderIdParam}`,
            });
          } else {
            setStatus('failed');
            toast.error('Payment failed or is pending');
          }
        } else {
          throw new Error(response.data.message || 'Payment verification failed');
        }
      } catch (error: any) {
        console.error('Payment verification error:', error);
        setStatus('failed');
        toast.error('Failed to verify payment', {
          description: error.response?.data?.message || 'Please contact support',
        });
      }
    };

    verifyPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  if (status === 'loading') {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-screen">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Verifying Payment...</h2>
            <p className="text-muted-foreground">Please wait while we verify your payment</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-screen">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-6">
            <div className="text-green-600 text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-semibold mb-4">Payment Successful!</h2>
            <p className="text-muted-foreground mb-6">
              Your order has been confirmed. You will receive a confirmation email shortly.
            </p>
            {orderId && (
              <p className="text-sm text-muted-foreground mb-6">
                Order ID: <span className="font-medium">{orderId}</span>
              </p>
            )}
            <div className="flex gap-4 justify-center">
              <Button onClick={() => navigate(`/orders/${orderId}`)}>
                View Order
              </Button>
              <Button variant="outline" onClick={() => navigate('/shop')}>
                Continue Shopping
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-screen">
      <Card className="max-w-md w-full text-center">
        <CardContent className="pt-6">
          <div className="text-red-600 text-6xl mb-4">✗</div>
          <h2 className="text-2xl font-semibold mb-4">Payment Failed</h2>
          <p className="text-muted-foreground mb-6">
            We couldn't process your payment. Please try again or use a different payment method.
          </p>
          {orderId && (
            <p className="text-sm text-muted-foreground mb-6">
              Order ID: <span className="font-medium">{orderId}</span>
            </p>
          )}
          <div className="flex gap-4 justify-center">
            <Button onClick={() => navigate('/checkout')}>
              Try Again
            </Button>
            <Button variant="outline" onClick={() => navigate('/shop')}>
              Continue Shopping
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

