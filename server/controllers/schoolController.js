const { School } = require('../models');

// Get all schools
exports.getAllSchools = async (req, res, next) => {
  try {
    const schools = await School.findAll();
    res.json(schools);
  } catch (err) {
    next(err);
  }
};

// Get school by ID
exports.getSchoolById = async (req, res, next) => {
  try {
    const school = await School.findByPk(req.params.id);
    
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }
    
    res.json(school);
  } catch (err) {
    next(err);
  }
};

// Create new school
exports.createSchool = async (req, res, next) => {
  try {
    const { Name, Location, Contact_Person } = req.body;
    
    if (!Name || !Location || !Contact_Person) {
      return res.status(400).json({ message: 'Name, Location, and Contact_Person are required' });
    }
    
    const school = await School.create({
      Name,
      Location,
      Contact_Person
    });
    
    res.status(201).json(school);
  } catch (err) {
    next(err);
  }
};

// Update school
exports.updateSchool = async (req, res, next) => {
  try {
    const { Name, Location, Contact_Person } = req.body;
    
    const school = await School.findByPk(req.params.id);
    
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }
    
    await school.update({
      Name: Name || school.Name,
      Location: Location || school.Location,
      Contact_Person: Contact_Person || school.Contact_Person
    });
    
    res.json(school);
  } catch (err) {
    next(err);
  }
};

// Delete school
exports.deleteSchool = async (req, res, next) => {
  try {
    const school = await School.findByPk(req.params.id);
    
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }
    
    await school.destroy();
    
    res.json({ message: 'School deleted successfully' });
  } catch (err) {
    next(err);
  }
};
