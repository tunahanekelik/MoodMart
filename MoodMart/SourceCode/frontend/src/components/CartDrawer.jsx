import React from 'react';
import { 
  Drawer, Box, Typography, List, ListItem, ListItemText, 
  Button, Divider, IconButton 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { useNavigate } from 'react-router-dom';

const CartDrawer = ({ open, onClose, cartItems, onRemove }) => {
  const navigate = useNavigate(); // Yönlendirme için
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleGoToCheckout = () => {
    if (!user) {
      alert("Lütfen önce giriş yapın!");
      onClose();
      navigate('/login');
      return;
    }
    if (cartItems.length === 0) {
      alert("Sepetiniz boş!");
      return;
    }
    onClose(); // Çekmeceyi kapat
    navigate('/checkout'); // Profesyonel ödeme sayfasına git
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ 
        width: 380, p: 3, bgcolor: '#121212', height: '100%', 
        color: 'white', display: 'flex', flexDirection: 'column' 
      }}>
        
        <Typography variant="h5" fontWeight="900" color="#4fc3f7" mb={3}>
          MY CART 🛒
        </Typography>
        
        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 2 }} />

        {/* SEPET LİSTESİ */}
        <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <ListItem 
                key={index} 
                secondaryAction={
                  <IconButton onClick={() => onRemove(index)} sx={{ color: '#ff5252' }}>
                    <DeleteIcon />
                  </IconButton>
                }
                sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
              >
                <ListItemText 
                  primary={item.title} 
                  secondary={`$${item.price}`} 
                  secondaryTypographyProps={{ style: { color: '#4fc3f7', fontWeight: 'bold' } }} 
                />
              </ListItem>
            ))
          ) : (
            <Typography sx={{ textAlign: 'center', mt: 5, opacity: 0.5 }}>
              Your cart is empty.
            </Typography>
          )}
        </List>

        {/* ALT KISIM: TOPLAM VE BUTON */}
        <Box sx={{ pt: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h6" color="#4fc3f7" fontWeight="bold">${totalPrice}</Typography>
          </Box>
          
          <Button 
            fullWidth 
            variant="contained" 
            startIcon={<ShoppingCartCheckoutIcon />}
            onClick={handleGoToCheckout}
            disabled={cartItems.length === 0}
            sx={{ 
              bgcolor: '#4fc3f7', 
              color: 'black', 
              fontWeight: 'bold', 
              py: 2, 
              borderRadius: 3,
              '&:hover': { bgcolor: '#26c6da' }
            }}
          >
            CHECKOUT NOW
          </Button>
          
          <Button 
            fullWidth 
            onClick={onClose}
            sx={{ mt: 1, color: 'rgba(255,255,255,0.5)' }}
          >
            Continue Shopping
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;