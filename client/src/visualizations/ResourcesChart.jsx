import React, { useState, useEffect } from 'react';
import { resourcesApi, distributionsApi } from '../services/api';
import { Typography, Box, Paper, CircularProgress } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ResourcesChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resourcesResponse, distributionsResponse] = await Promise.all([
          resourcesApi.getAll(),
          distributionsApi.getAll(),
        ]);

        const resources = resourcesResponse.data;
        const distributions = distributionsResponse.data;

        // Process data for chart
        const resourceCounts = {};
        
        distributions.forEach((distribution) => {
          const resourceId = distribution.Resource_ID;
          if (!resourceCounts[resourceId]) {
            resourceCounts[resourceId] = 0;
          }
          resourceCounts[resourceId] += distribution.Quantity;
        });

        // Map resource IDs to names
        const resourceMap = {};
        resources.forEach((resource) => {
          resourceMap[resource.Resource_ID] = resource.Name;
        });

        const labels = Object.keys(resourceCounts).map(id => resourceMap[id] || `Resource ${id}`);
        const data = Object.values(resourceCounts);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Distributed Quantity',
              data,
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        });
        
      } catch (err) {
        console.error("Error fetching chart data:", err);
        setError("Failed to load chart data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      <Typography variant="h6" gutterBottom>
        Resource Distribution Overview
      </Typography>
      {chartData && (
        <Box sx={{ height: 300 }}>
          <Bar 
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Distributed Resources by Quantity',
                },
              },
            }}
          />
        </Box>
      )}
    </Paper>
  );
};

export default ResourcesChart;
