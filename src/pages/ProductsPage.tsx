import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, X } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import ProductCard from '../components/product/ProductCard';
import Button from '../components/ui/Button';
import { products } from '../data/products';
import { Product } from '../types';

const ProductsPage = () => {
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    sortBy: 'newest',
    priceRange: [0, 200],
  });
  
  // Extract category from URL if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    
    if (categoryParam) {
      setFilters(prev => ({ ...prev, category: categoryParam }));
    }
  }, [location.search]);
  
  // Apply filters
  useEffect(() => {
    let result = [...products];
    
    // Filter by category
    if (filters.category) {
      result = result.filter(product => product.category === filters.category);
    }
    
    // Filter by price range
    result = result.filter(
      product => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );
    
    // Sort products
    switch (filters.sortBy) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      // More sorting options can be added here
      default:
        // For 'newest' or any default case
        break;
    }
    
    setFilteredProducts(result);
  }, [filters]);
  
  const resetFilters = () => {
    setFilters({
      category: '',
      sortBy: 'newest',
      priceRange: [0, 200],
    });
  };
  
  const categoryOptions = [
    { value: '', label: 'All Products' },
    { value: 't-shirts', label: 'T-Shirts' },
    { value: 'hoodies', label: 'Hoodies' },
  ];
  
  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'price-low-high', label: 'Price: Low to High' },
    { value: 'price-high-low', label: 'Price: High to Low' },
  ];
  
  return (
    <PageTransition>
      {/* Page Header */}
      <div className="bg-aura-gray-100 pt-32 pb-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {filters.category ? 
              (filters.category === 't-shirts' ? 'T-Shirts' : 'Hoodies') :
              'All Products'
            }
          </h1>
          <p className="text-aura-gray-600">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
          </p>
        </div>
      </div>
      
      {/* Product Filters & Grid */}
      <div className="py-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Mobile Filter Toggle */}
            <div className="md:hidden mb-6">
              <Button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                variant="secondary"
                className="w-full"
                icon={<Filter size={18} />}
              >
                {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </div>
            
            {/* Filters Sidebar */}
            <AnimatePresence>
              {(isFilterOpen || window.innerWidth >= 768) && (
                <motion.div 
                  className="w-full md:w-64 shrink-0"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-aura-white p-6 border border-aura-gray-200">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-semibold text-xl">Filters</h3>
                      <button 
                        onClick={resetFilters}
                        className="text-sm text-aura-gray-500 hover:text-aura-black transition-colors"
                      >
                        Reset All
                      </button>
                    </div>
                    
                    {/* Category Filter */}
                    <div className="mb-8">
                      <h4 className="font-medium mb-3">Category</h4>
                      <div className="space-y-2">
                        {categoryOptions.map(option => (
                          <div key={option.value} className="flex items-center">
                            <input
                              type="radio"
                              id={`category-${option.value || 'all'}`}
                              name="category"
                              value={option.value}
                              checked={filters.category === option.value}
                              onChange={e => setFilters({ ...filters, category: e.target.value })}
                              className="mr-2"
                            />
                            <label htmlFor={`category-${option.value || 'all'}`}>
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Price Range Filter */}
                    <div className="mb-8">
                      <h4 className="font-medium mb-3">Price Range</h4>
                      <div className="flex items-center justify-between mb-2">
                        <span>${filters.priceRange[0]}</span>
                        <span>${filters.priceRange[1]}</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={200}
                        value={filters.priceRange[1]}
                        onChange={e => 
                          setFilters({
                            ...filters,
                            priceRange: [filters.priceRange[0], parseInt(e.target.value)]
                          })
                        }
                        className="w-full"
                      />
                    </div>
                    
                    {/* Sort By (Mobile Only) */}
                    <div className="md:hidden">
                      <h4 className="font-medium mb-3">Sort By</h4>
                      <select
                        value={filters.sortBy}
                        onChange={e => setFilters({ ...filters, sortBy: e.target.value })}
                        className="w-full p-2 border border-aura-gray-300"
                      >
                        {sortOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Product Grid */}
            <div className="flex-1">
              {/* Sort Bar (Desktop) */}
              <div className="hidden md:flex justify-end mb-6">
                <div className="relative">
                  <label className="mr-3 text-aura-gray-600">Sort by:</label>
                  <select
                    value={filters.sortBy}
                    onChange={e => setFilters({ ...filters, sortBy: e.target.value })}
                    className="appearance-none bg-transparent pr-8 border-b border-aura-gray-300 pb-1 focus:outline-none"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-0 top-1 pointer-events-none text-aura-gray-500" />
                </div>
              </div>
              
              {/* Products */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                  <X size={48} className="mx-auto mb-4 text-aura-gray-400" />
                  <h3 className="text-xl font-medium mb-2">No products found</h3>
                  <p className="text-aura-gray-500 mb-6">Try adjusting your filters or browse all products</p>
                  <Button onClick={resetFilters} variant="primary">
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ProductsPage;