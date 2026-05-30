import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container>
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Commodities Trading Marketplace Europe
        </Typography>
        <Typography variant="h5" color="textSecondary" gutterBottom>
          Trade Bauxite, Limestone, Seafood, Timber & More Across Europe
        </Typography>
        
        <Box sx={{ mt: 4 }}>
          <Link to="/listings" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary" size="large" sx={{ mr: 2 }}>
              Browse Listings
            </Button>
          </Link>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" color="primary" size="large">
              Get Started
            </Button>
          </Link>
        </Box>

        <Grid container spacing={4} sx={{ mt: 8 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Real-Time Prices</Typography>
            <Typography>Market data updated every 3 minutes</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Smart Calculators</Typography>
            <Typography>Shipping, fuel, profit & ROI calculations</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Secure Payments</Typography>
            <Typography>Stripe integration with escrow</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Logistics Network</Typography>
            <Typography>Connect with shipping & logistics providers</Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Home;
