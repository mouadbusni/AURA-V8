import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Minus, Plus, Star, Truck, RotateCcw, Shield, ShoppingBag } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import Button from '../components/ui/Button';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = getProductById(id || '');
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  
  useEffect(() => {
    if (!product) {
      navigate('/products');
      return;
    }
    
    // Set default selections
    setSelectedColor(product.colors[0]);
    setSelectedSize(product.sizes[0]);
  }, [product, navigate]);
  
  if (!product) {
    return null;
  }
  
  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setAddedToCart(true);
    
    // Reset added to cart message after 3 seconds
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  // Color name mapping for display
  const colorNames: { [key: string]: string } = {
    '#000000': 'Black',
    '#FFFFFF': 'White',
    '#808080': 'Gray',
    '#D3D3D3': 'Light Gray',
    '#36454F': 'Charcoal',
    '#8B4513': 'Brown',
    '#F5F5DC': 'Beige',
  };
  
  return (
    <PageTransition>
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Product Images */}
            <div className="relative">
              {/* Main Image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-aura-gray-100">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={product.images[currentImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
                
                {/* Navigation arrows */}
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-aura-white/80 hover:bg-aura-white p-2 rounded-full transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-aura-white/80 hover:bg-aura-white p-2 rounded-full transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              
              {/* Thumbnail Images */}
              <div className="flex mt-4 space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square w-20 overflow-hidden ${
                      currentImageIndex === index 
                        ? 'border-2 border-aura-black' 
                        : 'border border-aura-gray-200'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Details */}
            <div className="lg:pt-8">
              {/* Product badges */}
              <div className="flex gap-2 mb-4">
                {product.new && (
                  <span className="bg-aura-gold text-aura-black text-xs font-semibold px-2 py-1">
                    NEW
                  </span>
                )}
                {product.bestseller && (
                  <span className="bg-aura-black text-aura-white text-xs font-semibold px-2 py-1">
                    BESTSELLER
                  </span>
                )}
              </div>
              
              {/* Product title and price */}
              <motion.h1 
                className="text-3xl md:text-4xl font-bold mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {product.name}
              </motion.h1>
              
              <motion.div 
                className="text-2xl font-semibold mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                ${product.price.toFixed(2)}
              </motion.div>
              
              {/* Fake reviews */}
              <div className="flex items-center mb-6">
                <div className="flex mr-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={16} 
                      className="fill-aura-gold text-aura-gold" 
                    />
                  ))}
                </div>
                <span className="text-sm text-aura-gray-600">(127 reviews)</span>
              </div>
              
              {/* Product description */}
              <motion.p 
                className="text-aura-gray-700 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {product.description}
              </motion.p>
              
              {/* Color selection */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">
                  Color: <span className="text-aura-gray-600">{colorNames[selectedColor] || selectedColor}</span>
                </h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <motion.button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        selectedColor === color ? 'ring-2 ring-offset-2 ring-aura-black' : ''
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span 
                        className="block w-8 h-8 rounded-full" 
                        style={{ backgroundColor: color }}
                      />
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {/* Size selection */}
              <div className="mb-8">
                <div className="flex justify-between mb-3">
                  <h3 className="font-medium">
                    Size: <span className="text-aura-gray-600">{selectedSize}</span>
                  </h3>
                  <button className="text-sm underline">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <motion.button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 flex items-center justify-center border ${
                        selectedSize === size 
                          ? 'border-aura-black bg-aura-black text-aura-white' 
                          : 'border-aura-gray-300 hover:border-aura-black'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {/* Quantity selector and Add to Cart */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center border border-aura-gray-300">
                  <button 
                    onClick={decreaseQuantity}
                    className="w-10 h-12 flex items-center justify-center text-aura-gray-500 hover:text-aura-black"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 h-12 flex items-center justify-center font-medium">
                    {quantity}
                  </span>
                  <button 
                    onClick={increaseQuantity}
                    className="w-10 h-12 flex items-center justify-center text-aura-gray-500 hover:text-aura-black"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <Button 
                  onClick={handleAddToCart}
                  variant="primary" 
                  className="flex-1"
                  icon={addedToCart ? undefined : <ShoppingBag size={18} />}
                >
                  {addedToCart ? 'Added to Cart ✓' : 'Add to Cart'}
                </Button>
              </div>
              
              {/* Product benefits */}
              <div className="space-y-4 border-t border-aura-gray-200 pt-6">
                <div className="flex items-start">
                  <Truck size={20} className="mr-3 text-aura-gray-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Free Shipping</h4>
                    <p className="text-sm text-aura-gray-600">On all orders over $100</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <RotateCcw size={20} className="mr-3 text-aura-gray-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Easy Returns</h4>
                    <p className="text-sm text-aura-gray-600">30-day return policy</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Shield size={20} className="mr-3 text-aura-gray-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Quality Guarantee</h4>
                    <p className="text-sm text-aura-gray-600">Premium materials, built to last</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ProductDetailPage;