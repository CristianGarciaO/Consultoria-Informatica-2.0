// Creacion del dialogo

$("#divFormMenuListados").dialog({
    title:"Listados",
    autoOpen: true,  // Es el valor por defecto
    // beforeClose: antesDeCerrarse,
    close: function () {
        $("#formuMenuListados")[0].reset();
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
        text: "Listar",
        click: procesoListado
    }, {
        text: "Salir",
        click: function() {
            $(this).dialog("close");
        }
    }]
});

//Selector de precios

$( function() {
    $( "#slider" ).slider({
        value:6000,
        min: 0,
        max: 150000,
        step: 50,
        slide: function( event, ui ) {
            $( "#amount" ).val( ui.value );
        }
    });
    $( "#amount" ).val( "$" + $( "#slider" ).slider( "value" ) );
} );


var oAjaxListado = null;

function procesoListado(){

    var seleccion= $('[name=formuMenuListados]').serialize();

    var sParametroGET = seleccion;

    var sURL = encodeURI("formularios/formularioListados/listados.php?");

    llamadaAjaxListado(sURL,sParametroGET);

}

function llamadaAjaxListado(sURL,sParametroGET){

    oAjaxListado = objetoXHR();
    console.log(sURL+sParametroGET);
    oAjaxListado.open("GET",sURL+sParametroGET,true);

    oAjaxListado.onreadystatechange = respuestaListado;

    oAjaxListado.send(null);
}

function respuestaListado(){

    if(oAjaxListado.readyState == 4 && oAjaxListado.status ==200)	{

        var oXML = oAjaxListado.responseXML;
        console.log(oXML);
        procesaXML(oXML);
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


function procesaXML(oXML){

    //borrar tabla si habia
    $("#listado").remove();

    if(oXML.getElementsByTagName('no').length > 0){
        toastr.error("No hay proyectos por un precio mas bajo al seleccionado");
    }

    var jqTabla = $('<table id="listado" border="1" class="table">');

    if(oXML.getElementsByTagName("proyecto").length > 0){
        var oRespuestaXML = oXML.getElementsByTagName("proyecto");
        $('<tr><th>ID Proyecto</th><th>Nombre</th><th>ID Cliente</th><th>Importe</th><th>Fecha Inicio</th><th>Fecha Fin</th></tr>').appendTo(jqTabla);

        for(var i=0;i<oRespuestaXML.length;i++){
            $('<tr>' +
                '<td>'+oRespuestaXML[i].getElementsByTagName('idProyecto')[0].textContent+'</td>' +
                '<td>'+oRespuestaXML[i].getElementsByTagName('nombreProyecto')[0].textContent+'</td>' +
                '<td>'+oRespuestaXML[i].getElementsByTagName('idCliente')[0].textContent+'</td>' +
                '<td>'+oRespuestaXML[i].getElementsByTagName('precio')[0].textContent+'</td>' +
                '<td>'+oRespuestaXML[i].getElementsByTagName('fechaIniProyecto')[0].textContent+'</td>' +
                '<td>'+oRespuestaXML[i].getElementsByTagName('fechaFinProyecto')[0].textContent+'</td>' +
                '</tr>').appendTo(jqTabla);
        }
    }

    if(oXML.getElementsByTagName("cliente").length > 0){
        var oRespuestaXML = oXML.getElementsByTagName("cliente");
        $('<tr><th>Nombre</th><th>Apellido</th><th>DNI</th><th>Telefono</th><th>Direccion</th></tr>').appendTo(jqTabla);

        for(var i=0;i<oRespuestaXML.length;i++){
            $('<tr>' +
                '<td>'+oRespuestaXML[i].getElementsByTagName('nombreCliente')[0].textContent+'</td>' +
                '<td>'+oRespuestaXML[i].getElementsByTagName('apellidoCliente')[0].textContent+'</td>' +
                '<td>'+oRespuestaXML[i].getElementsByTagName('dniCliente')[0].textContent+'</td>' +
                '<td>'+oRespuestaXML[i].getElementsByTagName('telefonoCliente')[0].textContent+'</td>' +
                '<td>'+oRespuestaXML[i].getElementsByTagName('direccionCliente')[0].textContent+'</td>' +
                '</tr>').appendTo(jqTabla);
        }
    }

    if(oXML.getElementsByTagName("trabajador").length > 0){
        var oRespuestaXML = oXML.getElementsByTagName("trabajador");
        $('<tr><th>Nombre</th><th>DNI</th><th>Apellido</th><th>Direccion</th><th>Telefono</th><th>Tipo</th></tr>').appendTo(jqTabla);

        for(var i=0;i<oRespuestaXML.length;i++){
            $('<tr>' +
                '<td>'+oRespuestaXML[i].getElementsByTagName('nombreTrabajador')[0].textContent+'</td>' +
                '<td>'+oRespuestaXML[i].getElementsByTagName('dniTrabajador')[0].textContent+'</td>' +
                '<td>'+oRespuestaXML[i].getElementsByTagName('apellidoTrabajador')[0].textContent+'</td>' +
                '<td>'+oRespuestaXML[i].getElementsByTagName('direccionTrabajador')[0].textContent+'</td>' +
                '<td>'+oRespuestaXML[i].getElementsByTagName('telefonoTrabajador')[0].textContent+'</td>' +
                '<td>'+oRespuestaXML[i].getElementsByTagName('tipoTrabajador')[0].textContent+'</td>' +
                '</tr>').appendTo(jqTabla);
        }
    }

    if(oXML.getElementsByTagName("tarea").length > 0){
        var oRespuestaXML = oXML.getElementsByTagName("tarea");
        $('<tr><th>ID Tarea</th><th>ID Proyecto</th><th>Tipo Tarea</th><th>ID Trabajador</th><th>Fecha Inicio</th><th>Fecha Fin</th><th>Estado</th></tr>').appendTo(jqTabla);

        for(var i=0;i<oRespuestaXML.length;i++){
            $('<tr>' +
                '<td>'+oRespuestaXML[i].getElementsByTagName('idTarea')[0].textContent+'</td>' +
                '<td>'+oRespuestaXML[i].getElementsByTagName('idProyecto')[0].textContent+'</td>' +
                '<td>'+oRespuestaXML[i].getElementsByTagName('idTipoTarea')[0].textContent+'</td>' +
                '<td>'+oRespuestaXML[i].getElementsByTagName('idTrabajador')[0].textContent+'</td>' +
                '<td>'+oRespuestaXML[i].getElementsByTagName('fechaIniTarea')[0].textContent+'</td>' +
                '<td>'+oRespuestaXML[i].getElementsByTagName('fechaFinTarea')[0].textContent+'</td>' +
                '<td>'+oRespuestaXML[i].getElementsByTagName('estadoTarea')[0].textContent+'</td>' +
                '</tr>').appendTo(jqTabla);
        }
    }


    jqTabla.appendTo("#divFormMenuListados");

}