import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Creator Platform
        </Typography>
        <Button color="inherit" component={Link} to="/content-idea">
          Content Ideas
        </Button>
        <Button color="inherit" component={Link} to="/analytics">
          Analytics
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;