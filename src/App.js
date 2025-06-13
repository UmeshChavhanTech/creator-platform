import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './pages/HomePage';
import ContentIdeaGenerator from './pages/ContentIdeaGenerator';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import Navbar from './components/Navbar';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/content-idea" element={<ContentIdeaGenerator />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;