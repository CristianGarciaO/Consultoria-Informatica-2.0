// Creacion del dialogo


var oAjax = null;


// creacion de dialogo de mensajes
oDlgMensaje = $( "#mensajes" ).dialog({
    autoOpen: false,
    height: 240,
    width: 350,
    modal: true // modal
});


oDlgGestionTrabajador = $("#divFormTrabajador").dialog({
    title:"Trabajador",
    autoOpen: true,  // Es el valor por defecto
    // beforeClose: antesDeCerrarse,
    close: function () {
        $("#formuTrabajador")[0].reset();
    },
    width: 935,
    minwitdh: 700,
    maxwidth: 700,
    fluid: true,
    closeOnEscape: false, // No se cierra con ESCAPE
    hide: {
        effect: "fold",
        duration: 1000
    },
    show: "slide",
    modal: true,
    buttons: [{
        text: "Guardar",
        click: gestionGuardardado
    },{
        text: "Modificar",
        click: gestionModificar
    }, {
        text: "Cancelar",
        click: function() {
            $(this).dialog("close");
        }
    }]
});


function gestionGuardardado() {

    //Validar el formulario del dialogo

    var parametrosTrabajador = validaFormNuevoTrabajador();

    if(parametrosTrabajador != ""){
        var sURL = "formularios/formularioTrabajador/trabajadorGuardar.php?"+parametrosTrabajador;
        peticionAjax(sURL);
    }
}

function gestionModificar() {

    //Validar el formulario del dialogo

    var parametrosTrabajador = validaFormNuevoTrabajador();

    if(parametrosTrabajador != ""){
        var sURL = "formularios/formularioTrabajador/trabajadorModificar.php?"+parametrosTrabajador;
        peticionAjax(sURL);
    }
}



function inicializa_xhr() {
    if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
}

function peticionAjax(sURL){

    console.log(sURL);

    // PRIMERO: configuracion de la peticion
    oAjax = inicializa_xhr();

    oAjax.open("GET",encodeURI(sURL),true);

    oAjax.addEventListener("readystatechange",procesarRespuesta,false);

    // SEGUNDO : hacer la peticion
    oAjax.send(null);
}



function procesarRespuesta(){

    // TERCERO: procesar respuesta cuando llega
    if (oAjax.readyState == 4 && oAjax.status == 200){

        // JSON.parse cadena --> objeto
        // JSON.stringify objeto --> cadena
        var oObjeto = JSON.parse(oAjax.responseText);

        console.log(oObjeto);
        console.log(oObjeto.resultado);

        switch(oObjeto.accion){
            case 100: // altaCliente
                oDlgMensaje.dialog("option","title", oObjeto.mensaje);
                $("#pResultado").text(oObjeto.resultado);

                oDlgMensaje.dialog("open");

                if (oObjeto.error == false){
                    oDlgGestionTrabajador.dialog("close");
                }

                break;
            case 200: // modificaCliente
                oDlgMensaje.dialog("option","title", oObjeto.mensaje);
                $("#pResultado").text(oObjeto.resultado);

                oDlgMensaje.dialog("open");

                if (oObjeto.error == false){
                    oDlgGestionTrabajador.dialog("close");
                }
                break;
        }
    }
}

// **************************************************************************************
// VALIDACIONES *************************************************************************
// **************************************************************************************


// NUEVO TRABAJADOR ******************************************************
// ***********************************************************************


