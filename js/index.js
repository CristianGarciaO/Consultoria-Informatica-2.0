$(document).ready(iniciar);
function iniciar(){

    $("#mensajes").dialog(
        {
            autoOpen:false,
            modal:true
        });

    $('#activarFormuCliente').click(function(){

        //ocultarFormularios();
        // SE VERIFICA SI EL FORMU ESTABA ANTES
        if( $('#divFormCliente').size() == 0 ){

            $('#dialogoCliente').load("formularios/formularioCliente/cliente.html", function()
                {
                    $.getScript("formularios/formularioCliente/cliente.js")
                }
            );
        } else {
            //SE ABRE SI ESTA CERRADO
            $('#divFormCliente').dialog("open");
        }

    });

    $('#activarFormuTrabajador').click(function(){

      //ocultarFormularios();

        // SE VERIFICA SI EL FORMU ESTABA ANTES
        if( $('#divFormTrabajador').size() == 0 ){

            $('#dialogoTrabajador').load("formularios/formularioTrabajador/trabajador.html", function()
                {
                    $.getScript("formularios/formularioTrabajador/trabajador.js")
                }
            );
        } else {
            //SE ABRE SI ESTA CERRADO
            $('#divFormTrabajador').dialog("open");
        }

    });
    $('#activarFormuProyectos').click(function(){

       // ocultarFormularios();
        // SE VERIFICA SI EL FORMU ESTABA ANTES
        if( $('#divFormProyecto').size() == 0 ){

            $('#dialogoProyecto').load("formularios/formularioProyecto/proyecto.html", function()
                {
                    $.getScript("formularios/formularioProyecto/proyecto.js")
                }
            );
        } else {
            //SE ABRE SI ESTA CERRADO
            $('#divFormProyecto').dialog("open");
        }

    });
    $('#activarFormuTareas').click(function(){

        // ocultarFormularios();
        // SE VERIFICA SI EL FORMU ESTABA ANTES
        if( $('#divFormTarea').size() == 0 ){

            $('#dialogoTarea').load("formularios/formularioTarea/tarea.html", function()
                {
                    $.getScript("formularios/formularioTarea/tarea.js")
                }
            );
        } else {
            //SE ABRE SI ESTA CERRADO
            $('#divFormProyecto').dialog("open");
        }

    });





}
function ocultarFormularios() {
    $('#divFormCliente').hide();
    $('#divFormTrabajador').hide();
    $('#divFormProyecto').hide();
}




//******************************************************************************************************************
// EXPRESIONES REGULARES Y FUNCIONES *******************************************************************************
//******************************************************************************************************************


var oExRegTelefono = /^([9|6]{1})[0-9]{8}/;  // Telefonos
var oExRegNombre = /^[a-záéíóúñA-ZÑÁÉÍÓÚ]{3}([a-záéíóúñA-ZÑÁÉÍÓÚ\s]){0,30}$/; //Nombres (nombre mas corto permitido 3 caracteres
var oExRegApellido = /^[a-záéíóúñA-ZÁÉÍÓÚ]{4}([a-záéíóúñA-ZÑÁÉÍÓÚ\s]){0,30}/; //Apellidos
var oExRegDireccion = /^([a-záéíóúñA-ZÑÁÉÍÓÚ]{1})([a-záéíóúñA-ZÑÁÉÍÓÚ\s\d\.\,\º\ª\-\/]{0,39})$/; //Direccion
var oExRegDni = /^[0-9]{8}[A-Z]{1}$/;
var oExRegFechas = /^(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/;  //Fechas: 2013-12-14
var oExRegPrecio = /^([0-9]{1,10}[\,\.][0-9]{1,2})$/;  //Precio con dos decimales obligatorios.
var oExRegAsunto = /^[a-záéíóúñA-ZÑÁÉÍÓÚ\s]{1,60}$/;  // Asunto


function validaNombre(cadena) {
    var resultado = false;
    if (cadena != "") {
        resultado = oExRegNombre.test(cadena);
    }
    return resultado;
}

function validaTelefono(cadena) {
    var resultado = false;
    if (cadena != "") {
        resultado = oExRegTelefono.test(cadena);
    }
    return resultado;
}

function validaApellido(cadena) {
    var resultado = false;
    if (cadena != "") {
        resultado = oExRegApellido.test(cadena);
    }
    return resultado;
}

function validaDireccion(cadena) {
    var resultado = false;
    if (cadena != "") {
        resultado = oExRegDireccion.test(cadena);
    }
    return resultado;
}

function validaDni(cadena) {
    var resultado = false;
    if (cadena != "") {
        resultado = oExRegDni.test(cadena);
    }
    return resultado;
}

function validaFechas(cadena) {
    var resultado = false;
    if (cadena != "") {
        resultado = oExRegFechas.test(cadena);
    }
    return resultado;
}

function validaPrecio(cadena) {
    var resultado = false;
    if (cadena != "") {
        resultado = oExRegPrecio.test(cadena);
    }
    return resultado;
}

function validaAsunto(cadena) {
    var resultado = false;
    if (cadena != "") {
        resultado = oExRegAsunto.test(cadena);
    }
    return resultado;
}