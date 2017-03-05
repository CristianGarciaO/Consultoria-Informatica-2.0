<?php

$nombre = $_GET['nombreTrabajador'];
$dni = $_GET['dniTrabajador'];
$apellido = $_GET['apellidoTrabajador'];
$direccion = $_GET['direccionTrabajador'];
$tlf = $_GET['telefonoTrabajador'];
$tipo = $_GET['tipoTrabajador'];


// Create connection
$conn = new mysqli("localhost", "root", "", "consultoriabd");
// Check connection
if ($conn->connect_error) {
    die("Conexion fallida: " . $conn->connect_error);
}
$conn->set_charset("utf8");

$sql = "SELECT * FROM trabajador WHERE dniTrabajador = '".$dni. "';";

$res = $conn->query($sql);

if ($res->num_rows == 0) {
    //No existe el cliente, añadirlo

    $sqlInserta = "INSERT INTO trabajador (nombreTrabajador, dniTrabajador, apellidoTrabajador, direccionTrabajador, telefonoTrabajador,tipoTrabajador ) ";
    $sqlInserta .= "VALUES ( '". $nombre ."', '". $dni ."' , '". $apellido ."' , '".$direccion."',".$tlf.",'".$tipo."');";

    $resIns = $conn->query($sqlInserta);

    $resultado =  "Alta de trabajador correcta";
    $error = FALSE;
} else {
    //Existe el trabajador, mostrar el error

    $resultado = "Error: El trabajador ya existe en nuestra base de datos";
    $error = TRUE;
}

// Creo un "objeto" php creando un array asociativo
$objeto_salida = array ( "mensaje" => "Alta de Trabajador" , "resultado" => $resultado, "accion" => 100, "error" => $error );

$json_salida = json_encode($objeto_salida);

echo $json_salida;

$conn->close();