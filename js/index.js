
// Manejo al inicio
//window.addEventListener('load',iniciar,false);
$(document).ready(iniciar);
function iniciar(){

    $("#mensajes").dialog(
        {
            autoOpen:false,
            modal:true
        });

    $('#activarFormuCliente').click(function(){

        // SE VERIFICA SI EL FORMU ESTABA ANTES
        if( $('#divFormCliente').size() == 0 ){

            $('#formularios').load("formularios/formularioCliente/cliente.html", function()
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

      //  $("form:not('#formuTrabajador')").hide("normal");

        // SE VERIFICA SI EL FORMU ESTABA ANTES
        if( $('#divFormTrabajador').size() == 0 ){

            $('#formularios2').load("formularios/formularioTrabajador/trabajador.html", function()
                {
                    $.getScript("formularios/formularioTrabajador/trabajador.js")
                }
            );
        } else {
            //SE ABRE SI ESTA CERRADO
            $('#divFormTrabajador').dialog("open");
        }

    });





}

