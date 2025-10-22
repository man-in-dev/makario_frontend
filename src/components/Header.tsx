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

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop", isHot: true },
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { 
      name: "Delivery Areas", 
      href: "#",
      isDropdown: true,
      subItems: [
        { name: "Mumbai", href: "/mumbai" },
        { name: "Gujarat", href: "/gujarat" }, 
        { name: "South India", href: "/south-india" }
      ]
    },
    { name: "Export Services", href: "/export-services" },
    { name: "Quality", href: "/quality-assurance" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Top Bar */}
      <div className="bg-heritage text-white py-2 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+91 9953240031</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@makario.in</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white/98 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-golden/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Button - Left */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-heritage"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>

            {/* Logo - Center for mobile, Left for desktop */}
            <div className="flex-1 flex justify-center lg:justify-start lg:w-1/4">
              <Link to="/" className="flex items-center">
                <div className="bg-black rounded-lg p-1 lg:p-1.5">
                  <img 
                    src={makarioLogo} 
                    alt="Makario" 
                    className="h-8 w-auto lg:h-12 object-contain"
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center justify-center flex-1 space-x-6">
              {navigation.map((item) => (
                item.isDropdown ? (
                  <DropdownMenu key={item.name}>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className="text-sm font-medium text-heritage hover:text-golden whitespace-nowrap"
                      >
                        {item.name}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
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
                    className={`text-sm font-medium transition-colors hover:text-golden whitespace-nowrap relative ${
                      isActive(item.href)
                        ? "text-golden"
                        : "text-heritage"
                    }`}
                  >
                    {item.name}
                    {item.isHot && (
                      <span className="absolute -top-2.5 -right-6 bg-red-500 text-white text-[9px] font-bold px-1.5 leading-[14px] rounded-full animate-pulse">
                        HOT
                      </span>
                    )}
                  </Link>
                )
              ))}
            </nav>

            {/* Mobile and Desktop E-commerce Actions */}
            <div className="flex items-center space-x-2 md:space-x-4 lg:w-1/4 lg:justify-end">
              {/* Wishlist */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={openWishlist} 
                className="relative bg-golden/10 hover:bg-golden/20 transition-all duration-200 hover:scale-105"
              >
                <Heart className="h-5 w-5 text-golden" />
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
                className="relative bg-golden/10 hover:bg-golden/20 transition-all duration-200 hover:scale-105"
              >
                <ShoppingCart className="h-5 w-5 text-golden" />
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
                      className="bg-golden/10 hover:bg-golden/20 transition-all duration-200 hover:scale-105"
                    >
                      <User className="h-5 w-5 text-golden" />
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
            <div className="lg:hidden py-4 space-y-2 border-t border-golden/20 bg-white">
              {navigation.map((item) => (
                item.isDropdown ? (
                  <div key={item.name} className="px-3 py-2">
                    <div className="font-medium text-heritage mb-2">{item.name}</div>
                    <div className="pl-4 space-y-1">
                      {item.subItems?.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="block py-1 text-sm text-gray-600 hover:text-golden"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2 text-sm font-medium transition-colors hover:text-golden relative ${
                      isActive(item.href)
                        ? "text-golden bg-accent"
                        : "text-heritage"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                    {item.isHot && (
                      <span className="absolute top-2.5 left-12 bg-red-500 text-white text-[9px] font-bold px-1.5 leading-[14px] rounded-full animate-pulse">
                        HOT
                      </span>
                    )}
                  </Link>
                )
              ))}
              <div className="px-3 py-2 space-y-2">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/products" onClick={() => setIsMenuOpen(false)}>
                    View Products
                  </Link>
                </Button>
                <Button variant="hero" size="sm" className="w-full" asChild>
                  <Link to="/bulk-order" onClick={() => setIsMenuOpen(false)}>
                    Bulk Order
                  </Link>
                </Button>
              </div>
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