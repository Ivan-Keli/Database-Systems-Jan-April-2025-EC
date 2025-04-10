/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.message, err.stack);
    
    // Check if the error has a specific status code
    const statusCode = err.statusCode || 500;
    
    // Build error response
    const errorResponse = {
      error: true,
      message: err.message || 'Internal Server Error',
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    };
    
    // Send error response
    res.status(statusCode).json(errorResponse);
  };
  
  module.exports = errorHandler;
  