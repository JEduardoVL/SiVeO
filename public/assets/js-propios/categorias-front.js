let idSeleccionadoParaEliminar=0;
let idSeleccionadoParaActualizar=0;

function crearCategoria() {
  const idcategoria = document.getElementById('idCategoriaAlta').value;
  const descripcionCategoria = document.getElementById('descripcionCateAlta').value;

  $.ajax({
    method: 'POST', // Método
    url: window.location.origin + "/api/categorias",
    data: { // Body
      id: idcategoria,
      descripcion: descripcionCategoria
    },
    success: function(result) {
      if (result.estado == 1) {
        let categoria = result.categoria;
        // Debemos agregar la categoría a la tabla
        let tabla = $('#tabla-categorias').DataTable();
        let Botones = generarBotones(categoria.id);
        let nuevoRenglon = tabla.row.add([categoria.id, categoria.descripcion, Botones]).node();
        // Agregar el ID del renglón
        $(nuevoRenglon).attr('id', 'renglon_' + categoria.id);
        $(nuevoRenglon).find('td').addClass('table-td');
        tabla.draw(false);

        // Mostrar un mensaje agradable al usuario
        // alert(result.mensaje);
      } else {
        alert(result.mensaje);
      }
    }
  });
}

function getCategorias(){
    $.ajax({
        method:"GET",// metodo
        url: window.location.origin+"/api/categorias", //params (pero este no usara)
        data: {  }, //Body
        success: function( result ) {
         if(result.estado==1){
            const categorias = result.categorias 
            let tabla = $('#tabla-categorias').DataTable();
            categorias.forEach(categoria => {
              let Botones = generarBotones(categoria.id);
              let nuevoRenglon = tabla.row.add([categoria.id, categoria.descripcion, Botones]).node()
              //-----------linea Agregada para el ID del renglon-----------
              $(nuevoRenglon).attr('id','renglon_'+categoria.id)
              //------------------------------------------------------------
              //$(nuevoRenglon).find('td').addClass('table-td');
              tabla.draw( false );
            });
         }else{
            alert(result.mensaje)
         }
        }
      });
}

function borrarCategoria(){
  $.ajax({
    method:"DELETE",
    url: window.location.origin+"/api/categorias/"+idSeleccionadoParaEliminar,
    data: {},
    success: function( result ) {
     if(result.estado==1){
      //Debemos eliminar el renglon de la Data table
      let tabla =$('#tabla-categorias').DataTable();
      tabla.row('#renglon_'+idSeleccionadoParaEliminar).remove().draw()
     }else{
      alert(result.mensaje)
     }
    }
  });
}


function generarBotones(id){
    let Botones= '<div style="display: flex; justify-content: center;">'
    Botones+='<button type="button" class="btn  btn-outline-primary" style="display: inline-block;" data-toggle="modal" onclick="identificaActualizar('+id+');" data-target="#modal-modificar">'
    Botones+= '<i class="fas fa-edit"></i>'
    Botones+= '</button>'
    Botones+= '<button type="button" class="btn btn-outline-danger" style="display: inline-block;" data-toggle="modal" onclick="identificaEliminar('+id+');" data-target="#modal-eliminar">'
    Botones+=  '<i class="fas fa-trash"></i>'
    Botones+='</button>'
    Botones+= '</div>'
    return Botones;
};

function identificaActualizar(id){
  idSeleccionadoParaActualizar=id;
  //debemos de obtener los datos de la base de datos y mostrar en la ventana
  $.ajax({
    method:"GET",
    url: window.location.origin+"/api/categorias/"+idSeleccionadoParaActualizar,
    data: {  },
    success: function( result ) {
      if(result.estado==1){
        let categoria = result.categoria;
        //Mostramos en la ventana 
        document.getElementById('idCategoriaModificar').value=categoria.id;
        document.getElementById('descripcionCategoriaActualizar').value=categoria.descripcion;
      }else{
        alert(result.mensaje)
      }
    }
  });
}

function identificaEliminar(id){
  idSeleccionadoParaEliminar=id;


}

function actualizarCategoria() {
  let idcategoria = document.getElementById('idCategoriaModificar').value;
  let descripcionCategoria = document.getElementById('descripcionCategoriaActualizar').value;

  $.ajax({
    method: "PUT",
    url: window.location.origin + "/api/categorias/" + idSeleccionadoParaActualizar, // Parámetros
    data: { // Cuerpo
      id: idcategoria,
      descripcion: descripcionCategoria
    },
    success: function(result) {
      if (result.estado == 1) {
        // Debemos actualizar la tabla
        let tabla = $('#tabla-categorias').DataTable();
        let rengloTemporal = tabla.row('#renglon_' + idSeleccionadoParaActualizar).data();
        rengloTemporal[0] = idcategoria;
        rengloTemporal[1] = descripcionCategoria;
        tabla.row('#renglon_' + idSeleccionadoParaActualizar).data(rengloTemporal).draw();
        alert(result.mensaje);
      } else {
        alert(result.mensaje);
      }
    }
  });
}

getCategorias();
