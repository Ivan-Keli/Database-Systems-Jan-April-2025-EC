import React, { useState, useEffect } from 'react';
import { schoolsApi, distributionsApi, resourcesApi } from '../services/api';
import { 
  Typography, 
  Box, 
  Paper, 
  CircularProgress, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { formatDate } from '../utils/formatters';

const SchoolReports = () => {
  const [reportData, setReportData] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [schools, setSchools] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInitialData();
  }, []);
  
  useEffect(() => {
    if (selectedSchool) {
      fetchReportData();
    }
  }, [selectedSchool]);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [schoolsResponse, resourcesResponse] = await Promise.all([
        schoolsApi.getAll(),
        resourcesApi.getAll()
      ]);
      
      setSchools(schoolsResponse.data || []);
      setResources(resourcesResponse.data || []);
      
      if (schoolsResponse.data && schoolsResponse.data.length > 0) {
        setSelectedSchool(schoolsResponse.data[0].School_ID);
      }
    } catch (err) {
      console.error("Error fetching initial data:", err);
      setError("Failed to load initial data");
    } finally {
      setLoading(false);
    }
  };
  
  const fetchReportData = async () => {
    setLoading(true);
    try {
      const response = await distributionsApi.getAll();
      const distributions = response.data || [];
      
      // Filter distributions for the selected school
      const filteredDistributions = distributions.filter(
        dist => dist.School_ID === selectedSchool
      );
      
      // Map resource IDs to names
      const resourceMap = {};
      resources.forEach(resource => {
        resourceMap[resource.Resource_ID] = resource.Name;
      });
      
      // Process distributions to include resource names
      const processedData = filteredDistributions.map(dist => ({
        ...dist,
        ResourceName: resourceMap[dist.Resource_ID] || `Resource ${dist.Resource_ID}`
      }));
      
      setReportData(processedData);
    } catch (err) {
      console.error("Error fetching report data:", err);
      setError("Failed to load report data");
    } finally {
      setLoading(false);
    }
  };
  
  const handleSchoolChange = (event) => {
    setSelectedSchool(event.target.value);
  };
  
  const getTotalQuantity = () => {
    return reportData.reduce((total, item) => total + item.Quantity, 0);
  };

  if (loading && !reportData.length) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 2, bgcolor: 'error.light', color: 'error.contrastText' }}>
        {error}
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">
          School Distribution Report
        </Typography>
        <FormControl sx={{ minWidth: 200 }} size="small">
          <InputLabel id="school-select-label">Select School</InputLabel>
          <Select
            labelId="school-select-label"
            value={selectedSchool}
            label="Select School"
            onChange={handleSchoolChange}
          >
            {schools.map((school) => (
              <MenuItem key={school.School_ID} value={school.School_ID}>
                {school.Name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      
      {selectedSchool && (
        <>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">
              School: {schools.find(s => s.School_ID === selectedSchool)?.Name || 'Unknown'}
            </Typography>
            <Typography variant="subtitle2">
              Total Resources Distributed: {getTotalQuantity()}
            </Typography>
          </Box>

          {reportData.length === 0 ? (
            <Typography variant="body1" sx={{ textAlign: 'center', py: 3 }}>
              No distribution records found for this school
            </Typography>
          ) : (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Resource</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reportData.map((item) => (
                    <TableRow key={item.Distribution_ID}>
                      <TableCell>{item.ResourceName}</TableCell>
                      <TableCell>{item.Quantity}</TableCell>
                      <TableCell>{formatDate(item.Date_Distributed)}</TableCell>
                      <TableCell>{item.Status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
    </Paper>
  );
};

export default SchoolReports;
