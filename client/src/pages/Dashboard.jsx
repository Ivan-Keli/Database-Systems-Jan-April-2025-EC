import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Grid, 
  Paper, 
  Box,
  Card, 
  CardContent,
  CircularProgress
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import BookIcon from '@mui/icons-material/Book';
import BusinessIcon from '@mui/icons-material/Business';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { schoolsApi, resourcesApi, suppliersApi, distributionsApi } from '../services/api';
import ResourcesChart from '../visualizations/ResourcesChart';
import DistributionMap from '../visualizations/DistributionMap';

const StatCard = ({ title, value, icon, color }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography color="textSecondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" component="div">
            {value}
          </Typography>
        </Box>
        <Box 
          sx={{ 
            bgcolor: `${color}.light`, 
            color: `${color}.main`,
            p: 1.5,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    schools: 0,
    resources: 0,
    suppliers: 0,
    distributions: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          schoolsResponse, 
          resourcesResponse, 
          suppliersResponse, 
          distributionsResponse
        ] = await Promise.all([
          schoolsApi.getAll(),
          resourcesApi.getAll(),
          suppliersApi.getAll(),
          distributionsApi.getAll()
        ]);
        
        setStats({
          schools: schoolsResponse.data.length,
          resources: resourcesResponse.data.length,
          suppliers: suppliersResponse.data.length,
          distributions: distributionsResponse.data.length
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Schools" 
            value={stats.schools} 
            icon={<SchoolIcon />} 
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Resources" 
            value={stats.resources} 
            icon={<BookIcon />} 
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Suppliers" 
            value={stats.suppliers} 
            icon={<BusinessIcon />} 
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Distributions" 
            value={stats.distributions} 
            icon={<LocalShippingIcon />} 
            color="warning"
          />
        </Grid>
      </Grid>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <ResourcesChart />
        </Grid>
        <Grid item xs={12} md={5}>
          <DistributionMap />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
