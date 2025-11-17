import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, X, Phone, Mail, ShoppingCart, User, Heart, LogOut, Package } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { useAuth } from "../contexts/AuthContext";
import { AuthModal } from "./auth/AuthModal";
import { SearchModal } from "./SearchModal";
import CartSidebar from "./CartSidebar";
import WishlistSidebar from "./WishlistSidebar";
import makarioLogo from "../assets/Makario png Logo.jpg";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [activeHover, setActiveHover] = useState<string | null>(null);
    const location = useLocation();

    const { getTotalItems, openCart } = useCart();
    const { items: wishlistItems, openWishlist } = useWishlist();
    const { user, logout } = useAuth();

    const isActive = (path: string) => location.pathname === path;

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Shop", href: "/shop", isHot: true },
        { name: "About", href: "/about" },
        { name: "Bulk Orders", href: "/bulk-orders" },
        { name: "Quality", href: "/quality-assurance" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" },
    ];

    const getNavButtonClass = (isActiveLink: boolean) => {
        if (isActiveLink) {
            return "inline-flex items-center justify-center text-golden bg-green-100 border-2 border-green-400 hover:bg-green-200 shadow-md";
        }
        return "inline-flex items-center justify-center text-heritage/80 border-2 border-transparent hover:text-golden hover:bg-white/50";
    };

    return (
        <>
            <header className="bg-white sticky top-0 z-50 shadow-md border-b-2 border-golden/20">
                {/* Top Bar - Desktop Only */}
                <div className="hidden lg:block bg-gradient-to-r from-heritage/5 to-golden/5 border-b border-golden/15">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between py-3 text-xs font-medium text-heritage/70">
                            <div className="flex items-center gap-8">
                                <a href="tel:+919953240031" className="flex items-center gap-2 hover:text-golden transition-colors duration-200">
                                    <Phone className="w-4 h-4" />
                                    <span>+91 9953240031</span>
                                </a>
                                <a href="mailto:info@makario.in" className="flex items-center gap-2 hover:text-golden transition-colors duration-200">
                                    <Mail className="w-4 h-4" />
                                    <span>info@makario.in</span>
                                </a>
                            </div>
                            <div className="flex items-center gap-6">
                                <Link to="/track-order" className="hover:text-golden transition-colors duration-200">Track Order</Link>
                                <Link to="/shipping" className="hover:text-golden transition-colors duration-200">Shipping</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Navigation Bar */}
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16 lg:h-24 gap-4">

                        {/* Mobile Menu Toggle */}
                        <div className="lg:hidden">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-heritage hover:bg-heritage/5 h-10 w-10"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </Button>
                        </div>

                        {/* Logo */}
                        <Link to="/" className="flex-1 lg:flex-none flex justify-center lg:justify-start flex-shrink-0">
                            <div className="hover:opacity-85 transition-all duration-300 transform hover:scale-105">
                                <img
                                    src={makarioLogo}
                                    alt="Makario"
                                    className="h-14 lg:h-20 w-auto object-contain opacity-95 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                                />
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center justify-center flex-1 mx-8">
                            <div className="flex items-center gap-4">
                                {navLinks.map((link) => (
                                    <div
                                        key={link.href}
                                        className="relative group"
                                        onMouseEnter={() => setActiveHover(link.href)}
                                        onMouseLeave={() => setActiveHover(null)}
                                    >
                                        <Link
                                            to={link.href}
                                            className={`text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-300 relative whitespace-nowrap ${getNavButtonClass(isActive(link.href))}`}
                                        >
                                            <span className="flex items-center gap-2 whitespace-nowrap">
                                                {link.name}
                                                {link.isHot && (
                                                    <span className="text-[6px] font-bold px-1.5 py-0.5 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white animate-pulse">HOT</span>
                                                )}
                                            </span>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </nav>

                        {/* Right Actions */}
                        <div className="flex items-center gap-2 lg:gap-4">
                            {/* Wishlist */}
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openWishlist()}
                                className="relative h-11 w-11 rounded-xl hover:bg-golden/10 text-heritage hover:text-golden transition-all duration-300 group"
                            >
                                <Heart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                {wishlistItems.length > 0 && (
                                    <Badge className="absolute -top-1 -right-1 h-6 w-6 p-0 flex items-center justify-center text-xs bg-gradient-to-r from-red-500 to-red-600 text-white font-bold shadow-lg">
                                        {wishlistItems.length}
                                    </Badge>
                                )}
                            </Button>

                            {/* Cart */}
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openCart()}
                                className="relative h-11 w-11 rounded-xl hover:bg-golden/10 text-heritage hover:text-golden transition-all duration-300 group"
                            >
                                <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                {getTotalItems() > 0 && (
                                    <Badge className="absolute -top-1 -right-1 h-6 w-6 p-0 flex items-center justify-center text-xs bg-gradient-to-r from-red-500 to-red-600 text-white font-bold shadow-lg">
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
                                            className="h-11 px-4 rounded-xl hover:bg-golden/10 text-heritage hover:text-golden transition-all duration-300 font-semibold group"
                                        >
                                            <User className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                            <span className="hidden md:inline md:ml-2 text-sm font-bold">{user.name}</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-52 rounded-xl shadow-xl border border-golden/20">
                                        <DropdownMenuItem asChild>
                                            <Link to="/profile" className="cursor-pointer">
                                                <User className="h-4 w-4 mr-2" />
                                                Profile
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link to="/orders" className="cursor-pointer">
                                                <Package className="h-4 w-4 mr-2" />
                                                Orders
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link to="/wishlist" className="cursor-pointer">
                                                <Heart className="h-4 w-4 mr-2" />
                                                Wishlist
                                            </Link>
                                        </DropdownMenuItem>
                                        <div className="h-px bg-golden/15 my-2" />
                                        <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600">
                                            <LogOut className="h-4 w-4 mr-2" />
                                            Logout
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Button
                                    size="sm"
                                    onClick={() => setShowAuthModal(true)}
                                    className="h-11 px-6 bg-gradient-to-r from-golden to-golden/90 hover:from-golden/90 hover:to-golden/80 text-white font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 group"
                                >
                                    <User className="h-4 w-4 group-hover:scale-110 transition-transform" />
                                    <span className="hidden md:inline md:ml-2">Login</span>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Sidebar */}
                {isMenuOpen && (
                    <div className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm">
                        <div className="absolute inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-2xl overflow-y-auto rounded-r-2xl">
                            <div className="flex flex-col h-full">

                                {/* Mobile Menu Header */}
                                <div className="p-5 border-b-2 border-golden/15 flex items-center justify-between sticky top-0 bg-gradient-to-r from-white to-golden/5">
                                    <Link to="/" onClick={() => setIsMenuOpen(false)}>
                                        <img
                                            src={makarioLogo}
                                            alt="Makario"
                                            className="h-12 w-auto object-contain opacity-95 rounded-lg"
                                        />
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="h-11 w-11 hover:bg-heritage/10 rounded-xl transition-all"
                                    >
                                        <X className="h-6 w-6" />
                                    </Button>
                                </div>

                                {/* Mobile Menu Content */}
                                <div className="flex-1 p-5 space-y-4">

                                    {/* User Section */}
                                    {user ? (
                                        <div className="p-4 bg-gradient-to-br from-golden/10 to-golden/5 rounded-xl border-2 border-golden/20">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-golden/20 to-golden/10 flex items-center justify-center">
                                                    <User className="w-6 h-6 text-golden" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-heritage text-sm">{user.name}</div>
                                                    <div className="text-xs text-heritage/60">{user.email}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <Button
                                            className="w-full bg-gradient-to-r from-golden to-golden/90 hover:from-golden/90 hover:to-golden/80 text-white font-bold h-11 rounded-xl shadow-md transition-all transform hover:scale-105"
                                            onClick={() => {
                                                setIsMenuOpen(false);
                                                setShowAuthModal(true);
                                            }}
                                        >
                                            <User className="h-5 w-5 mr-2" />
                                            Sign In
                                        </Button>
                                    )}

                                    {/* Navigation Links */}
                                    <nav className="space-y-2">
                                        {navLinks.map((link) => (
                                            <Link
                                                key={link.href}
                                                to={link.href}
                                                className={`flex items-center px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 border-2 ${isActive(link.href)
                                                    ? "text-golden bg-green-100 border-green-400 hover:bg-green-200 shadow-md"
                                                    : "text-heritage border-transparent hover:text-golden hover:bg-white/50"
                                                    }`}
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <span className="flex items-center gap-2">
                                                    {link.name}
                                                    {link.isHot && (
                                                        <span className="text-[6px] font-bold px-1.5 py-0.5 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white animate-pulse">HOT</span>
                                                    )}
                                                </span>
                                            </Link>
                                        ))}
                                    </nav>

                                    {/* Quick Links */}
                                    <div className="border-t-2 border-golden/15 pt-4 space-y-2">
                                        <Link
                                            to="/track-order"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-heritage hover:text-golden hover:bg-golden/5 transition-all border-2 border-golden/20 hover:border-golden/40"
                                        >
                                            <Package className="w-5 h-5" />
                                            Track Order
                                        </Link>
                                        <Link
                                            to="/shipping"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-heritage hover:text-golden hover:bg-golden/5 transition-all border-2 border-golden/20 hover:border-golden/40"
                                        >
                                            <Mail className="w-5 h-5" />
                                            Shipping Info
                                        </Link>
                                    </div>
                                </div>

                                {/* Mobile Menu Footer */}
                                {user && (
                                    <div className="p-5 border-t-2 border-golden/15 bg-gradient-to-r from-white to-golden/5">
                                        <Button
                                            className="w-full text-red-600 hover:text-red-700 hover:bg-red-50/80 font-bold h-11 rounded-xl border-2 border-red-300/50 transition-all"
                                            variant="outline"
                                            onClick={() => {
                                                logout();
                                                setIsMenuOpen(false);
                                            }}
                                        >
                                            <LogOut className="w-5 h-5 mr-2" />
                                            Logout
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Modals */}
            <SearchModal isOpen={showSearchModal} onClose={() => setShowSearchModal(false)} />
            <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} initialView="login" />
            <CartSidebar />
            <WishlistSidebar />
        </>
    );
};

export default Header;
