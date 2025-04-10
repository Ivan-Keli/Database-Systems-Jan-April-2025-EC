import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import PageFooter from './components/layout/PageFooter';
import Dashboard from './pages/Dashboard';
import Schools from './pages/Schools';
import Resources from './pages/Resources';
import Suppliers from './pages/Suppliers';
import DistributionPage from './pages/DistributionPage';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex' }}>
          <Navbar />
          <Sidebar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - 240px)` },
              ml: { sm: '240px' },
              mt: '64px',
            }}
          >
            <Container maxWidth="lg">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/schools" element={<Schools />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/suppliers" element={<Suppliers />} />
                <Route path="/distributions" element={<DistributionPage />} />
              </Routes>
              <PageFooter />
            </Container>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
