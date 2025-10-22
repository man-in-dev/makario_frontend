import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useAuth } from '../contexts/AuthContext';
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
  ArrowLeft, 
  ChevronRight,
  Home,
  Package,
  Phone,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LazyImage from '../components/LazyImage';
import SEO from '../components/SEO';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem, items } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, items: wishlistItems } = useWishlist();
  const { user } = useAuth();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <Button onClick={() => navigate('/products')}>
              Browse Products
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const isWishlisted = wishlistItems.some(item => item.id === product.id);
  const cartItem = items.find(item => item.id === product.id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;

  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : ['/placeholder.svg'];

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    navigate('/checkout');
  };

  const handleToggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // Related products (other products excluding current one)
  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <>
      <SEO 
        title={`${product.name} | Makario Brand`}
        description={product.description}
        keywords="bihar makhana, premium makhana, organic makhana"
        image={product.images[0]}
      />
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center hover:text-primary"
          >
            <Home className="h-4 w-4 mr-1" />
            Home
          </button>
          <ChevronRight className="h-4 w-4" />
          <button 
            onClick={() => navigate('/products')}
            className="hover:text-primary"
          >
            Flavoured Makhana
          </button>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Image Gallery */}
          <div className="space-y-4">
            {/* Main Product Image */}
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden border">
              <LazyImage
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-6 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square border-2 rounded-lg overflow-hidden transition-all ${
                    selectedImage === index 
                      ? 'border-orange-500' 
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <LazyImage
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Product Title & Rating */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-blue-600 underline cursor-pointer">
                  {product.reviewCount} reviews
                </span>
              </div>
            </div>

            {/* Price Section */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-sm text-gray-500 line-through">
                  ₹{product.originalPrice || (product.price * 1.2).toFixed(0)}
                </span>
                <span className="text-3xl font-bold text-red-600">
                  ₹{product.price}
                </span>
                <span className="text-sm text-gray-600">(incl. GST)</span>
              </div>
              
              <div className="text-green-600 font-medium mb-3">
                In Stock
              </div>

              {/* Product Features */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-green-600" />
                  <span>Quick Delivery (Delhi NCR Sat before 2:00 PM for same-day dispatch)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-green-600" />
                  <span>Free Shipping across India on orders above ₹1000</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-green-600" />
                  <span>WhatsApp and phone customer service support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>Expertly processed for maximum crunch and freshness</span>
                </div>
              </div>
            </div>

            {/* SKU and Brand */}
            <div className="text-sm text-gray-600">
              <div>SKU: MKR-{product.id.toString().padStart(4, '0')}</div>
              <div>Category: Flavoured Makhana</div>
              <div className="mt-2">
                <span>Brand: </span>
                <span className="font-medium">Makario</span>
              </div>
            </div>

            {/* Quantity Selector and Buttons */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={decreaseQuantity}
                    className="p-2 hover:bg-gray-100"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    className="p-2 hover:bg-gray-100"
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={handleBuyNow}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3"
                  disabled={!product.inStock}
                >
                  Buy Now
                </Button>
                
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-50 px-8 py-3"
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                
                <Button
                  onClick={handleToggleWishlist}
                  variant="outline"
                  size="icon"
                  className={`px-3 py-3 ${isWishlisted ? 'text-red-500 border-red-200' : ''}`}
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>

            {/* Social Sharing */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Share:</span>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                  f
                </button>
                <button className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs">
                  t
                </button>
                <button className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-xs">
                  in
                </button>
                <button className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-xs">
                  w
                </button>
                <button className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center text-xs">
                  @
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specification">Specification</TabsTrigger>
              <TabsTrigger value="reviews">Reviews (2)</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Product Description</h3>
                  <p className="text-gray-700 mb-4">
                    Get ready to turn up the heat with Heeva Roasted Makhana – Peri-Peri Flavour! 
                    Carefully crafted from the finest quality foxnuts, this crunchy delight is seasoned 
                    with spicy Peri Peri flavour for those who crave bold taste and wholesome snacking.
                  </p>
                  
                  <h4 className="font-semibold mb-3">Key Features & Benefits:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Fiery Peri Peri Flavour:</strong> Experience the bold and spicy taste of our Peri Peri Makhana, a perfect blend of heat and flavor.</li>
                    <li><strong>Premium Foxnuts:</strong> Premium quality lotus seeds sourced from trusted suppliers.</li>
                    <li><strong>Carefully Roasted:</strong> Our makhana is expertly roasted to ensure a crispy texture and enhance the Peri Peri flavor.</li>
                    <li><strong>Healthy Snacking:</strong> Packed with essential nutrients and low in calories.</li>
                    <li><strong>Protein and Fiber-Rich:</strong> A wholesome source of plant-based protein and dietary fiber, supporting a healthy lifestyle.</li>
                    <li><strong>No Artificial Additives:</strong> No artificial colors, flavors, or preservatives, or MSG.</li>
                    <li><strong>Vegan and Gluten-Free:</strong> Suitable for vegans and those with gluten sensitivities, making it an inclusive snack.</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specification" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Product Specifications</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Weight:</span>
                      <span className="ml-2">100g</span>
                    </div>
                    <div>
                      <span className="font-medium">Brand:</span>
                      <span className="ml-2">Makario</span>
                    </div>
                    <div>
                      <span className="font-medium">Flavor:</span>
                      <span className="ml-2">Peri-Peri</span>
                    </div>
                    <div>
                      <span className="font-medium">Type:</span>
                      <span className="ml-2">Roasted Makhana</span>
                    </div>
                    <div>
                      <span className="font-medium">Shelf Life:</span>
                      <span className="ml-2">12 months</span>
                    </div>
                    <div>
                      <span className="font-medium">Storage:</span>
                      <span className="ml-2">Store in cool, dry place</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Customer Reviews (2)</h3>
                  
                  {/* Sample Reviews */}
                  <div className="space-y-6">
                    <div className="border-b pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 text-yellow-400 fill-current"
                            />
                          ))}
                        </div>
                        <span className="font-medium">Excellent Quality!</span>
                      </div>
                      <p className="text-gray-700 text-sm mb-2">
                        "Amazing quality makhana with perfect peri-peri seasoning. 
                        Fresh, crunchy and perfectly roasted. Definitely recommending to others!"
                      </p>
                      <div className="text-xs text-gray-500">
                        - Verified Customer
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(4)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 text-yellow-400 fill-current"
                            />
                          ))}
                          <Star className="h-4 w-4 text-gray-300" />
                        </div>
                        <span className="font-medium">Great Taste</span>
                      </div>
                      <p className="text-gray-700 text-sm mb-2">
                        "Love the spicy peri-peri flavor and healthy snacking option. 
                        Perfect for evening cravings. Fast delivery too!"
                      </p>
                      <div className="text-xs text-gray-500">
                        - Verified Customer
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
          <h2 className="text-2xl font-bold mb-6">Related products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="group hover:shadow-lg transition-shadow">
                <div className="relative">
                  {/* Sale Badge */}
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
                    Sale
                  </div>
                  
                  <div className="aspect-square overflow-hidden">
                    <LazyImage
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-medium text-sm mb-2 line-clamp-2">
                    {relatedProduct.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-500 line-through">
                      ₹{(relatedProduct.price * 1.2).toFixed(0)}
                    </span>
                    <span className="font-bold text-red-600">
                      ₹{relatedProduct.price}
                    </span>
                    <span className="text-xs text-gray-600">(incl. GST)</span>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
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