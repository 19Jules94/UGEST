<?php

include_once './Model/Acciones_model.php';
include_once './utils/ValidationException.php';

class Acciones_service
{
    private $ACCIONES_MODEL;

    function __construct()
    {
        $this->ACCIONES_MODEL = new Acciones_model();
    }
    function showall()
    {
        return $this->ACCIONES_MODEL->mostrarAcciones();
    }

    function addAccion($nombre, $descripcion)
    {
        if(!validarNombreAccion($nombre)){
            throw new ValidationException("El nombre no es válido, no puede superar los 20 caracteres");
        }
        if(!validarDescripcionAccion($nombre)){
            throw new ValidationException("La descripcion no es válida, no puede superar los 300 caracteres");
        }
        return $this->ACCIONES_MODEL->addAccion($nombre, $descripcion);
    }

    function deleteAccion($id){
        if(!validarID($id)){
            throw new ValidationException("El id no es válido");
        }
        return $this->ACCIONES_MODEL->deleteAccion($id);
    }
}
