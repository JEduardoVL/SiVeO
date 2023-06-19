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
                $(nuevoRenglon).attr('id', 'renglon_'+proveedor.id);
                //$(nuevoRenglon).find('td').addClass('table-td')
                //tabla.row.add([categoria.descripcion, botones]).node().id='renglon_'+categoria.id
                tabla.draw(false)
            })
        }
    })
}

function generaBotones(id){
    let botones = '<div style="display: flex; justify-content: center;">';
    botones += '<button type="button" class="btn  btn-outline-primary" style="display: inline-block;" data-toggle="modal" onclick="identificaActualizar(' + id + ');" data-target="#modal-Modificar-Proveedor">'
    botones += '<i class="fas fa-edit"></i>'
    botones += '</button>'
    botones += '<button type="button" class="btn btn-outline-danger" style="display: inline-block;" data-toggle="modal" onclick="identificaEliminar(' + id + ');" data-target="#modal-eliminar-proveedor">'
    botones += '<i class="fas fa-trash"></i>'
    botones += '</button>'
    botones += '</div>'
    return botones;
}

getProveedores();


let idSeleccionadoParaEliminar = 0;
let idSeleccionadoParaActualizar = 0;

function crearProveedor() {
  const nombreproveedor = document.getElementById('NombreProveAlta').value
  const passproveedor = document.getElementById('passProveAlta').value
  const telefonoproveedor = document.getElementById('telProveAlta').value
  const direccionproveedor = document.getElementById('direccionProveAlta').value

  $.ajax({
    method: 'POST',
    url: window.location.origin + "/api/proveedores",
    data: {
      nombre: nombreproveedor,
      pass: passproveedor,
      telefono: telefonoproveedor,
      direccion: direccionproveedor
    },
    success: function(result) {
      if (result.estado == 1) {
        let proveedor = result.proveedor;
        let tabla = $('#tabla-proveedores').DataTable();
        let Botones = generaBotones(proveedor.id);
        let nuevoRenglon = tabla.row.add([proveedor.id, proveedor.nombre, proveedor.telefono, proveedor.direccion, Botones]).node();
        $(nuevoRenglon).attr('id', 'renglon_' + proveedor.id)
        $(nuevoRenglon).find('td').addClass('table-td');
        tabla.draw(false);
      } else {
        alert(result.mensaje);
      }
    }
  });
}

function borrarProveedor() {
  $.ajax({
    method: "DELETE",
    url: window.location.origin + "/api/proveedores/" + idSeleccionadoParaEliminar,
    data: {},
    success: function(result) {
      if (result.estado == 1) {

        $.ajax({
            method: "DELETE",
            url: window.location.origin + "/api/proveedores/productos/" + idSeleccionadoParaEliminar,
            data: {},
            success: function(result){}
          })

        let tabla =$('#tabla-proveedores').DataTable();
        tabla.row('#renglon_'+idSeleccionadoParaEliminar).remove().draw()
      } else {
        alert(result.mensaje);
      }
    }
  });
}

function identificaActualizar(id) {
  idSeleccionadoParaActualizar = id;
  $.ajax({
    method: "GET",
    url: window.location.origin + "/api/proveedores/" + idSeleccionadoParaActualizar,
    data: {},
    success: function(result) {
      if (result.estado == 1) {
        let proveedor = result.proveedor;
        document.getElementById('nombreProveModi').value = proveedor.nombre;
        document.getElementById('passProveModi').value = proveedor.pass;
        document.getElementById('telProveModi').value = proveedor.telefono;
        document.getElementById('direccionProveModi').value = proveedor.direccion;
      } else {
        alert(result.mensaje);
      }
    }
  });
}

function identificaEliminar(id) {
  idSeleccionadoParaEliminar = id;
}

function actualizarProveedor() {
  let nombreproveedor = document.getElementById('nombreProveModi').value;
  let telefonoproveedor = document.getElementById('telProveModi').value;
  let direccionproveedor = document.getElementById('direccionProveModi').value;
  const passproveedor = document.getElementById('passProveModi').value

  $.ajax({
    method: "PUT",
    url: window.location.origin + "/api/proveedores/" + idSeleccionadoParaActualizar,
    data: {
      pass: passproveedor,
      nombre: nombreproveedor,
      telefono: telefonoproveedor,
      direccion: direccionproveedor
    },
    success: function(result) {
      if (result.estado == 1) {
        let tabla = $('#tabla-proveedores').DataTable();
        let rengloTemporal = tabla.row('#renglon_' + idSeleccionadoParaActualizar).data();
        rengloTemporal[1] = nombreproveedor;
        rengloTemporal[2] = telefonoproveedor;
        rengloTemporal[3] = direccionproveedor;
        tabla.row('#renglon_' + idSeleccionadoParaActualizar).data(rengloTemporal).draw();
        alert(result.mensaje);
      } else {
        alert(result.mensaje);
      }
    }
  });
}
