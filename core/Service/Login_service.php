<?php

include_once './Model/Login_model.php';

class Login_service
{
    function __construct()
    {
    }

    function login($DNI, $PASS)
    {
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
        $LoginModel = new Login_Model($DNI, "");
        return $LoginModel->obtenerFuncionalidadesAcciones();
    }
}
