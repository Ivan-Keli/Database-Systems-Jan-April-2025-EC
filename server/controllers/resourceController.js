const { Resource } = require('../models');

// Get all resources
exports.getAllResources = async (req, res, next) => {
  try {
    const resources = await Resource.findAll();
    res.json(resources);
  } catch (err) {
    next(err);
  }
};

// Get resource by ID
exports.getResourceById = async (req, res, next) => {
  try {
    const resource = await Resource.findByPk(req.params.id);
    
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    
    res.json(resource);
  } catch (err) {
    next(err);
  }
};

// Create new resource
exports.createResource = async (req, res, next) => {
  try {
    const { Name, Type, Description, Supplier_ID } = req.body;
    
    if (!Name || !Type || !Supplier_ID) {
      return res.status(400).json({ message: 'Name, Type, and Supplier_ID are required' });
    }
    
    const resource = await Resource.create({
      Name,
      Type,
      Description,
      Supplier_ID
    });
    
    res.status(201).json(resource);
  } catch (err) {
    next(err);
  }
};

// Update resource
exports.updateResource = async (req, res, next) => {
  try {
    const { Name, Type, Description, Supplier_ID } = req.body;
    
    const resource = await Resource.findByPk(req.params.id);
    
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    
    await resource.update({
      Name: Name || resource.Name,
      Type: Type || resource.Type,
      Description: Description || resource.Description,
      Supplier_ID: Supplier_ID || resource.Supplier_ID
    });
    
    res.json(resource);
  } catch (err) {
    next(err);
  }
};

// Delete resource
exports.deleteResource = async (req, res, next) => {
  try {
    const resource = await Resource.findByPk(req.params.id);
    
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    
    await resource.destroy();
    
    res.json({ message: 'Resource deleted successfully' });
  } catch (err) {
    next(err);
  }
};
