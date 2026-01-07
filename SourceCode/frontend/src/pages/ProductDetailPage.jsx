import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, Button, Box, Divider, Chip, CircularProgress } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

const ProductDetailPage = ({ onAddToCart }) => {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch individual product details from Backend
    axios.get(`http://localhost:8080/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching product details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress color="info" /></Box>;
  if (!product) return <Typography variant="h5" textAlign="center" color="white" sx={{ py: 10 }}>Product not found.</Typography>;

  return (
    <Container sx={{ py: 8, color: 'white' }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate(-1)} 
        sx={{ mb: 4, color: 'rgba(255,255,255,0.6)' }}
      >
        Go Back
      </Button>

      <Grid container spacing={6}>
        {/* Left Side: Product Image */}
        <Grid item xs={12} md={6}>
          <Box 
            component="img"
            src={product.imageUrl}
            alt={product.title}
            sx={{ width: '100%', borderRadius: 8, border: '1px solid rgba(79,195,247,0.2)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
          />
        </Grid>

        {/* Right Side: Product Info */}
        <Grid item xs={12} md={6}>
          <Chip label={`#${product.mood} kit`} sx={{ bgcolor: 'rgba(79,195,247,0.1)', color: '#4fc3f7', mb: 2, fontWeight: 'bold' }} />
          <Typography variant="h2" fontWeight="900" gutterBottom>{product.title}</Typography>
          <Typography variant="h4" color="#4fc3f7" fontWeight="bold" sx={{ mb: 3 }}>${product.price}</Typography>
          
          <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 3 }} />
          
          <Typography variant="body1" sx={{ lineHeight: 1.8, opacity: 0.8, mb: 4, fontSize: '1.1rem' }}>
            {product.description}
          </Typography>

          <Button 
            fullWidth 
            variant="contained" 
            size="large"
            startIcon={<ShoppingCartIcon />}
            onClick={() => onAddToCart(product)}
            sx={{ bgcolor: '#4fc3f7', color: 'black', fontWeight: 'bold', py: 2, borderRadius: 3 }}
          >
            ADD TO CART
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetailPage;