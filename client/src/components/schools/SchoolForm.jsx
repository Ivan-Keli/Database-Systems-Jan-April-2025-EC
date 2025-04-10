import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Grid, 
  Box,
  Alert
} from '@mui/material';

const SchoolForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    Name: '',
    Location: '',
    Contact_Person: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        Name: initialData.Name || '',
        Location: initialData.Location || '',
        Contact_Person: initialData.Contact_Person || ''
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
      newErrors.Name = 'School name is required';
    }
    
    if (!formData.Location.trim()) {
      newErrors.Location = 'Location is required';
    }
    
    if (!formData.Contact_Person.trim()) {
      newErrors.Contact_Person = 'Contact person is required';
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
            label="School Name"
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
            name="Location"
            label="Location"
            fullWidth
            value={formData.Location}
            onChange={handleChange}
            error={!!errors.Location}
            helperText={errors.Location}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="Contact_Person"
            label="Contact Person"
            fullWidth
            value={formData.Contact_Person}
            onChange={handleChange}
            error={!!errors.Contact_Person}
            helperText={errors.Contact_Person}
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

export default SchoolForm;
