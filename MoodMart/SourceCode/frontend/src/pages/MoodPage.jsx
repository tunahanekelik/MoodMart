import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Grid, Breadcrumbs, Link as MuiLink, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

// onAddToCart prop'u App.js'den gelmeli
const MoodPage = ({ onAddToCart, onToggleWish, wishlist }) => {
  const { moodName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Backend'den ilgili moddaki ürünleri çekiyoruz
    axios.get(`http://localhost:8080/api/products/mood/${moodName}`)
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching mood products:", err));
  }, [moodName]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#121212', color: 'white', py: 5 }}>
      <Container>
        {/* Breadcrumbs - Navigasyon */}
        <Breadcrumbs sx={{ mb: 3, '& .MuiBreadcrumbs-li': { color: 'rgba(255,255,255,0.7)' } }}>
          <MuiLink component={Link} to="/" underline="hover" color="inherit">
            Home
          </MuiLink>
          <Typography color="#4fc3f7" sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
            {moodName}
          </Typography>
        </Breadcrumbs>
        
        {/* Başlık Bölümü */}
        <Typography 
          variant="h3" 
          gutterBottom 
          sx={{ 
            textTransform: 'capitalize', 
            fontWeight: '900',
            mb: 5,
            borderBottom: '2px solid #4fc3f7',
            display: 'inline-block',
            pb: 1
          }}
        >
          For When You Feel {moodName}
        </Typography>
        
        {/* Ürün Listesi */}
        <Grid container spacing={4}>
          {products.length > 0 ? (
            products.map(product => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                {/* HATA ÇÖZÜMÜ: onAddToCart burada ProductCard'a iletiliyor. 
                   App.js -> MoodPage -> ProductCard (Prop Drilling)
                */}
                <ProductCard product={product} 
                onAddToCart={onAddToCart} 
                onToggleWish={onToggleWish}
                wishlist={wishlist}
                />
              </Grid>
            ))
          ) : (
            <Box sx={{ width: '100%', textAlign: 'center', mt: 10 }}>
              <Typography variant="h5" sx={{ opacity: 0.5 }}>
                No kits found for the "{moodName}" mood yet.
              </Typography>
              <Typography sx={{ opacity: 0.3 }}>Check back soon for new survival kits!</Typography>
            </Box>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default MoodPage;