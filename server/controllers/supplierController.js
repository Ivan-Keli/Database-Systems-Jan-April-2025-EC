const { Supplier } = require('../models');

// Get all suppliers
exports.getAllSuppliers = async (req, res, next) => {
  try {
    const suppliers = await Supplier.findAll();
    res.json(suppliers);
  } catch (err) {
    next(err);
  }
};

// Get supplier by ID
exports.getSupplierById = async (req, res, next) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    
    res.json(supplier);
  } catch (err) {
    next(err);
  }
};

// Create new supplier
exports.createSupplier = async (req, res, next) => {
  try {
    const { Name, Contact, Address } = req.body;
    
    if (!Name || !Contact || !Address) {
      return res.status(400).json({ message: 'Name, Contact, and Address are required' });
    }
    
    const supplier = await Supplier.create({
      Name,
      Contact,
      Address
    });
    
    res.status(201).json(supplier);
  } catch (err) {
    next(err);
  }
};

// Update supplier
exports.updateSupplier = async (req, res, next) => {
  try {
    const { Name, Contact, Address } = req.body;
    
    const supplier = await Supplier.findByPk(req.params.id);
    
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    
    await supplier.update({
      Name: Name || supplier.Name,
      Contact: Contact || supplier.Contact,
      Address: Address || supplier.Address
    });
    
    res.json(supplier);
  } catch (err) {
    next(err);
  }
};

// Delete supplier
exports.deleteSupplier = async (req, res, next) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    
    await supplier.destroy();
    
    res.json({ message: 'Supplier deleted successfully' });
  } catch (err) {
    next(err);
  }
};
