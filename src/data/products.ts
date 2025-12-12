// Import product images - main package views
import productFront from '../assets/PRODUCT/FRONT.jpg';
import productBack from '../assets/PRODUCT/BACK.jpg';
import productImage1 from '../assets/PRODUCT/1760353406527.jpg';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  images: string[];
  category: string;
  inStock: boolean;
  stockQuantity: number;
  weight: string;
  features: string[];
  nutritionalInfo?: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
    fiber: string;
  };
  tags: string[];
  rating: number;
  reviewCount: number;
}

const makhanaDescription = 'Makario Premium Raw Phool Makhana brings you the finest Grade A fox nuts sourced directly from Bihar, renowned for producing the highest quality lotus seeds in India. These crispy, all-natural makhanas are carefully selected and cleaned to ensure you receive only the best for your snacking pleasure. Packed with protein and naturally gluten-free, phool makhana makes an excellent healthy snack choice for fitness enthusiasts and health-conscious individuals alike. These versatile lotus seeds are perfect for roasting with your favourite spices, enjoying as a light snack, or incorporating into your vrat and fasting meals. The 100g pack contains premium fox nuts that are fresh, crunchy, and ready to be transformed into delicious treats. Whether you prefer them roasted with a sprinkle of salt and pepper, cooked in ghee for a traditional preparation, or added to curries and desserts, these makhanas deliver exceptional taste and nutrition. Rich in essential nutrients and low in calories, they make guilt-free snacking easy and enjoyable. Experience the authentic taste and superior quality of Bihar\'s finest makhana with Makario.';

const makhanaFeatures = [
  'Grade A Phool Makhana sourced from Bihar',
  'Rich in Protein (4.5g per 6g serving)',
  'Naturally Gluten-Free',
  'No Artificial Additives',
  'Perfect for Roasting & Snacking',
  'Suitable for Vrat (Fasting)',
  'Low in Calories',
  '100% Natural & Wholesome',
  'Fresh & Crunchy Texture',
  'Ideal for Fitness Enthusiasts'
];

const makhanaNutrition = {
  calories: '127 per 6g serving',
  protein: '4.5g',
  carbs: '76.9g',
  fat: '0.1g',
  fiber: '0g'
};

export const products: Product[] = [
  {
    id: '100g-pack-1',
    name: 'Makhana 100g Pack of 1',
    description: makhanaDescription,
    price: 125,
    originalPrice: 199,
    image: productFront,
    images: [productFront, productBack, productImage1],
    category: 'Classic Makhana',
    inStock: true,
    stockQuantity: 3,
    weight: '100g',
    features: makhanaFeatures,
    nutritionalInfo: makhanaNutrition,
    tags: ['pack', 'makhana', 'healthy', 'gluten-free', 'protein-rich'],
    rating: 4.7,
    reviewCount: 5
  },
  {
    id: '100g-pack-2',
    name: 'Makhana 100g Pack of 2',
    description: makhanaDescription,
    price: 230,
    originalPrice: 398,
    image: productFront,
    images: [productFront, productBack, productImage1],
    category: 'Classic Makhana',
    inStock: true,
    stockQuantity: 8,
    weight: '100g x 2',
    features: makhanaFeatures,
    nutritionalInfo: makhanaNutrition,
    tags: ['pack', 'makhana', 'healthy', 'gluten-free', 'protein-rich'],
    rating: 4.8,
    reviewCount: 8
  },
  {
    id: '100g-pack-3',
    name: 'Makhana 100g Pack of 3',
    description: makhanaDescription,
    price: 340,
    originalPrice: 597,
    image: productFront,
    images: [productFront, productBack, productImage1],
    category: 'Classic Makhana',
    inStock: true,
    stockQuantity: 4,
    weight: '100g x 3',
    features: makhanaFeatures,
    nutritionalInfo: makhanaNutrition,
    tags: ['pack', 'makhana', 'healthy', 'gluten-free', 'protein-rich'],
    rating: 4.9,
    reviewCount: 6
  },
  {
    id: '100g-pack-4',
    name: 'Makhana 100g Pack of 4',
    description: makhanaDescription,
    price: 450,
    originalPrice: 796,
    image: productFront,
    images: [productFront, productBack, productImage1],
    category: 'Classic Makhana',
    inStock: true,
    stockQuantity: 7,
    weight: '100g x 4',
    features: makhanaFeatures,
    nutritionalInfo: makhanaNutrition,
    tags: ['pack', 'makhana', 'healthy', 'gluten-free', 'protein-rich'],
    rating: 5.0,
    reviewCount: 4
  },
  {
    id: '100g-pack-5',
    name: 'Makhana 100g Pack of 5',
    description: makhanaDescription,
    price: 560,
    originalPrice: 995,
    image: productFront,
    images: [productFront, productBack, productImage1],
    category: 'Classic Makhana',
    inStock: true,
    stockQuantity: 5,
    weight: '100g x 5',
    features: makhanaFeatures,
    nutritionalInfo: makhanaNutrition,
    tags: ['pack', 'makhana', 'healthy', 'gluten-free', 'protein-rich'],
    rating: 5.0,
    reviewCount: 2
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  // Return all 4 products for featured section
  return products;
};

export const searchProducts = (query: string): Product[] => {
  const searchTerm = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};