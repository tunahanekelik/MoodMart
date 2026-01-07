import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Grid, Box, Button, Avatar, 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  LinearProgress, Divider, Paper 
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom'; 
import { Language, SmartToy, Stars } from '@mui/icons-material'; 
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import '../App.css';

const moods = [
  { name: 'Peaceful', color: '#E3F2FD', label: 'peaceful', img: '/images/peaceful.png' },
  { name: 'Lonely', color: '#BBDEFB', label: 'lonely', img: '/images/lonely.png' },
  { name: 'Motivated', color: '#90CAF9', label: 'motivated', img: '/images/motivated.png' },
  { name: 'Heartbroken', color: '#64B5F6', label: 'heartbroken', img: '/images/heartbroken.png' },
  { name: 'Energetic', color: '#42A5F5', label: 'energetic', img: '/images/energetic.png' },
  { name: 'Pensive', color: '#2196F3', label: 'pensive', img: '/images/pensive.png' },
  { name: 'Hopeful', color: '#1E88E5', label: 'hopeful', img: '/images/hopeful.png' },
  { name: 'Excited', color: '#1565C0', label: 'excited', img: '/images/excited.png' }
];

const quizQuestions = [
  {
    question: "1. How is the lighting in your room right now?",
    options: [
      { text: "A) Soft and warm sunset light", mood: "peaceful" },
      { text: "B) Just the glow of my screen", mood: "lonely" },
      { text: "C) Bright and natural daylight", mood: "motivated" },
      { text: "D) Total darkness", mood: "heartbroken" }
    ]
  },
  {
    question: "2. What kind of sound would you prefer to hear?",
    options: [
      { text: "A) Rain hitting the window", mood: "pensive" },
      { text: "B) High-tempo electronic beats", mood: "energetic" },
      { text: "C) A crowded cafe's background noise", mood: "excited" },
      { text: "D) Complete silence", mood: "peaceful" }
    ]
  },
  {
    question: "3. If you could be anywhere right now, where would it be?",
    options: [
      { text: "A) Running on a mountain trail", mood: "energetic" },
      { text: "B) Watching the sunrise from a balcony", mood: "hopeful" },
      { text: "C) Under a blanket watching old movies", mood: "lonely" },
      { text: "D) Working on a big project", mood: "motivated" }
    ]
  }
];

