import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShoppingBag, ArrowRight, X } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, clearCart, itemCount, total } = useCart();
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);

  const handleRemoveItem = (id: string) => {
    setRemovingItemId(id);
    
    // Small delay for animation
    setTimeout(() => {
      removeFromCart(id);
      setRemovingItemId(null);
    }, 300);
  };

  // Calculate shipping (free over $100)
  const shipping = total >= 100 ? 0 : 10;
  const grandTotal = total + shipping;

  return (
    <PageTransition>
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Shopping Cart</h1>
          
          {items.length === 0 ? (
            <div className="py-16 text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-6 inline-block p-6 bg-aura-gray-100 rounded-full"
              >
                <ShoppingBag size={64} className="text-aura-gray-400" />
              </motion.div>
              <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
              <p className="text-aura-gray-600 mb-8 max-w-md mx-auto">
                Looks like you haven't added anything to your cart yet.
                Browse our collection and find something you'll love.
              </p>
              <Button href="/products" variant="primary" icon={<ArrowRight size={18} />} iconPosition="right">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="mb-4 pb-2 border-b border-aura-gray-200 hidden md:flex text-sm font-medium text-aura-gray-500">
                  <div className="w-1/2">Product</div>
                  <div className="w-1/6 text-center">Price</div>
                  <div className="w-1/6 text-center">Quantity</div>
                  <div className="w-1/6 text-center">Total</div>
                </div>
                
                <div className="space-y-6">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div 
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                          opacity: removingItemId === item.id ? 0 : 1, 
                          y: 0,
                          height: removingItemId === item.id ? 0 : 'auto'
                        }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col md:flex-row items-start md:items-center py-4 border-b border-aura-gray-200 overflow-hidden"
                      >
                        {/* Product Image & Info */}
                        <div className="flex flex-1 w-full md:w-1/2 mb-4 md:mb-0">
                          <div className="w-24 h-32 mr-4 bg-aura-gray-100 overflow-hidden">
                            <img 
                              src={item.product.image} 
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium mb-1">
                              <Link 
                                to={`/products/${item.product.id}`}
                                className="hover:text-aura-gold transition-colors"
                              >
                                {item.product.name}
                              </Link>
                            </h3>
                            <p className="text-sm text-aura-gray-600 mb-2">
                              Size: {item.size} / Color: {
                                item.color === '#000000' ? 'Black' : 
                                item.color === '#FFFFFF' ? 'White' : 
                                item.color
                              }
                            </p>
                            <button 
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-sm text-aura-gray-500 hover:text-aura-error flex items-center md:hidden"
                            >
                              <Trash2 size={14} className="mr-1" />
                              Remove
                            </button>
                          </div>
                        </div>
                        
                        {/* Price - Mobile */}
                        <div className="flex justify-between w-full md:hidden mb-2">
                          <span className="text-sm text-aura-gray-500">Price:</span>
                          <span>${item.product.price.toFixed(2)}</span>
                        </div>
                        
                        {/* Price - Desktop */}
                        <div className="hidden md:block w-1/6 text-center">
                          ${item.product.price.toFixed(2)}
                        </div>
                        
                        {/* Quantity - Mobile */}
                        <div className="flex justify-between w-full md:hidden mb-2">
                          <span className="text-sm text-aura-gray-500">Quantity:</span>
                          <div className="flex items-center border border-aura-gray-300 h-8">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center"
                              disabled={item.quantity <= 1}
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        
                        {/* Quantity - Desktop */}
                        <div className="hidden md:flex md:justify-center w-1/6">
                          <div className="flex items-center border border-aura-gray-300 h-8">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center"
                              disabled={item.quantity <= 1}
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        
                        {/* Total - Mobile */}
                        <div className="flex justify-between w-full md:hidden">
                          <span className="text-sm text-aura-gray-500">Total:</span>
                          <span className="font-semibold">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        
                        {/* Total - Desktop */}
                        <div className="hidden md:flex md:justify-center md:items-center w-1/6 font-semibold">
                          ${(item.product.price * item.quantity).toFixed(2)}
                          <button 
                            onClick={() => handleRemoveItem(item.id)}
                            className="ml-4 text-aura-gray-400 hover:text-aura-error"
                            aria-label="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button 
                    variant="secondary" 
                    href="/products"
                  >
                    Continue Shopping
                  </Button>
                  <Button 
                    variant="secondary" 
                    onClick={clearCart}
                    icon={<X size={18} />}
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div 
                  className="bg-aura-gray-100 p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-aura-gray-600">Items ({itemCount})</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-aura-gray-600">Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="border-t border-aura-gray-300 pt-3 flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="bg-aura-white p-4 text-sm text-aura-gray-600 mb-6">
                    <p>
                      {shipping === 0 
                        ? 'Your order qualifies for free shipping!' 
                        : `Add $${(100 - total).toFixed(2)} more to qualify for free shipping.`
                      }
                    </p>
                  </div>
                  
                  <Button 
                    href="/checkout" 
                    variant="primary" 
                    fullWidth 
                    icon={<ArrowRight size={18} />}
                    iconPosition="right"
                  >
                    Proceed to Checkout
                  </Button>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default CartPage;