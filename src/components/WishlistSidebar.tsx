import React from 'react';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Heart, ShoppingCart, X, Trash2 } from 'lucide-react';
import LazyImage from './LazyImage';
import { useNavigate } from 'react-router-dom';

export const WishlistSidebar: React.FC = () => {
  const { 
    items, 
    removeFromWishlist, 
    clearWishlist,
    isWishlistOpen,
    closeWishlist
  } = useWishlist();
  
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product: any) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  const handleViewWishlist = () => {
    closeWishlist();
    navigate('/wishlist');
  };

  return (
    <Sheet open={isWishlistOpen} onOpenChange={(open) => !open && closeWishlist()}>
      <SheetContent className="w-full max-w-md p-0">
        <SheetHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-semibold">
              Wishlist ({items.length})
            </SheetTitle>
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96 px-6">
            <Heart className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500 text-center mb-6">
              Save items you love to your wishlist
            </p>
            <Button onClick={closeWishlist} className="w-full">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Wishlist Items */}
            <div className="flex-1 overflow-y-auto px-6">
              <div className="space-y-4">
                {items.map((product) => (
                  <div key={product.id} className="flex items-start space-x-4 py-4 border-b border-gray-100">
                    <LazyImage
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {product.name}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        ₹{product.price.toLocaleString('en-IN')} per kg
                      </p>
                      
                      <div className="flex items-center space-x-2 mt-3">
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(product)}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromWishlist(product.id)}
                          className="text-red-500 hover:text-red-700 h-9 w-9 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {product.discount > 0 && (
                        <Badge variant="destructive" className="mt-2">
                          {product.discount}% OFF
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Wishlist Actions */}
            <div className="border-t border-gray-200 p-6 space-y-4">
              <div className="space-y-3">
                <Button onClick={handleViewWishlist} variant="outline" className="w-full">
                  View Full Wishlist
                </Button>
                
                {items.length > 0 && (
                  <Button 
                    onClick={clearWishlist} 
                    variant="ghost" 
                    className="w-full text-red-500 hover:text-red-700"
                  >
                    Clear Wishlist
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

export default WishlistSidebar;