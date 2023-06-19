const express = require('express');
const proveedoresController = require('../controllers/proveedores-controller-api')
const router = express.Router();

router.get('/api/proveedores', proveedoresController.getAll);
router.get('/api/proveedores/:id', proveedoresController.getById)
router.delete('/api/proveedores/:id', proveedoresController.deleteById)
router.post('/api/proveedores', proveedoresController.postNew);
router.put('/api/proveedores/:id', proveedoresController.putById);

module.exports = router;