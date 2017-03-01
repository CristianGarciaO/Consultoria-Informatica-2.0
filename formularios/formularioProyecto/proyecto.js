// Creacion del dialogo

$("#divFormProyecto").dialog({
    title:"Proyecto",
    autoOpen: true,  // Es el valor por defecto
    // beforeClose: antesDeCerrarse,
    close: function () {
        $("#formuProyecto")[0].reset();
    },
    width: 935,
    minwitdh: 700,
    maxwidth: 700,
    fluid: true,
    closeOnEscape: false, // No se cierra con ESCAPE
    hide: {
        effect: "puff",
        duration: 1000
    },
    show: "bounce",
    modal: true,
    buttons: [{
        text: "Guardar Proyecto",
        click: procesarProyecto
    },{
        text: "Modificar Proyecto",
        click: procesarProyecto
    }, {
        text: "Cancelar",
        click: function() {
            $(this).dialog("close");
        }
    }]
});

function procesarProyecto() {

}