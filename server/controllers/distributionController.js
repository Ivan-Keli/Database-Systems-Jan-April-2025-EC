const { Distribution, School, Resource } = require('../models');

// Get all distributions
exports.getAllDistributions = async (req, res, next) => {
  try {
    const distributions = await Distribution.findAll();
    res.json(distributions);
  } catch (err) {
    next(err);
  }
};

// Get distribution by ID
exports.getDistributionById = async (req, res, next) => {
  try {
    const distribution = await Distribution.findByPk(req.params.id);
    
    if (!distribution) {
      return res.status(404).json({ message: 'Distribution not found' });
    }
    
    res.json(distribution);
  } catch (err) {
    next(err);
  }
};

// Create new distribution
exports.createDistribution = async (req, res, next) => {
  try {
    const { School_ID, Resource_ID, Quantity, Date_Distributed, Status } = req.body;
    
    if (!School_ID || !Resource_ID || !Quantity) {
      return res.status(400).json({ message: 'School_ID, Resource_ID, and Quantity are required' });
    }
    
    // Validate if school exists
    const school = await School.findByPk(School_ID);
    if (!school) {
      return res.status(400).json({ message: 'School not found' });
    }
    
    // Validate if resource exists
    const resource = await Resource.findByPk(Resource_ID);
    if (!resource) {
      return res.status(400).json({ message: 'Resource not found' });
    }
    
    const distribution = await Distribution.create({
      School_ID,
      Resource_ID,
      Quantity,
      Date_Distributed: Date_Distributed || new Date(),
      Status: Status || 'pending'
    });
    
    res.status(201).json(distribution);
  } catch (err) {
    next(err);
  }
};

// Update distribution
exports.updateDistribution = async (req, res, next) => {
  try {
    const { School_ID, Resource_ID, Quantity, Date_Distributed, Status } = req.body;
    
    const distribution = await Distribution.findByPk(req.params.id);
    
    if (!distribution) {
      return res.status(404).json({ message: 'Distribution not found' });
    }
    
    // Validate school if provided
    if (School_ID) {
      const school = await School.findByPk(School_ID);
      if (!school) {
        return res.status(400).json({ message: 'School not found' });
      }
    }
    
    // Validate resource if provided
    if (Resource_ID) {
      const resource = await Resource.findByPk(Resource_ID);
      if (!resource) {
        return res.status(400).json({ message: 'Resource not found' });
      }
    }
    
    await distribution.update({
      School_ID: School_ID || distribution.School_ID,
      Resource_ID: Resource_ID || distribution.Resource_ID,
      Quantity: Quantity || distribution.Quantity,
      Date_Distributed: Date_Distributed || distribution.Date_Distributed,
      Status: Status || distribution.Status
    });
    
    res.json(distribution);
  } catch (err) {
    next(err);
  }
};

// Delete distribution
exports.deleteDistribution = async (req, res, next) => {
  try {
    const distribution = await Distribution.findByPk(req.params.id);
    
    if (!distribution) {
      return res.status(404).json({ message: 'Distribution not found' });
    }
    
    await distribution.destroy();
    
    res.json({ message: 'Distribution deleted successfully' });
  } catch (err) {
    next(err);
  }
};
