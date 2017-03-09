
var oAjax = null;

localStorage['tipos']="null";

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

    // ********** TRABAJADOR ******************************************************************************************

    $('#activarFormuTrabajador').click(function(){

      //ocultarFormularios();

        // SE VERIFICA SI EL FORMU ESTABA ANTES
        if( $('#divFormTrabajador').size() == 0 ){

            $('#dialogoTrabajador').load("formularios/formularioTrabajador/trabajador.html", function() {
                    $.getScript("formularios/formularioTrabajador/trabajador.js");
            });
        } else {
            //SE ABRE SI ESTA CERRADO
            $('#divFormTrabajador').dialog("open");
        }

        cargarTiposTrabajadores();

    });


    //LOCALSTORAGE

    function cargarTiposTrabajadores(){
        var oArrayTipos = null;

        // Existe en almacenamiento local
        if(localStorage["tipos"] != "null"){
            console.log(oArrayTipos);
            oArrayTipos = JSON.parse(localStorage["tipos"]);

            rellenaCombo(oArrayTipos);

        } else {

            $.get('formularios/formularioTrabajador/cargarTiposTrabajador.php',null,tratarCargarTipos,'json');
        }
    }

    function tratarCargarTipos(oArrayTipos, sStatus, oXHR){

        rellenaCombo(oArrayTipos);

        // Guardar en localStorage
        localStorage["tipos"] = JSON.stringify(oArrayTipos);
    }

    function rellenaCombo(oArrayTipos){
        $("#tipoTrabajador").empty();

        $(oArrayTipos).each(function(){
            $('<option>').val(this.id).text(this.tipo).appendTo("#tipoTrabajador");
        });

    }




    // *************** PROYECTOS ***************************************************************************

    $('#activarFormuProyectos').click(function(){

       // ocultarFormularios();
        // SE VERIFICA SI EL FORMU ESTABA ANTES
        if( $('#divFormProyecto').size() == 0 ){

            $('#dialogoProyecto').load("formularios/formularioProyecto/proyecto.html", function()
                {
                    $.get('formularios/formularioProyecto/cargarClientes.php',null,tratarCargarClientes,'json');
                    $.getScript("formularios/formularioProyecto/proyecto.js");

                    $( "#buscar" ).on( "click", buscarProyecto);

                            var dateFormat = "dd/mm/yy",
                                from = $( "#fechaIniProyecto" )
                                    .datepicker({
                                        dateFormat: 'dd/mm/yy',
                                        defaultDate: "+1w",
                                        changeMonth: true,
                                        changeYear: true,
                                        minDate: ('-6D -2M -2Y')
                                    })
                                    .on( "change", function() {
                                        to.datepicker( "option", "minDate", getDate( this ) );
                                    }),
                                to = $( "#fechaFinProyecto" ).datepicker({
                                        dateFormat: 'dd/mm/yy',
                                        defaultDate: "+1w",
                                        changeMonth: true,
                                        changeYear: true
                                    })
                                    .on( "change", function() {
                                        from.datepicker( "option", "maxDate", getDate( this ) );
                                    });

                            function getDate( element ) {
                                var date;
                                try {
                                    date = $.datepicker.parseDate( dateFormat, element.value );
                                } catch( error ) {
                                    date = null;
                                }

                                return date;
                            }

                        }
                    
                
            );
        } else {
            //SE ABRE SI ESTA CERRADO
            $('#divFormProyecto').dialog("open");
        }

    });

    function buscarProyecto() 
    {

        var nombreProyect=$("#nombreProyecto").val().trim();
if(nombreProyect=="")
{
    $("#nombreProyecto").addClass("error");
    toastr.error("¡Para buscar rellene el campo!");
}else {
    $("#nombreProyecto").removeClass("error");
    $.post("formularios/formularioProyecto/buscarProyecto.php", {datos: nombreProyect}, function (arrayInfoProyecto) {

        if(arrayInfoProyecto.length==0)
        {
         toastr.error("¡No existe ningun Proyecto con ese nombre!");
            $("#nombreProyecto").addClass("error");
        }
        else {
            $("#nombreProyecto").removeClass("error");
            $("#idProyectoMod").val(arrayInfoProyecto[0]);
            $('#clienteProyecto> option:selected').removeAttr("selected");
            $('#clienteProyecto> option[value="'+ arrayInfoProyecto[2] +'"]').attr('selected', 'selected').effect( "pulsate",null, 500);
            $("#precioProyecto").val(arrayInfoProyecto[3]).effect( "pulsate",null, 500);
            $("#fechaIniProyecto").val(arrayInfoProyecto[4]).effect( "pulsate",null, 500);
            $("#fechaFinProyecto").val(arrayInfoProyecto[5]).effect( "pulsate",null, 500);
        }
    }, "json");
}
}










    function tratarCargarClientes(oArrayTareas,sStatus,oXHR){

        $("#clienteProyecto").empty();

        jQuery.each(oArrayTareas,function(i,elemento){

            $('<option value="'+elemento.dniCliente+'">' + elemento.nombreCliente + ' '+elemento.apellidoCliente+' </option>').appendTo("#clienteProyecto");

        });



    }
    function tratarCargarAnalistas(oArrayAnalistas,sStatus,oXHR){

        $("#analistasProyecto").empty();

        jQuery.each(oArrayAnalistas,function(i,elemento){

            $('<option value="'+elemento.dniTrabajador+'">' + elemento.nombreTrabajador + ' </option>').appendTo("#analistasProyecto");

        });

    }

    // *************** TAREAS ***************************************************************************

    $('#activarFormuTareas').click(function(){

        // ocultarFormularios();
        // SE VERIFICA SI EL FORMU ESTABA ANTES
        if( $('#divFormTarea').size() == 0 ){

            $('#dialogoTarea').load("formularios/formularioTarea/tarea.html", function()
                {


                    $.get('formularios/formularioTarea/cargarComboTrabajador.php',null,cargaComboTrabajadores,'json');
                    $.get('formularios/formularioTarea/cargarComboTareas.php',null,cargarComboTareas,'json');
                    $.get('formularios/formularioTarea/cargarComboProyectos.php',null,cargarComboProyectos,'json');

                    $.getScript("formularios/formularioTarea/tarea.js");
                    var dateFormat = "dd/mm/yy",
                        from = $( "#fechaIni" )
                            .datepicker({
                                dateFormat: 'dd/mm/yy',
                                defaultDate: "+1w",
                                changeMonth: true,
                                changeYear: true,
                                minDate: ('-6D -2M -2Y')
                            })
                            .on( "change", function() {
                                to.datepicker( "option", "minDate", getDate( this ) );
                            }),
                        to = $( "#fechaFin" ).datepicker({
                                dateFormat: 'dd/mm/yy',
                                defaultDate: "+1w",
                                changeMonth: true,
                                changeYear: true
                            })
                            .on( "change", function() {
                                from.datepicker( "option", "maxDate", getDate( this ) );
                            });

                    function getDate( element ) {
                        var date;
                        try {
                            date = $.datepicker.parseDate( dateFormat, element.value );
                        } catch( error ) {
                            date = null;
                        }

                        return date;
                    }

                }
            );
        } else {
            //SE ABRE SI ESTA CERRADO
            $('#divFormTarea').dialog("open");
        }

    });


    function cargaComboTrabajadores(oArrayTrabajadores,sStatus,oXHR) {

        $("#idTrabajadores").empty();

        jQuery.each(oArrayTrabajadores, function (i, elemento) {

            $('<option value="' + elemento.dniTrabajador + '">' + elemento.nombreTrabajador +
                ' ' + elemento.apellidoTrabajador + ' </option>').appendTo("#idTrabajadores");

        });
    }

        function cargarComboTareas(oArrayTareas,sStatus,oXHR) {

            $("#tiposTareas").empty();

            jQuery.each(oArrayTareas, function (i, elemento) {

                $('<option value="' + elemento.idTarea + '">' + elemento.nombreTarea
                    + ' </option>').appendTo("#tiposTareas");

            });
        }

    function cargarComboProyectos(oArrayProyectos,sStatus,oXHR) {

        $("#idProyectoSelect").empty();

        jQuery.each(oArrayProyectos, function (i, elemento) {

            $('<option value="' + elemento.idProyecto + '">' + elemento.nombreProyecto
                + ' </option>').appendTo("#idProyectoSelect");

        });
    }


}
function ocultarFormularios() {
    $('#divFormCliente').hide();
    $('#divFormTrabajador').hide();
    $('#divFormProyecto').hide();
    $('#divFormTarea').hide();
}




