import { lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useRemoveGoogleText } from "./hooks/useRemoveGoogleText";

// Providers
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import { ScrollLockProvider } from "./contexts/ScrollLockContext";


// Components
import RouteLoader from "./components/RouteLoader";
import GlobalMeta from "./components/GlobalMeta";

import MobileBottomMenu from "./components/MobileBottomMenu";
import OfferPopup from "./components/OfferPopup";
import MarketplaceSlider from "./components/MarketplaceSlider";

// Admin Routes
import AdminRoutes from "./admin/AdminRoutes";

// Lazy load all page components for better performance
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const BulkOrders = lazy(() => import("./pages/BulkOrders"));
const ShippingPolicy = lazy(() => import("./pages/ShippingPolicy"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const Shop = lazy(() => import("./pages/Shop").then(m => ({ default: m.Shop || m.default })));
const Checkout = lazy(() => import("./pages/Checkout").then(module => ({ default: module.Checkout })));
const Wishlist = lazy(() => import("./pages/Wishlist").then(module => ({ default: module.default })));
const CartPage = lazy(() => import("./pages/CartPage"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Agriculture = lazy(() => import("./pages/Agriculture"));
const Farmers = lazy(() => import("./pages/Farmers"));
const QualityAssurance = lazy(() => import("./pages/QualityAssurance"));
const CustomPackaging = lazy(() => import("./pages/CustomPackaging"));
const Logistics = lazy(() => import("./pages/Logistics"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Login = lazy(() => import("./pages/Login").then(m => ({ default: m.LoginPage })));
const Signup = lazy(() => import("./pages/Signup").then(m => ({ default: m.SignupPage })));
const UserProfile = lazy(() => import("./pages/UserProfile").then(m => ({ default: m.UserProfilePage })));
const Orders = lazy(() => import("./pages/Orders"));
const TrackOrder = lazy(() => import("./pages/TrackOrder"));
const ProductCategories = lazy(() => import("./pages/ProductCategories"));
const FoundersStory = lazy(() => import("./pages/FoundersStory"));
const QualityProcess = lazy(() => import("./pages/QualityProcess"));
const ExportQuality = lazy(() => import("./pages/ExportQuality"));
const RegionalPages = lazy(() => import("./pages/RegionalPages"));
const Settings = lazy(() => import("./pages/Settings"));



const queryClient = new QueryClient();

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const App = () => {
  // Remove any Google verification text that appears
  useRemoveGoogleText();
  
  return (
    <HelmetProvider>
      <GlobalMeta />
      <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <LoadingProvider>
            <ScrollLockProvider>
              <CartProvider>
                <WishlistProvider>
                  <BrowserRouter>
                  <ScrollToTop />
                  <Toaster />
                  <OfferPopup />
                  <MobileBottomMenu />
                  <RouteLoader>
                    <Routes>
                      {/* Admin Panel Routes */}
                      <Route path="/admin/*" element={<AdminRoutes />} />
                      
                      {/* Main App Routes */}
                      <Route path="/" element={<Index />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/about/founders" element={<FoundersStory />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/product-categories" element={<ProductCategories />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/wishlist" element={<Wishlist />} />
                      <Route path="/bulk-orders" element={<BulkOrders />} />
                      <Route path="/bulk/export-quality" element={<ExportQuality />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/blog/:id" element={<BlogPost />} />
                      <Route path="/blog/regional/:region" element={<RegionalPages />} />
                      <Route path="/regional" element={<RegionalPages />} />
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/privacy" element={<Privacy />} />
                      <Route path="/terms" element={<Terms />} />
                      <Route path="/shipping" element={<ShippingPolicy />} />
                      <Route path="/refund" element={<RefundPolicy />} />
                      <Route path="/agriculture" element={<Agriculture />} />
                      <Route path="/farmers" element={<Farmers />} />
                      <Route path="/quality-assurance" element={<QualityAssurance />} />
                      <Route path="/quality/process" element={<QualityProcess />} />
                      <Route path="/quality-process" element={<QualityProcess />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/profile" element={<UserProfile />} />
                      <Route path="/orders" element={<Orders />} />
                      <Route path="/track-order" element={<TrackOrder />} />
                      <Route path="/custom-packaging" element={<CustomPackaging />} />
                      <Route path="/logistics" element={<Logistics />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </RouteLoader>
                </BrowserRouter>
              </WishlistProvider>
            </CartProvider>
            </ScrollLockProvider>
          </LoadingProvider>
        </AuthProvider>
      </TooltipProvider>
      </QueryClientProvider>
  </HelmetProvider>
  );
};

export default App;
