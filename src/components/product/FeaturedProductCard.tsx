import React, { useState } from 'react';
import { Product } from '../../data/products';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useLoading } from '../../contexts/LoadingContext';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import LazyImage from '../LazyImage';
import { useNavigate } from 'react-router-dom';
import { StockAlert } from './StockAlert';

interface FeaturedProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
  small?: boolean;
}

export const FeaturedProductCard: React.FC<FeaturedProductCardProps> = ({ product, onViewDetails, small = false }) => {
  const { addToCart, isInCart, openCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { setLoading } = useLoading();
  const navigate = useNavigate();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isToggleingWishlist, setIsTogglingWishlist] = useState(false);

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
  <Card className={`group relative overflow-hidden bg-white hover:shadow-xl transition-all duration-500 border-0 shadow-md ${small ? 'w-[140px] min-w-[140px] max-w-[150px] p-2' : ''}`}> 
      {/* Exclusive Badge */}
      <div className="absolute top-3 left-3 z-20">
        <Badge className="bg-red-500 hover:bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-sm">
          EXCLUSIVE
        </Badge>
      </div>

      {/* Wishlist Button */}
      <button
        className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
          isWishlisted 
            ? 'bg-red-100 text-red-500 hover:bg-red-200' 
            : 'bg-white/80 text-gray-400 hover:bg-white hover:text-red-500'
        }`}
        onClick={handleToggleWishlist}
        disabled={isToggleingWishlist}
      >
        <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
      </button>

      {/* Product Image */}
      <div className={`relative ${small ? 'aspect-[4/5] h-28' : 'aspect-[4/5]'} overflow-hidden cursor-pointer`} onClick={handleProductClick}>
        <LazyImage
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${small ? 'p-1' : ''}`}
        />
        {/* Overlay with Quick View on Hover */}
        {!small && (
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              variant="secondary"
              size="sm"
              className="bg-white/90 hover:bg-white text-black border-0"
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

      <CardContent className="p-3 md:p-4 space-y-2 md:space-y-3">
        {/* Pricing Section */}
        <div className="space-y-1">
          <div className={`flex items-center gap-1 flex-wrap ${small ? '' : 'md:gap-2'}`}>
            <span className={`font-bold text-gray-900 ${small ? 'text-base' : 'text-xl md:text-2xl'}`}>₹{product.price}</span>
            {product.originalPrice && (
              <>
                <span className={`text-gray-400 line-through ${small ? 'text-xs' : 'text-base md:text-lg'}`}>₹{product.originalPrice}</span>
                <span className={`font-semibold text-green-600 ${small ? 'text-xs' : 'text-xs md:text-sm'}`}>({discountPercentage}% OFF)</span>
              </>
            )}
          </div>
          <div className={`flex items-center gap-1 ${small ? '' : 'md:gap-2'}`}>
            <span className={`text-[10px] text-gray-600 ${small ? '' : 'md:text-sm'}`}>Best price</span>
            <span className={`font-bold text-green-600 ${small ? 'text-xs' : 'text-base md:text-lg'}`}>₹{bestPrice}</span>
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

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={isAddingToCart || !product.inStock}
          className={`w-full bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 font-medium ${small ? 'text-xs py-1' : 'text-sm md:text-base py-2 md:py-3'}`}
        >
          {isAddingToCart ? (
            <div className={`flex items-center gap-1 ${small ? '' : 'md:gap-2'}`}>
              <div className={`border-2 border-current border-t-transparent rounded-full animate-spin ${small ? 'w-2 h-2' : 'w-3 h-3 md:w-4 md:h-4'}`} />
              <span className="hidden md:inline">Adding...</span>
              <span className="md:hidden">...</span>
            </div>
          ) : (
            <div className={`flex items-center gap-1 ${small ? '' : 'md:gap-2'}`}>
              <ShoppingBag className={`${small ? 'w-2 h-2' : 'w-3 h-3 md:w-4 md:h-4'}`} />
              <span>{small ? 'Add' : 'Add to Bag'}</span>
            </div>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};