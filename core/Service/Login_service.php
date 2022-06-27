<?php

include_once './Model/Login_model.php';

class Login_service
{
    function __construct()
    {
    }

    function login($DNI, $PASS)
    {

        if(!$this->validarDNI($DNI)){
            return null;
        }

        if(!$this->validadPass($PASS)){
            return null;
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

    public function validarDNI($DNI)
    {
        $letra = strtoupper(substr($DNI, -1));
        $numeros = substr($DNI, 0, -1);

        if (substr("TRWAGMYFPDXBNJZSQVHLCKE", $numeros % 23, 1) == $letra && strlen($letra) == 1 && strlen($numeros) == 8) {
            return true;
        } else {
            return false;
        }
    }

    public function validadPass($password){
        $len =  strlen($password);

        if($len >= 4 && $len <=30){
            return true;
        }else{
            return false;
        }
    }
}
