const express = require('express');
const categoriaController = require('../controllers/categorias-controller-api');
const router = express.Router();

router.get('/api/categorias',categoriaController.getTodasCategorias);
router.get('/api/categorias/:id',categoriaController.getCategoriaPorId);
router.delete('/api/categorias/:id', categoriaController.deleteCategoriaPorId);
router.post('/api/categorias', categoriaController.postCategoria);
router.put('/api/categorias/:id', categoriaController.putCategoriaPorId);

module.exports=router;