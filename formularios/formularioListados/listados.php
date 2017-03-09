<?php

//Recoge las variables seteadas como filtro por el usuario
header("Content-Type: text/xml");

$tabla=$_REQUEST['tabla'];

// Abrir conexion con la BD
$conexion = mysqli_connect("localhost", "root", "", "consultoriabd");
mysqli_query($conexion, "SET NAMES 'utf8'");

if($tabla == "programadores"){
    $sql = "select * from trabajador where tipoTrabajador = 2;";
}elseif ($tabla == "analistas"){
    $sql = "select * from trabajador where tipoTrabajador = 1;";
}elseif ($tabla == "administradores"){
    $sql = "select * from trabajador where tipoTrabajador = 3;";
}else{
    $sql = "select * from ". $tabla.";";
}

$resultados = mysqli_query($conexion, $sql);


$respuesta='<?xml version="1.0" encoding="UTF-8"?><listados>';

if($tabla == "proyecto"){

    while($fila=mysqli_fetch_assoc($resultados)){
        $respuesta.="<proyecto>";
        $respuesta.="<idProyecto>".$fila['idProyecto']."</idProyecto>";
        $respuesta.="<nombreProyecto>".$fila['nombreProyecto']."</nombreProyecto>";
        $respuesta.="<idCliente>".$fila['idCliente']."</idCliente>";
        $respuesta.="<precio>".$fila['precio']."</precio>";
        $respuesta.="<fechaIniProyecto>".$fila['fechaIniProyecto']."</fechaIniProyecto>";
        $respuesta.="<fechaFinProyecto>".$fila['fechaFinProyecto']."</fechaFinProyecto>";
        $respuesta.="</proyecto>";
    }

}

if($tabla == "cliente"){

    while($fila=mysqli_fetch_assoc($resultados)){
        $respuesta.="<cliente>";
        $respuesta.="<nombreCliente>".$fila['nombreCliente']."</nombreCliente>";
        $respuesta.="<apellidoCliente>".$fila['apellidoCliente']."</apellidoCliente>";
        $respuesta.="<dniCliente>".$fila['dniCliente']."</dniCliente>";
        $respuesta.="<telefonoCliente>".$fila['telefonoCliente']."</telefonoCliente>";
        $respuesta.="<direccionCliente>".$fila['direccionCliente']."</direccionCliente>";
        $respuesta.="</cliente>";
    }

}

if($tabla == "trabajador" || $tabla == "programadores" || $tabla == "analistas" ||$tabla == "administradores"){

    while($fila=mysqli_fetch_assoc($resultados)){
        $respuesta.="<trabajador>";
        $respuesta.="<nombreTrabajador>".$fila['nombreTrabajador']."</nombreTrabajador>";
        $respuesta.="<dniTrabajador>".$fila['dniTrabajador']."</dniTrabajador>";
        $respuesta.="<apellidoTrabajador>".$fila['apellidoTrabajador']."</apellidoTrabajador>";
        $respuesta.="<direccionTrabajador>".$fila['direccionTrabajador']."</direccionTrabajador>";
        $respuesta.="<telefonoTrabajador>".$fila['telefonoTrabajador']."</telefonoTrabajador>";
        $respuesta.="<tipoTrabajador>";
        if($fila['tipoTrabajador'] == 1){
            $respuesta.= "Analista</tipoTrabajador>";
        }elseif ($fila['tipoTrabajador'] == 2){
            $respuesta.= "Programador</tipoTrabajador>";
        }else{
            $respuesta.= "Administrador</tipoTrabajador>";
        }
        $respuesta.="</trabajador>";
    }
}

if($tabla == "tarea"){

    while($fila=mysqli_fetch_assoc($resultados)){
        $respuesta.="<tarea>";
        $respuesta.="<idTarea>".$fila['idTarea']."</idTarea>";
        $respuesta.="<idProyecto>".$fila['idProyecto']."</idProyecto>";
        $respuesta.="<idTipoTarea>";
        if($fila['idTipoTarea'] == 1){
            $respuesta.= "Análisis</idTipoTarea>";
        }elseif ($fila['idTipoTarea'] == 2){
            $respuesta.= "Codificación</idTipoTarea>";
        }elseif($fila['idTipoTarea'] == 3){
            $respuesta.= "Depuración</idTipoTarea>";
        }else{
            $respuesta.= "Testeo</idTipoTarea>";
        }
        $respuesta.="<idTrabajador>".$fila['idTrabajador']."</idTrabajador>";
        $respuesta.="<fechaIniTarea>".$fila['fechaIniTarea']."</fechaIniTarea>";
        $respuesta.="<fechaFinTarea>".$fila['fechaFinTarea']."</fechaFinTarea>";
        $respuesta.="<estadoTarea>".$fila['estadoTarea']."</estadoTarea>";
        $respuesta.="</tarea>";
    }

}

$respuesta.="</listados>";


echo $respuesta;

mysqli_close($conexion);

?>