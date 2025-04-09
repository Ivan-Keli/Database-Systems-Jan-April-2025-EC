const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the Educational Resource Distribution API' });
});

// Routes will be added here later
// app.use('/api/schools', require('./routes/schools'));
// app.use('/api/resources', require('./routes/resources'));
// app.use('/api/suppliers', require('./routes/suppliers'));
// app.use('/api/distributions', require('./routes/distributions'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
