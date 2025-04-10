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
  Snackbar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { resourcesApi } from '../services/api';
import ResourceList from '../components/resources/ResourceList';
import ResourceForm from '../components/resources/ResourceForm';

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentResource, setCurrentResource] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const response = await resourcesApi.getAll();
      setResources(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch resources. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setCurrentResource(null);
    setOpenDialog(true);
  };

  const handleEdit = (resource) => {
    setCurrentResource(resource);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      try {
        await resourcesApi.delete(id);
        fetchResources();
        showNotification('Resource deleted successfully', 'success');
      } catch (err) {
        setError('Failed to delete resource. Please try again later.');
        showNotification('Failed to delete resource', 'error');
        console.error(err);
      }
    }
  };

  const handleSave = async (resourceData) => {
    try {
      if (currentResource) {
        await resourcesApi.update(currentResource.Resource_ID, resourceData);
        showNotification('Resource updated successfully', 'success');
      } else {
        await resourcesApi.create(resourceData);
        showNotification('Resource added successfully', 'success');
      }
      setOpenDialog(false);
      fetchResources();
    } catch (err) {
      setError('Failed to save resource. Please try again later.');
      showNotification('Failed to save resource', 'error');
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

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Resources
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={handleAddNew}
        >
          Add New Resource
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <ResourceList 
        resources={resources} 
        loading={loading} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />

      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="sm" 
        fullWidth
      >
        <DialogTitle>
          {currentResource ? 'Edit Resource' : 'Add New Resource'}
        </DialogTitle>
        <DialogContent>
          <ResourceForm 
            initialData={currentResource} 
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

export default Resources;
