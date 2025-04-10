import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
  CircularProgress,
  Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatDate, formatStatus } from '../../utils/formatters';

const DistributionList = ({ distributions, loading, onEdit, onDelete }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!distributions || distributions.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body1">No distributions found</Typography>
      </Paper>
    );
  }

  const getStatusColor = (status) => {
    const statusMap = {
      'pending': 'warning',
      'in_transit': 'info',
      'delivered': 'success',
      'cancelled': 'error'
    };
    
    return statusMap[status.toLowerCase()] || 'default';
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="distributions table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>School</TableCell>
            <TableCell>Resource</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Date Distributed</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {distributions.map((distribution) => (
            <TableRow key={distribution.Distribution_ID}>
              <TableCell>{distribution.Distribution_ID}</TableCell>
              <TableCell>{distribution.School_ID}</TableCell> {/* Would ideally show school name */}
              <TableCell>{distribution.Resource_ID}</TableCell> {/* Would ideally show resource name */}
              <TableCell>{distribution.Quantity}</TableCell>
              <TableCell>{formatDate(distribution.Date_Distributed)}</TableCell>
              <TableCell>
                <Chip 
                  label={formatStatus(distribution.Status)} 
                  color={getStatusColor(distribution.Status)} 
                  size="small" 
                />
              </TableCell>
              <TableCell align="right">
                <Button
                  startIcon={<EditIcon />}
                  size="small"
                  onClick={() => onEdit(distribution)}
                  sx={{ mr: 1 }}
                >
                  Edit
                </Button>
                <Button
                  startIcon={<DeleteIcon />}
                  size="small"
                  color="error"
                  onClick={() => onDelete(distribution.Distribution_ID)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DistributionList;
