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

const ResourceList = ({ resources, loading, onEdit, onDelete }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!resources || resources.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body1">No resources found</Typography>
      </Paper>
    );
  }

  const getTypeColor = (type) => {
    const typeMap = {
      'Book': 'primary',
      'Laptop': 'secondary',
      'Stationery': 'success',
      'Equipment': 'warning',
      'Software': 'info'
    };
    
    return typeMap[type] || 'default';
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="resources table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Supplier</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {resources.map((resource) => (
            <TableRow key={resource.Resource_ID}>
              <TableCell>{resource.Resource_ID}</TableCell>
              <TableCell>{resource.Name}</TableCell>
              <TableCell>
                <Chip 
                  label={resource.Type} 
                  color={getTypeColor(resource.Type)} 
                  size="small" 
                />
              </TableCell>
              <TableCell>{resource.Description}</TableCell>
              <TableCell>{resource.Supplier_ID}</TableCell> {/* This would ideally show supplier name */}
              <TableCell align="right">
                <Button
                  startIcon={<EditIcon />}
                  size="small"
                  onClick={() => onEdit(resource)}
                  sx={{ mr: 1 }}
                >
                  Edit
                </Button>
                <Button
                  startIcon={<DeleteIcon />}
                  size="small"
                  color="error"
                  onClick={() => onDelete(resource.Resource_ID)}
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

export default ResourceList;
