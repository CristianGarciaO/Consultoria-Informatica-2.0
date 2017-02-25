
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

            $('').load("formularios/formularioCliente/cliente.html", function()
                {
                    $.getScript("formularios/formularioCliente/cliente.js")
                }
                );
        } else {
            //SE ABRE SI ESTA CERRADO
            $('#formuCliente').dialog("open");
        }

    });





}

