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


$sql = "INSERT INTO tarea (idProyecto,idTipoTarea, idTrabajador,fechaIniTarea,fechaFinTarea,estadoTarea) 
values (".$oTarea->idProyecto.",".$oTarea->idTipoTarea.",".$oTarea->idTrabajador.",".$oTarea->dFechaInicio.","
    .$oTarea->dFechaFin.",'".$oTarea->estado."')";

$resIns = $conn->query($sql);

if($resIns->affected_rows() >0){
    $resultado =  "Tarea guardada correctamente";
    $error = FALSE;
}else{
    $resultado =  "Problema al guardar Tarea";
    $error = true;
}


$respuesta = array($error,$resultado);

echo json_encode($respuesta);

$conn->close();

?>