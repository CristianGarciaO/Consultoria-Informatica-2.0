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

$fechaIni=$oProyecto->fechaIni;
$fechaFin=$oProyecto->fechaFin;


if(isset($_REQUEST["update"]))
{
    
    $sqlBusqueda="SELECT idProyecto FROM proyecto WHERE nombreProyecto='".$oProyecto->nombre."'"; 
    $idP=$conexion->query($sqlBusqueda);
    $idProyecto= $idP->fetch_assoc();
    
    
    $sql = "UPDATE proyecto SET idCliente='".$oProyecto->cliente."', precio=".$oProyecto->precio.", fechaIniProyecto='".$fechaIni."', fechaFinProyecto='".$fechaFin."' WHERE idProyecto=".$idProyecto["idProyecto"];
    $mensaje='¡Modificación del Proyecto "'.$oProyecto->nombre.'" realizada!';
}
else {

    $sql = "INSERT INTO proyecto (nombreProyecto,idCliente,precio,fechaIniProyecto,fechaFinProyecto) 
values ('" . $oProyecto->nombre . "','" . $oProyecto->cliente . "'," . $oProyecto->precio . ",'" . $fechaIni . "','" . $fechaFin . "')";
    $mensaje='¡Alta de Proyecto realizada!';
}

$resultados=$conexion->query($sql);


$error = false;
$respuesta = array($error,$mensaje);

echo json_encode($respuesta);

$conexion->close();

?>