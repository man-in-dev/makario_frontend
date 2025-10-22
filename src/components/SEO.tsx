import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  structuredData?: any;
  breadcrumbs?: Array<{ name: string; url: string }>;
  region?: 'mumbai' | 'gujarat' | 'south-india' | 'india';
  productSchema?: any;
  localBusinessSchema?: any;
}

const SEO = ({
  title = "Buy Premium Bihar Makhana Online India | Fox Nuts Home Delivery | Makario",
  description = "🛒 Buy Premium Bihar Makhana Online India | Free Home Delivery Mumbai, Gujarat, South India | 100% Organic Fox Nuts | COD Available | Same Day Delivery | Order Now!",
  keywords = "buy makhana online india, fox nuts online shopping, premium makhana home delivery, bihar makhana online, lotus seeds delivery mumbai gujarat bangalore, organic fox nuts india, makhana online store, healthy snacks delivery, fox nuts bulk order online, premium makhana brand india, makhana home delivery near me, online makhana shopping, fox nuts ecommerce",
  canonical = "https://makario.in",
  ogImage = "https://makario.in/images/bihar-makhana-online-shopping.jpg",
  ogType = "website",
  noindex = false,
  structuredData,
  breadcrumbs,
  region = 'india',
  productSchema,
  localBusinessSchema
}: SEOProps) => {
  // Regional targeting configuration
  const regionalConfig = {
    mumbai: {
      geoRegion: "IN-MH",
      geoPlacename: "Mumbai, Maharashtra",
      geoPosition: "19.0760,72.8777",
      localKeywords: ", mumbai makhana delivery, fox nuts mumbai, maharashtra makhana online"
    },
    gujarat: {
      geoRegion: "IN-GJ", 
      geoPlacename: "Gujarat, India",
      geoPosition: "23.0225,72.5714",
      localKeywords: ", gujarat makhana online, fox nuts ahmedabad, gujarat healthy snacks"
    },
    'south-india': {
      geoRegion: "IN-KA",
      geoPlacename: "South India",
      geoPosition: "12.9716,77.5946", 
      localKeywords: ", south india makhana, bangalore fox nuts, chennai makhana delivery"
    },
    india: {
      geoRegion: "IN",
      geoPlacename: "India", 
      geoPosition: "28.6139,77.2090",
      localKeywords: ""
    }
  };

  const currentRegion = regionalConfig[region] || regionalConfig.india;
  const enhancedKeywords = keywords + currentRegion.localKeywords;

  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": canonical,
    "mainEntity": {
      "@type": "Organization",
      "@id": "https://makario.in/#organization",
      "name": "Makario - Bihar Makhana",
      "alternateName": "Bihar Makhana Online",
      "url": "https://makario.in",
      "logo": "https://makario.in/lovable-uploads/be26238e-2161-40dd-afd9-e69df2853b49.png",
      "description": "Premium Bihar Makhana Online Store - Buy Fresh Fox Nuts with Home Delivery",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Darbhanga",
        "addressRegion": "Bihar", 
        "postalCode": "846004",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9953240031",
        "contactType": "Customer Service",
        "areaServed": ["IN-MH", "IN-GJ", "IN-KA", "IN-TN", "IN-BR"],
        "availableLanguage": ["Hindi", "English", "Gujarati", "Marathi"]
      },
      "sameAs": [
        "https://www.facebook.com/makario",
        "https://www.instagram.com/makario",
        "https://www.linkedin.com/company/makario"
      ]
    },
    "isPartOf": {
      "@type": "WebSite",
      "@id": "https://makario.in/#website",
      "name": "Makario - Buy Makhana Online",
      "url": "https://makario.in",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://makario.in/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  };

  const breadcrumbStructuredData = breadcrumbs ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": {
        "@type": "WebPage",
        "@id": item.url,
        "name": item.name,
        "url": item.url
      }
    }))
  } : {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": {
        "@type": "WebPage",
        "@id": "https://makario.in/",
        "name": "Home",
        "url": "https://makario.in/"
      }
    }]
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={enhancedKeywords} />
      
      {/* E-commerce Specific Tags */}
      <meta name="product-type" content="food,snacks,healthy-food" />
      <meta name="availability" content="in-stock" />
      <meta name="price-currency" content="INR" />
      <meta name="delivery-area" content="India" />
      <meta name="payment-methods" content="COD,UPI,Cards,NetBanking" />
      
      {/* Regional Targeting */}
      <meta name="geo.region" content={currentRegion.geoRegion} />
      <meta name="geo.placename" content={currentRegion.geoPlacename} />
      <meta name="geo.position" content={currentRegion.geoPosition} />
      <meta name="ICBM" content={currentRegion.geoPosition} />
      
      {/* Business Information */}
      <meta name="business-type" content="food-delivery,e-commerce,organic-food" />
      <meta name="target-audience" content="health-conscious,premium-food-lovers,working-professionals" />
      <meta name="service-areas" content="Mumbai,Gujarat,Bangalore,Chennai,Hyderabad,Pune,Delhi" />
      
      {/* Robots */}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />
      <meta name="googlebot" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <meta name="bingbot" content={noindex ? "noindex, nofollow" : "index, follow"} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph for E-commerce */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Premium Bihar Makhana - Buy Online with Home Delivery" />
      <meta property="og:site_name" content="Makario - Buy Makhana Online" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:locale:alternate" content="hi_IN" />
      <meta property="product:brand" content="Makario" />
      <meta property="product:availability" content="in stock" />
      <meta property="product:condition" content="new" />
      <meta property="product:price:currency" content="INR" />
      
      {/* Twitter Card for E-commerce */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content="Premium Bihar Makhana Online Shopping" />
      <meta name="twitter:site" content="@makario_india" />
      <meta name="twitter:creator" content="@makario_india" />
      <meta name="twitter:label1" content="Delivery" />
      <meta name="twitter:data1" content="Free Home Delivery" />
      <meta name="twitter:label2" content="Payment" />
      <meta name="twitter:data2" content="COD Available" />
      
      {/* Page-specific SEO Meta */}
      <meta name="revisit-after" content="7 days" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>
      
      {/* Product Schema */}
      {productSchema && (
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      )}
      
      {/* Local Business Schema */}
      {localBusinessSchema && (
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      )}
      
      {/* Breadcrumb Structured Data */}
      {breadcrumbStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
      )}
      
      {/* E-commerce Website Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Makario - Buy Premium Makhana Online",
          "alternateName": "Bihar Makhana Online Store",
          "url": "https://makario.in",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://makario.in/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          },
          "publisher": {
            "@type": "Organization", 
            "name": "Makario",
            "logo": {
              "@type": "ImageObject",
              "url": "https://makario.in/lovable-uploads/be26238e-2161-40dd-afd9-e69df2853b49.png"
            }
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
