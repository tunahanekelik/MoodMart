import React, { useState, useEffect } from 'react';

// Main application component
const App = () => {
  // Initialize cart items from localStorage to prevent data loss on refresh
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('moodCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Sync cart items to localStorage whenever the cart changes
  useEffect(() => {
    localStorage.setItem('moodCart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    // We add the product to the list; you can add a check here for duplicates if needed
    setCartItems((prevItems) => [...prevItems, product]);
    alert(`${product.title} has been added to your cart!`);
  };

  // Function to remove a product from the cart by its index
  const removeFromCart = (index) => {
    setCartItems((prevItems) => {
      const newItems = [...prevItems];
      newItems.splice(index, 1); // Remove only the specific item
      return newItems;
    });
  };

  // Function to clear the entire cart (e.g., after successful checkout)
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('moodCart');
  };

  return (
    null
  );
};

export default App;