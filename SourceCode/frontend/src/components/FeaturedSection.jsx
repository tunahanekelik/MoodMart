import React from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import { Language, SmartToy, Stars, Payment } from '@mui/icons-material';

const features = [
    {
        title: "Global Localization",
        desc: "Smart currency conversion and multi-language support. Shop in your local language with prices adjusted to your region.",
        icon: <Language sx={{ fontSize: 45, color: '#4fc3f7' }} />,
        detail: "Supports 150+ Countries"
    },
    {
        title: "AI Mood-Assistant",
        desc: "Our 24/7 AI Chatbot understands your needs. Get personalized product recommendations based on your mood.",
        icon: <SmartToy sx={{ fontSize: 45, color: '#4fc3f7' }} />,
        detail: "Powered by GPT-4"
    },
    {
        title: "Monthly Subscription",
        desc: "Join MoodMart Plus for exclusive discounts, zero shipping fees, and early access to featured collections.",
        icon: <Stars sx={{ fontSize: 45, color: '#4fc3f7' }} />,
        detail: "Starting at $9.99/mo"
    }
];

const FeaturedSection = () => {
    return (
        <Box sx={{ bgcolor: '#050505', py: 12, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography variant="overline" sx={{ color: '#4fc3f7', fontWeight: 'bold', letterSpacing: 3 }}>
                        NEXT-GEN E-COMMERCE
                    </Typography>
                    <Typography variant="h3" fontWeight="900" sx={{ mt: 1, color: 'white' }}>
                        Why Choose <span style={{ color: '#4fc3f7' }}>MoodMart?</span>
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Paper 
                                elevation={0}
                                sx={{ 
                                    p: 5, 
                                    height: '100%',
                                    bgcolor: '#0f0f0f', 
                                    borderRadius: 6,
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    transition: 'all 0.3s ease-in-out',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    '&:hover': {
                                        transform: 'translateY(-10px)',
                                        borderColor: '#4fc3f7',
                                        boxShadow: '0 10px 30px rgba(79, 195, 247, 0.1)'
                                    }
                                }}
                            >
                                <Box sx={{ mb: 3 }}>{feature.icon}</Box>
                                <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, color: 'white' }}>
                                    {feature.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#888', mb: 3, lineHeight: 1.6 }}>
                                    {feature.desc}
                                </Typography>
                                <Box sx={{ 
                                    mt: 'auto', 
                                    px: 2, py: 0.5, 
                                    bgcolor: 'rgba(79, 195, 247, 0.1)', 
                                    borderRadius: 2,
                                    color: '#4fc3f7',
                                    fontSize: '0.75rem',
                                    fontWeight: 'bold'
                                }}>
                                    {feature.detail}
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default FeaturedSection;