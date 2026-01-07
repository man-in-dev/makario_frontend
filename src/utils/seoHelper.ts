/**
 * SEO Helper utilities for consistent meta tags and schema markup
 */

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
  type?: 'website' | 'product' | 'article';
}

export const generateMetaTags = (config: SEOConfig) => {
  return {
    title: config.title,
    meta: [
      {
        name: 'description',
        content: config.description,
      },
      {
        name: 'keywords',
        content: config.keywords,
      },
      {
        property: 'og:title',
        content: config.ogTitle || config.title,
      },
      {
        property: 'og:description',
        content: config.ogDescription || config.description,
      },
      {
        property: 'og:image',
        content: config.ogImage || 'https://makario.in/og-image.jpg',
      },
      {
        property: 'og:type',
        content: config.type || 'website',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: config.ogTitle || config.title,
      },
      {
        name: 'twitter:description',
        content: config.ogDescription || config.description,
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        name: 'language',
        content: 'en-IN, hi-IN',
      },
      {
        name: 'author',
        content: 'Makario - Premium Makhana & Organic Products',
      },
      {
        httpEquiv: 'content-language',
        content: 'en-IN',
      },
    ],
    link: [
      {
        rel: 'canonical',
        href: config.canonical || 'https://makario.in',
      },
    ],
  };
};

// Product Schema Markup
export const productSchema = (product: any) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  'name': product.name,
  'description': product.description,
  'image': product.image,
  'url': `https://makario.in/product/${product.id}`,
  'brand': {
    '@type': 'Brand',
    'name': 'Makario',
  },
  'aggregateRating': {
    '@type': 'AggregateRating',
    'ratingValue': product.rating || '4.8',
    'ratingCount': product.ratingCount || '1000',
  },
  'offers': {
    '@type': 'Offer',
    'url': `https://makario.in/product/${product.id}`,
    'priceCurrency': 'INR',
    'price': product.price,
    'availability': product.inStock ? 'InStock' : 'OutOfStock',
  },
});

// Local Business Schema
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  'name': 'Makario - Premium Makhana & Organic Products',
  'image': 'https://makario.in/logo.png',
  'description': 'Premium quality makhana (fox nuts), organic products, and healthy snacks from India',
  'url': 'https://makario.in',
  'telephone': '+91-XXX-XXX-XXXX',
  'email': 'contact@makario.in',
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': 'Makario',
    'addressLocality': 'Indore',
    'addressRegion': 'MP',
    'postalCode': '452001',
    'addressCountry': 'IN',
  },
  'sameAs': [
    'https://www.facebook.com/makario',
    'https://www.instagram.com/makario',
    'https://www.twitter.com/makario',
  ],
};

// Organization Schema
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  'name': 'Makario',
  'url': 'https://makario.in',
  'logo': 'https://makario.in/logo.png',
  'description': 'Premium quality makhana (fox nuts), organic products from Madhya Pradesh, India',
  'sameAs': [
    'https://www.facebook.com/makario',
    'https://www.instagram.com/makario',
  ],
  'contactPoint': {
    '@type': 'ContactPoint',
    'telephone': '+91-XXX-XXX-XXXX',
    'contactType': 'Customer Service',
    'email': 'contact@makario.in',
  },
};

// FAQ Schema
export const faqSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': faqs.map(faq => ({
    '@type': 'Question',
    'name': faq.question,
    'acceptedAnswer': {
      '@type': 'Answer',
      'text': faq.answer,
    },
  })),
});

// Breadcrumb Schema
export const breadcrumbSchema = (breadcrumbs: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': breadcrumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    'position': index + 1,
    'name': crumb.name,
    'item': crumb.url,
  })),
});

// Article/Blog Schema
export const articleSchema = (article: any) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  'headline': article.title,
  'description': article.description,
  'image': article.image,
  'datePublished': article.publishedDate,
  'author': {
    '@type': 'Organization',
    'name': 'Makario',
  },
});

// Hindi SEO Keywords (Category-wise)
export const seoKeywords = {
  home: {
    en: 'makhana online buy, fox nuts India, organic makhana, healthy snacks online, premium fox nuts, makhana price, best quality makhana',
    hi: 'मखाना ऑनलाइन, मखाना खरीदें, फॉक्स नट्स, स्वास्थ्य के लिए मखाना, प्रीमियम मखाना',
  },
  product: {
    en: 'makhana online buy India, fox nuts benefits, organic makhana price, best makhana quality, healthy snacks, protein rich snacks, calcium rich makhana',
    hi: 'मखाना के फायदे, मखाना का दाम, मखाना खरीदें ऑनलाइन, स्वस्थ खाना, प्रोटीन युक्त',
  },
  shop: {
    en: 'makhana products, fox nuts online, organic snacks India, makhana varieties, healthy food online, buy makhana bulk',
    hi: 'मखाना बिक्री, ऑर्गानिक खाना, स्वास्थ्य आहार, ऑनलाइन खरीदारी, बल्क मखाना',
  },
  about: {
    en: 'about Makario, makhana farmers, organic farming India, makhana from Madhya Pradesh, Indore makhana',
    hi: 'मखाना की खेती, मध्य प्रदेश मखाना, इंदौर मखाना, जैविक खेती, किसान समर्थन',
  },
  contact: {
    en: 'contact Makario, makhana seller, buy makhana, organic products India, premium snacks supplier',
    hi: 'संपर्क करें, मखाना बेचने वाले, ऑनलाइन दुकान, ऑर्गानिक उत्पाद',
  },
};

// Meta descriptions (SEO optimized)
export const seoDescriptions = {
  home: 'Makario - Buy premium quality organic makhana (fox nuts) online in India. Direct from farmers in Madhya Pradesh. Fast delivery across India. ₹50 shipping',
  shop: 'Shop authentic makhana products online. Organic fox nuts, healthy snacks, bulk orders. Best quality, competitive prices. Free shipping on orders above ₹499',
  about: 'Makario connects makhana farmers from Madhya Pradesh with customers across India. Premium quality organic products, direct to your doorstep.',
  contact: 'Contact Makario for premium makhana, bulk orders, and organic products. Customer support available 24/7. Email, phone, and contact form available.',
  faq: 'Frequently asked questions about makhana, fox nuts, benefits, storage, and ordering. Get answers to common queries about Makario products.',
  agriculture: 'Learn about makhana farming in India. Sustainable agriculture practices, farmer support, and production insights from Makario.',
};
