import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  CircularProgress, Button
} from '@mui/material';
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import axios from 'axios';

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get('/api/analytics');
        setAnalytics(res.data.data);
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const handleExport = () => {
    const fileData = JSON.stringify(analytics, null, 2);
    const blob = new Blob([fileData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "instagram-analytics-report.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!analytics) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error">Failed to load analytics data.</Typography>
      </Box>
    );
  }

  const followerData = analytics.followers.map((count, index) => ({
    day: `Day ${index + 1}`,
    followers: count
  }));

  const engagementData = analytics.engagement.map(post => ({
    name: `Post ${post.post}`,
    likes: post.likes,
    comments: post.comments
  }));

  return (
    <Box sx={{ p: 4 }}>
      {/* Title & Export */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h4">Instagram Analytics Dashboard</Typography>
        <Button variant="outlined" onClick={handleExport}>
          Export JSON Report
        </Button>
      </Box>

      <Grid container spacing={4}>
        {/* Stats Cards */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6">Best Time to Post</Typography>
              <Typography variant="h4" color="primary" fontWeight="bold">
                {analytics.bestPostTime}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6">Current Followers</Typography>
              <Typography variant="h4" color="primary" fontWeight="bold">
                {analytics.followers[analytics.followers.length - 1].toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Line Chart - Follower Growth */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Follower Growth (7 Days)</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={followerData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="followers" stroke="#1976d2" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Bar Chart - Engagement */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Post Engagement</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="likes" fill="#8884d8" name="Likes" />
                  <Bar dataKey="comments" fill="#82ca9d" name="Comments" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Table - Post Data */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Post Performance Table</Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Post</TableCell>
                      <TableCell align="right">Likes</TableCell>
                      <TableCell align="right">Comments</TableCell>
                      <TableCell align="right">Total Engagement</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {analytics.engagement.map(post => (
                      <TableRow key={post.post}>
                        <TableCell>Post {post.post}</TableCell>
                        <TableCell align="right">{post.likes}</TableCell>
                        <TableCell align="right">{post.comments}</TableCell>
                        <TableCell align="right">{post.likes + post.comments}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsDashboard;
