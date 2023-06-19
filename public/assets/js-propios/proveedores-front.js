function getProveedores(){
    $.ajax({
        method : "GET",
        url : window.location.origin + "/api/proveedores",
        data : {},
        success : function(result){
            if(result.estado == 0){
                alert(result.mensaje);
                return;
            }
            const proveedores = result.proveedores;
            //$.noConflict();
            let tabla = $('#tabla-proveedores').DataTable();
            proveedores.forEach(proveedor => {
                let botones = generaBotones(proveedor.id);
                //agregar renglones a la tabla
                let nuevoRenglon = tabla.row.add([proveedor.id,proveedor.nombre, proveedor.telefono, proveedor.direccion, botones]).node()
                //$(nuevoRenglon).attr('id', 'renglon_'+categoria.id);
                //$(nuevoRenglon).find('td').addClass('table-td')
                //tabla.row.add([categoria.descripcion, botones]).node().id='renglon_'+categoria.id
                tabla.draw(false)
            })
        }
    })
}

function generaBotones(id){
    let botones = '<div style="display: flex; justify-content: center;">';
    botones += '<button type="button" class="btn  btn-outline-primary" style="display: inline-block;" data-toggle="modal" data-target="#modal-Modificar-Proveedor">'
    botones += '<i class="fas fa-edit"></i>'
    botones += '</button>'
    botones += '<button type="button" class="btn btn-outline-danger" style="display: inline-block;" data-toggle="modal" data-target="#modal-eliminar-proveedor">'
    botones += '<i class="fas fa-edit"></i>'
    botones += '</button>'
    botones += '</div>'
    return botones;
}

getProveedores();