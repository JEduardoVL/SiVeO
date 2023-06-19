const { request } = require('express');
const { miConexion } = require('../database/db');

const clientesAPI = {};

clientesAPI.getTodosClientes = async (req, res, next) => {
  try {
    const conexion = await miConexion();
    const [rows] = await conexion.query('SELECT * FROM clientes');
    if (rows.length > 0) {
      res.status(200).json({
        estado: 1,
        mensaje: "Registros encontrados",
        clientes: rows
      })
    } else {
      res.status(404).json({
        estado: 0,
        mensaje: "Registros no encontrados",
        clientes: []
      })
    }
  } catch (error) {
    next(error);
  }
}

clientesAPI.getClientePorId = async (req = request, res, next) => {
  try {
    const { id } = req.params;
    const conexion = await miConexion();
    const [rows] = await conexion.query('SELECT * FROM clientes WHERE id = ?', [id]);
    if (rows.length > 0) {
      res.status(200).json({
        estado: 1,
        mensaje: "Cliente encontrado",
        cliente: rows[0]
      })
    } else {
      res.status(404).json({
        estado: 0,
        mensaje: "Cliente no encontrado",
        cliente: rows
      })
    }
  } catch (error) {
    next(error);
  }
};

clientesAPI.deleteClientePorId = async (req = request, res, next) => {
  try {
    const { id } = req.params;
    const conexion = await miConexion();
    const resultado = await conexion.query('DELETE clientes, facturas FROM clientes LEFT JOIN facturas ON clientes.id = facturas.cliente_id WHERE clientes.id = ?', [id]);
    if (resultado[0].affectedRows > 0) {
      res.status(200).json({
        estado: 1,
        mensaje: "Cliente y sus facturas eliminados"
      })
    } else {
      res.status(404).json({
        estado: 0,
        mensaje: "Cliente NO encontrado"
      })
    }
  } catch (error) {
    next(error);
  }
}


clientesAPI.postCliente = async (req=request, res, next) => {
  try {
    const { nombre, direccion, telefono } = req.body;
    // Validar que en el cuerpo de la solicitud exista nombre, direccion y telefono
    if (nombre === undefined || direccion === undefined || telefono === undefined) {
      // Bad Request (Solicitud incorrecta)
      res.status(400).json({
        estado: 0,
        mensaje: "Solicitud incorrecta. Faltan parámetros"
      })
    } else {
      const conexion = await miConexion();
      const resultado = await conexion.query('INSERT INTO clientes(nombre, direccion, telefono) VALUES(?, ?, ?)', [nombre, direccion, telefono])
      if (resultado[0].affectedRows > 0) {
        res.status(201).json({
          estado: 1,
          mensaje: "Cliente creado",
          cliente: {
            id: resultado[0].insertId,
            nombre: nombre,
            direccion: direccion,
            telefono: telefono
          }
        })
      } else {
        res.status(500).json({
          estado: 0,
          mensaje: "Cliente NO registrado"
        })
      }
    }
  } catch (error) {
    next(error)
  }
}


clientesAPI.putClientePorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, direccion, telefono } = req.body;
    if (nombre === undefined || direccion === undefined || telefono === undefined) {
      res.status(400).json({
        estado: 0,
        mensaje: "Solicitud incorrecta. Faltan parámetros"
      })
    } else {
      const conexion = await miConexion();
      const resultado = await conexion.query('UPDATE clientes SET nombre = ?, direccion = ?, telefono = ? WHERE id = ?',[nombre, direccion, telefono, id]);

      if (resultado[0].affectedRows > 0) {
        if (resultado[0].changedRows > 0) {
          res.status(200).json({
            estado: 1,
            mensaje: "Cliente actualizado",
            cliente: {
              id: id,
              nombre: nombre,
              direccion: direccion,
              telefono: telefono
            }
          })
        } else {
          res.status(200).json({
            estado: 0,
            mensaje: "Cliente sin cambios"
          })
        }
      } else {
        res.status(404).json({
          estado: 0,
          mensaje: "Cliente NO encontrado"
        })
      }
    }
  } catch (error) {
    next(error)
  }
}

module.exports = clientesAPI;
