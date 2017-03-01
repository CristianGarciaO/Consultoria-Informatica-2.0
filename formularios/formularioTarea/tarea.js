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