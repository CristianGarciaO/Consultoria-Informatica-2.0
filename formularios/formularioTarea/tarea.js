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
        text: "Guardar",
        click: procesarTarea
    },{
        text: "Modificar",
        click: procesarTarea
    }, {
        text: "Cancelar",
        click: function() {
            $(this).dialog("close");
        }
    }]
});

function procesarTarea() {

}

function validaFormCrearTarea() {


    var bValido = true;
    var sErrores = "";
    var codTarea = document.querySelector('#nTareaCodigo').value;

    if (codTarea == "") {

        if (bValido == true) {
            bValido = false;
            //Este campo obtiene el foco
            document.getElementById('formuNuevaTarea').nTareaCodigo.focus();
        }
        sErrores += "<br><br>¡ Genere un código de forma aleatoria !";

        //Marcar error
        document.getElementById('formuNuevaTarea').fechaIni.className = "form-control input-md error";


    }
    else {
        //Desmarcar error
        document.getElementById('formuNuevaTarea').fechaIni.className = "form-control input-md";  //Pone esta class a la etiqueta.

    }


    var nombre = document.getElementById('nombreTarea').value.trim();
    document.getElementById('nombreTarea').value = nombre;

    if (validaNombre(nombre) == false) {

        if (bValido == true) {
            bValido = false;
            //Este campo obtiene el foco
            document.getElementById('formuNuevaTarea').nombreTarea.focus();
        }
        sErrores += "NOMBRE de la Tarea incorrecta (formato: Máx 30 caracteres)";

        //Marcar error
        document.getElementById('formuNuevaTarea').nombreTarea.className = "form-control input-md error";

    } else {
        //Desmarcar error
        document.getElementById('formuNuevaTarea').nombreTarea.className = "form-control input-md";  //Pone esta class a la etiqueta.
    }

    if (document.querySelector('#nombreProyectoSelect').selectedIndex == 0) {
        if (bValido == true) {
            bValido = false;
            //Este campo obtiene el foco
            document.querySelector('#nombreProyectoSelect').focus();
        }
        sErrores += "<br><br> Proyecto no seleccionado. Debe seleccionar uno)";

        //Marcar error
        document.querySelector('#nombreProyectoSelect').className = "form-control input-large error";

    } else {
        //Desmarcar error
        document.querySelector('#nombreProyectoSelect').className = "form-control input-large";  //Pone esta class a la etiqueta.
        var nombreProyecto = document.getElementById('nombreProyectoSelect').value;
        var proyecto = oConsultoria.dameProyecto(nombreProyecto);

    }



    var fechaInicio = document.getElementById('fechaIni').value.trim();
    document.getElementById('fechaIni').value = fechaInicio;


    if (validaFechas(fechaInicio) == false) {

        if (bValido == true) {
            bValido = false;
            //Este campo obtiene el foco
            document.getElementById('formuNuevaTarea').fechaIni.focus();
        }
        sErrores += "<br><br> FECHA INICIO de la Tarea incorrecto (formato: 2015-05-01)";

        //Marcar error
        document.getElementById('formuNuevaTarea').fechaIni.className = "form-control input-md error";

    } else {
        //Desmarcar error
        document.getElementById('formuNuevaTarea').fechaIni.className = "form-control input-md";  //Pone esta class a la etiqueta.
    }

    var fechaFin = document.getElementById('fechaFin').value.trim();
    document.getElementById('fechaFin').value = fechaFin;

    if (validaFechas(fechaFin) == false) {

        if (bValido == true) {
            bValido = false;
            //Este campo obtiene el foco
            document.getElementById('formuNuevaTarea').fechaFin.focus();
        }
        sErrores += "<br><br> FECHA FIN de la Tarea incorrecto (formato: 2015-05-01)";

        //Marcar error
        document.getElementById('formuNuevaTarea').fechaFin.className = "form-control input-md error";

    } else {
        //Desmarcar error
        document.getElementById('formuNuevaTarea').fechaFin.className = "form-control input-md";  //Pone esta class a la etiqueta.
    }





    if (bValido == false) {
        //Mostrar errores
        toastr.error(sErrores);
    } else {
        //Aqui estan los datos correctos, los guardamos
        //Recoger datos del formulario


        //Comprobar que fecha fin es posterior a fecha inicio
        var fI = new Date(fechaInicio);
        var fF = new Date(fechaFin);

        if (fI < fF)
        {

            //Desmarcar error
            document.getElementById('formuNuevaTarea').fechaFin.className = "form-control input-md";  //Pone esta class a la etiqueta.

            var sMensaje = "¡ Tarea Añadida con éxito !";


            var estado=document.getElementsByName("radioEstado");
            // Recorremos todos los valores del radio button para encontrar el
            // seleccionado
            for(var i=0;i<estado.length;i++)
            {
                if(estado[i].checked)
                    var resultadoestado=estado[i].value;
            }




            var oTarea = new Tarea(codTarea, nombre, fechaInicio,proyecto.nombreProyecto, fechaFin,resultadoestado);

            oConsultoria.anadeTarea(oTarea);
            toastr.success(sMensaje);
            nuevaTarea();
        }
        else
        {
            toastr.error("Error, la fecha fin es anterior a la fecha inicio introducida.");
            //Marcar error
            document.getElementById('formuNuevaTarea').fechaFin.className = "form-control input-md error";
        }
    }
    
}


