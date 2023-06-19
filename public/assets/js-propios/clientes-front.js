let idSeleccionadoParaEliminar = 0;
let idSeleccionadoParaActualizar = 0;

function crearCliente() {
  const nombrecliente = document.getElementById('NombreClienteAlta').value
  const telefonocliente = document.getElementById('telefonoClienteAlta').value
  const direccioncliente = document.getElementById('direccionClienteAlta').value

  $.ajax({
    method: 'POST',
    url: window.location.origin + "/api/clientes",
    data: {
      nombre: nombrecliente,
      telefono: telefonocliente,
      direccion: direccioncliente
    },
    success: function(result) {
      if (result.estado == 1) {
        let cliente = result.cliente;
        let tabla = $('#tabla-clientes').DataTable();
        let Botones = generarBotones(cliente.id);
        let nuevoRenglon = tabla.row.add([cliente.id,cliente.nombre, cliente.telefono, cliente.direccion, Botones]).node();
        $(nuevoRenglon).attr('id', 'renglon_' + cliente.id)
        $(nuevoRenglon).find('td').addClass('table-td');
        tabla.draw(false);
      } else {
        alert(result.mensaje);
      }
    }
  });
}

function getClientes() {
  $.ajax({
    method: "GET",
    url: window.location.origin + "/api/clientes",
    data: {},
    success: function(result) {
      if (result.estado == 1) {
        const clientes = result.clientes;
        let tabla = $('#tabla-clientes').DataTable();
        clientes.forEach(cliente => {
          let Botones = generarBotones(cliente.id);
          let nuevoRenglon = tabla.row.add([cliente.id,cliente.nombre, cliente.telefono, cliente.direccion, Botones]).node();
          $(nuevoRenglon).attr('id', 'renglon_' + cliente.id)
          $(nuevoRenglon).find('td').addClass('table-td');
          tabla.draw(false);
        });
      } else {
        alert(result.mensaje);
      }
    }
  });
}

function borrarCliente() {
  $.ajax({
    method: "DELETE",
    url: window.location.origin + "/api/clientes/" + idSeleccionadoParaEliminar,
    data: {},
    success: function(result) {
      if (result.estado == 1) {
        let tabla = $('#tabla-clientes').DataTable();
              tabla.row('#renglon_' + idSeleccionadoParaEliminar).remove().draw();
              alert(resultFacturas.mensaje);
      } else {
        alert(result.mensaje);
      }
    }
  });
}



function generarBotones(id) {
  let Botones = '<div style="display: flex; justify-content: center;">'
  Botones += '<button type="button" class="btn  btn-outline-primary" style="display: inline-block;" data-toggle="modal" onclick="identificaActualizar(' + id + ');" data-target="#modal-Modificar-Cliente">'
  Botones += '<i class="fas fa-edit"></i>'
  Botones += '</button>'
  Botones += '<button type="button" class="btn btn-outline-danger" style="display: inline-block;" data-toggle="modal" onclick="identificaEliminar(' + id + ');" data-target="#modal-eliminar-cliente">'
  Botones += '<i class="fas fa-trash"></i>'
  Botones += '</button>'
  Botones += '</div>'
  return Botones;
}

function identificaActualizar(id) {
  idSeleccionadoParaActualizar = id;
  $.ajax({
    method: "GET",
    url: window.location.origin + "/api/clientes/" + idSeleccionadoParaActualizar,
    data: {},
    success: function(result) {
      if (result.estado == 1) {
        let cliente = result.cliente;
        document.getElementById('NombreClienteModi').value = cliente.nombre;
        document.getElementById('telefonoClienteModi').value = cliente.telefono;
        document.getElementById('direccionClienteModi').value = cliente.direccion;
      } else {
        alert(result.mensaje);
      }
    }
  });
}

function identificaEliminar(id) {
  idSeleccionadoParaEliminar = id;
}

function actualizarCliente() {
  let nombrecliente = document.getElementById('NombreClienteModi').value;
  let telefonocliente = document.getElementById('telefonoClienteModi').value;
  let direccioncliente = document.getElementById('direccionClienteModi').value;

  $.ajax({
    method: "PUT",
    url: window.location.origin + "/api/clientes/" + idSeleccionadoParaActualizar,
    data: {
      nombre: nombrecliente,
      telefono: telefonocliente,
      direccion: direccioncliente
    },
    success: function(result) {
      if (result.estado == 1) {
        let tabla = $('#tabla-clientes').DataTable();
        let rengloTemporal = tabla.row('#renglon_' + idSeleccionadoParaActualizar).data();
        rengloTemporal[1] = nombrecliente;
        rengloTemporal[2] = telefonocliente;
        rengloTemporal[3] = direccioncliente;
        tabla.row('#renglon_' + idSeleccionadoParaActualizar).data(rengloTemporal).draw();
        alert(result.mensaje);
      } else {
        alert(result.mensaje);
      }
    }
  });
}


getClientes();
