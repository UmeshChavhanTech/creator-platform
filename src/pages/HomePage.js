import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ 
        textAlign: 'center', 
        mt: 8,
        p: 4,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        boxShadow: 1
      }}>
        <Typography variant="h3" gutterBottom>
          Welcome to Creator Platform
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }}>
          AI-powered tools for content creators
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 4 }}>
          <Button 
            variant="contained" 
            size="large" 
            component={Link} 
            to="/content-idea"
          >
            Content Idea Generator
          </Button>
          <Button 
            variant="outlined" 
            size="large" 
            component={Link} 
            to="/analytics"
          >
            Analytics Dashboard
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;