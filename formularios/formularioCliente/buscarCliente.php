<?php
// Va a devolver una respuesta JSON que no se debe cachear
header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

$servidor  = "localhost";
$basedatos = "consultoriabd";
$usuario   = "root";
$password  = "";

$dniCliente=$_REQUEST['datos'];

$oProyecto = json_decode($dniCliente);
$conexion=mysqli_connect($servidor,$usuario,$password,$basedatos) or die("Conexion fallida: ".mysqli_connect_error());
$conexion->set_charset("utf8");


$sql = "SELECT * FROM cliente WHERE cliente.dniCliente='".$dniCliente."'";


$arrayADevolver=[];
$resultados=$conexion->query($sql);


while($v=mysqli_fetch_assoc($resultados)){

    foreach($v as $indice => $valor) {
        $arrayADevolver[]=$valor;
    }

}
echo json_encode($arrayADevolver);

$conexion->close();

?>