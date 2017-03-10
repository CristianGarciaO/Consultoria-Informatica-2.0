<?php
/**
 * Created by PhpStorm.
 * User: Alex
 * Date: 08/03/2017
 * Time: 21:06
 */


$datos=$_REQUEST['datos'];

$oTarea = json_decode($datos);


// Abrir conexion con la BD
$conn = new mysqli("localhost", "root", "", "consultoriabd");
// Check connection
if ($conn->connect_error) {
    die("Conexion fallida: " . $conn->connect_error);
}
$conn->set_charset("utf8");


if(isset($_REQUEST["update"]))
{

    $sqlBusqueda="SELECT idTarea FROM tarea WHERE tarea.idProyecto=".$oTarea->idProyecto." AND tarea.idTipoTarea=".$oTarea->idTipoTarea."";
    $idP=$conn->query($sqlBusqueda);
    $idTarea= $idP->fetch_assoc();


    $sql = "UPDATE tarea SET idTrabajador='".$oTarea->idTrabajador."', fechaIniTarea='".$oTarea->fechaIniTarea."', fechaFinTarea='".$oTarea->fechaFinTarea."', estadoTarea='".$oTarea->estado."' WHERE idTarea=".$idTarea["idTarea"];
    $mensaje='¡Modificación de la Tarea realizada!';
    $conn->query($sql);
}
else{

$sql = "INSERT INTO tarea (idProyecto,idTipoTarea, idTrabajador,fechaIniTarea,fechaFinTarea,estadoTarea) 
values (".$oTarea->idProyecto.",".$oTarea->idTipoTarea.",'".$oTarea->idTrabajador."','".$oTarea->fechaIniTarea."','"
    .$oTarea->fechaFinTarea."','".$oTarea->estado."')";


    $conn->query($sql);

    if($conn->affected_rows >0){
        $mensaje =  "Tarea guardada correctamente";
        $error = false;
    }else{
        $mensaje =  "Problema al guardar Tarea";
        $error = true;
    }
}


$error = false;
$respuesta = array($error,$mensaje);

echo json_encode($respuesta);

$conn->close();

?>