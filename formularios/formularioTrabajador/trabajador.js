// Creacion del dialogo

$("#divFormTrabajador").dialog({
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
        effect: "explode",
        duration: 1000
    },
    show: "fold",
    modal: true,
    buttons: [{
        text: "Guardar",
        click: procesarGuardar
    },{
        text: "Modificar",
        click: procesarModificar
    }, {
        text: "Cancelar",
        click: function() {
            $(this).dialog("close");
        }
    }]
});

function procesarGuardar()
{




}