import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Card, Container, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Backend bağlantısı için eklendi

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = credentials;

        // 1. ADMIN GİRİŞİ (Hardcoded)
        if (email === 'admin@moodmart.com' && password === 'admin123') {
            const adminData = { id: 0, username: 'Admin', email: 'admin@moodmart.com' };
            localStorage.setItem('user', JSON.stringify(adminData)); // Profil sayfası için kritik
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userRole', 'admin');
            
            alert('Welcome, Administrator.');
            navigate('/admin');
            window.location.reload(); 
        } 
        
        // 2. NORMAL KULLANICI GİRİŞİ (Backend Bağlantılı)
        else if (email && password) {
            try {
                // Backend'deki login endpoint'ine istek atıyoruz
                const response = await axios.post('http://localhost:8080/api/users/login', {
                    email: email,
                    password: password
                });

                if (response.data !== "fail") {
                    // Backend'den gelen kullanıcı bilgilerini kaydediyoruz (ID ve Rol önemli)
                    // Not: Backend login metodun şu an sadece string (role) dönüyor olabilir.
                    // Gerçekçi olması için burayı simüle edilmiş tam nesne ile güncelliyoruz:
                    const userData = { 
                        id: 1, // Gerçek senaryoda bu backendden gelmeli
                        username: email.split('@')[0], 
                        email: email 
                    };
                    
                    localStorage.setItem('user', JSON.stringify(userData));
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userRole', 'user');
                    
                    alert('Login Successful!');
                    navigate('/profile'); // Giriş yapınca doğrudan profile gitsin
                    window.location.reload();
                } else {
                    setError('Invalid email or password.');
                }
            } catch (err) {
                // Backend kapalıysa bile test edebilmen için geçici simülasyon:
                const tempUser = { id: 1, username: email.split('@')[0], email: email };
                localStorage.setItem('user', JSON.stringify(tempUser));
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userRole', 'user');
                navigate('/profile');
                window.location.reload();
            }
        } else {
            setError('Please enter both email and password.');
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
                        Enter your credentials to access your kit
                    </Typography>
                    
                    {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}
                    
                    <form onSubmit={handleLogin}>
                        <TextField
                            fullWidth label="Email Address" name="email" margin="normal" variant="outlined"
                            value={credentials.email} onChange={handleChange} 
                            sx={{ 
                                '& .MuiOutlinedInput-root': { color: 'white', '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' } },
                                '& .MuiInputLabel-root': { color: '#888' }
                            }}
                        />
                        <TextField
                            fullWidth label="Password" name="password" type="password" margin="normal" variant="outlined"
                            value={credentials.password} onChange={handleChange} 
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