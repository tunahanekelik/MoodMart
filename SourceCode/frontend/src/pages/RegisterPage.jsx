import React, { useState } from 'react';
import { 
    Box, Typography, TextField, Button, Card, Container, 
    InputAdornment, IconButton 
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
    const navigate = useNavigate();
    
    // State to hold form data
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    // State for password visibility toggle
    const [showPassword, setShowPassword] = useState(false);

    // Update state whenever inputs change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Toggle password visibility
    const handleClickShowPassword = () => setShowPassword(!showPassword);

    // Registration function to send data to the backend
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Sending data to the registration endpoint in the Backend
            await axios.post('http://localhost:8080/api/users/register', formData);
            alert('Account Created Successfully!');
            navigate('/login');
        } catch (error) {
            console.error("Registration Error:", error);
            alert('Registration failed! Please ensure your backend server is running.');
        }
    };

    return (
        <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', bgcolor: '#121212' }}>
            <Container maxWidth="xs">
                <Card sx={{ p: 4, bgcolor: '#1e1e1e', color: 'white', borderRadius: 4, border: '1px solid rgba(79, 195, 247, 0.1)' }}>
                    <Typography variant="h4" fontWeight="900" textAlign="center" gutterBottom color="#4fc3f7">
                        CREATE ACCOUNT
                    </Typography>
                    
                    <form onSubmit={handleRegister}>
                        <TextField 
                            fullWidth 
                            label="Username" 
                            name="username" // Matches key in formData state
                            margin="normal" 
                            variant="outlined" 
                            onChange={handleChange}
                            sx={{ 
                                '& .MuiOutlinedInput-root': { color: 'white', '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' } },
                                '& .MuiInputLabel-root': { color: '#aaa' }
                            }} 
                        />
                        <TextField 
                            fullWidth 
                            label="Email Address" 
                            name="email" 
                            margin="normal" 
                            variant="outlined" 
                            onChange={handleChange}
                            sx={{ 
                                '& .MuiOutlinedInput-root': { color: 'white', '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' } },
                                '& .MuiInputLabel-root': { color: '#aaa' }
                            }} 
                        />
                        <TextField 
                            fullWidth 
                            label="Password" 
                            name="password" 
                            type={showPassword ? 'text' : 'password'} 
                            margin="normal" 
                            variant="outlined" 
                            onChange={handleChange}
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
                                '& .MuiInputLabel-root': { color: '#aaa' }
                            }} 
                        />
                        <Button 
                            fullWidth 
                            variant="contained" 
                            type="submit" 
                            sx={{ 
                                mt: 4, 
                                py: 1.5, 
                                bgcolor: '#4fc3f7', 
                                color: 'black', 
                                fontWeight: 'bold',
                                borderRadius: 3,
                                '&:hover': { bgcolor: '#29b6f6' }
                            }}
                        >
                            REGISTER
                        </Button>
                    </form>
                    
                    <Typography variant="body2" textAlign="center" sx={{ mt: 3, color: '#666' }}>
                        Already have an account? <span style={{ color: '#4fc3f7', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => navigate('/login')}>Sign In</span>
                    </Typography>
                </Card>
            </Container>
        </Box>
    );
};

export default RegisterPage;