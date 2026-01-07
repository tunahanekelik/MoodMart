import React, { useState } from 'react';
import { 
    Box, Typography, TextField, Button, Card, Container, 
    Alert, InputAdornment, IconButton 
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    // State to hold login credentials
    const [credentials, setCredentials] = useState({ identifier: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Update state when input fields change
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    // Toggle password visibility
    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleLogin = async (e) => {
        e.preventDefault();
        const { identifier, password } = credentials;

        // 1. ADMIN LOGIN CHECK (Hardcoded)
        if ((identifier === 'admin@moodmart.com' || identifier === 'admin') && password === 'admin123') {
            const adminData = { id: 0, username: 'Admin', email: 'admin@moodmart.com' };
            localStorage.setItem('user', JSON.stringify(adminData));
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userRole', 'admin');
            
            alert('Welcome, Administrator.');
            navigate('/admin');
            window.location.reload(); 
        } 
        
        // 2. NORMAL USER LOGIN CHECK (Connected to Backend)
        else if (identifier && password) {
            try {
                // FIX: We map 'identifier' to 'email' so the Backend User model can read it correctly
                const response = await axios.post('http://localhost:8080/api/users/login', {
                    email: identifier, 
                    password: password
                });

                if (response.data !== "fail") {
                    // Store the role returned from the backend (admin or user)
                    const userRole = response.data;
                    
                    const userData = { 
                        id: 1, 
                        username: identifier.includes('@') ? identifier.split('@')[0] : identifier, 
                        email: identifier.includes('@') ? identifier : `${identifier}@moodmart.com` 
                    };
                    
                    localStorage.setItem('user', JSON.stringify(userData));
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userRole', userRole);
                    
                    alert('Login Successful!');
                    navigate(userRole === 'admin' ? '/admin' : '/profile');
                    window.location.reload();
                } else {
                    setError('Invalid credentials.');
                }
            } catch (err) {
                console.error("Login Error:", err);
                setError('Connection to server failed. Check if Backend is running.');
            }
        } else {
            setError('Please enter your credentials.');
        }
    };

    return (
        <Box sx={{ minHeight: '85vh', display: 'flex', alignItems: 'center', bgcolor: '#0a0a0a' }}>
            <Container maxWidth="xs">
                <Card sx={{ 
                    p: 5, 
                    bgcolor: '#1a1a1a', 
                    color: 'white', 
                    borderRadius: 6, 
                    boxShadow: '0 10px 40px rgba(0,0,0,0.7)',
                    border: '1px solid rgba(79, 195, 247, 0.1)' 
                }}>
                    <Typography variant="h4" fontWeight="900" textAlign="center" gutterBottom color="#4fc3f7">
                        SIGN IN
                    </Typography>
                    <Typography variant="body2" textAlign="center" sx={{ mb: 3, opacity: 0.6 }}>
                        Enter your username or email to access your kit
                    </Typography>
                    
                    {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}
                    
                    <form onSubmit={handleLogin}>
                        <TextField
                            fullWidth label="Username or Email" name="identifier" margin="normal" variant="outlined"
                            value={credentials.identifier} onChange={handleChange} 
                            sx={{ 
                                '& .MuiOutlinedInput-root': { color: 'white', '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' } },
                                '& .MuiInputLabel-root': { color: '#888' }
                            }}
                        />
                        
                        <TextField
                            fullWidth label="Password" name="password" 
                            type={showPassword ? 'text' : 'password'} 
                            margin="normal" variant="outlined"
                            value={credentials.password} onChange={handleChange} 
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleClickShowPassword} edge="end" sx={{ color: '#4fc3f7' }}>
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ 
                                '& .MuiOutlinedInput-root': { color: 'white', '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' } },
                                '& .MuiInputLabel-root': { color: '#888' }
                            }}
                        />

                        <Button 
                            fullWidth variant="contained" type="submit" 
                            sx={{ 
                                mt: 4, py: 1.8, bgcolor: '#4fc3f7', color: 'black', fontWeight: '900',
                                borderRadius: 3, letterSpacing: 1, '&:hover': { bgcolor: '#29b6f6' }
                            }}
                        >
                            LOGIN
                        </Button>
                    </form>
                    
                    <Typography variant="body2" textAlign="center" sx={{ mt: 4, color: '#666' }}>
                        Don't have an account? <span style={{ color: '#4fc3f7', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => navigate('/register')}>Sign Up</span>
                    </Typography>
                </Card>
            </Container>
        </Box>
    );
};

export default LoginPage;