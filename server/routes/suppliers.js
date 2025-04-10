const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

// GET /api/suppliers
router.get('/', supplierController.getAllSuppliers);

// GET /api/suppliers/:id
router.get('/:id', supplierController.getSupplierById);

// POST /api/suppliers
router.post('/', supplierController.createSupplier);

// PUT /api/suppliers/:id
router.put('/:id', supplierController.updateSupplier);

// DELETE /api/suppliers/:id
router.delete('/:id', supplierController.deleteSupplier);

module.exports = router;
