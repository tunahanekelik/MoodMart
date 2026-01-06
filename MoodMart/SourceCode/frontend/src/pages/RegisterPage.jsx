import React, { useState } from 'react'; // useState eklendi
import { Box, Typography, TextField, Button, Card, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios eklendi

const RegisterPage = () => {
    const navigate = useNavigate();
    
    // Form verilerini tutmak için state oluşturduk
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    // Inputlar değiştikçe state'i güncelleyen fonksiyon
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Kayıt fonksiyonu (Tek ve Doğru hali)
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Backend'deki register endpoint'ine veriyi gönderiyoruz
            await axios.post('http://localhost:8080/api/users/register', formData);
            alert('Account Created Successfully!');
            navigate('/login');
        } catch (error) {
            console.error("Registration Error:", error);
            alert('Registration failed! Make sure your backend is running.');
        }
    };

    return (
        <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', bgcolor: '#121212' }}>
            <Container maxWidth="xs">
                <Card sx={{ p: 4, bgcolor: '#1e1e1e', color: 'white', borderRadius: 4 }}>
                    <Typography variant="h4" fontWeight="900" textAlign="center" gutterBottom color="#4fc3f7">
                        CREATE ACCOUNT
                    </Typography>
                    
                    <form onSubmit={handleRegister}>
                        <TextField 
                            fullWidth 
                            label="Username" 
                            name="username" // name özelliği state ile eşleşmeli
                            margin="normal" 
                            variant="outlined" 
                            onChange={handleChange}
                            sx={{ input: { color: 'white' }, label: { color: '#aaa' } }} 
                        />
                        <TextField 
                            fullWidth 
                            label="Email Address" 
                            name="email" 
                            margin="normal" 
                            variant="outlined" 
                            onChange={handleChange}
                            sx={{ input: { color: 'white' }, label: { color: '#aaa' } }} 
                        />
                        <TextField 
                            fullWidth 
                            label="Password" 
                            name="password" 
                            type="password" 
                            margin="normal" 
                            variant="outlined" 
                            onChange={handleChange}
                            sx={{ input: { color: 'white' }, label: { color: '#aaa' } }} 
                        />
                        <Button 
                            fullWidth 
                            variant="contained" 
                            type="submit" 
                            sx={{ mt: 3, bgcolor: '#4fc3f7', color: 'black', fontWeight: 'bold' }}
                        >
                            REGISTER
                        </Button>
                    </form>
                </Card>
            </Container>
        </Box>
    );
};

export default RegisterPage;