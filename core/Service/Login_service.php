<?php

include_once './Model/Login_model.php';
include_once './utils/Validaciones.php';
class Login_service
{
    function __construct()
    {
    }

    function login($DNI, $PASS)
    {
        if( !validarDNI($DNI)){
            throw new ValidationException("DNI incorrecto o mal formado.");
        }

        if( !validarPass($PASS)){
            throw new ValidationException("Contraseña incorrecta.");
        }
       
        $LoginModel = new Login_model($DNI, $PASS);
        $result = $LoginModel->login();

        if ($result == null) {
            return null;
        } else {

            return AuthJWT::crearToken($DNI);
        }
    }
    function obtenerFuncionalidades($DNI)
    {
        $LoginModel = new Login_model($DNI, "");
        return $LoginModel->obtenerFuncionalidadesAcciones();
    }
    public function getProfile($dni)
    {
        $LoginModel = new Login_model($dni, "");
        return $LoginModel->getProfile($dni);
    }

    
}
