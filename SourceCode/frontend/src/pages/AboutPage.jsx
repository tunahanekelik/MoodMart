import React from 'react';
import { Box, Typography, Container, Grid, Divider } from '@mui/material';

const AboutPage = () => {
  return (
    <Box sx={{ bgcolor: '#0a0a0a', color: 'white', py: 10, minHeight: '100vh' }}>
      <Container maxWidth="md">
        
        {/* ABOUT US SECTION */}
        <Box sx={{ mb: 10 }}>
          <Typography variant="overline" sx={{ color: '#4fc3f7', fontWeight: 'bold', letterSpacing: 3 }}>
            ABOUT US
          </Typography>
          <Typography variant="h2" fontWeight="900" sx={{ mt: 2, mb: 4, lineHeight: 1.1 }}>
            MoodMart: A <span style={{ color: '#4fc3f7' }}>Mood-Based</span> Lifestyle Platform
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.2rem', lineHeight: 1.8, opacity: 0.9, mb: 3 }}>
            MoodMart is a mood-based lifestyle platform designed to connect emotions with meaningful products. 
            We believe that shopping is not just about buying things — it’s about expressing how you feel.
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, opacity: 0.7 }}>
            At MoodMart, every product is carefully categorized by mood, helping users discover items 
            that resonate with their emotions, whether they’re feeling happy, calm, motivated, nostalgic, 
            or low-energy. Our goal is to create a personalized and emotional shopping experience where 
            users feel understood, inspired, and comfortable.
          </Typography>
          <Typography variant="h6" sx={{ mt: 4, color: '#4fc3f7', fontStyle: 'italic', fontWeight: 400 }}>
            "MoodMart blends technology, design, and psychology to turn moods into meaningful choices."
          </Typography>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 8 }} />

        {/* OUR VISION SECTION */}
        <Box>
          <Typography variant="overline" sx={{ color: '#4fc3f7', fontWeight: 'bold', letterSpacing: 3 }}>
            OUR VISION
          </Typography>
          <Typography variant="h3" fontWeight="900" sx={{ mt: 2, mb: 4 }}>
            Redefining Online <span style={{ color: '#4fc3f7' }}>Shopping</span>
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, opacity: 0.8, mb: 3 }}>
            Our vision is to redefine online shopping by making emotions the center of the experience. 
            We aim to build a platform where users don’t search for products — products find them based on how they feel.
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, opacity: 0.8 }}>
            MoodMart aspires to become a global mood-driven marketplace that supports emotional well-being, 
            self-expression, and mindful consumption. In the future, we envision MoodMart using smart 
            technologies and AI-driven recommendations to better understand users’ moods and provide 
            truly personalized experiences.
          </Typography>
        </Box>

      </Container>
    </Box>
  );
};

export default AboutPage;