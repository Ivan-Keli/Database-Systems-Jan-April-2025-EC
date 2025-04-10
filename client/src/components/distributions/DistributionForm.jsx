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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { schoolsApi, resourcesApi } from '../../services/api';

const DistributionForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    School_ID: '',
    Resource_ID: '',
    Quantity: '',
    Date_Distributed: new Date(),
    Status: 'pending'
  });
  const [errors, setErrors] = useState({});
  const [schools, setSchools] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
    
    if (initialData) {
      setFormData({
        School_ID: initialData.School_ID || '',
        Resource_ID: initialData.Resource_ID || '',
        Quantity: initialData.Quantity || '',
        Date_Distributed: initialData.Date_Distributed ? new Date(initialData.Date_Distributed) : new Date(),
        Status: initialData.Status || 'pending'
      });
    }
  }, [initialData]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [schoolsResponse, resourcesResponse] = await Promise.all([
        schoolsApi.getAll(),
        resourcesApi.getAll()
      ]);
      
      setSchools(schoolsResponse.data || []);
      setResources(resourcesResponse.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
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

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      Date_Distributed: date
    });
    
    if (errors.Date_Distributed) {
      setErrors({
        ...errors,
        Date_Distributed: null
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.School_ID) {
      newErrors.School_ID = 'School is required';
    }
    
    if (!formData.Resource_ID) {
      newErrors.Resource_ID = 'Resource is required';
    }
    
    if (!formData.Quantity || formData.Quantity <= 0) {
      newErrors.Quantity = 'Valid quantity is required';
    }
    
    if (!formData.Date_Distributed) {
      newErrors.Date_Distributed = 'Date is required';
    }
    
    if (!formData.Status) {
      newErrors.Status = 'Status is required';
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

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'in_transit', label: 'In Transit' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.School_ID} required>
              <InputLabel id="school-label">School</InputLabel>
              <Select
                labelId="school-label"
                name="School_ID"
                value={formData.School_ID}
                label="School"
                onChange={handleChange}
                disabled={loading || schools.length === 0}
              >
                {schools.map((school) => (
                  <MenuItem key={school.School_ID} value={school.School_ID}>
                    {school.Name}
                  </MenuItem>
                ))}
              </Select>
              {errors.School_ID && <FormHelperText>{errors.School_ID}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.Resource_ID} required>
              <InputLabel id="resource-label">Resource</InputLabel>
              <Select
                labelId="resource-label"
                name="Resource_ID"
                value={formData.Resource_ID}
                label="Resource"
                onChange={handleChange}
                disabled={loading || resources.length === 0}
              >
                {resources.map((resource) => (
                  <MenuItem key={resource.Resource_ID} value={resource.Resource_ID}>
                    {resource.Name}
                  </MenuItem>
                ))}
              </Select>
              {errors.Resource_ID && <FormHelperText>{errors.Resource_ID}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="Quantity"
              label="Quantity"
              type="number"
              fullWidth
              value={formData.Quantity}
              onChange={handleChange}
              error={!!errors.Quantity}
              helperText={errors.Quantity}
              required
              inputProps={{ min: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.Status} required>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                name="Status"
                value={formData.Status}
                label="Status"
                onChange={handleChange}
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.Status && <FormHelperText>{errors.Status}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <DatePicker
              label="Date Distributed"
              value={formData.Date_Distributed}
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  required
                  error={!!errors.Date_Distributed}
                  helperText={errors.Date_Distributed}
                />
              )}
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
    </LocalizationProvider>
  );
};

export default DistributionForm;
