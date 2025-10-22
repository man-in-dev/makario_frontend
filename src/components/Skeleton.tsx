import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'rectangular' | 'circular' | 'text';
  width?: string | number;
  height?: string | number;
  animated?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width = '100%',
  height = '1rem',
  animated = true
}) => {
  const baseClasses = 'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200';
  
  const variantClasses = {
    rectangular: 'rounded-md',
    circular: 'rounded-full',
    text: 'rounded-sm'
  };

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  if (animated) {
    return (
      <motion.div
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        style={style}
        animate={{
          backgroundPosition: ['200% 0', '-200% 0'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    );
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className} animate-pulse`}
      style={style}
    />
  );
};

// Specialized skeleton components
export const ProductCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg border shadow-sm p-4 space-y-3">
    <Skeleton height={200} className="rounded-lg" />
    <div className="space-y-2">
      <Skeleton height={20} width="80%" />
      <Skeleton height={16} width="60%" />
      <div className="flex items-center space-x-2">
        <Skeleton variant="circular" width={16} height={16} />
        <Skeleton height={14} width="40%" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton height={20} width="50%" />
        <Skeleton height={32} width={80} className="rounded-full" />
      </div>
    </div>
  </div>
);

export const ProductDetailSkeleton: React.FC = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="space-y-4">
          <Skeleton height={400} className="rounded-lg" />
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} height={80} className="rounded-md" />
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <div className="space-y-3">
            <Skeleton height={32} width="70%" />
            <Skeleton height={20} width="50%" />
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} variant="circular" width={16} height={16} />
                ))}
              </div>
              <Skeleton height={16} width="30%" />
            </div>
          </div>

          <div className="space-y-2">
            <Skeleton height={24} width="40%" />
            <Skeleton height={20} width="25%" />
          </div>

          <div className="space-y-3">
            <Skeleton height={16} />
            <Skeleton height={16} width="90%" />
            <Skeleton height={16} width="80%" />
          </div>

          <div className="flex space-x-4">
            <Skeleton height={48} width={120} className="rounded-md" />
            <Skeleton height={48} width={140} className="rounded-md" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const HeaderSkeleton: React.FC = () => (
  <div className="bg-white border-b">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between h-16">
        <Skeleton width={120} height={32} />
        <div className="hidden md:flex space-x-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} height={16} width={60} />
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="circular" width={32} height={32} />
        </div>
      </div>
    </div>
  </div>
);

export default Skeleton;