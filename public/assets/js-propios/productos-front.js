let idSeleccionadoParaEliminar = 0;
let idSeleccionadoParaActualizar = 0;

function crearProducto() {
  const descripcionproducto = document.getElementById('DescripcionProductoAlta').value
  const proveedorid = document.getElementById('ProveedorIDProdAlta').value
  const categoriaid = document.getElementById('CategoriaIDProdAlta').value
  const preciopro = document.getElementById('PrecioProdAlta').value

  $.ajax({
    method: 'POST',
    url: window.location.origin + "/api/productos",
    data: {
      descripcion :descripcionproducto,
      proveedor_id:proveedorid,
      categoria_id: categoriaid,
      precio:preciopro
    },
    success: function(result) {
      if (result.estado == 1) {
        let producto = result.producto;
        let tabla = $('#tabla-productos').DataTable();
        let Botones = generarBotones(producto.id);
        let nuevoRenglon = tabla.row.add([producto.id,producto.descripcion,producto.proveedor_id,producto.categoria_id,producto.precio, Botones]).node();
        $(nuevoRenglon).attr('id', 'renglon_' + producto.id)
        $(nuevoRenglon).find('td').addClass('table-td');
        tabla.draw(false);
      } else {
        alert(result.mensaje);
      }
    }
  });
}

function getProductos() {
  $.ajax({
    method: "GET",
    url: window.location.origin + "/api/productos",
    data: {},
    success: function(result) {
      if (result.estado == 1) {
        const productos = result.productos;
        let tabla = $('#tabla-productos').DataTable();
        productos.forEach(producto => {
          let Botones = generarBotones(producto.id);
          let nuevoRenglon = tabla.row.add([producto.id,producto.descripcion,producto.proveedor_id,producto.categoria_id,producto.precio, Botones]).node();
          $(nuevoRenglon).attr('id', 'renglon_' + producto.id)
          $(nuevoRenglon).find('td').addClass('table-td');
          tabla.draw(false);
        });
      } else {
        alert(result.mensaje);
      }
    }
  });
}

function borrarProducto() {
  $.ajax({
    method: "DELETE",
    url: window.location.origin + "/api/productos/" + idSeleccionadoParaEliminar,
    data: {},
    success: function(result) {
      if (result.estado == 1) {
        $.ajax({
          method: "DELETE",
          url: window.location.origin + "/api/ventas/cliente/" + idSeleccionadoParaEliminar,
          data: {},
          success: function(resultVentas) {
            if (resultVentas.estado == 1) {
              let tabla = $('#tabla-productos').DataTable();
              tabla.row('#renglon_' + idSeleccionadoParaEliminar).remove().draw();
              alert(resultVentas.mensaje);
            } else {
              alert(resultVentas.mensaje);
            }
          }
        });
      } else {
        alert(result.mensaje);
      }
    }
  });
}


function generarBotones(id) {
  let Botones= '<div style="display: flex; justify-content: center;">'
  Botones +='<button type="button" class="btn  btn-outline-primary" style="display: inline-block;" data-toggle="modal" onclick="identificaActualizar(' + id + ');" data-target="#modal-modificar-producto">'
  Botones +='<i class="fas fa-edit"></i>'
  Botones +='</button>'
  Botones +='<button type="button" class="btn btn-outline-danger" style="display: inline-block;"  data-toggle="modal" onclick="identificaEliminar(' + id + ');" data-target="#modal-eliminar-producto">'
  Botones +='<i class="fas fa-trash"></i>'
  Botones +='</button>'
  Botones +='</div>'
  return Botones;
}

function identificaActualizar(id) {
  idSeleccionadoParaActualizar = id;
  $.ajax({
    method: "GET",
    url: window.location.origin + "/api/productos/" + idSeleccionadoParaActualizar,
    data: {},
    success: function(result) {
      if (result.estado == 1) {
        let producto = result.producto;
        document.getElementById('DescripcionProductoModi').value = producto.descripcion;
        document.getElementById('ProveedorIDProdModi').value = prodcuto.proveedor_id;
        document.getElementById('CategoriaIDProdModi').value = prodcuto.categoria_id;
        document.getElementById('PrecioProdModi').value = prodcuto.precio;
      } else {
        alert(result.mensaje);
      }
    }
  });
}

function identificaEliminar(id) {
  idSeleccionadoParaEliminar = id;
}

function actualizarProducto() {
  let descripcionproducto = document.getElementById('DescripcionProductoModi').value;
  let proveedorid = document.getElementById('ProveedorIDProdModi').value;
  let categoriaid = document.getElementById('CategoriaIDProdModi').value;
  let preciopro = document.getElementById('PrecioProdModi').value;

  $.ajax({
    method: "PUT",
    url: window.location.origin + "/api/productos/" + idSeleccionadoParaActualizar,
    data: {
      descripcion:descripcionproducto,
      proveedor_id:proveedorid,
      categoria_id:categoriaid,
      precio:preciopro
    },
    success: function(result) {
      if (result.estado == 1) {
        let tabla = $('#tabla-productos').DataTable();
        let rengloTemporal = tabla.row('#renglon_' + idSeleccionadoParaActualizar).data();
        rengloTemporal[1] = descripcionproducto;
        rengloTemporal[2] = proveedorid;
        rengloTemporal[3] = categoriaid;
        rengloTemporal[4] = preciopro;
        tabla.row('#renglon_' + idSeleccionadoParaActualizar).data(rengloTemporal).draw();
        alert(result.mensaje);
      } else {
        alert(result.mensaje);
      }
    }
  });
}


getProductos();
