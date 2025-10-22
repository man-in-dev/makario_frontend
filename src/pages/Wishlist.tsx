import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import LazyImage from '../components/LazyImage';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

const Wishlist: React.FC = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  if (items.length === 0) {
    return (
      <>
        <SEO 
          title="My Wishlist - Bihar Makhana Pride"
          description="Your wishlist of favorite makhana products"
          keywords="wishlist, favorite products, makhana"
        />
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="pt-6">
              <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-6">
                Save your favorite makhana products to buy them later!
              </p>
              <Button onClick={() => navigate('/shop')}>
                Start Shopping
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO 
        title="My Wishlist - Bihar Makhana Pride"
        description="Your saved favorite makhana products"
        keywords="wishlist, favorite products, makhana, saved items"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          {items.length > 0 && (
            <Button
              variant="outline"
              onClick={clearWishlist}
              className="text-red-500 border-red-500 hover:bg-red-50"
            >
              Clear All
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((product) => {
            const cartQuantity = getItemQuantity(product.id);
            
            return (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <div className="aspect-square overflow-hidden rounded-lg">
                      <LazyImage
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    {/* Remove from Wishlist */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                      onClick={() => removeFromWishlist(product.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground">Weight: {product.weight}</p>
                    
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock}
                        className="flex-1"
                        variant={cartQuantity > 0 ? "outline" : "default"}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {cartQuantity > 0 ? `In Cart (${cartQuantity})` : 'Add to Cart'}
                      </Button>
                      
                      <Button
                        variant="outline"
                        onClick={() => removeFromWishlist(product.id)}
                        className="text-red-500 border-red-500 hover:bg-red-50"
                      >
                        <Heart className="h-4 w-4 fill-current" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-8">
          <Button onClick={() => navigate('/shop')} size="lg">
            Continue Shopping
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;