import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Loader2, RotateCw } from 'lucide-react';
import { toast } from 'sonner';

interface Order {
  id: string;
  orderId: string;
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  shippingInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: string;
  total: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const Orders: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      let response;
      
      if (user) {
        // Authenticated user - use token
        response = await api.get('/orders');
      } else {
        // Guest user - need email from query or localStorage
        const email = new URLSearchParams(window.location.search).get('email') || 
                     localStorage.getItem('last_order_email');
        
        if (!email) {
          toast.error('Please provide email to view orders');
          setIsLoading(false);
          return;
        }
        
        response = await api.get(`/orders?email=${encodeURIComponent(email)}`);
      }

      if (response.data.success) {
        const fetchedOrders = response.data.data.orders || [];
        setOrders(fetchedOrders);
        
        if (fetchedOrders.length === 0) {
          console.log('No orders found for user');
        } else {
          console.log(`Loaded ${fetchedOrders.length} order(s)`);
        }
      } else {
        toast.error('Failed to load orders');
        setOrders([]);
      }
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      const errorMessage = error.response?.data?.message || 'Please try again';
      toast.error('Failed to load orders', {
        description: errorMessage,
      });
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-700',
      confirmed: 'bg-blue-100 text-blue-700',
      processing: 'bg-purple-100 text-purple-700',
      shipped: 'bg-indigo-100 text-indigo-700',
      delivered: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700',
    };
    return statusColors[status] || 'bg-gray-100 text-gray-700';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-golden" />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-golden">My Orders</h1>
            {orders.length > 0 && (
              <p className="text-sm text-gray-500 mt-1">
                {orders.length} {orders.length === 1 ? 'order' : 'orders'} found
              </p>
            )}
          </div>
          {orders.length > 0 && (
            <Button
              variant="outline"
              onClick={fetchOrders}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <RotateCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Refreshing...' : 'Refresh'}
            </Button>
          )}
        </div>
        
        {orders.length === 0 && !isLoading ? (
          <Card className="max-w-3xl mx-auto">
            <CardContent className="p-8 text-center">
              <p className="text-gray-600 mb-4 text-lg">No orders found</p>
              <p className="text-sm text-gray-500 mb-6">
                {user ? "You haven't placed any orders yet." : "Please login or provide your email to view orders."}
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => navigate('/shop')}>
                  Start Shopping
                </Button>
                {!user && (
                  <Button variant="outline" onClick={() => navigate('/login')}>
                    Login
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="max-w-4xl mx-auto space-y-4">
            {orders.map((order) => (
              <Card key={order.id || order.orderId} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Order #{order.orderId}</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">
                        Placed on {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {order.items && order.items.length > 0 ? (
                      order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center border-b pb-2 last:border-0">
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">
                              Quantity: {item.quantity} × ₹{item.price}
                            </p>
                          </div>
                          <p className="font-semibold">₹{item.price * item.quantity}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No items found</p>
                    )}
                    <div className="pt-2 flex justify-between items-center border-t">
                      <div>
                        <p className="text-sm text-gray-600">
                          Payment: {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online'}
                        </p>
                        <p className="text-sm text-gray-600">
                          Ship to: {order.shippingInfo?.city || 'N/A'}, {order.shippingInfo?.state || 'N/A'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="text-xl font-bold text-golden">₹{order.total}</p>
                      </div>
                    </div>
                    <div className="pt-2 flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/orders/${order.orderId}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Orders;


