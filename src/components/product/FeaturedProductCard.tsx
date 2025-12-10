import React, { useState } from 'react';
import { Product } from '../../data/products';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useLoading } from '../../contexts/LoadingContext';
import { useAuth } from '../../contexts/AuthContext';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import LazyImage from '../LazyImage';
import { useNavigate } from 'react-router-dom';
import { StockAlert } from './StockAlert';
import { AuthModal } from '../auth/AuthModal';

interface FeaturedProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
  small?: boolean;
}

export const FeaturedProductCard: React.FC<FeaturedProductCardProps> = ({ product, onViewDetails, small = false }) => {
  const { addToCart, isInCart, openCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { setLoading } = useLoading();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isToggleingWishlist, setIsTogglingWishlist] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (!product) {
    return (
      <Card className="h-96 flex items-center justify-center">
        <p className="text-muted-foreground">Product data not available</p>
      </Card>
    );
  }

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAddingToCart(true);
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    addToCart(product);
    openCart();
    setIsAddingToCart(false);
  };

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsTogglingWishlist(true);
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    toggleWishlist(product);
    setIsTogglingWishlist(false);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Featured Buy Now clicked - user:', user);
    if (!user) {
      console.log('Setting showAuthModal to true');
      setShowAuthModal(true);
      return;
    }
    console.log('Buy now clicked for product:', product.id);
    addToCart(product);
    navigate('/checkout');
  };

  const handleProductClick = () => {
    setLoading(true, 'Loading Product Details...');
    navigate(`/product/${product.id}`);
    onViewDetails?.(product);
  };

  const isWishlisted = isInWishlist(product.id);
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : product.discount || 0;

  const bestPrice = product.originalPrice 
    ? Math.round(product.price * 0.9) // 10% additional discount for "best price"
    : Math.round(product.price * 0.85);

  return (
    <>
    <Card className={`group relative overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 border border-orange-100 hover:border-orange-300 shadow-lg rounded-xl ${small ? 'w-[140px] min-w-[140px] max-w-[150px] p-2' : ''}`}>
       {/* Exclusive Badge - Enhanced */}
       <div className="absolute top-2 left-2 z-20">
         <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
           ✨ EXCLUSIVE
         </Badge>
       </div>

       {/* Wishlist Button - Enhanced */}
       <button
         className={`absolute top-2 right-2 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${
           isWishlisted 
             ? 'bg-red-500/90 text-white hover:bg-red-600 shadow-lg' 
             : 'bg-white/80 text-gray-400 hover:bg-white hover:text-red-500 shadow-md'
         }`}
         onClick={handleToggleWishlist}
         disabled={isToggleingWishlist}
       >
         <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
       </button>

      {/* Product Image */}
      <div className={`relative ${small ? 'aspect-[4/5] h-28' : 'aspect-[5/4] md:aspect-[4/5]'} overflow-hidden cursor-pointer bg-gradient-to-br from-orange-50 to-amber-50`} onClick={handleProductClick}>
        <LazyImage
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ${small ? 'p-1' : ''}`}
        />
        {/* Overlay with Quick View on Hover */}
        {!small && (
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
            <Button
              variant="secondary"
              size="sm"
              className="bg-white hover:bg-orange-50 text-black border-0 font-semibold shadow-lg hover:shadow-xl"
              onClick={(e) => {
                e.stopPropagation();
                handleProductClick();
              }}
            >
              <Eye className="w-4 h-4 mr-2" />
              Quick View
            </Button>
          </div>
        )}
      </div>

      <CardContent className="p-2 md:p-4 space-y-1 md:space-y-3">
        {/* Pricing Section */}
        <div className="space-y-1 bg-gradient-to-r from-orange-50 to-amber-50 p-2 rounded-lg">
          <div className={`flex items-center gap-1 flex-wrap ${small ? '' : 'md:gap-2'}`}>
            <span className={`font-bold text-orange-700 ${small ? 'text-base' : 'text-xl md:text-2xl'}`}>₹{product.price}</span>
            {product.originalPrice && (
              <>
                <span className={`text-gray-400 line-through ${small ? 'text-xs' : 'text-base md:text-lg'}`}>₹{product.originalPrice}</span>
                <span className={`font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full ${small ? 'text-xs' : 'text-xs md:text-sm'}`}>Save {discountPercentage}%</span>
              </>
            )}
          </div>
          <div className={`flex items-center gap-1 ${small ? '' : 'md:gap-2'}`}>
            <span className={`text-[10px] font-semibold text-amber-600 ${small ? '' : 'md:text-sm'}`}>💰 Best Offer</span>
            <span className={`font-bold text-orange-700 ${small ? 'text-xs' : 'text-base md:text-lg'}`}>₹{bestPrice}</span>
          </div>
        </div>

        {/* Pack Badge */}
        {product.name.includes('Pack of') && (
          <Badge className="bg-blue-600 text-white font-bold mb-1">
            {product.name.match(/Pack of \d+/)?.[0]}
          </Badge>
        )}

        {/* Product Name */}
        <h3 
          className={`font-medium text-gray-800 line-clamp-2 cursor-pointer hover:text-primary transition-colors leading-tight ${small ? 'text-xs' : 'text-sm md:text-base'}`}
          onClick={handleProductClick}
        >
          {product.name}
        </h3>

        {/* Stock Alert */}
        {product.stockQuantity <= 10 && (
          <StockAlert stockQuantity={product.stockQuantity} />
        )}

        {/* Rating */}
        <div className={`flex items-center gap-1 ${small ? '' : 'md:gap-2'}`}>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`${small ? 'w-2 h-2' : 'w-3 h-3 md:w-4 md:h-4'} ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className={`text-[10px] ${small ? '' : 'md:text-sm'} text-gray-600`}>({product.reviewCount})</span>
        </div>

        {/* Buttons Container */}
        <div className="flex gap-1.5 w-full">
          {/* Buy Now Button */}
          <Button
            onClick={handleBuyNow}
            disabled={!product.inStock}
            className={`flex-1 bg-golden hover:bg-golden/90 text-white border-0 transition-all duration-300 font-bold shadow-md hover:shadow-lg ${small ? 'text-xs py-1 px-1' : 'text-xs md:text-sm py-1.5 md:py-2 px-2'}`}
          >
            <span className="truncate">{small ? 'Buy' : 'Buy'}</span>
          </Button>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={isAddingToCart || !product.inStock}
            className={`flex-1 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white border-0 transition-all duration-300 font-bold shadow-md hover:shadow-lg ${small ? 'text-xs py-1 px-1' : 'text-xs md:text-sm py-1.5 md:py-2 px-2'}`}
          >
            {isAddingToCart ? (
              <div className={`flex items-center gap-0.5 justify-center ${small ? '' : ''}`}>
                <div className={`border-2 border-current border-t-transparent rounded-full animate-spin ${small ? 'w-2 h-2' : 'w-2 h-2'}`} />
                <span className="hidden md:inline text-xs">...</span>
              </div>
            ) : (
              <div className={`flex items-center gap-0.5 justify-center`}>
                <ShoppingBag className={`${small ? 'w-2 h-2' : 'w-3 h-3'}`} />
                <span className="truncate">{small ? 'Add' : 'Cart'}</span>
              </div>
            )}
          </Button>
        </div>

        </CardContent>
        </Card>

        {/* Login Modal - Outside Card to avoid z-index issues */}
        {showAuthModal && (
          <AuthModal 
            isOpen={true}
            onClose={() => {
              console.log('Closing Featured AuthModal');
              setShowAuthModal(false);
            }}
            initialView="login"
          />
        )}
        </>
        );
        };