function validaFormNuevoTrabajador() {

    var bValido = true;
    var sErrores = "";
    var parametrosTrabajador="";
    var nombre = document.getElementById('nombreTrabajador').value.trim();
    document.getElementById('nombreTrabajador').value = nombre;

    if (validaNombre(nombre) == false) {

        if (bValido == true) {
            bValido = false;
            //Este campo obtiene el foco
            document.getElementById('formuTrabajador').nombreTrabajador.focus();
        }
        sErrores += "NOMBRE del Trabajador incorrecto (formato: Máx 30 caracteres)";

        //Marcar error
        document.getElementById('formuTrabajador').nombreTrabajador.className = "form-control input-md error";

    } else {
        //Desmarcar error
        document.getElementById('formuTrabajador').nombreTrabajador.className = "form-control input-md";  //Pone esta class a la etiqueta.
    }


    var apellido = document.getElementById('apellidoTrabajador').value.trim();
    document.getElementById('apellidoTrabajador').value = apellido;


    if (validaApellido(apellido) == false) {

        if (bValido == true) {
            bValido = false;
            //Este campo obtiene el foco
            document.getElementById('formuTrabajador').apellidoTrabajador.focus();
        }
        sErrores += "<br><br> APELLIDO del Trabajador incorrecto (formato: Máx 30 caracteres)";

        //Marcar error
        document.getElementById('formuTrabajador').apellidoTrabajador.className = "form-control input-md error";

    } else {
        //Desmarcar error
        document.getElementById('formuTrabajador').apellidoTrabajador.className = "form-control input-md";  //Pone esta class a la etiqueta.
    }

    var dni = document.getElementById('dniTrabajador').value.trim();
    document.getElementById('dniTrabajador').value = dni;

    if (validaDni(dni) == false) {

        if (bValido == true) {
            bValido = false;
            //Este campo obtiene el foco
            document.getElementById('formuTrabajador').dniTrabajador.focus();
        }
        sErrores += "<br><br> DNI del Trabajador incorrecto (formato: 8 digitos más letra mayuscula)";

        //Marcar error
        document.getElementById('formuTrabajador').dniTrabajador.className = "form-control input-md error";

    } else {
        //Desmarcar error
        document.getElementById('formuTrabajador').dniTrabajador.className = "form-control input-md";  //Pone esta class a la etiqueta.
    }

    var tlf = document.getElementById('telefonoTrabajador').value.trim();
    document.getElementById('telefonoTrabajador').value = tlf;

    if (validaTelefono(tlf) == false) {

        if (bValido == true) {
            bValido = false;
            //Este campo obtiene el foco
            document.getElementById('formuTrabajador').telefonoTrabajador.focus();
        }
        sErrores += "<br><br> TELEFONO del Cliente incorrecto (formato: 9 digitos comenzando en 6 o 9)";

        //Marcar error
        document.getElementById('formuTrabajador').telefonoTrabajador.className = "form-control input-md error";

    } else {
        //Desmarcar error
        document.getElementById('formuTrabajador').telefonoTrabajador.className = "form-control input-md";  //Pone esta class a la etiqueta.
    }

    var direccion = document.getElementById('direccionTrabajador').value.trim();
    document.getElementById('direccionTrabajador').value = direccion;

    if (validaDireccion(direccion) == false) {

        if (bValido == true) {
            bValido = false;
            //Este campo obtiene el foco
            document.getElementById('formuTrabajador').direccionTrabajador.focus();
        }
        sErrores += "<br><br> DIRECCION del Trabajador incorrecto (formato: 40 caracteres maximo)";

        //Marcar error
        document.getElementById('formuTrabajador').direccionTrabajador.className = "form-control input-md error";

    } else {
        //Desmarcar error
        document.getElementById('formuTrabajador').direccionTrabajador.className = "form-control input-md";  //Pone esta class a la etiqueta.
    }

    var tipo = document.getElementById('tipoTrabajador').value;



    if (bValido == false) {
        //Mostrar errores
        toastr.error(sErrores);

    } else {

        // var sMensaje = "";
        //
        // if (!oConsultoria.existeCliente(dni)) {
        //     var contratos = [];  //Array de contratos que pueda tener este cliente
        //     var oCliente = new Cliente(nombre, dni, apellido, direccion, tlf, contratos);
        //     sMensaje = oConsultoria.anadeCliente(oCliente);
        //     toastr.success(sMensaje);
        //     nuevoCliente();
        // } else {
        //     sMensaje = "Imposible añadir. El Cliente que intenta añadir al sistema ya estaba registrado";
        //     toastr.error(sMensaje);
        // }


        //
        // var oTrabajador = {
        //     nombreTrabajador: nombre,
        //     dniTrabajador : dni,
        //     apellidoTrabajador: apellido,
        //     direccionTrabajador: direccion,
        //     telefonoTrabajador: parseInt(tlf),
        //     tipoTrabajador: tipo
        // };

         parametrosTrabajador = "nombreTrabajador="+nombre+"&dniTrabajador="+dni+"&apellidoTrabajador="+apellido+
                                   "&direccionTrabajador="+direccion+"&telefonoTrabajador="+parseInt(tlf)+
                                   "&tipoTrabajador="+tipo;



    }
    return parametrosTrabajador;
}
