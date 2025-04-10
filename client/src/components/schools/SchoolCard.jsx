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
import SchoolIcon from '@mui/icons-material/School';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';

const SchoolCard = ({ school, onEdit, onDelete, showActions = true }) => {
  if (!school) return null;

  return (
    <Card sx={{ mb: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <SchoolIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" component="div">
            {school.Name}
          </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocationOnIcon sx={{ mr: 1, fontSize: 'small', color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {school.Location}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PersonIcon sx={{ mr: 1, fontSize: 'small', color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {school.Contact_Person}
          </Typography>
        </Box>
      </CardContent>
      {showActions && (
        <CardActions>
          <Button size="small" onClick={() => onEdit(school)}>Edit</Button>
          <Button size="small" color="error" onClick={() => onDelete(school.School_ID)}>Delete</Button>
        </CardActions>
      )}
    </Card>
  );
};

export default SchoolCard;
