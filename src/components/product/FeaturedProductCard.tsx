import React, { useState, useEffect } from 'react';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import api from '../../utils/api';
import { loadCashfreeScript, initializeCashfree } from '../../utils/loadCashfree';

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
  const [isHovering, setIsHovering] = useState(false);
  const [showShippingModal, setShowShippingModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    pincode: user?.pincode || '',
  });

  // Update shipping info when user changes
  useEffect(() => {
    if (user) {
      const defaultAddress = user.addresses?.find(addr => addr.isDefault) || user.addresses?.[0];
      setShippingInfo({
        fullName: user.name || '',
        email: user.email || '',
        phone: defaultAddress?.phone || user.phone || '',
        address: defaultAddress?.street || user.address || '',
        city: defaultAddress?.city || user.city || '',
        state: defaultAddress?.state || user.state || '',
        pincode: defaultAddress?.pincode || user.pincode || '',
      });

    }
  }, [user]);

  // Handle checkout after login (when user returns from login page)
  useEffect(() => {
    if (user) {
      const pendingCheckoutData = localStorage.getItem('pendingCheckout');
      if (pendingCheckoutData) {
        try {
          const { productId } = JSON.parse(pendingCheckoutData);
          // Only proceed if this is the same product
          if (productId === product.id) {
            localStorage.removeItem('pendingCheckout');
            
            // Small delay to ensure user state is fully updated
            setTimeout(async () => {
              // Get shipping info from user profile or saved addresses
              let currentShippingInfo = getShippingInfo();
              
              // If shipping info is incomplete, show modal
              if (!validateShippingInfo(currentShippingInfo)) {
                setShippingInfo({
                  fullName: user.name || '',
                  email: user.email || '',
                  phone: user.phone || '',
                  address: user.address || '',
                  city: user.city || '',
                  state: user.state || '',
                  pincode: user.pincode || '',
                });
                setShowShippingModal(true);
                return;
              }

              // Proceed with payment
              await proceedToCashfreeCheckout(currentShippingInfo);
            }, 500);
          }
        } catch (error) {
          console.error('Error parsing pending checkout data:', error);
          localStorage.removeItem('pendingCheckout');
        }
      }
    }
  }, [user, product.id]);

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

  const getShippingInfo = () => {
    // Check if user has a default address
    if (user?.addresses && user.addresses.length > 0) {
      const defaultAddress = user.addresses.find(addr => addr.isDefault) || user.addresses[0];
      if (defaultAddress) {
        return {
          fullName: user.name || '',
          email: user.email || '',
          phone: defaultAddress.phone || user.phone || '',
          address: defaultAddress.street || user.address || '',
          city: defaultAddress.city || user.city || '',
          state: defaultAddress.state || user.state || '',
          pincode: defaultAddress.pincode || user.pincode || '',
        };
      }
    }
    
    // Fallback to user profile info
    if (user) {
      return {
        fullName: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        pincode: user.pincode || '',
      };
    }
    
    return shippingInfo;
  };

  const validateShippingInfo = (info: typeof shippingInfo) => {
    return info.fullName && info.email && info.phone && 
           info.address && info.city && info.state && info.pincode;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const proceedToCashfreeCheckout = async (shippingData: typeof shippingInfo) => {
    setIsProcessing(true);

    try {
      const totalAmount = product.price + 50; // Product price + shipping

      // Create order in database
      const orderData = {
        items: [{
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
        }],
        shippingInfo: shippingData,
        paymentMethod: 'online',
        paymentDetails: {
          paymentStatus: 'pending',
        },
        subtotal: product.price,
        shippingCharge: 50,
        discount: 0,
        coupon: null,
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
        amount: totalAmount,
        customerDetails: {
          customerId: user?.id || shippingData.email,
          customerEmail: shippingData.email,
          customerPhone: shippingData.phone,
          customerName: shippingData.fullName,
        },
        orderNote: `Order ${orderId} - ${product.name}`,
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
      console.error('Buy now error:', error);
      toast.error('Failed to initiate payment', {
        description: error.response?.data?.message || error.message || 'Please try again',
      });
      setIsProcessing(false);
    }
  };

  const handleShippingSubmit = async () => {
    // Validate shipping info
    if (!validateShippingInfo(shippingInfo)) {
      toast.error('Please fill all shipping details');
      return;
    }

    setShowShippingModal(false);
    await proceedToCashfreeCheckout(shippingInfo);
  };

  const handleBuyNow = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!user) {
      // Store product info for checkout after login
      localStorage.setItem('pendingCheckout', JSON.stringify({
        productId: product.id,
        returnUrl: window.location.pathname + window.location.search,
      }));
      // Redirect to login page
      navigate('/login');
      return;
    }

    // Get shipping info from user profile or saved addresses
    let currentShippingInfo = getShippingInfo();
    
    // If shipping info is incomplete, show modal
    if (!validateShippingInfo(currentShippingInfo)) {
      setShippingInfo({
        fullName: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        pincode: user.pincode || '',
      });
      setShowShippingModal(true);
      return;
    }

    // Proceed with payment
    await proceedToCashfreeCheckout(currentShippingInfo);
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
      <div 
        className={`relative ${small ? 'aspect-[4/5] h-28' : 'aspect-[5/4] md:aspect-[4/5]'} overflow-hidden cursor-pointer bg-gradient-to-br from-orange-50 to-amber-50`} 
        onClick={handleProductClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <LazyImage
          src={isHovering && product.images?.length > 1 ? product.images[1] : product.image}
          alt={product.name}
          className={`w-full h-full object-contain transition-all duration-300 ${small ? 'p-1' : ''}`}
        />
        {/* Overlay with Quick View on Hover */}
        {!small && isHovering && (
          <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 flex items-center justify-center">
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
            disabled={!product.inStock || isProcessing}
            className={`flex-1 bg-golden hover:bg-golden/90 text-white border-0 transition-all duration-300 font-bold shadow-md hover:shadow-lg ${small ? 'text-xs py-1 px-1' : 'text-xs md:text-sm py-1.5 md:py-2 px-2'}`}
          >
            <span className="truncate">{isProcessing ? 'Processing...' : (small ? 'Buy' : 'Buy')}</span>
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

        {/* Shipping Info Modal */}
        <Dialog open={showShippingModal} onOpenChange={setShowShippingModal}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Shipping Information</DialogTitle>
              <DialogDescription>
                Please provide your shipping details to proceed with the order.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="md:col-span-2">
                <Label htmlFor="modal-fullName">Full Name *</Label>
                <Input
                  id="modal-fullName"
                  name="fullName"
                  value={shippingInfo.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="modal-email">Email *</Label>
                <Input
                  id="modal-email"
                  name="email"
                  type="email"
                  value={shippingInfo.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="modal-phone">Phone Number *</Label>
                <Input
                  id="modal-phone"
                  name="phone"
                  type="tel"
                  value={shippingInfo.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="modal-address">Address *</Label>
                <Input
                  id="modal-address"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="modal-city">City *</Label>
                <Input
                  id="modal-city"
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="modal-state">State *</Label>
                <Input
                  id="modal-state"
                  name="state"
                  value={shippingInfo.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="modal-pincode">Pincode *</Label>
                <Input
                  id="modal-pincode"
                  name="pincode"
                  value={shippingInfo.pincode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowShippingModal(false)}
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button
                onClick={handleShippingSubmit}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Proceed to Payment'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        </>
        );
        };