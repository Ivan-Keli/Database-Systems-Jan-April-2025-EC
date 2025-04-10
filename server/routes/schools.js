const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');

// GET /api/schools
router.get('/', schoolController.getAllSchools);

// GET /api/schools/:id
router.get('/:id', schoolController.getSchoolById);

// POST /api/schools
router.post('/', schoolController.createSchool);

// PUT /api/schools/:id
router.put('/:id', schoolController.updateSchool);

// DELETE /api/schools/:id
router.delete('/:id', schoolController.deleteSchool);

module.exports = router;
