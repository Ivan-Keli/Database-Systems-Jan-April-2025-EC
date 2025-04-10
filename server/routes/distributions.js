const express = require('express');
const router = express.Router();
const distributionController = require('../controllers/distributionController');

// GET /api/distributions
router.get('/', distributionController.getAllDistributions);

// GET /api/distributions/:id
router.get('/:id', distributionController.getDistributionById);

// POST /api/distributions
router.post('/', distributionController.createDistribution);

// PUT /api/distributions/:id
router.put('/:id', distributionController.updateDistribution);

// DELETE /api/distributions/:id
router.delete('/:id', distributionController.deleteDistribution);

module.exports = router;
