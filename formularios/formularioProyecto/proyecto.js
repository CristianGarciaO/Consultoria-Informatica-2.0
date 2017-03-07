// Creacion del dialogo

$("#divFormProyecto").dialog({
    title:"Proyecto",
    autoOpen: true,  // Es el valor por defecto
    // beforeClose: antesDeCerrarse,
    close: function () {
        $("#formuProyecto")[0].reset();
    },
    width: 935,
    minwitdh: 700,
    maxwidth: 700,
    fluid: true,
    closeOnEscape: false, // No se cierra con ESCAPE
    hide: {
        effect: "puff",
        duration: 1000
    },
    show: "bounce",
    modal: true,
    buttons: [{
        text: "Guardar Proyecto",
        click: procesarProyecto
    },{
        text: "Modificar Proyecto",
        click: procesarProyecto
    }, {
        text: "Cancelar",
        click: function() {
            $(this).dialog("close");
        }
    }]
});

function procesarProyecto() {
    if(validarAltaProyecto()){
         var sNombre=$("#nombreProyecto").val().trim();
         var sCliente = $("#clienteProyecto").val();
         var dPrecio=$("#precioProyecto").val().trim();
         var dFechaIni=$("#fechaIniProyecto").val();
         var dFechaFin=$("#fechaFinProyecto").val();

         var oProyecto={
         nombre:sNombre,
         cliente:sCliente,
         precio:dPrecio,
         fechaIni:dFechaIni,
         fechaFin:dFechaFin
         };

         var jProyecto=JSON.stringify(oProyecto);

         $.ajax({ url : "formularios/formularioProyecto/altaProyecto.php",
         data:{datos:jProyecto},
         async: true, // Valor por defecto
         dataType :'html',
         method: "POST",
         cache: false, // ya por defecto es false para POST
         success: tratarRespuestaAltaProyecto,
         error :tratarErrorAltaProyecto
         });
    }
}
function tratarRespuestaAltaProyecto(oArrayRespuesta, sStatus, oXHR){
    $("#mensajes").dialog("open");

    if (oArrayRespuesta[0] == true){
        $("#mensajes").dialog("option","title","Error");
        $("#pMensajes").text(oArrayRespuesta[1]);
    } else {
        $('#divFormProyecto').dialog("close");
        $("#mensajes").dialog("option","title","OK");
        $("#pMensajes").text(oArrayRespuesta[1]);
    }

}

function tratarErrorAltaProyecto(oArrayRespuesta, sStatus, sError){
    $("#mensajes").dialog("open");
    $("#mensajes").dialog("option","title",sStatus);
    $("#pMensajes").text(sError);
   // $("#pMensajes").text(oArrayRespuesta[1]);

}

function validarAltaProyecto() {

    var bValido = true;
    var sErrores = "";
    var devolver=false;

    var idFormulario = "formuProyecto";
    var idNombre = "nombreProyecto";
    var idPrecio = "precioProyecto";
    var idFechaIni = "fechaIniProyecto";
    var idFechaFin = "fechaFinProyecto";


    var nombre = document.getElementById(idNombre).value.trim();
    document.getElementById(idNombre).value = nombre;

    if (validaNombre(nombre) == false) {

        if (bValido == true) {
            bValido = false;
            //Este campo obtiene el foco
            document.getElementById(idFormulario).nombreProyecto.focus();
        }
        sErrores += "NOMBRE del Proyecto incorrecto (formato: Máx 30 caracteres)";

        //Marcar error
        document.getElementById(idFormulario).nombreProyecto.className = "form-control input-md error";

    } else {
        //Desmarcar error
        document.getElementById(idFormulario).nombreProyecto.className = "form-control input-md";  //Pone esta class a la etiqueta.
    }
    
    var precio = document.getElementById(idPrecio).value.trim();
    document.getElementById(idPrecio).value = precio;
    
    if (validaPrecio(precio) == false) {

        if (bValido == true) {
            bValido = false;
            //Este campo obtiene el foco
            document.getElementById(idFormulario).precioProyecto.focus();
        }
        sErrores += "NOMBRE del Proyecto incorrecto (formato: Máx 30 caracteres)";

        //Marcar error
        document.getElementById(idFormulario).precioProyecto.className = "form-control input-md error";

    } else {
        //Desmarcar error
        document.getElementById(idFormulario).precioProyecto.className = "form-control input-md";  //Pone esta class a la etiqueta.
    }

    var fechaIniP = document.getElementById(idFechaIni).value.trim();
    document.getElementById(idFechaIni).value = fechaIniP;

    if (validaFechas(fechaIniP) == false) {

        if (bValido == true) {
            bValido = false;
            //Este campo obtiene el foco
            document.getElementById(idFormulario).fechaIniProyecto.focus();
        }
        sErrores += "Fecha Inicial del Proyecto incorrecta (formato: 01/01/2017)";

        //Marcar error
        document.getElementById(idFormulario).fechaIniProyecto.className = "form-control input-md error";

    } else {
        //Desmarcar error
        document.getElementById(idFormulario).fechaIniProyecto.className = "form-control input-md";  //Pone esta class a la etiqueta.
    }

    var fechaFinP = document.getElementById(idFechaFin).value.trim();
    document.getElementById(idFechaFin).value = fechaFinP;

    if (validaFechas(fechaFinP) == false) {

        if (bValido == true) {
            bValido = false;
            //Este campo obtiene el foco
            document.getElementById(idFormulario).fechaFinProyecto.focus();
        }
        sErrores += "Fecha Final del Proyecto incorrecta (formato: 01/01/2017)";

        //Marcar error
        document.getElementById(idFormulario).fechaFinProyecto.className = "form-control input-md error";

    } else {
        //Desmarcar error
        document.getElementById(idFormulario).fechaFinProyecto.className = "form-control input-md";  //Pone esta class a la etiqueta.
    }
    if (bValido == false) {
        toastr.error(sErrores);
    } else {
        //Aqui estan los datos correctos, lo guardamos
        devolver=true;
    }
    return devolver;
}
