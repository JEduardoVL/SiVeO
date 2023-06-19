const { request } = require('express');
const {miConexion} = require('../database/db')

const categoriasAPI = {};

categoriasAPI.getTodasCategorias = async (req, res, next)=>{
    try{
        const conexion =await miConexion();
        const [ rows ] = await conexion.query('SELECT * FROM categorias');
        if(rows.length>0){
            res.status(200).json({
                estado:1,
                mensaje:"Registros encontrados ", 
                categorias:rows
            })
        }else{
            res.status(404).json({
                estado:0,
                mensaje:"Registros no encontrados",
                categorias:[]
            })
        }
       
    }catch (error){
        next(error);
    }
}

categoriasAPI.getCategoriaPorId = async (req=request,res,next)=>{
    try {
        const {id} =req.params;
        const conexion = await miConexion();
        const [rows] = await conexion.query('SELECT * FROM categorias WHERE id =?', [id]);
        if(rows.length>0){
            res.status(200).json({
                estado:1,
                mensaje: "Categoria encontrada",
                categoria: rows[0]
            })
        }else{
            res.status(404).json({
                estado:0,
                mensaje: "Categoria no encontrada",
                categoria: rows
            })
        }
        res.json(resultado);
    } catch (error) {
        next(error)
        
    }
};
//Exportar el objeto

categoriasAPI.deleteCategoriaPorId = async (req = request, res, next) => {
    try {
      const { id } = req.params;
      const conexion = await miConexion();
      
      // Eliminar los registros asociados en la tabla "productos"
      await conexion.query('DELETE FROM productos WHERE categoria_id = ?', [id]);
      
      // Eliminar la categoría de la tabla "categorias"
      const resultado = await conexion.query('DELETE FROM categorias WHERE id = ?', [id]);
      
      if (resultado[0].affectedRows > 0) {
        res.status(200).json({
          estado: 1,
          mensaje: "Categoría eliminada",
        });
      } else {
        res.status(404).json({
          estado: 0,
          mensaje: "Categoría no encontrada",
        });
      }
    } catch (error) {
      next(error);
    }
  };
  

categoriasAPI.postCategoria = async(req=request,res,next)=>{
    try {
        const{id,descripcion}=req.body;
        //validar que en el cuerpo de la solicitud exista descripcion y observaciones 
        if(id==undefined || descripcion == undefined){
            //bad request (Solicitud incorrecta)
            res.status(400).json({
                estado:0,
                mensaje:"Solicitud incorrecta. Te faltan parametros"
            })
        } else{
            const conexion = await miConexion();
            const resultado = await conexion.query('INSERT INTO categorias(id,descripcion) VALUES(?,?)',[id,descripcion])
           if(resultado[0].affectedRows>0){
            res.status(201).json({
                estado:1,
                mensaje:"Categoria creada",
               categoria:{
                id             :    id,
                descripcion    :    descripcion
               }
            })
           }else{
            res.status(500).json({
                estado:0,
                mensaje: "Categoria NO registrada"
            })
           }
        }
    } catch (error) {
        next(error)
    }
}

categoriasAPI.putCategoriaPorId =async(req,res,next)=>{
    try {
        const {id} = req.params;
        const {descripcion}= req.body;
        if(id == undefined || descripcion == undefined){
            res.status(400).json({
                estado:0,
                mensaje:"Solicitud incorrecta. Faltan parametros"
            })
        }else{
            const conexion= miConexion();
            const  resultado = await conexion.query('UPDATE categorias SET descripcion = ? WHERE id=?', [descripcion,id]);
            if(resultado[0].affectedRows>0){
                if(resultado[0].changedRows>0){
                    res.status(200).json({
                        estado:1,
                        mensaje:"Categoria Actualizada",
                        categoria:{
                            descripcion:descripcion
                        }
                    })
                }else{
                    res.status(200).json({
                        estado:0,
                        mensaje:"Categoria sin cambios"
                    })
                }
            }else{
                res.status(404).json({
                    estado:0,
                    mensaje:"Categoria NO encontrada"
                })
            }
        }
    } catch (error) {
        next(error)
    }
}

module.exports=categoriasAPI;