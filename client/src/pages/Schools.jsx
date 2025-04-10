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
import { schoolsApi } from '../services/api';
import SchoolList from '../components/schools/SchoolList';
import SchoolForm from '../components/schools/SchoolForm';

const Schools = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentSchool, setCurrentSchool] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    setLoading(true);
    try {
      const response = await schoolsApi.getAll();
      setSchools(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch schools. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setCurrentSchool(null);
    setOpenDialog(true);
  };

  const handleEdit = (school) => {
    setCurrentSchool(school);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this school?')) {
      try {
        await schoolsApi.delete(id);
        fetchSchools();
        showNotification('School deleted successfully', 'success');
      } catch (err) {
        setError('Failed to delete school. Please try again later.');
        showNotification('Failed to delete school', 'error');
        console.error(err);
      }
    }
  };

  const handleSave = async (schoolData) => {
    try {
      if (currentSchool) {
        await schoolsApi.update(currentSchool.School_ID, schoolData);
        showNotification('School updated successfully', 'success');
      } else {
        await schoolsApi.create(schoolData);
        showNotification('School added successfully', 'success');
      }
      setOpenDialog(false);
      fetchSchools();
    } catch (err) {
      setError('Failed to save school. Please try again later.');
      showNotification('Failed to save school', 'error');
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
          Schools
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={handleAddNew}
        >
          Add New School
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <SchoolList 
        schools={schools} 
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
          {currentSchool ? 'Edit School' : 'Add New School'}
        </DialogTitle>
        <DialogContent>
          <SchoolForm 
            initialData={currentSchool} 
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

export default Schools;
