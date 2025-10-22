import React, { useState } from 'react';
import { Product } from '../../data/products';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useLoading } from '../../contexts/LoadingContext';
import { Heart, ShoppingCart, Star, Zap } from 'lucide-react';
import LazyImage from '../LazyImage';
import LoadingSpinner from '../LoadingSpinner';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
  viewMode?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails, viewMode = 'grid' }) => {
  const { addToCart, isInCart, getItemQuantity, openCart } = useCart();
  const { toggleWishlist, isInWishlist, openWishlist } = useWishlist();
  const { setLoading } = useLoading();
  const navigate = useNavigate();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isTogglingWishlist, setIsTogglingWishlist] = useState(false);

  // Safety check for product
  if (!product) {
    return (
      <Card className="h-96 flex items-center justify-center">
        <p className="text-muted-foreground">Product data not available</p>
      </Card>
    );
  }
  // Handler for toggling wishlist
  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsTogglingWishlist(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      toggleWishlist(product);
      if (!isInWishlist(product.id)) {
        openWishlist();
      }
    } finally {
      setIsTogglingWishlist(false);
    }
  };

  // Handler for adding to cart
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAddingToCart(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      addToCart(product);
      openCart();
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Buy now clicked for product:', product.id);
    if (!isInCart(product.id)) {
      addToCart(product);
    }
    navigate('/checkout');
  };

  const handleProductClick = () => {
    console.log('=== PRODUCT NAVIGATION ===');
    console.log('Product ID:', product.id);
    console.log('Product Name:', product.name);
    console.log('Navigating to:', `/product/${product.id}`);
    
    setLoading(true, 'Loading Product Details...');
    
    try {
      navigate(`/product/${product.id}`);
      console.log('Navigation successful!');
    } catch (error) {
      console.error('Navigation error:', error);
    }
    
    onViewDetails?.(product);
  };

  const cartQuantity = getItemQuantity(product.id);
  const isWishlisted = isInWishlist(product.id);

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 overflow-hidden hover:scale-105 ${
      viewMode === 'list' ? 'flex flex-row' : ''
    }`}>
      <div className={`relative ${viewMode === 'list' ? 'w-32 md:w-48' : ''}`}>
        {/* Discount Badge */}
        {product.discount && (
          <Badge 
            variant="destructive" 
            className="absolute top-1 md:top-2 left-1 md:left-2 z-10 text-xs font-bold px-1 md:px-2"
          >
            {product.discount}% OFF
          </Badge>
        )}

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-1 md:top-2 right-1 md:right-2 z-10 rounded-full h-6 w-6 md:h-8 md:w-8 ${
            isWishlisted ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-500'
          }`}
          onClick={handleToggleWishlist}
          disabled={isTogglingWishlist}
        >
          {isTogglingWishlist ? (
            <LoadingSpinner size="sm" text="" />
          ) : (
            <Heart className={`h-3 w-3 md:h-4 md:w-4 ${isWishlisted ? 'fill-current' : ''}`} />
          )}
        </Button>

        {/* Product Image - Clickable */}
        <div 
          className={`${viewMode === 'list' ? 'aspect-[4/3]' : 'aspect-square'} overflow-hidden cursor-pointer`}
          onClick={handleProductClick}
        >
          <img
            src={product.images && product.images.length > 1 ? product.images[0] : product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300"
            onMouseEnter={e => {
              if (product.images && product.images.length > 1) {
                (e.target as HTMLImageElement).src = product.images[1];
              }
            }}
            onMouseLeave={e => {
              if (product.images && product.images.length > 1) {
                (e.target as HTMLImageElement).src = product.images[0];
              }
            }}
          />
        </div>
      </div>

      <CardContent className={`${viewMode === 'list' ? 'flex-1' : ''} p-2 md:p-4`}>
        {/* Product Name - Clickable */}
        <h3 
          className={`font-semibold ${viewMode === 'list' ? 'text-base md:text-lg' : 'text-sm md:text-lg'} mb-1 md:mb-2 line-clamp-2 cursor-pointer hover:text-primary transition-colors`}
          onClick={handleProductClick}
        >
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 md:gap-2 mb-2 md:mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 md:h-4 md:w-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs md:text-sm text-muted-foreground">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-1 md:gap-2 mb-2 md:mb-4">
          <span className={`${viewMode === 'list' ? 'text-xl md:text-2xl' : 'text-lg md:text-2xl'} font-bold text-primary`}>₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-xs md:text-sm text-muted-foreground line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        {/* Features - Hidden in small mobile grid view */}
        <div className={`space-y-1 mb-2 md:mb-4 ${viewMode === 'grid' ? 'hidden sm:block' : ''}`}>
          {product.features.slice(0, viewMode === 'list' ? 3 : 2).map((feature, index) => (
            <div key={index} className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="w-1 h-1 bg-primary rounded-full"></span>
              {feature}
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className={`${viewMode === 'list' ? 'flex-col gap-2 p-2 md:p-4' : 'p-2 md:p-4 pt-0'} flex gap-2`}>
        <Button
          onClick={handleAddToCart}
          variant={cartQuantity > 0 ? "outline" : "default"}
          disabled={!product.inStock || isAddingToCart}
          className={`${viewMode === 'list' ? 'w-full' : 'flex-1'}`}
          size="sm"
        >
          {isAddingToCart ? (
            <LoadingSpinner size="sm" text="" className="mr-1 md:mr-2" />
          ) : (
            <ShoppingCart className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
          )}
          <span className="text-xs md:text-sm">
            {isAddingToCart ? 'Adding...' : cartQuantity > 0 ? `In Cart (${cartQuantity})` : 'Add to Cart'}
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
};