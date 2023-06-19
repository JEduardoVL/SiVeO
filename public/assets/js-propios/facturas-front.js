function crearFactura() {
  const fechafactura = document.getElementById('fechaFactAlta').value
  const iddecliente = document.getElementById('idFactAlta').value
  $.ajax({
    method: 'POST',
    url: window.location.origin + "/api/facturas",
    data: {
      fecha: fechafactura,
      cliente_id : iddecliente
    },
    success: function(result) {
      if (result.estado == 1) {
        let factura = result.factura;
        let tabla = $('#tabla-facturas').DataTable();
        let nuevoRenglon = tabla.row.add([factura.id,factura.fecha,factura.cliente_id]).node();
        $(nuevoRenglon).attr('id', 'renglon_' + factura.id)
        $(nuevoRenglon).find('td').addClass('table-td');
        tabla.draw(false);
      } else {
        alert(result.mensaje);
      }
    }
  });
}

function getFacturas() {
  $.ajax({
    method: "GET",
    url: window.location.origin + "/api/facturas",
    data: {},
    success: function(result) {
      if (result.estado == 1) {
        const facturas = result.facturas;
        let tabla = $('#tabla-facturas').DataTable();
        facturas.forEach(factura => {
          let nuevoRenglon = tabla.row.add([factura.id,factura.fecha,factura.cliente_id]).node();
          $(nuevoRenglon).attr('id', 'renglon_' + factura.id)
          $(nuevoRenglon).find('td').addClass('table-td');
          tabla.draw(false);
        });
      } else {
        alert(result.mensaje);
      }
    }
  });
}
getFacturas();
