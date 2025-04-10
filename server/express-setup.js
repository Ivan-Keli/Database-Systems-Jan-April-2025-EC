const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { json, urlencoded } = require('express');
const errorHandler = require('./utils/errorHandler');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({ extended: true }));

// API routes
app.use('/api/schools', require('./routes/schools'));
app.use('/api/resources', require('./routes/resources'));
app.use('/api/suppliers', require('./routes/suppliers'));
app.use('/api/distributions', require('./routes/distributions'));

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Educational Resource Distribution API' });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;
