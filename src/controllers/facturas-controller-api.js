const { request } = require('express');
const { miConexion } = require('../database/db');

const facturasAPI = {};

facturasAPI.getTodasFacturas = async (req, res, next) => {
  try {
    const conexion = await miConexion();
    const [rows] = await conexion.query('SELECT * FROM facturas');
    if (rows.length > 0) {
      res.status(200).json({
        estado: 1,
        mensaje: "Registros encontrados",
        facturas: rows
      })
    } else {
      res.status(404).json({
        estado: 0,
        mensaje: "Registros no encontrados",
        facturas: []
      })
    }
  } catch (error) {
    next(error);
  }
}


facturasAPI.postFactura = async (req = request, res, next) => {
  try {
    const { fecha, cliente_id } = req.body;
    if (fecha === undefined || cliente_id === undefined) {
      // Bad Request (Solicitud incorrecta)
      res.status(400).json({
        estado: 0,
        mensaje: "Solicitud incorrecta. Faltan parámetros"
      });
    } else {
      const conexion = await miConexion();
      const resultado = await conexion.query('INSERT INTO facturas(fecha, cliente_id) VALUES(?, ?)', [fecha, cliente_id]);
      if (resultado[0].affectedRows > 0) {
        res.status(201).json({
          estado: 1,
          mensaje: "Factura creada",
          factura: {
            id: resultado[0].insertId,
            fecha: fecha,
            cliente_id: cliente_id
          }
        });
      } else {
        res.status(500).json({
          estado: 0,
          mensaje: "Factura NO registrada"
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = facturasAPI;


