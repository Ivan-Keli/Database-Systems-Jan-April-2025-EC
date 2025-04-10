require('dotenv').config();
const app = require('./express-setup');
const db = require('./models');

const PORT = process.env.PORT || 5000;

// Sync database
db.sequelize.sync()
  .then(() => {
    console.log('Database synced');
    
    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to sync database:', err);
  });
