const { request } = require('express');
const { miConexion } = require('../database/db');

const ventasAPI = {};

ventasAPI.getTodasVentas = async (req, res, next) => {
  try {
    const conexion = await miConexion();
    const [rows] = await conexion.query('SELECT * FROM ventas');
    if (rows.length > 0) {
      res.status(200).json({
        estado: 1,
        mensaje: "Registros encontrados",
        ventas: rows
      })
    } else {
      res.status(404).json({
        estado: 0,
        mensaje: "Registros no encontrados",
        ventas: []
      })
    }
  } catch (error) {
    next(error);
  }
}


ventasAPI.postVenta = async (req = request, res, next) => {
  try {
    const { cantidad,factura_id,producto_id } = req.body;
    if (cantidad === undefined || factura_id === undefined || producto_id == undefined) {
      // Bad Request (Solicitud incorrecta)
      res.status(400).json({
        estado: 0,
        mensaje: "Solicitud incorrecta. Faltan parámetros"
      });
    } else {
      const conexion = await miConexion();
      const resultado = await conexion.query('INSERT INTO ventas(cantidad,factura_id,producto_id) VALUES(?, ?,?)', [cantidad,factura_id,producto_id]);
      if (resultado[0].affectedRows > 0) {
        res.status(201).json({
          estado: 1,
          mensaje: "Venta creada",
          venta: {
            id: resultado[0].insertId,
            cantidad:cantidad,
            factura_id:factura_id,
            producto_id: producto_id
          }
        });
      } else {
        res.status(500).json({
          estado: 0,
          mensaje: "Venta NO registrada"
          
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = ventasAPI;