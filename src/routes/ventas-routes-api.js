const express = require('express');
const ventaController = require('../controllers/ventas-controller-api');
const router = express.Router();

router.get('/api/ventas',ventaController.getTodasVentas);
router.post('/api/ventas', ventaController.postVenta);


module.exports=router;