<?php
// Va a devolver una respuesta JSON que no se debe cachear
header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

$servidor  = "localhost";
$basedatos = "consultoriabd";
$usuario   = "root";
$password  = "";

$datos=$_REQUEST['datos'];

$oProyecto = json_decode($datos);
$conexion=mysqli_connect($servidor,$usuario,$password,$basedatos) or die("Conexion fallida: ".mysqli_connect_error());
$conexion->set_charset("utf8");


$ini=date_create($oProyecto->fechaIni);
$fin=date_create($oProyecto->fechaFin);
$fechaIni = DATE_FORMAT($ini, "%Y/%m/%d");;
$fechaFin = DATE_FORMAT($fin, "%Y/%m/%d");;



$sql = "INSERT INTO proyecto (nombreProyecto,idCliente,precio,fechaIniProyecto,fechaFinProyecto) 
values ('".$oProyecto->nombre."','".$oProyecto->cliente."',".$oProyecto->precio.",".$fechaIni.",".$fechaFin.")";

$resultados=$conexion->query($sql);

$mensaje='Alta de Proyecto realizada';
$error = false;
$respuesta = array($error,$mensaje);

echo json_encode($respuesta);

$conexion->close();

?>