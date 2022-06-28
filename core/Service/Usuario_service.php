<?php

include_once './Model/Usuarios_model.php';
include_once './utils/ValidationException.php';
include_once './utils/Validaciones.php';
class Usuarios_service
{
    private $USUARIOS_MODEL;

    function __construct()
    {
        $this->USUARIOS_MODEL = new Usuarios_model();
    }
    public function modificarPasswordEmail($dni,$email,$password)
    {
     
        if(!validarEmail($email)){
            throw new ValidationException("Email incorrecto o mal formado.");
        }
        if(validarPass($password)){
            throw new ValidationException("Contraseña incorrecta o mal formada.");
        }
        
        return $this->USUARIOS_MODEL->modificarPasswordEmail($dni,$email,$password);
    }
}