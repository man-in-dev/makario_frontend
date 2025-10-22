import ShippingPolicy from "./pages/ShippingPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import RouteLoader from "./components/RouteLoader";
import GlobalMeta from "./components/GlobalMeta";
import { lazy } from "react";
import ChatbotPopup from "./components/ChatbotPopup";
import MobileBottomMenu from "./components/MobileBottomMenu";
import OfferPopup from "./components/OfferPopup";

// Lazy load all page components for better performance
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const BulkOrder = lazy(() => import("./pages/BulkOrder"));
const Products = lazy(() => import("./pages/Products"));
const Shop = lazy(() => import("./pages/Shop").then(module => ({ default: module.Shop })));
const Checkout = lazy(() => import("./pages/Checkout").then(module => ({ default: module.Checkout })));
const Wishlist = lazy(() => import("./pages/Wishlist").then(module => ({ default: module.default })));
const CartPage = lazy(() => import("./pages/CartPage"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Agriculture = lazy(() => import("./pages/Agriculture"));
const Global = lazy(() => import("./pages/Global"));
const Farmers = lazy(() => import("./pages/Farmers"));
const ExportServices = lazy(() => import("./pages/ExportServices"));
const QualityAssurance = lazy(() => import("./pages/QualityAssurance"));
const CustomPackaging = lazy(() => import("./pages/CustomPackaging"));
const Logistics = lazy(() => import("./pages/Logistics"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Mumbai = lazy(() => import("./pages/Mumbai"));
const Gujarat = lazy(() => import("./pages/Gujarat"));
const SouthIndia = lazy(() => import("./pages/SouthIndia"));
const Login = lazy(() => import("./pages/Login"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const Orders = lazy(() => import("./pages/Orders"));

// Admin Components
const AdminLogin = lazy(() => import("./components/admin/AdminLogin"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const AdminProtectedRoute = lazy(() => import("./components/admin/AdminProtectedRoute"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminProducts = lazy(() => import("./pages/admin/AdminProducts"));
const AdminAddProduct = lazy(() => import("./pages/admin/AdminAddProduct"));
const AdminCategories = lazy(() => import("./pages/admin/AdminCategories"));
const AdminInventory = lazy(() => import("./pages/admin/AdminInventory"));
const AdminOrders = lazy(() => import("./pages/admin/AdminOrders"));
const AdminCustomers = lazy(() => import("./pages/admin/AdminCustomers"));
const AdminShipping = lazy(() => import("./pages/admin/AdminShipping"));
const AdminPayments = lazy(() => import("./pages/admin/AdminPayments"));
const AdminCoupons = lazy(() => import("./pages/admin/AdminCoupons"));
const AdminAnalytics = lazy(() => import("./pages/admin/AdminAnalytics"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
const AdminMarketing = lazy(() => import("./components/admin/AdminMarketing"));
const AdminPromotions = lazy(() => import("./components/admin/AdminPromotions"));
const AdminEmailCampaigns = lazy(() => import("./components/admin/AdminEmailCampaigns"));

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <GlobalMeta />
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <AdminAuthProvider>
            <LoadingProvider>
            <CartProvider>
              <WishlistProvider>
                <Toaster />
                <ChatbotPopup />
                <OfferPopup />
                <BrowserRouter>
                  <MobileBottomMenu />
                  <RouteLoader>
                    <Routes>
                      {/* Chatbot Popup */}
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                                    <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/bulk-order" element={<BulkOrder />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<BlogPost />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/shipping" element={<ShippingPolicy />} />
                  <Route path="/refund" element={<RefundPolicy />} />
                  <Route path="/agriculture" element={<Agriculture />} />
                  <Route path="/global" element={<Global />} />
                  <Route path="/farmers" element={<Farmers />} />
                  <Route path="/export-services" element={<ExportServices />} />
                  <Route path="/quality-assurance" element={<QualityAssurance />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/custom-packaging" element={<CustomPackaging />} />
                  <Route path="/logistics" element={<Logistics />} />
                  <Route path="/mumbai" element={<Mumbai />} />
                  <Route path="/gujarat" element={<Gujarat />} />
                  <Route path="/south-india" element={<SouthIndia />} />
                  <Route path="*" element={<NotFound />} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={
                    <AdminProtectedRoute>
                      <AdminLayout />
                    </AdminProtectedRoute>
                  }>
                    <Route index element={<AdminDashboard />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="products/add" element={<AdminAddProduct />} />
                    <Route path="products/edit/:id" element={<AdminAddProduct />} />
                    <Route path="products/categories" element={<AdminCategories />} />
                    <Route path="products/inventory" element={<AdminInventory />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="orders/:id" element={<AdminOrders />} />
                    <Route path="customers" element={<AdminCustomers />} />
                    <Route path="customers/:id" element={<AdminCustomers />} />
                    <Route path="shipping" element={<AdminShipping />} />
                    <Route path="shipping/config" element={<AdminShipping />} />
                    <Route path="payments" element={<AdminPayments />} />
                    <Route path="payments/transactions" element={<AdminPayments />} />
                    <Route path="analytics" element={<AdminAnalytics />} />
                    <Route path="analytics/sales" element={<AdminAnalytics />} />
                    <Route path="analytics/customers" element={<AdminAnalytics />} />
                    <Route path="analytics/products" element={<AdminAnalytics />} />
                    <Route path="settings" element={<AdminSettings />} />
                    <Route path="settings/general" element={<AdminSettings />} />
                    <Route path="settings/shipping" element={<AdminSettings />} />
                    <Route path="settings/payment" element={<AdminSettings />} />
                    <Route path="settings/taxes" element={<AdminSettings />} />
                    <Route path="marketing" element={<AdminMarketing />} />
                    <Route path="marketing/campaigns" element={<AdminMarketing />} />
                    <Route path="marketing/social" element={<AdminMarketing />} />
                    <Route path="marketing/seo" element={<AdminMarketing />} />
                    <Route path="marketing/coupons" element={<AdminCoupons />} />
                    <Route path="marketing/promotions" element={<AdminPromotions />} />
                    <Route path="marketing/emails" element={<AdminEmailCampaigns />} />
                    <Route path="marketing/email-campaigns" element={<AdminEmailCampaigns />} />
                  </Route>
                  
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </RouteLoader>
                </BrowserRouter>
              </WishlistProvider>
            </CartProvider>
          </LoadingProvider>
          </AdminAuthProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
