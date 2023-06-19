function crearVenta() {
    const cantidadVenta = document.getElementById('cantidadVentaAlta').value
    const facturaVenta = document.getElementById('facturaVentaAlta').value
    const productoVenta = document.getElementById('productoVentaAlta').value
    $.ajax({
      method: 'POST',
      url: window.location.origin + "/api/ventas",
      data: {
        cantidad:cantidadVenta,
        factura_id:facturaVenta,
        producto_id:productoVenta
      },
      success: function(result) {
        if (result.estado == 1) {
          let venta = result.venta;
          let tabla = $('#tabla-ventas').DataTable();
          let nuevoRenglon = tabla.row.add([venta.id, venta.cantidad,venta.factura_id,venta.producto_id]).node();
          $(nuevoRenglon).attr('id', 'renglon_' + venta.id)
          $(nuevoRenglon).find('td').addClass('table-td');
          tabla.draw(false);
        } else {
          alert(result.mensaje);
        }
      }
    });
  }
  
  function getVentas() {
    $.ajax({
      method: "GET",
      url: window.location.origin + "/api/ventas",
      data: {},
      success: function(result) {
        if (result.estado == 1) {
          const ventas = result.ventas;
          let tabla = $('#tabla-ventas').DataTable();
          ventas.forEach(venta => {
            let nuevoRenglon = tabla.row.add([venta.id, venta.cantidad,venta.factura_id,venta.producto_id]).node();
            $(nuevoRenglon).attr('id', 'renglon_' + venta.id)
            $(nuevoRenglon).find('td').addClass('table-td');
            tabla.draw(false);
          });
        } else {
          alert(result.mensaje);
        }
      }
    });
  }
  getVentas();