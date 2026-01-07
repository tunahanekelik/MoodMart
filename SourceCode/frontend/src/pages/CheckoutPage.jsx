import React, { useState } from 'react';
import { Container, Grid, Typography, TextField, Button, Paper, Box, Divider, Card, Avatar } from '@mui/material';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css'; // Visual styles for the card
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CheckoutPage = ({ cartItems, clearCart }) => {
  const navigate = useNavigate();
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
  const user = JSON.parse(localStorage.getItem('user'));

  // State for credit card details
  const [cardState, setCardState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  // State for shipping address details
  const [address, setAddress] = useState({ street: '', city: '', zip: '' });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setCardState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setCardState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      const orderData = {
        userId: user?.id || 1, // Default to 1 if user is not found (for testing)
        totalAmount: totalPrice,
        status: "PENDING",
        shippingAddress: `${address.street}, ${address.city}, ${address.zip}`,
        items: cartItems.map(item => ({
          productTitle: item.title,
          price: item.price,
          imageUrl: item.imageUrl
        }))
      };

      // Sending order data to the backend
      await axios.post('http://localhost:8080/api/orders/create', orderData);
      
      alert("Payment Successful! Your Mood Kit is being prepared.");
      clearCart(); // Clear the shopping cart
      navigate('/profile'); // Redirect user to the profile page
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred during payment. Please check your information.");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8, color: 'white' }}>
      <Typography variant="h3" fontWeight="900" color="#4fc3f7" mb={5} textAlign="center" sx={{ letterSpacing: 2 }}>
        SECURE CHECKOUT
      </Typography>

      <Grid container spacing={4}>
        {/* LEFT SIDE: Payment and Address Form */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 4, bgcolor: '#1e1e1e', borderRadius: 5, border: '1px solid rgba(255,255,255,0.05)' }}>
            
            {/* Card Image (Live Preview) */}
            <Box sx={{ mb: 6 }}>
              <Cards
                number={cardState.number}
                expiry={cardState.expiry}
                cvc={cardState.cvc}
                name={cardState.name}
                focused={cardState.focus}
              />
            </Box>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth label="Card Number" name="number" variant="filled" 
                    onChange={handleInputChange} onFocus={handleInputFocus} 
                    sx={{ bgcolor: '#2a2a2a', borderRadius: 1 }} 
                    inputProps={{ maxLength: 16 }} required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth label="Card Holder Name" name="name" variant="filled" 
                    onChange={handleInputChange} onFocus={handleInputFocus} 
                    sx={{ bgcolor: '#2a2a2a', borderRadius: 1 }} required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField 
                    fullWidth label="Expiry Date (MM/YY)" name="expiry" variant="filled" 
                    onChange={handleInputChange} onFocus={handleInputFocus} 
                    sx={{ bgcolor: '#2a2a2a', borderRadius: 1 }} 
                    inputProps={{ maxLength: 4 }} required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField 
                    fullWidth label="CVC" name="cvc" variant="filled" 
                    onChange={handleInputChange} onFocus={handleInputFocus} 
                    sx={{ bgcolor: '#2a2a2a', borderRadius: 1 }} 
                    inputProps={{ maxLength: 3 }} required
                  />
                </Grid>
                
                <Grid item xs={12}><Divider sx={{ my: 3, bgcolor: 'rgba(255,255,255,0.1)' }} /></Grid>
                
                <Grid item xs={12}><Typography variant="h6" color="#4fc3f7" gutterBottom>Shipping Address</Typography></Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Full Address" variant="filled" onChange={(e) => setAddress({...address, street: e.target.value})} sx={{ bgcolor: '#2a2a2a', borderRadius: 1 }} required />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="City" variant="filled" onChange={(e) => setAddress({...address, city: e.target.value})} sx={{ bgcolor: '#2a2a2a', borderRadius: 1 }} required />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="Zip Code" variant="filled" onChange={(e) => setAddress({...address, zip: e.target.value})} sx={{ bgcolor: '#2a2a2a', borderRadius: 1 }} required />
                </Grid>
              </Grid>

              <Button 
                type="submit" 
                fullWidth 
                variant="contained" 
                sx={{ 
                  mt: 5, py: 2, bgcolor: '#4fc3f7', color: 'black', 
                  fontWeight: 'bold', fontSize: '1.1rem', borderRadius: 3,
                  '&:hover': { bgcolor: '#26c6da' }
                }}
              >
                COMPLETE PAYMENT (${totalPrice})
              </Button>
            </form>
          </Paper>
        </Grid>

        {/* RIGHT SIDE: Order Summary */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 4, bgcolor: '#1e1e1e', borderRadius: 5, position: 'sticky', top: 100, border: '1px solid #4fc3f7' }}>
            <Typography variant="h5" fontWeight="bold" mb={3} color="#4fc3f7">Order Summary</Typography>
            <Box sx={{ maxHeight: '400px', overflowY: 'auto', mb: 2 }}>
              {cartItems.map((item, idx) => (
                <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar src={item.imageUrl} variant="rounded" sx={{ width: 50, height: 50 }} />
                    <Typography variant="body2">{item.title}</Typography>
                  </Box>
                  <Typography variant="body2" fontWeight="bold">${item.price}</Typography>
                </Box>
              ))}
            </Box>
            <Divider sx={{ my: 2, bgcolor: 'rgba(255,255,255,0.1)' }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Total Amount</Typography>
              <Typography variant="h5" color="#4fc3f7" fontWeight="900">${totalPrice}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;