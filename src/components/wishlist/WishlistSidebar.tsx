import React from 'react';
import { useWishlist } from '../../contexts/WishlistContext';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { Heart, X, ShoppingCart, Trash2 } from 'lucide-react';
import LazyImage from '../LazyImage';
import { useNavigate } from 'react-router-dom';

interface WishlistSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WishlistSidebar: React.FC<WishlistSidebarProps> = ({ isOpen, onClose }) => {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  const handleViewWishlist = () => {
    onClose();
    navigate('/wishlist');
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:w-[400px] p-0">
        <SheetHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Wishlist ({items.length})
            </SheetTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6">
              <Heart className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">Your wishlist is empty</p>
              <p className="text-muted-foreground text-center mb-4">
                Save products you love for later!
              </p>
              <Button onClick={onClose} className="w-full">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              {/* Wishlist Items */}
              <div className="flex-1 overflow-y-auto px-6">
                <div className="space-y-4">
                  {items.map((product) => {
                    const cartQuantity = getItemQuantity(product.id);
                    
                    return (
                      <div key={product.id} className="flex gap-3 p-3 border rounded-lg">
                        <div className="w-16 h-16 flex-shrink-0">
                          <LazyImage
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm line-clamp-2 mb-1">
                            {product.name}
                          </h4>
                          <p className="text-xs text-muted-foreground mb-2">
                            {product.weight}
                          </p>
                          
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-primary">₹{product.price}</span>
                              {product.originalPrice && (
                                <span className="text-xs text-muted-foreground line-through">
                                  ₹{product.originalPrice}
                                </span>
                              )}
                            </div>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                              onClick={() => removeFromWishlist(product.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              className="flex-1 h-7 text-xs"
                              onClick={() => handleAddToCart(product)}
                              disabled={!product.inStock}
                              variant={cartQuantity > 0 ? "outline" : "default"}
                            >
                              <ShoppingCart className="h-3 w-3 mr-1" />
                              {cartQuantity > 0 ? `In Cart (${cartQuantity})` : 'Add to Cart'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="border-t p-6 space-y-4">
                <div className="space-y-2">
                  <Button onClick={handleViewWishlist} className="w-full">
                    View Full Wishlist
                  </Button>
                </div>
                
                <Button
                  variant="ghost"
                  onClick={clearWishlist}
                  className="w-full text-red-500 hover:text-red-700"
                  size="sm"
                >
                  Clear Wishlist
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};