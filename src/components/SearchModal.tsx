import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<typeof products>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.trim()) {
      const results = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results.slice(0, 8));
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleProductClick = (productId: string) => {
    onClose();
    navigate(`/product/${productId}`);
    setSearchTerm('');
  };

  const handleSearchAll = () => {
    if (searchTerm.trim()) {
      onClose();
      navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 gap-0">
        <DialogDescription className="sr-only">
          Search for products in our store
        </DialogDescription>
        {/* Search Input */}
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchAll()}
              className="pl-10 pr-10 h-12 text-lg"
              autoFocus
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto">
          {searchTerm && searchResults.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>No products found for "{searchTerm}"</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="p-2">
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{product.name}</h4>
                    <p className="text-sm text-gray-500 line-clamp-1">{product.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-semibold text-heritage">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* View All Results Button */}
              <div className="p-4 border-t mt-2">
                <Button
                  onClick={handleSearchAll}
                  className="w-full bg-heritage hover:bg-heritage/90"
                >
                  View All Results ({products.filter(p => 
                    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    p.description.toLowerCase().includes(searchTerm.toLowerCase())
                  ).length})
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <Search className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">Start typing to search products...</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
