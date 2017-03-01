<?php
$conexion=new mysqli("localhost","root","","consultoriabd") or die("Error");
$conexion->query('SET NAMES "utf8"');
$consulta=$conexion->query("select * from tipo_tarea");
while($fila=mysqli_fetch_assoc($consulta))
    $datos[]=$fila;
echo json_encode($datos);
$conexion->close();
?>

