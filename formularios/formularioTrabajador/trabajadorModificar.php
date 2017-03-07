
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

if ($res->num_rows > 0) {
    //Existe el trabajador, por lo tanto actualizamos sus datos

    $sqlUpdate = "UPDATE trabajador SET nombreTrabajador='".$nombre. "', dniTrabajador='".$dni. "', apellidoTrabajador= '". $apellido. "', direccionTrabajador= '" .$direccion. "',telefonoTrabajador= ".$tlf.",tipoTrabajador= '".$tipo."' WHERE dniTrabajador = '".$dni. "'; ";

    $resUpdate= $conn->query($sqlUpdate);

    $resultado =  "Actualizados datos de trabajador";
    $error = FALSE;
} else {
    //No existe el trabajador, mostrar el error

    $resultado = "Error: El trabajador que desea modificar no existe en nuestra base de datos";
    $error = TRUE;
}

// Creo un "objeto" php creando un array asociativo
$objeto_salida = array ( "mensaje" => "Modificación de Trabajador" , "resultado" => $resultado, "accion" => 200, "error" => $error );

$json_salida = json_encode($objeto_salida);

echo $json_salida;

$conn->close();

?>