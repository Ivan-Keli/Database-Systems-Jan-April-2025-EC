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
import { suppliersApi } from '../services/api';
import SupplierList from '../components/suppliers/SupplierList';
import SupplierForm from '../components/suppliers/SupplierForm';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const response = await suppliersApi.getAll();
      setSuppliers(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch suppliers. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setCurrentSupplier(null);
    setOpenDialog(true);
  };

  const handleEdit = (supplier) => {
    setCurrentSupplier(supplier);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      try {
        await suppliersApi.delete(id);
        fetchSuppliers();
        showNotification('Supplier deleted successfully', 'success');
      } catch (err) {
        setError('Failed to delete supplier. Please try again later.');
        showNotification('Failed to delete supplier', 'error');
        console.error(err);
      }
    }
  };

  const handleSave = async (supplierData) => {
    try {
      if (currentSupplier) {
        await suppliersApi.update(currentSupplier.Supplier_ID, supplierData);
        showNotification('Supplier updated successfully', 'success');
      } else {
        await suppliersApi.create(supplierData);
        showNotification('Supplier added successfully', 'success');
      }
      setOpenDialog(false);
      fetchSuppliers();
    } catch (err) {
      setError('Failed to save supplier. Please try again later.');
      showNotification('Failed to save supplier', 'error');
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
          Suppliers
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={handleAddNew}
        >
          Add New Supplier
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <SupplierList 
        suppliers={suppliers} 
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
          {currentSupplier ? 'Edit Supplier' : 'Add New Supplier'}
        </DialogTitle>
        <DialogContent>
          <SupplierForm 
            initialData={currentSupplier} 
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

export default Suppliers;
