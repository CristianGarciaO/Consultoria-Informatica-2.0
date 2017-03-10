// Creacion del dialogo

$("#divFormTarea").dialog({
    title:"Tarea",
    autoOpen: true,  // Es el valor por defecto
    // beforeClose: antesDeCerrarse,
    close: function () {
        $("#formuTarea")[0].reset();
    },
    width: 935,
    minwitdh: 700,
    maxwidth: 700,
    fluid: true,
    closeOnEscape: false, // No se cierra con ESCAPE
    hide: {
        effect: "scale",
        duration: 1000
    },
    show: "pulsate",
    modal: true,
    buttons: [{
        id:"guardarTarea",
        text: "Guardar",
        click: procesarGuardaTarea
    },{
        id:"modificarTarea",
        text: "Modificar",
        click: procesarModificarTarea
    }, {
        text: "Cancelar",
        click: function() {
            $(this).dialog("close");
        }
    }]
});

function procesarGuardaTarea() {

    if(validaFormTarea()){
        var sIdProyecto=$("#idProyectoSelect").val();
        var sIdTipoTarea = $("#tiposTareas").val();
        var sIdTrabajador=$("#idTrabajadores").val();
        var dFechaInicio=$("#fechaIniTarea").val();
        var dFechaFin=$("#fechaFinTarea").val();
        var sEstado=$("input:radio[name=radioEstado]:checked").val();

        var oTarea={
            idProyecto:sIdProyecto,
            idTipoTarea:sIdTipoTarea,
            idTrabajador:sIdTrabajador,
            fechaIniTarea:dFechaInicio,
            fechaFinTarea:dFechaFin,
            estado:sEstado
        };

        var jTarea=JSON.stringify(oTarea);

        $.ajax({ url : "formularios/formularioTarea/guardarTarea.php",
            data:{datos:jTarea},
            async: true, // Valor por defecto
            dataType :'json',
            method: "POST",
            cache: false, // ya por defecto es false para POST
            success: procesarRespuestaGuardarTarea,
            error :procesaErrorGuardarTarea
        });
    }
}

function procesarRespuestaGuardarTarea(oArrayRespuesta, sStatus, oXHR){
    $("#mensajes").dialog("open");

    if (oArrayRespuesta[0] == true){
        $("#mensajes").dialog("option","title","Error");
        $("#pMensajes").text(oArrayRespuesta[1]);
    } else {
        $('#divFormTarea').dialog("close");
        $("#mensajes").dialog("option","title","OK");
        $("#pMensajes").text(oArrayRespuesta[1]);
    }
}


function procesaErrorGuardarTarea(oArrayRespuesta, sStatus, sError){
    $("#mensajes").dialog("open");
    $("#mensajes").dialog("option","title",sStatus);
    $("#pMensajes").text(sError);
}
// **************************************************************************************
// VALIDACIONES *************************************************************************
// **************************************************************************************
function validaFormTarea() {


    var bValido = true;
    var sErrores = "";
    var datosCorrectos = false;
    //ID TAREA CON AUTOINCREMENTO
    // var codTarea = document.querySelector('#nTareaCodigo').value;


    //FECHA INICIO TAREA
    var fechaIniTarea = document.getElementById('fechaIniTarea').value.trim();
    document.getElementById('fechaIniTarea').value = fechaIniTarea;

    if (validaFechas(fechaIniTarea) == false) {


        if (bValido == true) {
            bValido = false;
            //Este campo obtiene el foco
            document.getElementById('formuTarea').fechaIniTarea.focus();
        }
        sErrores += "Fecha Inicial de la tarea incorrecta (formato: 01/01/2017)";

        //Marcar error
        document.getElementById('formuTarea').fechaIniTarea.className = "form-control input-md error";

    } else {
        //Desmarcar error
        document.getElementById('formuTarea').fechaIniTarea.className = "form-control input-md";  //Pone esta class a la etiqueta.
    }

    var fechaFinTarea = document.getElementById('fechaFinTarea').value.trim();
    document.getElementById('fechaFinTarea').value = fechaFinTarea;

    if (validaFechas(fechaFinTarea) == false) {
alert(bValido);
        if (bValido == true) {
            bValido = false;
            //Este campo obtiene el foco
            document.getElementById('formuTarea').fechaFinTarea.focus();
        }
        sErrores += "Fecha Final de la tarea incorrecta (formato: 2017-01-02)";

        //Marcar error
        document.getElementById('formuTarea').fechaFinTarea.className = "form-control input-md error";

    } else {
        //Desmarcar error
        document.getElementById('formuTarea').fechaFinTarea.className = "form-control input-md";  //Pone esta class a la etiqueta.
    }



    if (bValido == false) {
        //Mostrar errores
        toastr.error(sErrores);
    } else {
        datosCorrectos = true;
    }
    return datosCorrectos;
}

function procesarModificarTarea() {
    if(validaFormTarea())
    {
        var sIdProyecto=$("#idProyectoSelect").val();
        var sIdTipoTarea = $("#tiposTareas").val();
        var sIdTrabajador=$("#idTrabajadores").val();
        var dFechaInicio=$("#fechaIniTarea").val();
        var dFechaFin=$("#fechaFinTarea").val();
        var sEstado=$("input:radio[name=radioEstado]:checked").val();

        var oTarea={
            idProyecto:sIdProyecto,
            idTipoTarea:sIdTipoTarea,
            idTrabajador:sIdTrabajador,
            fechaIniTarea:dFechaInicio,
            fechaFinTarea:dFechaFin,
            estado:sEstado
        };

        var jTarea=JSON.stringify(oTarea);
        var update=JSON.stringify("update");
        $.ajax({ url : "formularios/formularioTarea/guardarTarea.php",
            data:{datos:jTarea,update:update},
            async: true, // Valor por defecto
            dataType :'json',
            method: "POST",
            cache: false, // ya por defecto es false para POST
            success: procesarRespuestaGuardarTarea,
            error :procesaErrorGuardarTarea
        });
        
    }
}


$("button#modificarTarea").hide();
$("button#guardarTarea").show();

