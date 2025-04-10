import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Divider,
  Chip
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import BookIcon from '@mui/icons-material/Book';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InventoryIcon from '@mui/icons-material/Inventory';
import { formatDate, formatStatus } from '../../utils/formatters';

const DistributionCard = ({ distribution, schools, resources, onEdit, onDelete, showActions = true }) => {
  if (!distribution) return null;

  const getStatusColor = (status) => {
    const statusMap = {
      'pending': 'warning',
      'in_transit': 'info',
      'delivered': 'success',
      'cancelled': 'error'
    };
    
    return statusMap[status.toLowerCase()] || 'default';
  };

  // Find school and resource names
  const school = schools?.find(s => s.School_ID === distribution.School_ID) || { Name: `School ${distribution.School_ID}` };
  const resource = resources?.find(r => r.Resource_ID === distribution.Resource_ID) || { Name: `Resource ${distribution.Resource_ID}` };

  return (
    <Card sx={{ mb: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="div">
            Distribution #{distribution.Distribution_ID}
          </Typography>
          <Chip 
            label={formatStatus(distribution.Status)} 
            color={getStatusColor(distribution.Status)} 
            size="small" 
          />
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <SchoolIcon sx={{ mr: 1, fontSize: 'small', color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            School: {school.Name}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <BookIcon sx={{ mr: 1, fontSize: 'small', color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            Resource: {resource.Name}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <InventoryIcon sx={{ mr: 1, fontSize: 'small', color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            Quantity: {distribution.Quantity}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CalendarTodayIcon sx={{ mr: 1, fontSize: 'small', color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            Date: {formatDate(distribution.Date_Distributed)}
          </Typography>
        </Box>
      </CardContent>
      {showActions && (
        <CardActions>
          <Button size="small" onClick={() => onEdit(distribution)}>Edit</Button>
          <Button size="small" color="error" onClick={() => onDelete(distribution.Distribution_ID)}>Delete</Button>
        </CardActions>
      )}
    </Card>
  );
};

export default DistributionCard;
