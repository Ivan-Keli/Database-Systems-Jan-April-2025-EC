import React, { useState, useEffect } from 'react';
import { schoolsApi, distributionsApi } from '../services/api';
import { Typography, Box, Paper, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const DistributionMap = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewBy, setViewBy] = useState('location');
  
  useEffect(() => {
    fetchData();
  }, [viewBy]);
  
  const fetchData = async () => {
    setLoading(true);
    try {
      const [schoolsResponse, distributionsResponse] = await Promise.all([
        schoolsApi.getAll(),
        distributionsApi.getAll(),
      ]);

      const schools = schoolsResponse.data;
      const distributions = distributionsResponse.data;
      
      // Group data based on viewBy selection
      if (viewBy === 'location') {
        processDataByLocation(schools, distributions);
      } else {
        processDataBySchool(schools, distributions);
      }
      
    } catch (err) {
      console.error("Error fetching distribution map data:", err);
      setError("Failed to load distribution map data");
    } finally {
      setLoading(false);
    }
  };
  
  const processDataByLocation = (schools, distributions) => {
    // Create a map of school IDs to locations
    const schoolLocations = {};
    schools.forEach(school => {
      schoolLocations[school.School_ID] = school.Location;
    });
    
    // Sum distributions by location
    const locationTotals = {};
    
    distributions.forEach(distribution => {
      const location = schoolLocations[distribution.School_ID] || 'Unknown';
      if (!locationTotals[location]) {
        locationTotals[location] = 0;
      }
      locationTotals[location] += distribution.Quantity;
    });
    
    // Prepare chart data
    const labels = Object.keys(locationTotals);
    const data = Object.values(locationTotals);
    
    setChartData({
      labels,
      datasets: [
        {
          data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    });
  };
  
  const processDataBySchool = (schools, distributions) => {
    // Create a map of school IDs to names
    const schoolNames = {};
    schools.forEach(school => {
      schoolNames[school.School_ID] = school.Name;
    });
    
    // Sum distributions by school
    const schoolTotals = {};
    
    distributions.forEach(distribution => {
      const schoolName = schoolNames[distribution.School_ID] || `School ${distribution.School_ID}`;
      if (!schoolTotals[schoolName]) {
        schoolTotals[schoolName] = 0;
      }
      schoolTotals[schoolName] += distribution.Quantity;
    });
    
    // Prepare chart data - limit to top 6 for readability
    const sortedSchools = Object.entries(schoolTotals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);
    
    const labels = sortedSchools.map(item => item[0]);
    const data = sortedSchools.map(item => item[1]);
    
    setChartData({
      labels,
      datasets: [
        {
          data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    });
  };
  
  const handleViewChange = (event) => {
    setViewBy(event.target.value);
  };

  if (loading) {
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          Distribution by {viewBy === 'location' ? 'Location' : 'School'}
        </Typography>
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel id="view-by-label">View By</InputLabel>
          <Select
            labelId="view-by-label"
            value={viewBy}
            label="View By"
            onChange={handleViewChange}
          >
            <MenuItem value="location">Location</MenuItem>
            <MenuItem value="school">School</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {chartData && (
        <Box sx={{ height: 300, display: 'flex', justifyContent: 'center' }}>
          <Pie 
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'right',
                },
              },
            }}
          />
        </Box>
      )}
    </Paper>
  );
};

export default DistributionMap;
