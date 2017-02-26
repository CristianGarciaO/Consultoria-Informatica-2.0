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

    $('#activarFormuTrabajador').click(function(){

      //ocultarFormularios();

        // SE VERIFICA SI EL FORMU ESTABA ANTES
        if( $('#divFormTrabajador').size() == 0 ){

            $('#dialogoTrabajador').load("formularios/formularioTrabajador/trabajador.html", function()
                {
                    $.getScript("formularios/formularioTrabajador/trabajador.js")
                }
            );
        } else {
            //SE ABRE SI ESTA CERRADO
            $('#divFormTrabajador').dialog("open");
        }

    });
    $('#activarFormuProyectos').click(function(){

       // ocultarFormularios();
        // SE VERIFICA SI EL FORMU ESTABA ANTES
        if( $('#divFormProyecto').size() == 0 ){

            $('#dialogoProyecto').load("formularios/formularioProyecto/proyecto.html", function()
                {
                    $.getScript("formularios/formularioProyecto/proyecto.js")
                }
            );
        } else {
            //SE ABRE SI ESTA CERRADO
            $('#divFormProyecto').dialog("open");
        }

    });
    $('#activarFormuTareas').click(function(){

        // ocultarFormularios();
        // SE VERIFICA SI EL FORMU ESTABA ANTES
        if( $('#divFormTarea').size() == 0 ){

            $('#dialogoTarea').load("formularios/formularioTarea/tarea.html", function()
                {
                    $.getScript("formularios/formularioTarea/tarea.js")
                }
            );
        } else {
            //SE ABRE SI ESTA CERRADO
            $('#divFormProyecto').dialog("open");
        }

    });





}
function ocultarFormularios() {
    $('#divFormCliente').hide();
    $('#divFormTrabajador').hide();
    $('#divFormProyecto').hide();
}

