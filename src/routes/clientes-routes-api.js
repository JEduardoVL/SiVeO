const express = require('express');
const clienteController = require('../controllers/clientes-controller-api');
const router = express.Router();

router.get('/api/clientes',clienteController.getTodosClientes);
router.get('/api/clientes/:id',clienteController.getClientePorId);
router.delete('/api/clientes/:id', clienteController.deleteClientePorId);
router.delete('/api/facturas/cliente/:id', clienteController.deleteClientePorId);
router.post('/api/clientes', clienteController.postCliente);
router.put('/api/clientes/:id', clienteController.putClientePorId);

module.exports=router;