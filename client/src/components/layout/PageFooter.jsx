import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const PageFooter = () => {
  return (
    <Box sx={{ mt: 5, py: 3, borderTop: 1, borderColor: 'divider' }}>
      <Typography variant="body2" color="text.secondary" align="center">
        {'© '}
        <Link color="inherit" href="#" underline="hover">
          Educational Resource Distribution System
        </Link>{' '}
        {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default PageFooter;
