//EVENTO PARA EL CLICK DEL FORMULARIO CLIENTE

/*$("").click(function () {
    
});*/

// Creacion del dialogo

$("#divFormCliente").dialog({
    autoOpen: true,  // Es el valor por defecto
    // beforeClose: antesDeCerrarse,
    close: function () {
        $("#divFormCliente")[0].reset();
    },
    width: 550,
    closeOnEscape: false, // No se cierra con ESCAPE
    hide: {
        effect: "explode",
        duration: 1000
    },
    show: "fold",
    modal: true,
    buttons: [{
        text: "Aceptar",
        click: procesarRespuesta
    }, {
        text: "Cancelar",
        click: function() {
            $(this).dialog("close");
        }
    }]
});

function procesarRespuesta() {

}