import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin, Heart, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import fssaiLogo from "../assets/1707841493fssai-logo-png.png";
import makeInIndiaLogo from "../assets/Make-in-India.png";
import makarioLogo from "../assets/Makario png Logo.png";

const Footer = () => {
  return (
    <footer className="bg-heritage text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="bg-black rounded-lg p-3 inline-block">
              <img 
                src={makarioLogo} 
                alt="Makario" 
                className="h-20 w-auto object-contain"
              />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Bihar's finest makhana, cultivated with traditional wisdom and delivered 
              with modern excellence to tables worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-golden transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-golden transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-golden transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-golden transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Main Silos */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-golden">Shop & Products</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop" className="text-gray-300 hover:text-golden transition-colors">Buy Makhana Online</Link></li>
              <li><Link to="/product-categories" className="text-gray-300 hover:text-golden transition-colors">Raw Makhana 1kg</Link></li>
              <li><Link to="/shop?category=100g" className="text-gray-300 hover:text-golden transition-colors">Makhana 100g Price</Link></li>
              <li><Link to="/bulk-orders" className="text-gray-300 hover:text-golden transition-colors">Makhana Wholesale</Link></li>
              <li><Link to="/custom-packaging" className="text-gray-300 hover:text-golden transition-colors">Private Label Makhana</Link></li>
            </ul>
          </div>

          {/* Quality & Trust */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-golden">Quality & Trust</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/quality-assurance" className="text-gray-300 hover:text-golden transition-colors">Makario Quality</Link></li>
              <li><Link to="/quality-process" className="text-gray-300 hover:text-golden transition-colors">Quality Check Process</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-golden transition-colors">About Makario</Link></li>
              <li><Link to="/farmers" className="text-gray-300 hover:text-golden transition-colors">Our Farmers</Link></li>
              <li><Link to="/agriculture" className="text-gray-300 hover:text-golden transition-colors">Agriculture</Link></li>
            </ul>
          </div>

          {/* Knowledge Hub */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-golden">Knowledge Hub</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/blog" className="text-gray-300 hover:text-golden transition-colors">Makhana Benefits</Link></li>
              <li><Link to="/regional?region=katihar" className="text-gray-300 hover:text-golden transition-colors">Katihar Makhana Market</Link></li>
              <li><Link to="/regional?region=purnea" className="text-gray-300 hover:text-golden transition-colors">Purnea Makhana Demand</Link></li>
              <li><Link to="/regional?region=bihar" className="text-gray-300 hover:text-golden transition-colors">Bihar Makhana Industry</Link></li>
              <li><Link to="/export-quality" className="text-gray-300 hover:text-golden transition-colors">Makhana Export India</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-golden">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-golden flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-xs">
                  Falka, Katihar<br />
                  Bihar, India
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-golden flex-shrink-0" />
                <span className="text-gray-300 text-xs">+91 9953240031</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-golden flex-shrink-0" />
                <span className="text-gray-300 text-xs">info@makario.in</span>
              </div>
              <Button variant="hero" size="sm" className="mt-4" asChild>
                <Link to="/contact">Get In Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-golden/20 bg-heritage/80">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left Side: Newsletter */}
            <div className="flex flex-col space-y-4 flex-1">
              <div>
                <h4 className="text-lg font-semibold text-golden mb-1">Stay Updated</h4>
                <p className="text-gray-300 text-sm">Get latest updates on Bihar makhana and our products</p>
              </div>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-md bg-white/10 border border-golden/30 text-white placeholder-gray-400 focus:outline-none focus:border-golden"
                />
                <Button variant="hero" size="sm">Subscribe</Button>
              </div>
            </div>

            {/* Right Side: Certifications */}
            <div className="bg-white py-2 px-4 rounded-lg flex items-center justify-center gap-6">
              <img 
                src={fssaiLogo} 
                alt="FSSAI Certified" 
                className="h-14 w-auto object-contain"
              />
              <img 
                src={makeInIndiaLogo} 
                alt="Make in India" 
                className="h-14 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-golden/20 bg-heritage">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <span>© 2024 ARS Group - Made with</span>
              <Heart className="w-4 h-4 text-golden fill-golden" />
              <span>in Bihar, India</span>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-300 hover:text-golden transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-300 hover:text-golden transition-colors">Terms of Service</Link>
              <Link to="/shipping" className="text-gray-300 hover:text-golden transition-colors">Shipping Policy</Link>
              <Link to="/refund" className="text-gray-300 hover:text-golden transition-colors">Refund Policy</Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Force hide any stray content after footer */}
      <style>{`
        footer + * {
          display: none !important;
        }
        body > *:not(#root) {
          display: none !important;
        }
      `}</style>
    </footer>
  );
};

export default Footer;