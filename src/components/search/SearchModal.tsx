import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import { Product } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Handle search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    const timer = setTimeout(() => {
      const results = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Handle click on search result
  const handleResultClick = () => {
    setSearchQuery('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white w-full max-w-3xl mx-4 rounded-lg shadow-xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="p-4 border-b border-gray-200 relative">
              <div className="relative">
                <Search 
                  size={20} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-3 border-none focus:outline-none text-lg"
                  autoFocus
                />
              </div>
              <button
                onClick={onClose}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close search"
              >
                <X size={20} />
              </button>
            </div>

            {/* Search Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {isLoading ? (
                <div className="p-8 text-center">
                  <Loader size={24} className="animate-spin mx-auto text-gray-400" />
                </div>
              ) : searchQuery && searchResults.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No results found for "{searchQuery}"
                </div>
              ) : searchResults.length > 0 && (
                <div className="divide-y divide-gray-200">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      to={`/products/${product.id}`}
                      onClick={handleResultClick}
                      className="flex items-center p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-16 h-20 bg-gray-100 mr-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{product.name}</h3>
                        <p className="text-sm text-gray-600 mb-1">
                          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                        </p>
                        <p className="font-semibold">${product.price.toFixed(2)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Links */}
            {!searchQuery && (
              <div className="p-4 bg-gray-50">
                <h3 className="text-sm font-medium text-gray-600 mb-3">Popular Searches</h3>
                <div className="flex flex-wrap gap-2">
                  <Link
                    to="/products?category=t-shirts"
                    onClick={onClose}
                    className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm hover:border-aura-gold transition-colors"
                  >
                    T-Shirts
                  </Link>
                  <Link
                    to="/products?category=hoodies"
                    onClick={onClose}
                    className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm hover:border-aura-gold transition-colors"
                  >
                    Hoodies
                  </Link>
                  <Link
                    to="/products?new=true"
                    onClick={onClose}
                    className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm hover:border-aura-gold transition-colors"
                  >
                    New Arrivals
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;