//******************************************************************************************************************
// EXPRESIONES REGULARES Y FUNCIONES *******************************************************************************
//******************************************************************************************************************


var oExRegTelefono = /^([9|6]{1})[0-9]{8}/;  // Telefonos
var oExRegNombre = /^[a-záéíóúñA-ZÑÁÉÍÓÚ]{3}([a-záéíóúñA-ZÑÁÉÍÓÚ\s]){0,30}$/; //Nombres (nombre mas corto permitido 3 caracteres
var oExRegApellido = /^[a-záéíóúñA-ZÁÉÍÓÚ]{4}([a-záéíóúñA-ZÑÁÉÍÓÚ\s]){0,30}/; //Apellidos
var oExRegDireccion = /^([a-záéíóúñA-ZÑÁÉÍÓÚ]{1})([a-záéíóúñA-ZÑÁÉÍÓÚ\s\d\.\,\º\ª\-\/]{0,39})$/; //Direccion
var oExRegDni = /^[0-9]{8}[A-Z]{1}$/;
//var oExRegFechas = /^([0][1-9]|[12][0-9]|3[01])(\/|-)([0][1-9]|[1][0-2])\2(\d{4})$/;  //Fechas: 01-01-2017
var oExRegPrecio = /^([0-9]{1,10}[\,\.][0-9]{1,2})$/;  //Precio con dos decimales obligatorios.
var oExRegAsunto = /^[a-záéíóúñA-ZÑÁÉÍÓÚ\s]{1,60}$/;  // Asunto

var oExRegFechas = /^(?:(?:0?[1-9]|1\d|2[0-8])(\/|-)(?:0?[1-9]|1[0-2]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:31(\/|-)(?:0?[13578]|1[02]))|(?:(?:29|30)(\/|-)(?:0?[1,3-9]|1[0-2])))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(29(\/|-)0?2)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/;
// validacion de fechas con años bisiestos incluidos del formato dd/mm/yy
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


//PETICION AJAX PARA LOCALSTORAGE


function pedirAjax(url){
    // Creamos un objeto XHR.
    oAjax = objetoXHR();
    oAjax.open("GET",url, true);
    oAjax.addEventListener("readystatechange",procesarRespuesta,false);
    oAjax.send(null);
}


function procesarRespuesta(){

    if (this.readyState == 4 && this.status == 200) {
        listado(JSON.parse(oAjax.responseText));
    }
}


function objetoXHR() {
    if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        var versionesIE = new Array('Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0', 'Msxml2.XMLHTTP.3.0', 'Msxml2.XMLHTTP', 'Microsoft.XMLHTTP');
        for (var i = 0; i < versionesIE.length; i++) {
            try {
                return new ActiveXObject(versionesIE[i]);
            } catch (errorControlado) {} //Capturamos el error,
        }
    }
    throw new Error("No se pudo crear el objeto XMLHttpRequest");
}



