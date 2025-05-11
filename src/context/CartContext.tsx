import { createContext, useContext, useState, ReactNode } from 'react';
import { Product, CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number, size: string, color: string) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity: number, size: string, color: string) => {
    const existingItem = items.find(
      (item) => 
        item.product.id === product.id && 
        item.size === size && 
        item.color === color
    );

    if (existingItem) {
      updateQuantity(existingItem.id, existingItem.quantity + quantity);
    } else {
      const newItem: CartItem = {
        id: `${product.id}-${size}-${color}-${Date.now()}`,
        product,
        quantity,
        size,
        color,
      };
      setItems([...items, newItem]);
    }
  };

  const removeFromCart = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};