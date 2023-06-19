const { request } = require('express');
const { miConexion } = require('../database/db');

const proveedoresAPI = {};

proveedoresAPI.getAll = async (req, res, next) => {
    try {
        const conexion = await miConexion();
        const [ rows ] = await conexion.query('SELECT * FROM proveedores');
        if (rows.length == 0){
            res.status(404).json({
                estado : 0,
                mensaje : "registros no encontrados",
                proveedores : []
            })
            return;  
        }
        res.status(200).json({
            estado : 1,
            mensaje : "registros encontrados",
            proveedores : rows
        })
    } catch (error) {
        next (error)
    }
}

proveedoresAPI.getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const conexion = await miConexion();
        const [ rows ] = await conexion.query('SELECT * FROM proveedores WHERE id = ?', [id])
        if (rows.length == 0){
            res.status(404).json({
                estado : 0,
                mensaje : "proveedor no encontrado",
                proveedor : {}
            })
            return;
        }
        res.status(200).json({
            estado : 1,
            mensaje : "proveedor encontrado",
            proveedor : rows[0]
        })
    } catch (error) {
        next ( error )
    }
}

//Para usar el delate es necesario eliminar mediante la api 
proveedoresAPI.deleteById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const conexion = await miConexion();
        const resultado = await conexion.query('DELETE FROM proveedores WHERE id = ?', [id])
        if (resultado[0].affectedRows == 0){
            res.status(404).json({
                estado : 0,
                mensaje : "proveedor no encontrado"
            })
            return;
        }
        res.status(200).json({
            estado : 1,
            menasaje : "proveedor eliminado"
        })
    } catch (error) {
        next (error);
    }
}

proveedoresAPI.postNew = async (req, res, next) => {
    try{
        const { nombre, direccion, telefono } = req.body;
        if(nombre == undefined || direccion == undefined || telefono == undefined){
            res.status(400).json({
                estado: 0,
                mensaje: "Bad request, parameters missing"
            })
            return;
        } 

        const conexion = await miConexion();
        const resultado = await conexion.query('INSERT INTO proveedores (nombre, direccion, telefono) values (?, ?, ?)', [ nombre, direccion, telefono ])
        if(resultado[0].affectedRows==0){
            res.status(500).json({
                estado: 0,
                mensaje: "proveedor no creado"
            })
            return;
        }
        res.status(201).json({
            estado: 1,
            mensaje: "proveedor Creada",
            categoria: {
                id: resultado[0].insertId,
                nombre: nombre,
                direccion: direccion,
                telefono : telefono 
            }
        })
        } catch (error) {
        next(error)
    }
}

proveedoresAPI.putById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nombre, direccion, telefono } = req.body;

        if(nombre == undefined || direccion == undefined || telefono == undefined){
            res.status(400).json({
                estado: 0,
                mensaje: 'Bad request, parameters missing'
            })
            return;
        }

        const conexion = await miConexion();
        const resultado = await conexion.query('UPDATE proveedores SET nombre = ?, direccion = ?, telefono = ? WHERE id = ?', [ nombre, direccion, telefono, id ]);
        if(resultado[0].afectedRows==0){
            res.status(404).json({
                estado: 0,
                mensaje: "Proveedor no encontrado"
            })
            return;
        }

        if(resultado[0].changedRows==0){
            res.status(200).json({
                estado: 0,
                mensaje: "Proveedor sin cambios"
            })
            return;
        }

        res.status(200).json({
            estado: 1,
            mensaje: "Proveedor Actalizado",
            categoria: {
                id: id,
                nombre: nombre,
                direccion: direccion,
                telefono : telefono
            }
        })
            
    } catch (error){
        next(error);
    }
}

module.exports = proveedoresAPI;