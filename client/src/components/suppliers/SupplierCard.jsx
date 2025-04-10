import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Divider
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const SupplierCard = ({ supplier, onEdit, onDelete, showActions = true }) => {
  if (!supplier) return null;

  return (
    <Card sx={{ mb: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <BusinessIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" component="div">
            {supplier.Name}
          </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <PhoneIcon sx={{ mr: 1, fontSize: 'small', color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {supplier.Contact}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <LocationOnIcon sx={{ mr: 1, fontSize: 'small', color: 'text.secondary', mt: 0.5 }} />
          <Typography variant="body2" color="text.secondary">
            {supplier.Address}
          </Typography>
        </Box>
      </CardContent>
      {showActions && (
        <CardActions>
          <Button size="small" onClick={() => onEdit(supplier)}>Edit</Button>
          <Button size="small" color="error" onClick={() => onDelete(supplier.Supplier_ID)}>Delete</Button>
        </CardActions>
      )}
    </Card>
  );
};

export default SupplierCard;
