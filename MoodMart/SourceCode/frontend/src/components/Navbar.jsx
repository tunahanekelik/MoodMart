import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Avatar, Badge } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = ({ onOpenCart, cartCount }) => { // cartCount prop'u eklendi
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const status = localStorage.getItem('isLoggedIn') === 'true';
    const role = localStorage.getItem('userRole');
    // Eğer Login sayfasında 'user' objesi kaydettiysek ismini çekelim
    const storedUser = JSON.parse(localStorage.getItem('user'));
    
    setIsLoggedIn(status);
    setUserRole(role);
    if (storedUser) setUsername(storedUser.username);
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserRole(null);
    navigate('/login');
  };

  return (
    <AppBar position="sticky" elevation={0} sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)', bgcolor: '#0d47a1' }}>
      <Container>
        <Toolbar disableGutters>
          <StorefrontIcon sx={{ mr: 1 }} />
          <Typography 
            variant="h6" 
            component={Link} 
            to="/" 
            sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', fontWeight: '900', letterSpacing: 1 }}
          >
            MoodMart
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Button color="inherit" component={Link} to="/" sx={{ fontWeight: 'bold' }}>
              Home
            </Button>

            {/* KULLANICI GİRİŞ YAPMIŞSA (USER) */}
            {isLoggedIn && userRole === 'user' && (
              <>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/profile" 
                  startIcon={<AccountCircleIcon />}
                  sx={{ fontWeight: 'bold', textTransform: 'none' }}
                >
                  {username || "Profile"}
                </Button>

                <Button color="inherit" onClick={onOpenCart} sx={{ fontWeight: 'bold' }}>
                  <Badge badgeContent={cartCount} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </Button>
              </>
            )}

            {/* ADMIN GİRİŞİ YAPILMIŞSA */}
            {isLoggedIn && userRole === 'admin' && (
              <Button 
                variant="contained"
                color="secondary" 
                component={Link} 
                to="/admin" 
                sx={{ fontWeight: 'bold', bgcolor: '#4fc3f7', color: '#000', mr: 1 }}
              >
                Admin Panel
              </Button>
            )}

            {/* GENEL LOGOUT / LOGIN BUTONLARI */}
            {isLoggedIn ? (
              <Button 
                variant="outlined" 
                color="inherit" 
                onClick={handleLogout}
                sx={{ fontWeight: 'bold', ml: 1, borderColor: 'rgba(255,255,255,0.5)' }}
              >
                Logout
              </Button>
            ) : (
              <Button 
                variant="contained" 
                onClick={() => navigate('/login')} 
                sx={{ bgcolor: '#4fc3f7', color: '#000', fontWeight: 'bold' }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;