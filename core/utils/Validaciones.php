<?php

function validarDNI($DNI)
{
    $letra = strtoupper(substr($DNI, -1));
    $numeros = substr($DNI, 0, -1);

    if (substr("TRWAGMYFPDXBNJZSQVHLCKE", $numeros % 23, 1) == $letra && strlen($letra) == 1 && strlen($numeros) == 8) {
        return true;
    } else {
        return false;
    }
}

function validarPass($password)
{
    $len =  strlen($password);

    if ($len >= 4 && $len <= 30) {
        return true;
    } else {
        return false;
    }
}
function validarNombreDep($nombre){
    return $nombre == "TC"
        || $nombre == "P1"
        || $nombre == "P2"
        || $nombre == "P3"
        || $nombre == "P4"
        || $nombre == "P5"
        || $nombre == "P6";
}
function validarEmail($email)
{
    return (false !== filter_var($email, FILTER_VALIDATE_EMAIL));
}

function validarNombreAccion($nombreAccion)
{
    return preg_match("/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]{3,20}$/", $nombreAccion);
}
function validarDescripcionAccion($descripcionAccion)
{
    return preg_match("/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]{3,300}$/", $descripcionAccion);
}
function validarID($id)
{
    return preg_match("/^[0-9]+$/", $id);
}
function validarNombre($nombre)
{
    return preg_match("/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{3,50}$/", $nombre);
}

function validarApellidos($apellidos)
{
    return preg_match("/^[a-zA-ZñÑáéíóúÁÉÍÓÚ \s]{3,20}$/", $apellidos);
}

function validarCodigo($codigo){
    return preg_match("/^[A-Z]{1}[0-9]{2}[a-z]{1}[0-9]{2}$/",$codigo);
}

function validarCodigoTitulacion($codigo){
    return preg_match("/^[A-Z]{1}[0-9]{2}[A-Z]{1}[0-9]{3}[A-Z]{1}[0-9]{2}$/",$codigo);
}
function validarHoras($horas){
    return preg_match("/^[0-9]+$/",$horas)  <= 400;
}
function validarCuatrimestre($cuatrimestre){
    return $cuatrimestre=='1' or $cuatrimestre=='2';
}

function validarTipo($tipo){
    return $tipo=='OB' or $tipo=='OP' or $tipo=='FBH';
}


function validarCreditos($creditos){
    return $creditos=='6' or $creditos=='12';
}

function validarCodigoAsignatura($codigo){
    return preg_match("/^[A-Z]{1}[0-9]{2}[A-Z]{1}[0-9]{3}[A-Z]{1}[0-9]{5}$/",$codigo);    
}

function validarContenido($contenido){
    return preg_match("/^.{3,}$/",$contenido);
}