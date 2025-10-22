import React, { useState } from 'react';
import { Product } from '../../data/products';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  products: Product[];
  title?: string;
  className?: string;
  viewMode?: 'grid' | 'list';
}

export const ProductList: React.FC<ProductListProps> = ({ 
  products, 
  title,
  className = "",
  viewMode = 'grid'
}) => {
  console.log('=== PRODUCT LIST DEBUG ===');
  console.log('Products received:', products);
  console.log('Products count:', products?.length);
  console.log('Title:', title);

  const handleViewDetails = (product: Product) => {
    console.log('ProductList: handleViewDetails called for product:', product.id, product.name);
  };

  // Loading state
  if (!products) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading products...</p>
      </div>
    );
  }

  // No products state
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No products available</p>
        <p className="text-sm text-muted-foreground mt-2">
          Please check back later for our amazing makhana products!
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">{title}</h2>
      )}
      
      <div className={`
        ${viewMode === 'grid' 
          ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 md:gap-6' 
          : 'flex flex-col gap-4'
        }
      `}>
        {products.map((product, index) => {
          console.log(`Rendering ProductCard ${index}:`, product.id, product.name);
          return (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={handleViewDetails}
              viewMode={viewMode}
            />
          );
        })}
      </div>
    </div>
  );
};