const { request } = require('express');
const { miConexion } = require('../database/db');

const productosAPI = {};

productosAPI.getTodosProductos = async (req, res, next) => {
  try {
    const conexion = await miConexion();
    const [rows] = await conexion.query('SELECT * FROM productos');
    if (rows.length > 0) {
      res.status(200).json({
        estado: 1,
        mensaje: "Registros encontrados",
        productos: rows
      })
    } else {
      res.status(404).json({
        estado: 0,
        mensaje: "Registros no encontrados",
        productos: []
      })
    }
  } catch (error) {
    next(error);
  }
}

productosAPI.getProductoPorId = async (req = request, res, next) => {
  try {
    const { id } = req.params;
    const conexion = await miConexion();
    const [rows] = await conexion.query('SELECT * FROM productos WHERE id = ?', [id]);
    if (rows.length > 0) {
      res.status(200).json({
        estado: 1,
        mensaje: "Producto encontrado",
        producto: rows[0]
      })
    } else {
      res.status(404).json({
        estado: 0,
        mensaje: "Producto no encontrado",
        producto: rows
      })
    }
  } catch (error) {
    next(error);
  }
};

productosAPI.deleteProductoPorId = async (req = request, res, next) => {
    try {
      const { id } = req.params;
      const conexion = await miConexion();
      const resultado = await conexion.query('DELETE ventas, productos FROM ventas INNER JOIN productos ON ventas.producto_id = productos.id WHERE productos.id = ? AND ventas.id = ?', [id,id]);
      if (resultado[0].affectedRows > 0) {
        res.status(200).json({
          estado: 1,
          mensaje: "Producto y sus ventas eliminados"
        })
      } else {
        res.status(404).json({
          estado: 0,
          mensaje: "Producto NO encontrado"
        })
      }
    } catch (error) {
      next(error);
    }
  }
  
  
productosAPI.postProducto = async (req=request, res, next) => {
  try {
    const { descripcion, proveedor_id, categoria_id, precio } = req.body;
    // Validar que en el cuerpo de la solicitud exista nombre, direccion y telefono
    if (descripcion === undefined || proveedor_id === undefined || categoria_id === undefined || precio==undefined) {
      // Bad Request (Solicitud incorrecta)
      res.status(400).json({
        estado: 0,
        mensaje: "Solicitud incorrecta. Faltan parámetros"
      })
    } else {
      const conexion = await miConexion();
      const resultado = await conexion.query('INSERT INTO productos(descripcion, proveedor_id, categoria_id, precio) VALUES(?, ?, ?,?)', [descripcion, proveedor_id, categoria_id, precio])
      if (resultado[0].affectedRows > 0) {
        res.status(201).json({
          estado: 1,
          mensaje: "Producto creado",
          producto: {
            id: resultado[0].insertId,
            descripcion:descripcion,
            proveedor_id:proveedor_id,
            categoria_id:categoria_id,
            precio:precio
          }
        })
      } else {
        res.status(500).json({
          estado: 0,
          mensaje: "Producto NO registrado"
        })
      }
    }
  } catch (error) {
    next(error)
  }
}


productosAPI.putProductoPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { descripcion, proveedor_id, categoria_id, precio } = req.body;
    if (descripcion === undefined || proveedor_id === undefined || categoria_id === undefined || precio==undefined) {
      res.status(400).json({
        estado: 0,
        mensaje: "Solicitud incorrecta. Faltan parámetros"
      })
    } else {
      const conexion = await miConexion();
      const resultado = await conexion.query('UPDATE productos SET descripcion = ?, proveedor_id = ?, categoria_id = ?, precio =? WHERE id = ?',[descripcion,proveedor_id,categoria_id,precio, id]);

      if (resultado[0].affectedRows > 0) {
        if (resultado[0].changedRows > 0) {
          res.status(200).json({
            estado: 1,
            mensaje: "Producto actualizado",
            producto: {
              id: resultado[0].id,
              descripcion:descripcion,
              proveedor_id:proveedor_id,
              categoria_id:categoria_id,
              precio:precio
            }
          })
        } else {
          res.status(200).json({
            estado: 0,
            mensaje: "Porducto sin cambios"
          })
        }
      } else {
        res.status(404).json({
          estado: 0,
          mensaje: "Producto NO encontrado"
        })
      }
    }
  } catch (error) {
    next(error)
  }
}

module.exports = productosAPI;
