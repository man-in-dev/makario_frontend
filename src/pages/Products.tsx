import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import SectionHeader from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import { ProductList } from "@/components/product/ProductList";
import { getFeaturedProducts } from "@/data/products";

const Products = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Shop Premium Bihar Makhana | Fox Nuts Collection | Makario"
        description="Browse our collection of premium Bihar makhana (fox nuts). High-quality, organic, and directly sourced from Bihar's finest producers. Shop now!"
        keywords="buy makhana online, fox nuts shop, premium makhana, bihar makhana online, organic fox nuts, healthy snacks"
      />
      
      <Header />

      {/* Products Hero Section */}
      <section className="py-16 bg-gradient-to-br from-heritage/5 via-nature/5 to-golden/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <SectionHeader
              eyebrow="OUR COLLECTION"
              icon={Package}
              title="Premium Bihar Makhana Collection"
              highlightWord="Collection"
              highlightColor="green"
              description="Discover our range of premium quality makhana, sourced directly from Bihar's finest producers"
              className="mb-8"
            />
          </div>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <ProductList products={getFeaturedProducts()} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-heritage text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Looking for Bulk Orders?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              We offer special pricing for wholesale and bulk quantities. Get in touch with our team for custom quotes.
            </p>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-heritage">
              Contact for Bulk Orders
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;