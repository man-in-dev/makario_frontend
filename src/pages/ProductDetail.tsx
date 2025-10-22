import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import fssaiLogo from "../assets/1707841493fssai-logo-png.png";
import makeInIndiaLogo from "../assets/Make-in-India.png";
import { products } from '../data/products';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  Truck, 
  Shield, 
  Share2, 
  ChevronRight,
  Home,
  Package,
  Phone,
  Minus,
  Plus
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LazyImage from '../components/LazyImage';
import SEO from '../components/SEO';
import { StockAlert } from '../components/product/StockAlert';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [zoomOpen, setZoomOpen] = useState(false);

  // Find the product by ID (ensuring both are strings for comparison)
  const product = products.find(p => p.id === id);
  
  console.log('Product ID from URL:', id);
  console.log('Found product:', product?.name || 'Not found');
  
  if (!product) {
    console.error('Product not found for ID:', id);
    console.error('This should show the error page');
    return (
      <>
        <SEO 
          title="Product Not Found - Bihar Makhana Pride"
          description="The product you are looking for could not be found."
          keywords="product not found, error, bihar makhana"
        />
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8 max-w-md">
            <h1 className="text-3xl font-bold mb-4 text-red-600">Product Not Found</h1>
            <p className="text-gray-600 mb-6">
              Sorry, we couldn't find the product you're looking for. 
              URL ID: "{id}"
            </p>
            <div className="space-y-3">
              <Button onClick={() => navigate('/')} className="w-full">
                Go to Homepage
              </Button>
              <Button onClick={() => navigate('/products')} variant="outline" className="w-full">
                Browse Products
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const isWishlisted = product ? isInWishlist(product.id) : false;
  const cartQuantity = product ? getItemQuantity(product.id) : 0;
  
  // Use the found product for rendering
  const displayProduct = product;

  const productImages = displayProduct.images && displayProduct.images.length > 0 
    ? displayProduct.images 
    : ['/placeholder.svg'];

  const handleAddToCart = () => {
    addToCart(displayProduct, quantity);
  };

  const handleBuyNow = () => {
    addToCart(displayProduct, quantity);
    navigate('/checkout');
  };

  const handleToggleWishlist = () => {
    toggleWishlist(displayProduct);
  };

  const increaseQuantity = () => {
    if (quantity < 10) { // Max quantity limit
      setQuantity(prev => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // Related products (other products excluding current one)
  const relatedProducts = products.filter(p => p.id !== displayProduct.id).slice(0, 4);

  return (
    <>
      <SEO 
        title={`${displayProduct.name} | Makario Brand`}
        description={displayProduct.description}
        keywords="bihar makhana, premium makhana, organic makhana"
        ogImage={displayProduct.images[0]}
      />
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center hover:text-primary transition-colors"
          >
            <Home className="h-4 w-4 mr-1" />
            Home
          </button>
          <ChevronRight className="h-4 w-4" />
          <button 
            onClick={() => navigate('/products')}
            className="hover:text-primary transition-colors"
          >
            Flavoured Makhana
          </button>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">{displayProduct.name}</span>
        </nav>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Image Gallery */}
          <div className="space-y-4">
            {/* Main Product Image */}
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden border shadow-sm flex items-center justify-center relative">
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white z-10"
                onClick={() => setSelectedImage((selectedImage - 1 + productImages.length) % productImages.length)}
                aria-label="Previous image"
              >
                &#8592;
              </button>
              <div className="w-full h-full cursor-zoom-in" onClick={() => setZoomOpen(true)}>
                <LazyImage
                  src={productImages[selectedImage]}
                  alt={displayProduct.name}
                  className="w-full h-full object-contain p-4"
                />
              </div>
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white z-10"
                onClick={() => setSelectedImage((selectedImage + 1) % productImages.length)}
                aria-label="Next image"
              >
                &#8594;
              </button>
            </div>

            {/* Thumbnail Gallery */}
            {/* Image Zoom Modal */}
            {zoomOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" onClick={() => setZoomOpen(false)}>
                <img
                  src={productImages[selectedImage]}
                  alt={displayProduct.name}
                  className="max-w-3xl max-h-[80vh] rounded-lg shadow-2xl border-4 border-white"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            )}
            <div className="grid grid-cols-6 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square border-2 rounded-lg overflow-hidden transition-all hover:scale-105 ${
                    selectedImage === index 
                      ? 'border-orange-500 shadow-md' 
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <LazyImage
                    src={image}
                    alt={`${displayProduct.name} ${index + 1}`}
                    className="w-full h-full object-contain p-1"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Product Title & Rating */}
            <div>
              {/* Pack Badge */}
              {displayProduct.name.includes('Pack of') && (
                <span className="inline-block bg-blue-600 text-white font-bold text-xs px-3 py-1 rounded mb-2">
                  {displayProduct.name.match(/Pack of \d+/)?.[0]}
                </span>
              )}
              <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
                {displayProduct.name}
              </h1>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(displayProduct.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <button className="text-blue-600 underline hover:text-blue-800 transition-colors">
                  {displayProduct.reviewCount} reviews
                </button>
              </div>
            </div>

            {/* Price Section */}
            <div className="bg-gray-50 p-6 rounded-lg border">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-sm text-gray-500 line-through">
                  ₹{displayProduct.originalPrice || Math.round(displayProduct.price * 1.25)}
                </span>
                <span className="text-4xl font-bold text-red-600">
                  ₹{displayProduct.price}
                </span>
                <span className="text-sm text-gray-600 bg-white px-2 py-1 rounded">
                  (incl. GST)
                </span>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                {/* Stock Alert */}
                {displayProduct.stockQuantity <= 10 && (
                  <div className="flex-shrink-0">
                    <StockAlert stockQuantity={displayProduct.stockQuantity} />
                  </div>
                )}
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-600 font-medium">In Stock</span>
              </div>

              {/* Product Features */}
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Quick Delivery (Delhi NCR Sat before 2:00 PM for same-day dispatch)</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Free Shipping across India on orders above ₹1000</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>WhatsApp and phone customer service support</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Expertly processed for maximum crunch and freshness</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>FSSAI certified with quality assurance guarantee</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>High protein, low calorie, naturally gluten-free</span>
                </div>
              </div>

              {/* Certifications */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={fssaiLogo} 
                      alt="FSSAI Certified" 
                      className="h-8 w-auto object-contain"
                    />
                    <img 
                      src={makeInIndiaLogo} 
                      alt="Make in India" 
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                  <div className="text-sm text-gray-600">
                    FSSAI certified & proudly Made in India
                  </div>
                </div>
              </div>
            </div>

            {/* SKU and Category */}
            <div className="text-sm text-gray-600 space-y-1">
              <div><span className="font-medium">SKU:</span> MKR-{displayProduct.id.padStart(4, '0')}</div>
              <div><span className="font-medium">Category:</span> <span className="text-blue-600">Flavoured Makhana</span></div>
              <div className="mt-3">
                <span className="text-gray-500">Brand: </span>
                <span className="font-semibold text-gray-900">Makario</span>
              </div>
            </div>

            {/* Quantity Selector and Action Buttons */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">Qty:</span>
                <div className="flex items-center border-2 rounded-lg overflow-hidden">
                  <button
                    onClick={decreaseQuantity}
                    className="p-3 hover:bg-gray-100 transition-colors disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-6 py-3 border-x-2 bg-gray-50 font-medium min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQuantity}
                    className="p-3 hover:bg-gray-100 transition-colors disabled:opacity-50"
                    disabled={quantity >= 10}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  onClick={handleBuyNow}
                  className="bg-[#FFD700] hover:bg-[#FFC300] text-white px-8 py-3 h-12 text-base font-semibold flex-1"
                  disabled={!displayProduct.inStock}
                >
                  Buy Now
                </Button>
                
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  className="border-2 border-[#FFD700] text-[#FFD700] hover:bg-yellow-50 px-8 py-3 h-12 text-base font-semibold flex-1"
                  disabled={!displayProduct.inStock}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                
                <Button
                  onClick={handleToggleWishlist}
                  variant="outline"
                  size="icon"
                  className={`h-12 w-12 border-2 ${
                    isWishlisted 
                      ? 'text-red-500 border-red-200 bg-red-50' 
                      : 'text-gray-400 border-gray-300 hover:text-red-500 hover:border-red-300'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>

            {/* Social Sharing */}
            <div className="flex items-center gap-3 pt-4 border-t">
              <span className="text-sm font-medium text-gray-700">Share:</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                  className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs hover:bg-blue-700 transition-colors"
                >
                  f
                </button>
                <button 
                  onClick={() => window.open(`https://twitter.com/intent/tweet?text=Check out this premium Bihar Makhana&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                  className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs hover:bg-sky-600 transition-colors"
                >
                  t
                </button>
                <button 
                  onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                  className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs hover:bg-blue-800 transition-colors"
                >
                  in
                </button>
                <button 
                  onClick={() => window.open(`https://wa.me/?text=Check out this amazing Bihar Makhana: ${window.location.href}`, '_blank')}
                  className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-xs hover:bg-green-700 transition-colors"
                >
                  w
                </button>
                <button 
                  onClick={() => window.open(`mailto:?subject=Check out this product&body=I found this amazing Bihar Makhana: ${window.location.href}`, '_blank')}
                  className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                >
                  @
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 h-12">
              <TabsTrigger value="description" className="text-base">Description</TabsTrigger>
              <TabsTrigger value="specification" className="text-base">Specification</TabsTrigger>
              <TabsTrigger value="reviews" className="text-base">Reviews (2)</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardContent className="pt-8 pb-8">
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-6 text-base">
                      Get ready to turn up the heat with Heeva Roasted Makhana – Peri-Peri Flavour! 
                      Carefully crafted from the finest quality foxnuts, this crunchy delight is seasoned 
                      with spicy Peri Peri flavour for those who crave bold taste and wholesome snacking.
                    </p>
                    
                    <h4 className="text-lg font-semibold mb-4 text-gray-900">Key Features & Benefits:</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div><span className="font-medium">Fiery Peri Peri Flavour:</span> Experience the bold and spicy taste of our Peri Peri Makhana, a perfect blend of heat and flavor.</div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div><span className="font-medium">Premium Foxnuts:</span> Premium quality lotus seeds sourced from trusted suppliers.</div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div><span className="font-medium">Carefully Roasted:</span> Our makhana is expertly roasted to ensure a crispy texture and enhance the Peri Peri flavor.</div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div><span className="font-medium">Healthy Snacking:</span> Packed with essential nutrients and low in calories.</div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div><span className="font-medium">Protein and Fiber-Rich:</span> A wholesome source of plant-based protein and dietary fiber, supporting a healthy lifestyle.</div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div><span className="font-medium">No Artificial Additives:</span> No artificial colors, flavors, or preservatives, or MSG.</div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div><span className="font-medium">Vegan and Gluten-Free:</span> Suitable for vegans and those with gluten sensitivities, making it an inclusive snack.</div>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specification" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardContent className="pt-8 pb-8">
                  <h3 className="text-lg font-semibold mb-6 text-gray-900">Product Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">Weight:</span>
                        <span className="text-gray-900">100g</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">Brand:</span>
                        <span className="text-gray-900">Makario</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">Flavor:</span>
                        <span className="text-gray-900">Peri-Peri</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">Type:</span>
                        <span className="text-gray-900">Roasted Makhana</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">Shelf Life:</span>
                        <span className="text-gray-900">12 months</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">Storage:</span>
                        <span className="text-gray-900">Cool, dry place</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardContent className="pt-8 pb-8">
                  <h3 className="text-lg font-semibold mb-6 text-gray-900">Customer Reviews (2)</h3>
                  
                  {/* Sample Reviews */}
                  <div className="space-y-8">
                    <div className="border-b border-gray-100 pb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 text-yellow-400 fill-current"
                            />
                          ))}
                        </div>
                        <span className="font-semibold text-gray-900">Excellent Quality!</span>
                      </div>
                      <p className="text-gray-700 mb-3 leading-relaxed">
                        "Amazing quality makhana with perfect peri-peri seasoning. 
                        Fresh, crunchy and perfectly roasted. The spice level is just right - 
                        not too hot but definitely flavorful. Definitely recommending to others!"
                      </p>
                      <div className="text-sm text-gray-500">
                        - Verified Customer, 2 weeks ago
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center">
                          {[...Array(4)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 text-yellow-400 fill-current"
                            />
                          ))}
                          <Star className="h-4 w-4 text-gray-300" />
                        </div>
                        <span className="font-semibold text-gray-900">Great Taste & Healthy</span>
                      </div>
                      <p className="text-gray-700 mb-3 leading-relaxed">
                        "Love the spicy peri-peri flavor and it's a healthy snacking option. 
                        Perfect for evening cravings when you want something tasty yet nutritious. 
                        Fast delivery and good packaging. Will order again!"
                      </p>
                      <div className="text-sm text-gray-500">
                        - Verified Customer, 1 month ago
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold mb-8 text-gray-900">Related products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
                <div className="relative">
                  {/* Sale Badge */}
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded font-medium z-10">
                    Sale
                  </div>
                  
                  <div 
                    className="aspect-square overflow-hidden cursor-pointer bg-gray-50"
                    onClick={() => navigate(`/product/${relatedProduct.id}`)}
                  >
                    <LazyImage
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                
                <CardContent className="p-4 space-y-3">
                  <h3 
                    className="font-medium text-sm leading-tight line-clamp-2 cursor-pointer hover:text-red-600 transition-colors"
                    onClick={() => navigate(`/product/${relatedProduct.id}`)}
                  >
                    {relatedProduct.name}
                  </h3>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 line-through">
                      ₹{Math.round(relatedProduct.price * 1.25)}
                    </span>
                    <span className="font-bold text-red-600">
                      ₹{relatedProduct.price}
                    </span>
                    <span className="text-xs text-gray-600">(incl. GST)</span>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="w-full bg-golden hover:bg-golden/90 text-white font-medium"
                    onClick={() => navigate(`/product/${relatedProduct.id}`)}
                  >
                    Buy Now ₹
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetail;