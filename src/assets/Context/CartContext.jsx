import { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Normalize price to number (handles strings like "Rs. 1,500")
  const normalizePrice = (price) => {
    if (typeof price === 'number') return price;
    
    // Remove currency symbols and commas
    const numericString = String(price)
      .replace(/[^0-9.]/g, '')
      .replace(/,/g, '');
    
    return parseFloat(numericString) || 0;
  };

  const addToCart = (item) => {
    // Ensure price is a number
    const normalizedItem = {
      ...item,
      price: normalizePrice(item.price)
    };

    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === normalizedItem.id);
      if (exists) {
        return prev.map((i) =>
          i.id === normalizedItem.id 
            ? { ...i, quantity: i.quantity + 1 } 
            : i
        );
      }
      return [...prev, { ...normalizedItem, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Calculate cart total
  const cartTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + (item.price || 0) * (item.quantity || 0),
      0
    );
  }, [cartItems]);

  const toggleCart = () => setIsCartOpen((prev) => !prev);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotal,
        isCartOpen,
        toggleCart,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};