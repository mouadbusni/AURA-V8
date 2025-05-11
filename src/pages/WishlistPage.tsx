import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const WishlistPage = () => {
  const { items: wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const addToCartFromWishlist = (productId: string) => {
    const product = wishlistItems.find(item => item.id === productId);
    if (product) {
      addToCart(product, 1, product.sizes[0], product.colors[0]);
    }
  };

  return (
    <PageTransition>
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">My Wishlist</h1>
              <p className="text-aura-gray-600">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
              </p>
            </div>
            {wishlistItems.length > 0 && (
              <Button
                variant="primary"
                onClick={() => {
                  wishlistItems.forEach(item => {
                    addToCartFromWishlist(item.id);
                  });
                }}
              >
                Add All to Cart
              </Button>
            )}
          </div>

          {wishlistItems.length === 0 ? (
            <div className="text-center py-20">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block p-6 bg-aura-gray-100 rounded-full mb-6"
              >
                <Heart size={48} className="text-aura-gray-400" />
              </motion.div>
              <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
              <p className="text-aura-gray-600 mb-8">
                Start adding items you love to your wishlist
              </p>
              <Button href="/products" variant="primary">
                Browse Products
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {wishlistItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-center gap-6 p-4 bg-white border border-aura-gray-200"
                >
                  <div className="w-24 h-32 bg-aura-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium text-lg mb-1">{item.name}</h3>
                    <p className="text-aura-gray-600 mb-2">${item.price.toFixed(2)}</p>
                    <div className="flex gap-4">
                      <button
                        onClick={() => addToCartFromWishlist(item.id)}
                        className="flex items-center text-sm text-aura-black hover:text-aura-gold transition-colors"
                      >
                        <ShoppingBag size={16} className="mr-1" />
                        Add to Cart
                      </button>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="flex items-center text-sm text-aura-gray-500 hover:text-aura-error transition-colors"
                      >
                        <Trash2 size={16} className="mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {item.colors.slice(0, 3).map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full border border-aura-gray-200"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {item.sizes.slice(0, 3).map((size) => (
                      <div
                        key={size}
                        className="w-8 h-8 flex items-center justify-center border border-aura-gray-200 text-sm"
                      >
                        {size}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default WishlistPage;