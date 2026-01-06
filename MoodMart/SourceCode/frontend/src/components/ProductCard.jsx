import React, { useState } from 'react';
import { 
  Card, CardMedia, CardContent, Typography, Button, 
  Dialog, DialogTitle, DialogContent, DialogActions, Box, IconButton 
} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

// App.js'den gelen yeni proplar: onToggleWish ve wishlist eklendi
const ProductCard = ({ product, onAddToCart, onToggleWish, wishlist }) => { 
  const [open, setOpen] = useState(false);
  const productImage = product.imageUrl || product.image_url;

  // Ürünün wishlist'te olup olmadığını kontrol et
  const isWished = wishlist && wishlist.some(item => item.id === product.id);

  const handleAddToCart = () => {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      alert("Please login to add items to your cart!");
      return;
    }
    onAddToCart(product);
    setOpen(false);
  };

  return (
    <>
      <Card sx={{ 
        height: '100%', display: 'flex', flexDirection: 'column', 
        bgcolor: '#1e1e1e', color: '#fff', borderRadius: '16px',
        overflow: 'hidden', transition: '0.3s', position: 'relative', // Kalp butonu için relative
        '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 24px rgba(79, 195, 247, 0.2)' } 
      }}>
        
        {/* --- WISHLIST (KALP) BUTONU --- */}
        <IconButton 
          onClick={(e) => {
            e.stopPropagation(); // Kartın diğer tıklama olaylarını engeller
            onToggleWish(product);
          }}
          sx={{ 
            position: 'absolute', 
            top: 10, 
            right: 10, 
            bgcolor: 'rgba(0,0,0,0.5)', 
            zIndex: 10,
            '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' } 
          }}
        >
          {isWished ? (
            <Favorite sx={{ color: '#ff5252' }} /> // Wishlist'teyse kırmızı kalp
          ) : (
            <FavoriteBorder sx={{ color: '#fff' }} /> // Değilse boş kalp
          )}
        </IconButton>

        <CardMedia
            component="img" height="220"
            image={productImage} 
            alt={product.title}
            sx={{ objectFit: 'cover', bgcolor: '#222' }}
            onError={(e) => { e.target.src = 'https://via.placeholder.com/500x300?text=Kermit+Kit+Coming+Soon'; }}
        />
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Typography gutterBottom variant="h6" fontWeight="bold">{product.title}</Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2, height: '40px', overflow: 'hidden' }}>
            {product.description}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" color="#4fc3f7" fontWeight="900">${product.price}</Typography>
            <Typography variant="caption" sx={{ bgcolor: 'rgba(79, 195, 247, 0.1)', px: 1, py: 0.5, borderRadius: '4px', color: '#4fc3f7' }}>
              #{product.mood}
            </Typography>
          </Box>
        </CardContent>
        <Button 
          fullWidth variant="contained" 
          onClick={() => setOpen(true)} 
          sx={{ borderRadius: 0, py: 1.5, bgcolor: '#4fc3f7', color: '#000', fontWeight: 'bold' }}
        >
          VIEW DETAILS
        </Button>
      </Card>

      {/* DETAY DİYALOĞU */}
      <Dialog open={open} onClose={() => setOpen(false)} PaperProps={{ style: { borderRadius: 20, backgroundColor: '#121212', color: '#fff', maxWidth: '500px' } }}>
        <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>{product.title}</DialogTitle>
        <DialogContent dividers sx={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <img src={productImage} alt={product.title} style={{ width: '100%', height: 'auto', borderRadius: '12px', marginBottom: '20px' }} />
          <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.6 }}>{product.description}</Typography>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <Typography variant="h5" color="#4fc3f7" fontWeight="900">${product.price}</Typography>
             <Typography variant="body2" sx={{ opacity: 0.6 }}>Category: {product.mood} kit</Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)} sx={{ color: 'rgba(255,255,255,0.7)' }}>CLOSE</Button>
          <Button 
            variant="contained" 
            onClick={handleAddToCart}
            sx={{ bgcolor: '#4fc3f7', color: '#000', fontWeight: 'bold', borderRadius: '10px', px: 3 }}
          >
            ADD TO CART
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductCard;