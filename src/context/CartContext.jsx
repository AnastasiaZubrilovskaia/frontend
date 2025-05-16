import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (flower, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.flower._id === flower._id);
      if (existing) {
        return prev.map(item =>
          item.flower._id === flower._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { flower, quantity }];
    });
  };

  const removeFromCart = (flowerId) => {
    setCart(prev => prev.filter(item => item.flower._id !== flowerId));
  };

  const updateQuantity = (flowerId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(flowerId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.flower._id === flowerId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * item.flower.price,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};