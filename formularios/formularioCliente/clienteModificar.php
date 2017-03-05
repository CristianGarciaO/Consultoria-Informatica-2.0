<?php

$oCliente = json_decode($_POST['datos']);


// Create connection
$conn = new mysqli("localhost", "root", "", "consultoriabd");
// Check connection
if ($conn->connect_error) {
    die("Conexion fallida: " . $conn->connect_error);
}
$conn->set_charset("utf8");

$sql = "SELECT * FROM cliente WHERE dniCliente = '". $oCliente->dniCliente. "';";

$res = $conn->query($sql);

if ($res->num_rows > 0) {
    //Existe el cliente, por lo tanto actualizamos sus datos

    $sqlUpdate = "UPDATE cliente SET nombreCliente='". $oCliente->nombreCliente. "', apellidoCliente='". $oCliente->apellidoCliente. "', telefonoCliente= ". $oCliente->telefonoCliente. ", direccionCliente= '" .$oCliente->direccionCliente. "' WHERE dniCliente = '" .$oCliente->dniCliente. "'; ";


    $resIns = $conn->query($sqlUpdate);

    $resultado =  "Actualizados datos de cliente";
    $error = FALSE;
} else {
    //No existe el cliente, mostrar el error

    $resultado = "Error: El cliente que desea modificar no existe en nuestra base de datos";
    $error = TRUE;
}

// Creo un "objeto" php creando un array asociativo
$objeto_salida = array ( "mensaje" => "Modificación de cliente" , "resultado" => $resultado, "accion" => 200, "error" => $error );

$json_salida = json_encode($objeto_salida);

echo $json_salida;

$conn->close();

?>