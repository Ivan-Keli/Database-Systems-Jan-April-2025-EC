import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Grid, 
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText
} from '@mui/material';
import { suppliersApi } from '../../services/api';

const ResourceForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    Name: '',
    Type: '',
    Description: '',
    Supplier_ID: ''
  });
  const [errors, setErrors] = useState({});
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSuppliers();
    
    if (initialData) {
      setFormData({
        Name: initialData.Name || '',
        Type: initialData.Type || '',
        Description: initialData.Description || '',
        Supplier_ID: initialData.Supplier_ID || ''
      });
    }
  }, [initialData]);

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const response = await suppliersApi.getAll();
      setSuppliers(response.data || []);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    } finally {
      setLoading(false);
    }
  };

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
      newErrors.Name = 'Resource name is required';
    }
    
    if (!formData.Type.trim()) {
      newErrors.Type = 'Type is required';
    }
    
    if (!formData.Supplier_ID) {
      newErrors.Supplier_ID = 'Supplier is required';
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

  const resourceTypes = [
    'Book',
    'Laptop',
    'Stationery',
    'Equipment',
    'Software',
    'Other'
  ];

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="Name"
            label="Resource Name"
            fullWidth
            value={formData.Name}
            onChange={handleChange}
            error={!!errors.Name}
            helperText={errors.Name}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.Type} required>
            <InputLabel id="resource-type-label">Type</InputLabel>
            <Select
              labelId="resource-type-label"
              name="Type"
              value={formData.Type}
              label="Type"
              onChange={handleChange}
            >
              {resourceTypes.map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </Select>
            {errors.Type && <FormHelperText>{errors.Type}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.Supplier_ID} required>
            <InputLabel id="supplier-label">Supplier</InputLabel>
            <Select
              labelId="supplier-label"
              name="Supplier_ID"
              value={formData.Supplier_ID}
              label="Supplier"
              onChange={handleChange}
              disabled={loading || suppliers.length === 0}
            >
              {suppliers.map((supplier) => (
                <MenuItem key={supplier.Supplier_ID} value={supplier.Supplier_ID}>
                  {supplier.Name}
                </MenuItem>
              ))}
            </Select>
            {errors.Supplier_ID && <FormHelperText>{errors.Supplier_ID}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="Description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={formData.Description}
            onChange={handleChange}
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

export default ResourceForm;
