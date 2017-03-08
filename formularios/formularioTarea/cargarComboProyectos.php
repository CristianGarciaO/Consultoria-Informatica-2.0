<?php
/**
 * Created by PhpStorm.
 * User: Alex
 * Date: 08/03/2017
 * Time: 20:16
 */

$conexion=new mysqli("localhost","root","","consultoriabd") or die("Error");
$conexion->query('SET NAMES "utf8"');
$consulta=$conexion->query("select * from proyecto");
while($fila=mysqli_fetch_assoc($consulta))
    $datos[]=$fila;
echo json_encode($datos);
$conexion->close();
?>
