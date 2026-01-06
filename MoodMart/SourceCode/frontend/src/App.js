import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

// Bileşen ve Sayfa İthalatları
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import HomePage from './pages/HomePage';
import MoodPage from './pages/MoodPage';
import LoginPage from './pages/LoginPage'; 
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';
import CheckoutPage from './pages/CheckoutPage'; // Yeni eklendi

const theme = createTheme({
  palette: {
    mode: 'dark', // Koyu tema modu
    primary: { main: '#0d47a1' },
    secondary: { main: '#4fc3f7' },
    background: { default: '#0a0a0a', paper: '#1e1e1e' }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
  }
});

function App() {
  // --- STATE YÖNETİMİ (localStorage Destekli) ---
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWish = localStorage.getItem('wishlist');
    return savedWish ? JSON.parse(savedWish) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Verileri localStorage'da senkronize tutma
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // --- FONKSİYONLAR ---
  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => setCartItems([]);

  const toggleWishlist = (product) => {
    setWishlistItems((prev) => {
      const isExist = prev.find(item => item.id === product.id);
      if (isExist) {
        return prev.filter(item => item.id !== product.id); // Varsa çıkar
      }
      return [...prev, product]; // Yoksa ekle
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* Navbar'a wishlist sayısını da gönderiyoruz */}
        <Navbar 
          onOpenCart={() => setIsCartOpen(true)} 
          cartCount={cartItems.length} 
          wishCount={wishlistItems.length} 
        />
        
        <CartDrawer 
          open={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          cartItems={cartItems} 
          onRemove={removeFromCart}
          clearCart={clearCart} 
        />

        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                onAddToCart={addToCart} 
                onToggleWish={toggleWishlist} 
                wishlist={wishlistItems} 
              />
            } 
          />
          <Route 
            path="/mood/:moodName" 
            element={
              <MoodPage 
                onAddToCart={addToCart} 
                onToggleWish={toggleWishlist} 
                wishlist={wishlistItems} 
              />
            } 
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminPage />} />
          
          {/* Checkout Sayfası Rotası */}
          <Route 
            path="/checkout" 
            element={
              <CheckoutPage 
                cartItems={cartItems} 
                clearCart={clearCart} 
              />
            } 
          />

          <Route 
            path="/profile" 
            element={
              <ProfilePage 
                wishlist={wishlistItems} 
                onRemoveWish={(id) => setWishlistItems(prev => prev.filter(i => i.id !== id))} 
              />
            } 
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;