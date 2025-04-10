import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  Divider
} from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import LaptopIcon from '@mui/icons-material/Laptop';
import CreateIcon from '@mui/icons-material/Create';
import BuildIcon from '@mui/icons-material/Build';
import CodeIcon from '@mui/icons-material/Code';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const ResourceCard = ({ resource, onEdit, onDelete, showActions = true }) => {
  if (!resource) return null;

  const getResourceIcon = (type) => {
    switch (type) {
      case 'Book':
        return <BookIcon />;
      case 'Laptop':
        return <LaptopIcon />;
      case 'Stationery':
        return <CreateIcon />;
      case 'Equipment':
        return <BuildIcon />;
      case 'Software':
        return <CodeIcon />;
      default:
        return <HelpOutlineIcon />;
    }
  };

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
    <Card sx={{ mb: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ mr: 1, color: 'primary.main' }}>
            {getResourceIcon(resource.Type)}
          </Box>
          <Typography variant="h6" component="div">
            {resource.Name}
          </Typography>
        </Box>
        <Chip 
          label={resource.Type} 
          color={getTypeColor(resource.Type)} 
          size="small" 
          sx={{ mb: 2 }}
        />
        <Divider sx={{ mb: 2 }} />
        {resource.Description && (
            <Typography variant="body2" color="text.secondary">
              {resource.Description || 'No description available'}
            </Typography>
          )}
        </CardContent>
        {showActions && (
          <CardActions>
            <Button size="small" onClick={() => onEdit(resource)}>Edit</Button>
            <Button size="small" color="error" onClick={() => onDelete(resource.Resource_ID)}>Delete</Button>
          </CardActions>
        )}
      </Card>
    );
  };
  
  export default ResourceCard;
