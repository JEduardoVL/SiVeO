const express = require('express');
const facturaController = require('../controllers/facturas-controller-api');
const router = express.Router();

router.get('/api/facturas',facturaController.getTodasFacturas);
router.post('/api/facturas', facturaController.postFactura);


module.exports=router;