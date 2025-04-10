import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Paper, 
  Button, 
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  Grid
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BarChartIcon from '@mui/icons-material/BarChart';
import { distributionsApi, schoolsApi, resourcesApi } from '../services/api';
import DistributionList from '../components/distributions/DistributionList';
import DistributionForm from '../components/distributions/DistributionForm';
import SchoolReports from '../visualizations/SchoolReports';

const DistributionPage = () => {
  const [distributions, setDistributions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentDistribution, setCurrentDistribution] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [showReports, setShowReports] = useState(false);

  useEffect(() => {
    fetchDistributions();
  }, []);

  const fetchDistributions = async () => {
    setLoading(true);
    try {
      const response = await distributionsApi.getAll();
      setDistributions(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch distributions. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setCurrentDistribution(null);
    setOpenDialog(true);
  };

  const handleEdit = (distribution) => {
    setCurrentDistribution(distribution);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this distribution?')) {
      try {
        await distributionsApi.delete(id);
        fetchDistributions();
        showNotification('Distribution deleted successfully', 'success');
      } catch (err) {
        setError('Failed to delete distribution. Please try again later.');
        showNotification('Failed to delete distribution', 'error');
        console.error(err);
      }
    }
  };

  const handleSave = async (distributionData) => {
    try {
      if (currentDistribution) {
        await distributionsApi.update(currentDistribution.Distribution_ID, distributionData);
        showNotification('Distribution updated successfully', 'success');
      } else {
        await distributionsApi.create(distributionData);
        showNotification('Distribution added successfully', 'success');
      }
      setOpenDialog(false);
      fetchDistributions();
    } catch (err) {
      setError('Failed to save distribution. Please try again later.');
      showNotification('Failed to save distribution', 'error');
      console.error(err);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const showNotification = (message, severity = 'success') => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false
    });
  };

  const toggleReports = () => {
    setShowReports(!showReports);
  };

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Distributions
        </Typography>
        <Box>
          <Button 
            variant="outlined" 
            color="primary" 
            startIcon={<BarChartIcon />}
            onClick={toggleReports}
            sx={{ mr: 2 }}
          >
            {showReports ? 'Hide Reports' : 'Show Reports'}
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />}
            onClick={handleAddNew}
          >
            Add New Distribution
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {showReports && (
        <Box sx={{ mb: 3 }}>
          <SchoolReports />
        </Box>
      )}

      <DistributionList 
        distributions={distributions} 
        loading={loading} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />

      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          {currentDistribution ? 'Edit Distribution' : 'Add New Distribution'}
        </DialogTitle>
        <DialogContent>
          <DistributionForm 
            initialData={currentDistribution} 
            onSave={handleSave} 
            onCancel={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>

      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleCloseNotification}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity} 
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DistributionPage;
