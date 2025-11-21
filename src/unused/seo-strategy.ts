// SEO Strategy for Makario - Bihar Makhana Online Sales in India
// Target Markets: Mumbai, Gujarat, South India

export const SEO_STRATEGY = {
  // Primary Target Markets
  TARGET_REGIONS: {
    MUMBAI: {
      keywords: ['mumbai makhana delivery', 'fox nuts mumbai', 'makhana online mumbai', 'premium makhana maharashtra'],
      localTerms: ['maharashtra makhana supplier', 'mumbai healthy snacks', 'fox nuts home delivery mumbai'],
      demographics: 'Urban professionals, health-conscious families, fitness enthusiasts'
    },
    GUJARAT: {
      keywords: ['gujarat makhana online', 'fox nuts ahmedabad', 'makhana delivery gujarat', 'premium lotus seeds gujarat'],
      localTerms: ['gujarati healthy snacks', 'fox nuts surat', 'makhana vadodara', 'rajkot makhana delivery'],
      demographics: 'Business families, health-conscious communities, traditional food lovers'
    },
    SOUTH_INDIA: {
      keywords: ['south india makhana', 'bangalore fox nuts', 'chennai makhana delivery', 'hyderabad lotus seeds'],
      localTerms: ['tamil nadu makhana', 'karnataka fox nuts', 'telangana healthy snacks', 'kerala makhana online'],
      demographics: 'Tech professionals, health enthusiasts, premium food consumers'
    }
  },

  // Core SEO Keywords by Category
  KEYWORDS: {
    PRIMARY: [
      'buy makhana online india',
      'premium fox nuts online',
      'bihar makhana delivery',
      'organic lotus seeds india',
      'makhana online shopping',
      'fox nuts home delivery',
      'premium makhana brand'
    ],
    LONG_TAIL: [
      'best quality makhana online india',
      'fresh bihar makhana home delivery',
      'organic fox nuts bulk order india',
      'premium lotus seeds online shopping',
      'healthy makhana snacks online',
      'authentic bihar makhana exporter',
      'roasted makhana online delivery'
    ],
    LOCAL: [
      'makhana near me',
      'fox nuts local delivery',
      'makhana shop online',
      'lotus seeds home delivery',
      'healthy snacks online india'
    ],
    COMMERCIAL: [
      'makhana wholesale online',
      'bulk fox nuts order',
      'makhana business supply',
      'export quality makhana',
      'premium makhana distributor'
    ]
  },

  // Page-wise SEO Strategy
  PAGE_SEO: {
    HOME: {
      focus: 'Brand awareness and general makhana sales',
      primaryKeywords: ['buy makhana online', 'premium fox nuts india', 'bihar makhana online'],
      intent: 'Transactional/Brand'
    },
    PRODUCTS: {
      focus: 'Product discovery and comparison',
      primaryKeywords: ['makhana varieties online', 'fox nuts types', 'lotus seeds catalog'],
      intent: 'Commercial Investigation'
    },
    ABOUT: {
      focus: 'Brand credibility and trust building',
      primaryKeywords: ['bihar makhana company', 'authentic fox nuts brand', 'lotus seeds manufacturer'],
      intent: 'Informational'
    },
    CONTACT: {
      focus: 'Local presence and customer support',
      primaryKeywords: ['makhana supplier contact', 'fox nuts customer care', 'bihar makhana address'],
      intent: 'Transactional'
    }
  },

  // Structured Data Types
  SCHEMA_TYPES: [
    'Organization',
    'LocalBusiness',
    'Product',
    'Offer',
    'Review',
    'BreadcrumbList',
    'FAQPage',
    'WebSite'
  ]
};

export const REGIONAL_CONFIG = {
  MUMBAI: {
    geoTargeting: {
      region: 'IN-MH',
      city: 'Mumbai',
      coordinates: { lat: 19.0760, lng: 72.8777 }
    },
    localBusinessInfo: {
      serviceArea: ['Mumbai', 'Thane', 'Navi Mumbai', 'Pune'],
      deliveryAreas: ['South Mumbai', 'Central Mumbai', 'Western Suburbs', 'Eastern Suburbs']
    }
  },
  GUJARAT: {
    geoTargeting: {
      region: 'IN-GJ',
      city: 'Ahmedabad',
      coordinates: { lat: 23.0225, lng: 72.5714 }
    },
    localBusinessInfo: {
      serviceArea: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
      deliveryAreas: ['Gujarat State', 'Major Cities', 'Industrial Areas']
    }
  },
  SOUTH_INDIA: {
    geoTargeting: {
      region: 'IN-KA',
      city: 'Bangalore',
      coordinates: { lat: 12.9716, lng: 77.5946 }
    },
    localBusinessInfo: {
      serviceArea: ['Bangalore', 'Chennai', 'Hyderabad', 'Kochi'],
      deliveryAreas: ['Karnataka', 'Tamil Nadu', 'Telangana', 'Kerala']
    }
  }
};