const HomePage = ({ onAddToCart, onToggleWish, wishlist }) => { 
  const [featured, setFeatured] = useState([]);
  const [openQuiz, setOpenQuiz] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [detectedMood, setDetectedMood] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/products')
      .then(res => setFeatured(res.data.slice(0, 4)))
      .catch(err => console.error("API Error:", err));
  }, []);

  const handleAnswer = (mood) => {
    const newAnswers = [...answers, mood];
    setAnswers(newAnswers);
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const frequency = {};
      newAnswers.forEach(m => frequency[m] = (frequency[m] || 0) + 1);
      const result = Object.keys(frequency).reduce((a, b) => frequency[a] > frequency[b] ? a : b);
      setDetectedMood(result);
      setCurrentStep(quizQuestions.length);
    }
  };

  const resetQuiz = () => {
    setOpenQuiz(false);
    setCurrentStep(0);
    setAnswers([]);
    setDetectedMood(null);
  };

  return (
    <Box className="home-page-container">
      {/* HERO SECTION */}
      <Box sx={{ 
        background: 'linear-gradient(rgba(13, 71, 161, 0.6), rgba(13, 71, 161, 0.8)), url("/images/kermits.png") center/cover',
        height: '550px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textAlign: 'center', flexDirection: 'column',
      }}>
        <Typography variant="h1" className="hero-title" sx={{ fontSize: { xs: '3.5rem', md: '5.5rem' }, fontWeight: 900, mb: 1 }}>MoodMart</Typography>
        <Typography variant="h5" sx={{ mb: 4, letterSpacing: 4, fontWeight: 300 }}>RETRO SURVIVAL KITS</Typography>
        <Button variant="outlined" color="inherit" size="large" onClick={() => setOpenQuiz(true)} sx={{ borderRadius: '50px', border: '2px solid', px: 5 }}>
          DISCOVER YOUR KIT
        </Button>
      </Box>

      {/* QUIZ DIALOG */}
      <Dialog open={openQuiz} onClose={resetQuiz} fullWidth maxWidth="xs" PaperProps={{ style: { borderRadius: 24, backgroundColor: '#121212', color: '#fff' } }}>
        <DialogTitle sx={{ textAlign: 'center', pt: 3 }}>
          <Typography variant="overline" sx={{ letterSpacing: 2, color: '#4fc3f7' }}>
            {detectedMood ? "Analysis Complete" : `Question ${currentStep + 1} of 3`}
          </Typography>
          <LinearProgress variant="determinate" value={(currentStep / 3) * 100} sx={{ mt: 2, borderRadius: 5, height: 6, bgcolor: 'rgba(255,255,255,0.1)', '& .MuiLinearProgress-bar': { bgcolor: '#4fc3f7' } }} />
        </DialogTitle>
        <DialogContent sx={{ p: 4 }}>
          {!detectedMood ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h5" mb={4} textAlign="center" fontWeight="700">{quizQuestions[currentStep].question}</Typography>
              <Grid container spacing={2}>
                {quizQuestions[currentStep].options.map((opt, index) => (
                  <Grid item xs={12} key={index}>
                    <Button fullWidth variant="outlined" onClick={() => handleAnswer(opt.mood)} sx={{ py: 2, borderRadius: '15px', textTransform: 'none', color: '#fff', borderColor: 'rgba(79, 195, 247, 0.4)', '&:hover': { bgcolor: 'rgba(79, 195, 247, 0.1)', borderColor: '#4fc3f7' } }}>
                      {opt.text}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : (
            <Box textAlign="center" sx={{ py: 2 }}>
              <Typography variant="h4" color="#4fc3f7" fontWeight="900" gutterBottom>{detectedMood.toUpperCase()}!</Typography>
              <Avatar src={moods.find(m => m.label === detectedMood)?.img} variant="rounded" sx={{ width: 200, height: 200, mx: 'auto', border: '3px solid #4fc3f7', borderRadius: '20px' }} />
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 4 }}>
          <Button onClick={resetQuiz} sx={{ color: detectedMood ? '#fff' : 'rgba(255,255,255,0.5)' }}>{detectedMood ? 'RETRY' : 'CANCEL'}</Button>
          {detectedMood && <Button variant="contained" onClick={() => navigate(`/mood/${detectedMood}`)} sx={{ bgcolor: '#4fc3f7', color: '#000', fontWeight: '900', borderRadius: '25px', px: 4 }}>VIEW MY KIT</Button>}
        </DialogActions>
      </Dialog>

      <Container sx={{ mt: -8, pb: 10 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 4, mb: 10 }}>
          {moods.map((m) => (
            <Box key={m.name} sx={{ textAlign: 'center' }}>
              <Avatar src={m.img} onClick={() => navigate(`/mood/${m.label}`)} sx={{ width: 130, height: 130, cursor: 'pointer', border: '4px solid white', boxShadow: '0 8px 20px rgba(0,0,0,0.1)', transition: '0.3s', '&:hover': { transform: 'scale(1.15)', boxShadow: '0 12px 30px rgba(13, 71, 161, 0.3)' } }} />
              <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 'bold', color: '#0d47a1', textTransform: 'uppercase' }}>{m.name}</Typography>
            </Box>
          ))}
        </Box>
        
        <Typography variant="h4" className="curated-title">Curated Picks</Typography>

        <Grid container spacing={4} className="product-grid-container" justifyContent="center">
          {featured.map(product => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id} className="product-grid-item">
              <ProductCard 
                product={product} 
                onAddToCart={onAddToCart} 
                onToggleWish={onToggleWish} 
                wishlist={wishlist} 
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* FEATURED SECTION */}
      <Box sx={{ bgcolor: '#050505', py: 12, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="overline" sx={{ color: '#4fc3f7', fontWeight: 'bold', letterSpacing: 3 }}>NEXT-GEN E-COMMERCE</Typography>
            <Typography variant="h3" fontWeight="900" sx={{ mt: 1, color: 'white' }}>Why Choose <span style={{ color: '#4fc3f7' }}>MoodMart?</span></Typography>
          </Box>
          <Grid container spacing={4}>
            {[
              { title: "Global Localization", desc: "Automatic currency and multi-language support for 150+ countries.", icon: <Language sx={{ fontSize: 45, color: '#4fc3f7' }} />, detail: "Local Pricing" },
              { title: "AI Mood-Assistant", desc: "Our 24/7 Chatbot recommends products based on your emotional state.", icon: <SmartToy sx={{ fontSize: 45, color: '#4fc3f7' }} />, detail: "Powered by GPT-4" },
              { title: "Monthly Subscription", desc: "Unlock MoodMart Plus for free shipping and exclusive collection access.", icon: <Stars sx={{ fontSize: 45, color: '#4fc3f7' }} />, detail: "Starting at $9.99" }
            ].map((f, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Paper sx={{ p: 5, height: '100%', bgcolor: '#0f0f0f', borderRadius: 6, border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', transition: '0.3s', '&:hover': { transform: 'translateY(-10px)', borderColor: '#4fc3f7' } }}>
                  <Box sx={{ mb: 3 }}>{f.icon}</Box>
                  <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, color: 'white' }}>{f.title}</Typography>
                  <Typography variant="body2" sx={{ color: '#888', mb: 3, lineHeight: 1.6 }}>{f.desc}</Typography>
                  <Box sx={{ mt: 'auto', px: 2, py: 0.5, bgcolor: 'rgba(79, 195, 247, 0.1)', borderRadius: 2, color: '#4fc3f7', fontSize: '0.75rem', fontWeight: 'bold' }}>{f.detail}</Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* MINIMAL ABOUT LINK */}
      <Box sx={{ bgcolor: '#0a0a0a', py: 8, textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Container maxWidth="sm">
          <Typography variant="h5" fontWeight="700" color="white" gutterBottom>
            Ready to explore MoodMart's story?
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.6, mb: 4 }}>
            Discover how we blend technology and psychology to redefine your shopping experience.
          </Typography>
          <Button 
            variant="outlined" 
            component={Link} 
            to="/about" 
            sx={{ color: '#4fc3f7', borderColor: '#4fc3f7', fontWeight: 'bold', px: 6, borderRadius: 3 }}
          >
            LEARN MORE ABOUT US
          </Button>
        </Container>
      </Box>
    </Box>
  ); 
}; 

export default HomePage;