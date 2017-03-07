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


// Abrir conexion con la BD
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);
mysql_select_db($basedatos, $conexion) or die(mysql_error());


$sql = "insert into proyecto (nombreProyecto,idCliente,precio,fechaIniProyecto,fechaFinProyecto) 
values ('".$oProyecto->nombre."".$oProyecto->cliente."".$oProyecto->precio."".$oProyecto->fechaIni."".$oProyecto->fechaFin."')";

$resultados = @mysql_query($sql, $conexion) or die(mysql_error());

//$mensaje='Alta de Proyecto realizada';
$mensaje=$sql;
$error = false;

$respuesta = array($error,$mensaje);

echo json_encode($respuesta);

mysql_close($conexion);

?>