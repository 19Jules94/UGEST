<?php
class Acciones_model extends Base_model{

function __construct()
{
    parent::__construct();
}

function mostrarAcciones(){
    $sql= "SELECT id,nombre,descripcion FROM accion ";
    $resultado = $this->db->query($sql);

    return array("acciones"=> $resultado->fetch_all(MYSQLI_ASSOC));
}
public function getAcciones()
    {
        $sql = "SELECT id, nombre, descripcion FROM accion";

        $resultado = $this->db->query($sql);

        return $resultado->fetch_all(MYSQLI_ASSOC);
    }
}