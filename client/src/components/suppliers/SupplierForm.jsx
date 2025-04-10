import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Grid, 
  Box
} from '@mui/material';

const SupplierForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    Name: '',
    Contact: '',
    Address: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        Name: initialData.Name || '',
        Contact: initialData.Contact || '',
        Address: initialData.Address || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.Name.trim()) {
      newErrors.Name = 'Supplier name is required';
    }
    
    if (!formData.Contact.trim()) {
      newErrors.Contact = 'Contact information is required';
    }
    
    if (!formData.Address.trim()) {
      newErrors.Address = 'Address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="Name"
            label="Supplier Name"
            fullWidth
            value={formData.Name}
            onChange={handleChange}
            error={!!errors.Name}
            helperText={errors.Name}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="Contact"
            label="Contact Information"
            fullWidth
            value={formData.Contact}
            onChange={handleChange}
            error={!!errors.Contact}
            helperText={errors.Contact}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="Address"
            label="Address"
            fullWidth
            multiline
            rows={3}
            value={formData.Address}
            onChange={handleChange}
            error={!!errors.Address}
            helperText={errors.Address}
            required
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            sx={{ mr: 2 }}
          >
            Save
          </Button>
          <Button 
            variant="outlined"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SupplierForm;
