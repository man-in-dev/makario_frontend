import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, X, Phone, Mail, ShoppingCart, User, Heart, LogOut, Package } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { useAuth } from "../contexts/AuthContext";
import { AuthModal } from "./auth/AuthModal";
import CartSidebar from "./CartSidebar";
import WishlistSidebar from "./WishlistSidebar";
import makarioLogo from "../assets/Makario png Logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const location = useLocation();
  
  // Safe hooks with fallbacks
  let getTotalItems, wishlistItems, user, logout, isCartOpen, openCart, closeCart, isWishlistOpen, openWishlist, closeWishlist;
  
  try {
    const cart = useCart();
    getTotalItems = cart.getTotalItems;
    isCartOpen = cart.isCartOpen;
    openCart = cart.openCart;
    closeCart = cart.closeCart;
  } catch {
    getTotalItems = () => 0;
    isCartOpen = false;
    openCart = () => {};
    closeCart = () => {};
  }
  
  try {
    const wishlist = useWishlist();
    wishlistItems = wishlist.items;
    isWishlistOpen = wishlist.isWishlistOpen;
    openWishlist = wishlist.openWishlist;
    closeWishlist = wishlist.closeWishlist;
  } catch {
    wishlistItems = [];
    isWishlistOpen = false;
    openWishlist = () => {};
    closeWishlist = () => {};
  }
  
  try {
    const auth = useAuth();
    user = auth.user;
    logout = auth.logout;
  } catch {
    user = null;
    logout = () => {};
  }

  type NavigationItem = {
    name: string;
    href: string;
    isHot?: boolean;
    isDropdown?: boolean;
    subItems?: { name: string; href: string }[];
  };

  const navigation: NavigationItem[] = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop", isHot: true },
    { name: "About", href: "/about" },
    { name: "Bulk Orders", href: "/bulk-orders" },
    { name: "Quality", href: "/quality-assurance" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Main Header */}
      <header className="bg-white sticky top-0 z-50 shadow-md">
        <div className="border-b border-golden/20">
          <div className="container mx-auto">
            {/* Top Navigation Bar */}
            <div className="hidden lg:flex items-center justify-between py-2 px-4 text-sm">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-heritage hover:text-golden transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>+91 9953240031</span>
                </div>
                <div className="flex items-center space-x-2 text-heritage hover:text-golden transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>info@makario.in</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Link to="/track-order" className="text-heritage hover:text-golden transition-colors">Track Order</Link>
                <Link to="/shipping" className="text-heritage hover:text-golden transition-colors">Shipping</Link>
                <Link to="/contact" className="text-heritage hover:text-golden transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-heritage hover:bg-heritage/5"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>

            {/* Logo */}
            <div className="flex-1 flex justify-center lg:justify-start lg:flex-none">
              <Link to="/" className="flex items-center">
                <div className="bg-black rounded-lg p-1 lg:p-1.5 hover:opacity-90 transition-opacity">
                  <img 
                    src={makarioLogo} 
                    alt="Makario" 
                    className="h-8 w-auto lg:h-12 object-contain"
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center justify-center flex-1 mx-8">
              <div className="flex items-center space-x-1">
                {navigation.map((item) => (
                  item.isDropdown ? (
                    <DropdownMenu key={item.name}>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          className="text-sm font-medium text-heritage hover:text-golden hover:bg-golden/5 rounded-lg px-4 py-2"
                        >
                          {item.name}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-48">
                        {item.subItems?.map((subItem) => (
                          <DropdownMenuItem key={subItem.name} asChild>
                            <Link to={subItem.href} className="cursor-pointer">
                              {subItem.name}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`text-sm font-medium px-4 py-2 rounded-lg transition-all hover:bg-golden/5 relative
                        ${isActive(item.href) ? "text-golden bg-golden/5" : "text-heritage hover:text-golden"}`}
                    >
                      {item.name}
                      {item.isHot && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">
                          HOT
                        </span>
                      )}
                    </Link>
                  )
                ))}
              </div>
            </nav>

            {/* E-commerce Actions */}
            <div className="flex items-center gap-2 lg:gap-4">
              {/* Search - Desktop */}
              <div className="hidden lg:flex">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-golden/5 text-heritage hover:text-golden transition-colors rounded-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </Button>
              </div>

              {/* Wishlist */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={openWishlist} 
                className="relative hover:bg-golden/5 text-heritage hover:text-golden transition-colors rounded-lg"
              >
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {wishlistItems.length}
                  </Badge>
                )}
              </Button>

              {/* Cart */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={openCart} 
                className="relative hover:bg-golden/5 text-heritage hover:text-golden transition-colors rounded-lg"
              >
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>

              {/* User Menu */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="hover:bg-golden/5 text-heritage hover:text-golden transition-colors rounded-lg"
                    >
                      <User className="h-5 w-5" />
                      <span className="hidden md:inline md:ml-2">{user.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/profile">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/orders">
                        <Package className="h-4 w-4 mr-2" />
                        Order Management
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/wishlist">
                        <Heart className="h-4 w-4 mr-2" />
                        Wishlist
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowAuthModal(true)}
                  className="bg-golden/10 hover:bg-golden/20 transition-all duration-200 hover:scale-105"
                >
                  <User className="h-5 w-5 text-golden" />
                  <span className="hidden md:inline md:ml-2 text-golden">Login</span>
                </Button>
              )}
            </div>


          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/50">
              <div className="absolute inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-xl">
                <div className="flex flex-col h-full">
                  {/* Mobile Menu Header */}
                  <div className="p-4 border-b border-golden/20 flex items-center justify-between">
                    <Link to="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
                      <div className="bg-black rounded-lg p-1">
                        <img 
                          src={makarioLogo} 
                          alt="Makario" 
                          className="h-8 w-auto object-contain"
                        />
                      </div>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-heritage hover:text-golden"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Mobile Menu Content */}
                  <div className="flex-1 overflow-y-auto py-4">
                    <div className="px-4 py-2">
                      {/* User Actions */}
                      {user ? (
                        <div className="mb-4 p-3 bg-golden/5 rounded-lg">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-heritage/10 flex items-center justify-center">
                              <User className="w-5 h-5 text-heritage" />
                            </div>
                            <div>
                              <div className="font-medium text-heritage">{user.name}</div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="mb-4">
                          <Button 
                            variant="hero" 
                            className="w-full mb-2"
                            onClick={() => {
                              setIsMenuOpen(false);
                              setShowAuthModal(true);
                            }}
                          >
                            Sign In
                          </Button>
                        </div>
                      )}

                      {/* Navigation Links */}
                      <nav className="space-y-1">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                              isActive(item.href)
                                ? "text-golden bg-golden/5"
                                : "text-heritage hover:text-golden hover:bg-golden/5"
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.name}
                            {item.isHot && (
                              <span className="ml-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">
                                HOT
                              </span>
                            )}
                          </Link>
                        ))}
                      </nav>

                      {/* Quick Actions */}
                      <div className="mt-6 space-y-2">
                        <Button variant="outline" size="lg" className="w-full justify-start" asChild>
                          <Link to="/track-order" onClick={() => setIsMenuOpen(false)}>
                            <Package className="w-4 h-4 mr-2" />
                            Track Order
                          </Link>
                        </Button>
                        <Button variant="outline" size="lg" className="w-full justify-start" asChild>
                          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                            <Mail className="w-4 h-4 mr-2" />
                            Contact Us
                          </Link>
                        </Button>
                      </div>

                      {/* CTA Buttons */}
                      <div className="mt-6 space-y-2">
                        <Button variant="hero" size="lg" className="w-full" asChild>
                          <Link to="/shop" onClick={() => setIsMenuOpen(false)}>
                            Shop Now
                          </Link>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="lg" 
                          className="w-full border-2 border-heritage text-heritage hover:bg-heritage hover:text-white" 
                          asChild
                        >
                          <Link to="/bulk-orders" onClick={() => setIsMenuOpen(false)}>
                            Bulk Orders
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Menu Footer */}
                  <div className="p-4 border-t border-golden/20">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>+91 9953240031</span>
                      </div>
                      {user && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => {
                            logout();
                            setIsMenuOpen(false);
                          }}
                          className="text-red-500 hover:text-red-600"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Logout
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Overlay Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:text-white/80"
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialView="login"
      />

      {/* Cart Sidebar */}
      <CartSidebar />

      {/* Wishlist Sidebar */}
      <WishlistSidebar />
    </>
  );
};

export default Header;