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

}