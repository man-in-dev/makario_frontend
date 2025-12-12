import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import LazyImage from './LazyImage';
import { useNavigate } from 'react-router-dom';
import { AuthModal } from './auth/AuthModal';

export const Cart: React.FC = () => {
  const { 
    items, 
    updateQuantity, 
    removeFromCart, 
    getTotalItems, 
    getTotalPrice, 
    clearCart
  } = useCart();
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleCheckout = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 pt-6 md:pt-16">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">
            Add some products to your cart to get started
          </p>
          <Button onClick={() => navigate('/shop')} className="w-full">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 pt-6 md:pt-16">
      <h1 className="text-xl md:text-3xl font-bold mb-4 md:mb-8">Shopping Cart ({getTotalItems()} items)</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Cart Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 p-3 md:p-4 border border-gray-100 rounded-lg">
                  <LazyImage
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg font-medium text-gray-900 line-clamp-2">
                      {item.product.name}
                    </h3>
                    <p className="text-sm md:text-base text-gray-500 mt-1">
                      ₹{item.product.price.toLocaleString('en-IN')} per pcs
                    </p>
                    
                    {item.product.discount > 0 && (
                      <Badge variant="destructive" className="mt-2 text-xs md:text-sm">
                        {item.product.discount}% OFF
                      </Badge>
                    )}
                    
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-3 md:mt-4">
                      <div className="flex items-center gap-2 md:gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="h-8 w-8 md:h-9 md:w-9 p-0"
                        >
                          <Minus className="h-3 w-3 md:h-4 md:w-4" />
                        </Button>
                        
                        <Badge variant="secondary" className="px-2 md:px-4 py-1 md:py-2 text-xs md:text-base">
                          {item.quantity} pcs
                        </Badge>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="h-8 w-8 md:h-9 md:w-9 p-0"
                        >
                          <Plus className="h-3 w-3 md:h-4 md:w-4" />
                        </Button>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-500 hover:text-red-700 text-xs md:text-sm"
                      >
                        <Trash2 className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                        <span className="hidden sm:inline">Remove</span>
                      </Button>
                    </div>
                    
                    <p className="text-base md:text-lg font-semibold text-gray-900 mt-3">
                      Subtotal: ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
              
              <Separator />
               
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <Button 
                  variant="outline" 
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 text-xs md:text-sm flex-1"
                >
                  Clear Cart
                </Button>
                
                <Button variant="outline" onClick={() => navigate('/shop')} className="text-xs md:text-sm flex-1">
                  Continue Shopping
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4">
              <div className="flex justify-between text-sm md:text-base">
                <span>Subtotal ({getTotalItems()} items)</span>
                <span className="font-medium">₹{getTotalPrice().toLocaleString('en-IN')}</span>
              </div>
              
              <div className="flex justify-between text-sm md:text-base">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between text-base md:text-lg font-semibold">
                <span>Total</span>
                <span>₹{getTotalPrice().toLocaleString('en-IN')}</span>
              </div>
              
              <Separator />
              
              <div className="space-y-2 md:space-y-3">
                <Button onClick={handleCheckout} className="w-full bg-green-600 hover:bg-green-700 text-sm md:text-base py-2 md:py-3">
                  Proceed to Checkout
                  <ArrowRight className="h-3 w-3 md:h-4 md:w-4 ml-1 md:ml-2" />
                </Button>
                
                <p className="text-xs md:text-sm text-gray-500 text-center">
                  {!user && "Please login to continue with checkout"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Login Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        initialView="login"
      />
    </div>
  );
};

export default Cart;