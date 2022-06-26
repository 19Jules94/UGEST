<?php

include_once './Model/Usuarios_model.php';
include_once './utils/ValidationException.php';

class Usuarios_service
{
    private $USUARIOS_MODEL;

    function __construct()
    {
        $this->USUARIOS_MODEL = new Usuarios_model();
    }
    public function modificarPasswordEmail($dni,$email,$password)
    {
     
        return $this->USUARIOS_MODEL->modificarPasswordEmail($dni,$email,$password);
    }
}