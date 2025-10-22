import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Home, ArrowLeft, Search } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEO 
        title="Page Not Found - Bihar Makhana Pride"
        description="The page you are looking for could not be found."
        keywords="404, page not found, error"
      />
      <Header />
      
      <div className="container mx-auto px-4 py-16 min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl font-bold text-gray-400">404</span>
            </div>
            <CardTitle className="text-2xl">Page Not Found</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <p className="text-sm text-gray-500">
              Requested URL: <code className="bg-gray-100 px-2 py-1 rounded">{location.pathname}</code>
            </p>
            
            <div className="space-y-2 pt-4">
              <Button 
                onClick={() => navigate('/')} 
                className="w-full"
              >
                <Home className="h-4 w-4 mr-2" />
                Go to Homepage
              </Button>
              
              <Button 
                onClick={() => navigate(-1)} 
                variant="outline" 
                className="w-full"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
              
              <Button 
                onClick={() => navigate('/shop')} 
                variant="ghost" 
                className="w-full"
              >
                <Search className="h-4 w-4 mr-2" />
                Browse Products
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </>
  );
};

export default NotFound;
