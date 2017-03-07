
var oAjax = null;


// creacion de dialogo de mensajes
oDlgMensaje = $( "#mensajes" ).dialog({
    autoOpen: false,
    height: 240,
    width: 350,
    modal: true // modal
});

// Creacion del dialogo
oDlgGestionCliente = $("#divFormCliente").dialog({
    title:"Cliente",
    autoOpen: true,  // Es el valor por defecto
    // beforeClose: antesDeCerrarse,
    close: function () {
        $("#formuCliente")[0].reset();
    },
    width: 935,
    minwitdh: 700,
    maxwidth: 700,
    fluid: true,
    closeOnEscape: false, // No se cierra con ESCAPE
    hide: {
        effect: "explode",
        duration: 1000
    },
    show: "fold",
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

    var oNuevoCliente = validaFormNuevoCliente();

    if(oNuevoCliente != undefined){
        var sURL = "formularios/formularioCliente/clienteGuardar.php";
        var sParametros = "datos=" + JSON.stringify(oNuevoCliente);

        console.log(sParametros);
        peticionAjax(sURL,sParametros);
    }
}


function gestionModificar(){

    //Validar el formulario del dialogo

    var oModificaCliente = validaFormNuevoCliente();

    if(oModificaCliente != undefined){
        var sURL = "formularios/formularioCliente/clienteModificar.php";
        var sParametros = "datos=" + JSON.stringify(oModificaCliente);


        peticionAjax(sURL,sParametros);
    }

}


function inicializa_xhr() {
    if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
}

function peticionAjax(sURL,sParametros){

    console.log(sParametros);
    console.log(sURL);

    // PRIMERO: configuracion de la peticion
    oAjax = inicializa_xhr();

    oAjax.open("POST",sURL,true);

    oAjax.addEventListener("readystatechange",procesarRespuesta,false);

    oAjax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // SEGUNDO : hacer la peticion
    oAjax.send(sParametros);

}

function procesarRespuesta(){

    // TERCERO: procesar respuesta cuando llega
    if (oAjax.readyState == 4 && oAjax.status == 200){

        // JSON.parse cadena --> objeto
        // JSON.stringify objeto --> cadena
        var oObjeto = JSON.parse(oAjax.responseText);

        switch(oObjeto.accion){
            case 100: // altaCliente
                oDlgMensaje.dialog("option","title", oObjeto.mensaje);
                $("#pResultado").text(oObjeto.resultado);

                oDlgMensaje.dialog("open");

                if (oObjeto.error == false){
                    oDlgGestionCliente.dialog("close");
                }

                break;
            case 200: // modificaCliente
                oDlgMensaje.dialog("option","title", oObjeto.mensaje);
                $("#pResultado").text(oObjeto.resultado);

                oDlgMensaje.dialog("open");

                if (oObjeto.error == false){
                    oDlgGestionCliente.dialog("close");
                }
                break;
        }
    }
}


// **************************************************************************************
// VALIDACIONES *************************************************************************
// **************************************************************************************


// NUEVO CLIENTE ******************************************************
// ********************************************************************


function validaFormNuevoCliente() {

    var bValido = true;
    var sErrores = "";

    var nombre = document.getElementById('nombreCliente').value.trim();
    document.getElementById('nombreCliente').value = nombre;

    if (validaNombre(nombre) == false) {

        if (bValido == true) {
            bValido = false;
            //Este campo obtiene el foco
            document.getElementById('formuCliente').nombreCliente.focus();
        }
        sErrores += "NOMBRE del Cliente incorrecto (formato: Máx 30 caracteres)";

        //Marcar error
        document.getElementById('formuCliente').nombreCliente.className = "form-control input-md error";

    } else {
        //Desmarcar error
        document.getElementById('formuCliente').nombreCliente.className = "form-control input-md";  //Pone esta class a la etiqueta.
    }


    var apellido = document.getElementById('apellidoCliente').value.trim();
    document.getElementById('apellidoCliente').value = apellido;


    if (validaApellido(apellido) == false) {

        if (bValido == true) {
            bValido = false;
            //Este campo obtiene el foco
            document.getElementById('formuCliente').apellidoCliente.focus();
        }
        sErrores += "<br><br> APELLIDO del Cliente incorrecto (formato: Máx 30 caracteres)";

        //Marcar error
        document.getElementById('formuCliente').apellidoCliente.className = "form-control input-md error";

    } else {
        //Desmarcar error
        document.getElementById('formuCliente').apellidoCliente.className = "form-control input-md";  //Pone esta class a la etiqueta.
    }

    var dni = document.getElementById('dniCliente').value.trim();
    document.getElementById('dniCliente').value = dni;

    if (validaDni(dni) == false) {

        if (bValido == true) {
            bValido = false;
            //Este campo obtiene el foco
            document.getElementById('formuCliente').dniCliente.focus();
        }
        sErrores += "<br><br> DNI del Cliente incorrecto (formato: 8 digitos más letra mayuscula)";

        //Marcar error
        document.getElementById('formuCliente').dniCliente.className = "form-control input-md error";

    } else {
        //Desmarcar error
        document.getElementById('formuCliente').dniCliente.className = "form-control input-md";  //Pone esta class a la etiqueta.
    }

    var tlf = document.getElementById('telefonoCliente').value.trim();
    document.getElementById('telefonoCliente').value = tlf;

    if (validaTelefono(tlf) == false) {

        if (bValido == true) {
            bValido = false;
            //Este campo obtiene el foco
            document.getElementById('formuCliente').telefonoCliente.focus();
        }
        sErrores += "<br><br> TELEFONO del Cliente incorrecto (formato: 9 digitos comenzando en 6 o 9)";

        //Marcar error
        document.getElementById('formuCliente').telefonoCliente.className = "form-control input-md error";

    } else {
        //Desmarcar error
        document.getElementById('formuCliente').telefonoCliente.className = "form-control input-md";  //Pone esta class a la etiqueta.
    }

    var direccion = document.getElementById('direccionCliente').value.trim();
    document.getElementById('direccionCliente').value = direccion;

    if (validaDireccion(direccion) == false) {

        if (bValido == true) {
            bValido = false;
            //Este campo obtiene el foco
            document.getElementById('formuCliente').direccionCliente.focus();
        }
        sErrores += "<br><br> DIRECCION del Cliente incorrecto (formato: 40 caracteres maximo)";

        //Marcar error
        document.getElementById('formuCliente').direccionCliente.className = "form-control input-md error";

    } else {
        //Desmarcar error
        document.getElementById('formuCliente').direccionCliente.className = "form-control input-md";  //Pone esta class a la etiqueta.
    }


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



        var oCliente = {
            nombreCliente: nombre,
            apellidoCliente: apellido,
            dniCliente : dni,
            telefonoCliente: parseInt(tlf),
            direccionCliente: direccion
        };


        return oCliente;

    }
}
