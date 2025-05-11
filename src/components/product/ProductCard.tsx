import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    // Add to cart with default options (first size and color)
    addToCart(product, 1, product.sizes[0], product.colors[0]);
    setIsAdded(true);
    
    // Reset the added state after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  return (
    <motion.div 
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge for new or featured product */}
      {(product.new || product.bestseller) && (
        <div className="absolute top-3 left-3 z-10">
          {product.new && (
            <span className="bg-aura-gold text-aura-black text-xs font-semibold px-2 py-1 mr-2">
              NEW
            </span>
          )}
          {product.bestseller && (
            <span className="bg-aura-black text-aura-white text-xs font-semibold px-2 py-1">
              BESTSELLER
            </span>
          )}
        </div>
      )}
      
      {/* Favorite button */}
      <button 
        className="absolute top-3 right-3 z-10 p-2 bg-white bg-opacity-80 rounded-full shadow-sm
                  transition-transform transform hover:scale-110"
        onClick={handleWishlistToggle}
        aria-label={isInWishlist(product.id) ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart 
          size={18} 
          className={isInWishlist(product.id) ? "fill-aura-gold text-aura-gold" : "text-aura-gray-500"} 
        />
      </button>
      
      {/* Product Image with hover effect */}
      <Link to={`/products/${product.id}`} className="block relative overflow-hidden aspect-[3/4]">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-opacity duration-500"
          initial={{ opacity: 1 }}
          animate={{ opacity: isHovered && product.images.length > 1 ? 0 : 1 }}
        />
        
        {product.images.length > 1 && (
          <motion.img
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
          />
        )}
        
        {/* Quick add overlay */}
        <motion.button 
          onClick={handleQuickAdd}
          className="absolute bottom-0 left-0 right-0 bg-aura-black bg-opacity-90 text-aura-white py-3 px-4
                    transform transition-transform flex items-center justify-center"
          initial={{ y: 80 }}
          animate={{ y: isHovered ? 0 : 80 }}
          transition={{ duration: 0.3 }}
          disabled={isAdded}
        >
          <ShoppingBag size={16} className="mr-2" />
          <span className="font-medium">
            {isAdded ? 'Added ✓' : 'Quick Add'}
          </span>
        </motion.button>
      </Link>
      
      {/* Product info */}
      <div className="mt-4">
        <h3 className="font-medium mb-1">
          <Link to={`/products/${product.id}`} className="hover:text-aura-gold transition-colors">
            {product.name}
          </Link>
        </h3>
        <p className="font-semibold">${product.price.toFixed(2)}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;