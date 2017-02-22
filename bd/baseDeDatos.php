<?php
class baseDeDatos
{
    public static function conexionBD(){
        try {
            $opcion = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
            $conexion = new PDO('mysql:host=localhost;dbname=consultoriabd;charset=utf8', "root", "",$opcion);
            $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conexion;
        } catch (Exception $e) {
            $conexion->rollBack();
            echo "Failed: " . $e->getMessage();
        }
    }
    public static function ejecutaConsulta($sql){
        $rSet = self::conexionBD()->query($sql, PDO::FETCH_ASSOC);
        return $rSet;
    }

    public static function ejecutaInsert($sql){
        $rSet = self::conexionBD()->exec($sql);
        return $rSet;
    }

    public static function ejecutaUpdate($sql)
    {
        $rSet = self::conexionBD()->exec($sql);
        return $rSet;
    }
}
?>