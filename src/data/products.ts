// Import product images
import productImage1 from '../assets/product/1760353406527.jpg';
import productFront from '../assets/product/FRONT.jpg';
import productBack from '../assets/product/BACK.jpg';
import productImage105 from '../assets/product/image-105.png';
import productImage117 from '../assets/product/image-117.png';
import productImage146 from '../assets/product/image-146.png';
import productImage152 from '../assets/product/image-152.png';
import productImage168 from '../assets/product/image-168.png';

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

export const products: Product[] = [
  {
    id: '100g-pack-1',
    name: 'Makhana 100g Pack of 1',
    description: 'Fresh and crunchy makhana, 100g pack of 1. Perfect for solo snacking.',
    price: 125,
    image: productImage105,
    images: [productImage105, productImage117, productImage146],
    category: 'Classic Makhana',
    inStock: true,
    stockQuantity: 3,
    weight: '100g',
    features: ['100% Natural', 'Pack of 1', 'Crunchy Texture'],
    tags: ['pack', 'makhana'],
    rating: 4.7,
    reviewCount: 5
  },
  {
    id: '100g-pack-5',
    name: 'Makhana 100g Pack of 5',
    description: 'Premium Makhana, 100g pack. Pack of 5 for family and bulk snacking.',
    price: 560,
    image: productImage117,
    images: [productImage117, productImage146, productImage152],
    category: 'Classic Makhana',
    inStock: true,
    stockQuantity: 5,
    weight: '100g x 5',
    features: ['Pack of 5', 'Bulk savings', 'Premium quality'],
    tags: ['pack', 'makhana'],
    rating: 5.0,
    reviewCount: 2
  },
  {
    id: '100g-pack-2',
    name: 'Makhana 100g Pack of 2',
    description: 'Premium Makhana, 100g pack. Pack of 2.',
    price: 230,
    image: productImage146,
    images: [productImage146, productImage152, productImage168],
    category: 'Classic Makhana',
    inStock: true,
    stockQuantity: 8,
    weight: '100g x 2',
    features: ['Pack of 2', 'Perfect for gifting', 'Same premium quality'],
    tags: ['pack', 'makhana'],
    rating: 4.8,
    reviewCount: 8
  },
  {
    id: '100g-pack-3',
    name: 'Makhana 100g Pack of 3',
    description: 'Premium Makhana, 100g pack. Pack of 3.',
    price: 340,
    image: productImage152,
    images: [productImage152, productImage168, productImage1],
    category: 'Classic Makhana',
    inStock: true,
    stockQuantity: 4,
    weight: '100g x 3',
    features: ['Pack of 3', 'Value combo', 'Premium quality'],
    tags: ['pack', 'makhana'],
    rating: 4.9,
    reviewCount: 6
  },
  {
    id: '100g-pack-4',
    name: 'Makhana 100g Pack of 4',
    description: 'Premium Makhana, 100g pack. Pack of 4.',
    price: 450,
    image: productImage168,
    images: [productImage168, productFront, productBack],
    category: 'Classic Makhana',
    inStock: true,
    stockQuantity: 7,
    weight: '100g x 4',
    features: ['Pack of 4', 'Bulk savings', 'Premium quality'],
    tags: ['pack', 'makhana'],
    rating: 5.0,
    reviewCount: 4
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