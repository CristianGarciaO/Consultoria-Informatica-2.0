// Creacion del dialogo

$("#divFormCliente").dialog({
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
        click: procesarRespuesta
    },{
        text: "Modificar",
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