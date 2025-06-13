import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Select, 
  MenuItem, 
  CircularProgress, 
  Card, 
  CardContent, 
  Grid,
  Paper,
  Chip
} from '@mui/material';
import axios from 'axios';

const niches = [
  'fashion', 
  'fitness', 
  'finance', 
  'food', 
  'travel', 
  'lifestyle',
  'technology',
  'education',
  'health',
  'beauty'
];

const ContentIdeaGenerator = () => {
  const [topic, setTopic] = useState('');
  const [niche, setNiche] = useState('fashion');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [content, setContent] = useState(null);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setIsLoading(true);
    setError(null);
    setContent(null);

    try {
      const response = await axios.post('/api/ai/generate', { topic, niche });

      if (response.data && response.data.data) {
        setContent(response.data.data);
      } else {
        setError('Unexpected response from server.');
      }
    } catch (err) {
      const msg = err?.response?.data?.error || 'Failed to generate content ideas. Please try again.';
      setError(msg);
      console.error('API Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setTopic('');
    setNiche('fashion');
    setError(null);
    setContent(null);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Content Idea Generator
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 4, maxWidth: 800, mx: 'auto' }}>
        <Typography variant="h6" gutterBottom>
          Generate Instagram Content Ideas
        </Typography>
        
        <TextField
          fullWidth
          label="Enter your topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          sx={{ mb: 3 }}
          placeholder="e.g., summer outfits, home workouts, budgeting tips"
        />
        
        <Select
          fullWidth
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          sx={{ mb: 3 }}
        >
          {niches.map((n) => (
            <MenuItem key={n} value={n}>
              {n.charAt(0).toUpperCase() + n.slice(1)}
            </MenuItem>
          ))}
        </Select>
        
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button 
              variant="contained" 
              onClick={handleGenerate}
              disabled={isLoading}
              fullWidth
              size="large"
            >
              {isLoading ? <CircularProgress size={24} /> : 'Generate'}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button 
              variant="outlined" 
              onClick={handleClear}
              disabled={isLoading}
              fullWidth
              size="large"
            >
              Clear
            </Button>
          </Grid>
        </Grid>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Paper>
      
      {content && (
        <Card sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
              Your Content Ideas
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Hook (First Line):
                </Typography>
                <Paper elevation={0} sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                  <Typography>{content.hook}</Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Reel Idea:
                </Typography>
                <Paper elevation={0} sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                  <Typography>{content.reelIdea}</Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Caption:
                </Typography>
                <Paper elevation={0} sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                  <Typography>{content.caption}</Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Hashtags:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {content.hashtags.map((tag, index) => (
                    <Chip key={index} label={`#${tag}`} variant="outlined" />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ContentIdeaGenerator;
