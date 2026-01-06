import React, { useEffect, useState } from 'react';
import { 
  Container, Typography, Box, Card, Grid, Avatar, Divider, 
  Button, List, ListItem, ListItemIcon, ListItemText, Paper,
  Stepper, Step, StepLabel, IconButton
} from '@mui/material';
import { 
  ShoppingBag, Favorite, Settings, LocalShipping, 
  PhotoCamera, Delete, Info
} from '@mui/icons-material';
import axios from 'axios';

// images klasöründeki özel görseller
const moodImages = [
  { name: 'Peaceful', src: '/images/peaceful.png' },
  { name: 'Energetic', src: '/images/energetic.png' },
  { name: 'Excited', src: '/images/excited.png' },
  { name: 'Heartbroken', src: '/images/heartbroken.png' },
  { name: 'Hopeful', src: '/images/hopeful.png' },
  { name: 'Lonely', src: '/images/lonely.png' },
  { name: 'Motivated', src: '/images/motivated.png' },
  { name: 'Pensive', src: '/images/pensive.png' },
];

const statusMapping = { "PENDING": 0, "PREPARING": 1, "SHIPPED": 2, "IN_TRANSIT": 3, "DELIVERED": 4 };

const ProfilePage = ({ wishlist, onRemoveWish }) => {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || { username: 'Guest', profilePic: '/images/peaceful.png', id: 1 });

  useEffect(() => {
    if (activeTab === 'orders') {
      axios.get(`http://localhost:8080/api/orders/user/${user.id}`)
        .then(res => setOrders(res.data))
        .catch(err => console.log("Siparişler çekilemedi."));
    }
  }, [activeTab, user.id]);

  const handleProfilePicChange = (newPic) => {
    const updatedUser = { ...user, profilePic: newPic };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => handleProfilePicChange(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0a0a0a', pb: 10, color: 'white' }}>
      {/* Üst Banner */}
      <Box sx={{ height: '220px', background: 'linear-gradient(45deg, #0d47a1 30%, #4fc3f7 90%)' }} />
      
      <Container maxWidth="lg" sx={{ mt: -8 }}>
        {/* GRID DÜZELTMESİ: İki panelin boyunu eşitlemek için stretch kullanıyoruz */}
        <Grid container spacing={4} alignItems="stretch">
          
          {/* SOL PANEL - Kırpılma Sorunu Çözüldü */}
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              p: 4, bgcolor: '#1e1e1e', color: 'white', textAlign: 'center', 
              borderRadius: 6, height: '100%', border: '1px solid rgba(255,255,255,0.05)',
              overflow: 'visible', // Resmin kartın dışına taşmasına izin verir
              position: 'relative'
            }}>
              {/* Profil Resmi Konteynırı */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: -12, mb: 2 }}>
                <Avatar 
                  src={user.profilePic}
                  sx={{ 
                    width: 140, 
                    height: 140, 
                    border: '6px solid #1e1e1e', // Kartla uyumlu çerçeve
                    boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
                    bgcolor: '#333' 
                  }}
                />
              </Box>

              <Typography variant="h5" fontWeight="900" sx={{ mt: 1, letterSpacing: 1 }}>
                {user.username.toUpperCase()}
              </Typography>
              
              <List sx={{ mt: 3, width: '100%' }}>
                {[
                  { id: 'orders', label: 'My Orders', icon: <ShoppingBag />, color: '#4fc3f7' },
                  { id: 'wishlist', label: 'Wishlist', icon: <Favorite />, color: '#ff5252' },
                  { id: 'settings', label: 'Settings', icon: <Settings />, color: '#aaa' }
                ].map((item) => (
                  <ListItem 
                    button 
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    sx={{ 
                      borderRadius: 3, mb: 1.5, 
                      bgcolor: activeTab === item.id ? 'rgba(255,255,255,0.08)' : 'transparent',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
                    }}
                  >
                    <ListItemIcon sx={{ color: item.color }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 'bold' }} />
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>

          {/* SAĞ PANEL */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ 
              p: 4, bgcolor: '#1e1e1e', color: 'white', borderRadius: 6, 
              minHeight: '500px', border: '1px solid rgba(255,255,255,0.05)' 
            }}>
              
              {/* AYARLAR: Mood Seçimi */}
              {activeTab === 'settings' && (
                <Box>
                  <Typography variant="h5" fontWeight="900" color="#4fc3f7" gutterBottom>PROFILE SETTINGS</Typography>
                  <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', my: 3 }} />
                  
                  <Typography variant="h6" gutterBottom sx={{ opacity: 0.7 }}>Choose Your Current Mood</Typography>
                  <Grid container spacing={2} sx={{ mb: 4 }}>
                    <Grid item xs={4} sm={3}>
                      <input accept="image/*" style={{ display: 'none' }} id="upload-pic" type="file" onChange={handleFileUpload} />
                      <label htmlFor="upload-pic">
                        <Box sx={{ 
                          border: '2px dashed #444', p: 2, borderRadius: 3, textAlign: 'center', 
                          cursor: 'pointer', '&:hover': { borderColor: '#4fc3f7', bgcolor: 'rgba(79,195,247,0.05)' } 
                        }}>
                          <PhotoCamera sx={{ fontSize: 30, mb: 1, color: '#4fc3f7' }} />
                          <Typography variant="caption" display="block">Upload New</Typography>
                        </Box>
                      </label>
                    </Grid>
                    {moodImages.map((m) => (
                      <Grid item xs={4} sm={3} key={m.name} sx={{ textAlign: 'center' }}>
                        <Avatar 
                          src={m.src} 
                          onClick={() => handleProfilePicChange(m.src)}
                          sx={{ 
                            width: 70, height: 70, mx: 'auto', cursor: 'pointer',
                            border: user.profilePic === m.src ? '3px solid #4fc3f7' : '2px solid transparent',
                            transition: '0.2s', '&:hover': { transform: 'scale(1.1)' }
                          }} 
                        />
                        <Typography variant="caption" sx={{ mt: 1, display: 'block', fontSize: '0.7rem' }}>{m.name}</Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {/* WISHLIST */}
              {activeTab === 'wishlist' && (
                <Box>
                  <Typography variant="h5" fontWeight="900" color="#ff5252" gutterBottom>MY WISHLIST</Typography>
                  <Grid container spacing={2} sx={{ mt: 3 }}>
                    {wishlist.length > 0 ? wishlist.map((item) => (
                      <Grid item xs={12} key={item.id}>
                        <Card sx={{ p: 2, bgcolor: '#252525', display: 'flex', alignItems: 'center', borderRadius: 3 }}>
                          <Avatar src={item.imageUrl} variant="rounded" sx={{ width: 60, height: 60, mr: 2 }} />
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography fontWeight="bold">{item.title}</Typography>
                            <Typography variant="body2" color="#4fc3f7">${item.price}</Typography>
                          </Box>
                          <IconButton onClick={() => onRemoveWish(item.id)} color="error"><Delete /></IconButton>
                        </Card>
                      </Grid>
                    )) : (
                      <Box sx={{ width: '100%', textAlign: 'center', mt: 5, opacity: 0.3 }}>
                        <Favorite sx={{ fontSize: 60, mb: 2 }} />
                        <Typography variant="h6">Your wishlist is empty.</Typography>
                      </Box>
                    )}
                  </Grid>
                </Box>
              )}

              {/* ORDERS */}
              {activeTab === 'orders' && (
                <Box>
                  <Typography variant="h5" fontWeight="900" color="#4fc3f7" gutterBottom>MY ORDERS</Typography>
                  {orders.length > 0 ? orders.map(order => (
                    <Card key={order.id} sx={{ mb: 3, bgcolor: '#252525', color: 'white', borderRadius: 4 }}>
                      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <Typography variant="subtitle2">Order No: #{order.id}</Typography>
                        <Typography variant="subtitle2" color="#4fc3f7">${order.totalAmount}</Typography>
                      </Box>
                      <Box sx={{ p: 4 }}>
                        <Stepper activeStep={statusMapping[order.status]} alternativeLabel>
                          {["Placed", "Preparing", "Shipped", "On Way", "Arrived"].map((label) => (
                            <Step key={label} sx={{ '& .MuiStepLabel-label': { color: '#666' }, '& .Mui-active .MuiStepLabel-label': { color: '#4fc3f7' } }}>
                              <StepLabel>{label}</StepLabel>
                            </Step>
                          ))}
                        </Stepper>
                      </Box>
                    </Card>
                  )) : (
                    <Typography sx={{ opacity: 0.5, mt: 2 }}>No orders found yet.</Typography>
                  )}
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProfilePage;