import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Badge, Divider } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = ({ onOpenCart, cartCount }) => { 
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Re-fetch everything from localStorage on every route change
    const status = localStorage.getItem('isLoggedIn') === 'true';
    const role = localStorage.getItem('userRole');
    const storedUserStr = localStorage.getItem('user');
    
    setIsLoggedIn(status);
    
    // --- FIX: Normalize role to handle ROLE_USER and ROLE_ADMIN format ---
    if (role) {
      // This converts 'ROLE_USER' to 'user' and 'ROLE_ADMIN' to 'admin'
      // It also handles plain 'user' or 'admin' strings
      const normalizedRole = role.replace('ROLE_', '').toLowerCase();
      setUserRole(normalizedRole);
    } else {
      setUserRole(null);
    }

    if (storedUserStr) {
      try {
        const storedUser = JSON.parse(storedUserStr);
        setUsername(storedUser.username || "Profile");
      } catch (e) {
        console.error("User data parsing error", e);
      }
    }
  }, [location]); // Forces update when user navigates

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserRole(null);
    setUsername("");
    navigate('/login');
    window.location.reload(); // Hard reset to clear all states
  };

  return (
    <AppBar position="sticky" elevation={0} sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)', bgcolor: '#0d47a1' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          
          {/* LOGO AND BRAND */}
          <Box 
            component={Link} 
            to="/" 
            sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit', flexGrow: 1 }}
          >
            <Box
              component="img"
              src="/images/MoodMartLogo.png"
              alt="MoodMart Logo"
              sx={{ 
                height: 48, 
                width: 'auto',
                filter: 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.6))',
                transition: 'all 0.3s ease-in-out',
                '&:hover': { transform: 'scale(1.1)' } 
              }}
            />
            <Divider orientation="vertical" flexItem sx={{ mx: 2, my: 1.5, bgcolor: 'rgba(255, 255, 255, 0.3)', width: '1px', height: '24px', display: { xs: 'none', sm: 'block' } }} />
            <Typography variant="h6" sx={{ fontWeight: '900', letterSpacing: 1, display: { xs: 'none', sm: 'block' } }}>
              MoodMart
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Button color="inherit" component={Link} to="/" sx={{ fontWeight: 'bold' }}>
              Home
            </Button>

            {/* PROFILE & CART: Now userRole will correctly match 'user' even with ROLE_USER in DB */}
            {isLoggedIn && userRole === 'user' && (
              <>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/profile" 
                  startIcon={<AccountCircleIcon />}
                  sx={{ 
                    fontWeight: 'bold', 
                    textTransform: 'none',
                    bgcolor: 'rgba(255,255,255,0.1)', 
                    px: 2,
                    borderRadius: 2
                  }}
                >
                  {username}
                </Button>

                <Button color="inherit" onClick={onOpenCart} sx={{ fontWeight: 'bold' }}>
                  <Badge badgeContent={cartCount} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </Button>
              </>
            )}

            {/* ADMIN PANEL: Now userRole will correctly match 'admin' even with ROLE_ADMIN in DB */}
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

            {/* AUTH BUTTONS */}
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