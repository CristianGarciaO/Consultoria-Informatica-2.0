<?php

$oCliente = json_decode($_POST['datos']);


// Create connection
$conn = new mysqli("localhost", "root", "", "consultoriabd");
// Check connection
if ($conn->connect_error) {
    die("Conexion fallida: " . $conn->connect_error);
}


$sql = "SELECT * FROM cliente WHERE dniCliente = '". $oCliente->dniCliente. "';";

$res = $conn->query($sql);

if ($res->num_rows == 0) {
    //No existe el cliente, añadirlo

    $sqlInserta = "INSERT INTO cliente (nombreCliente, apellidoCliente, dniCliente, telefonoCliente, direccionCliente) ";
    $sqlInserta .= "VALUES ( '". $oCliente->nombreCliente ."', '". $oCliente->apellidoCliente ."' , '". $oCliente->dniCliente ."' , ".$oCliente->telefonoCliente.",'".$oCliente->direccionCliente."')";

    $resIns = $conn->query($sqlInserta);

    $resultado =  "Alta de cliente correcta";
    $error = FALSE;
} else {
    //Existe el cliente, mostrar el error

    $resultado = "Error: El cliente ya existe en nuestra base de datos";
    $error = TRUE;
}

// Creo un "objeto" php creando un array asociativo
$objeto_salida = array ( "mensaje" => "Alta de cliente" , "resultado" => $resultado, "accion" => 100, "error" => $error );

$json_salida = json_encode($objeto_salida);

echo $json_salida;

$conn->close();

