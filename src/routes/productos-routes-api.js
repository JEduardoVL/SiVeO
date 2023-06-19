const express = require('express');
const productoController = require('../controllers/productos-controller-api');
const router = express.Router();

router.get('/api/productos',productoController.getTodosProductos);
router.get('/api/productos/:id',productoController.getProductoPorId);
router.delete('/api/productos/:id', productoController.deleteProductoPorId);
router.delete('/api/ventas/cliente/:id',productoController.deleteProductoPorId);
router.post('/api/productos', productoController.postProducto);
router.put('/api/productos/:id', productoController.putProductoPorId);

module.exports=router;