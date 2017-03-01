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
        effect: "fold",
        duration: 1000
    },
    show: "slide",
    modal: true,
    buttons: [{
        text: "Guardar",
        click: procesarGuardarTrabajador
    },{
        text: "Modificar",
        click: procesarGuardarTrabajador
    }, {
        text: "Cancelar",
        click: function() {
            $(this).dialog("close");
        }
    }]
});

function procesarGuardarTrabajador()
{




}