import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Minus, Plus, Trash2, X, ShoppingBag } from 'lucide-react';
import LazyImage from './LazyImage';
import { useNavigate } from 'react-router-dom';

export const CartSidebar: React.FC = () => {
  const { 
    items, 
    updateQuantity, 
    removeFromCart, 
    getTotalItems, 
    getTotalPrice, 
    clearCart,
    isCartOpen,
    closeCart
  } = useCart();
  
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleViewCart = () => {
    closeCart();
    navigate('/cart');
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="w-full max-w-md p-0">
        <SheetHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-semibold">
              Shopping Cart ({getTotalItems()})
            </SheetTitle>
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96 px-6">
            <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 text-center mb-6">
              Add some products to your cart to get started
            </p>
            <Button onClick={closeCart} className="w-full">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-start space-x-4 py-4 border-b border-gray-100">
                    <LazyImage
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        ₹{item.product.price.toLocaleString('en-IN')} per pcs
                      </p>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          
                          <Badge variant="secondary" className="px-3 py-1">
                            {item.quantity} pcs
                          </Badge>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-500 hover:text-red-700 h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <p className="text-sm font-medium text-gray-900 mt-2">
                        Subtotal: ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="border-t border-gray-200 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-gray-900">Total</span>
                <span className="text-xl font-semibold text-gray-900">
                  ₹{getTotalPrice().toLocaleString('en-IN')}
                </span>
              </div>

              <Separator />

              <div className="space-y-3">
                <Button onClick={handleCheckout} className="w-full bg-green-600 hover:bg-green-700">
                  Proceed to Checkout
                </Button>
                
                <Button onClick={handleViewCart} variant="outline" className="w-full">
                  View Full Cart
                </Button>
                
                {items.length > 0 && (
                  <Button 
                    onClick={clearCart} 
                    variant="ghost" 
                    className="w-full text-red-500 hover:text-red-700"
                  >
                    Clear Cart
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;