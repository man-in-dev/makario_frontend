import SectionHeader from "@/components/SectionHeader";
import { Users } from "lucide-react";

// Import customer images from assets
import customer1 from "@/assets/our customers/IMG-20251204-WA0197.jpg";
import customer2 from "@/assets/our customers/IMG-20251204-WA0198.jpg";
import customer3 from "@/assets/our customers/IMG-20251204-WA0199.jpg";
import customer4 from "@/assets/our customers/IMG-20251204-WA0201.jpg";
import customer5 from "@/assets/our customers/IMG-20251204-WA0202.jpg";
import customer6 from "@/assets/our customers/IMG-20251204-WA0204.jpg";
import customer7 from "@/assets/our customers/IMG-20251204-WA0205.jpg";
import customer8 from "@/assets/our customers/IMG-20251204-WA0206.jpg";
import customer9 from "@/assets/our customers/IMG-20251204-WA0207.jpg";
import customer10 from "@/assets/our customers/IMG-20251204-WA0208.jpg";
import customer11 from "@/assets/our customers/IMG-20251204-WA0209.jpg";
import customer12 from "@/assets/our customers/IMG-20251204-WA0210.jpg";
import customer13 from "@/assets/our customers/IMG-20251204-WA0211.jpg";
import customer14 from "@/assets/our customers/IMG-20251204-WA0212.jpg";

const RetailersWholesalersSection = ({ onShowBulkForm }: { onShowBulkForm: () => void }) => {
  const customerImages = [
    customer1, customer2, customer3, customer4, customer5, 
    customer6, customer7, customer8, customer9, customer10,
    customer11, customer12, customer13, customer14
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Title & Description */}
        <SectionHeader
          eyebrow="OUR PARTNERS"
          icon={Users}
          title="Retailers & Wholesalers"
          highlightWord="Retailers & Wholesalers"
          highlightColor="green"
          description="Join thousands of retailers and wholesalers across India who trust Makario for premium quality makhana. Premium quality organic products that customers love and trust."
          className="mb-12 text-center"
        />

        {/* Images Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {customerImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 aspect-square"
            >
              <img
                src={image}
                alt={`Our customer ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RetailersWholesalersSection;
