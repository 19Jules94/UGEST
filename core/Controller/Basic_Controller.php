<?php

include_once './utils/AuthJWT.php';
include_once './Service/Login_service.php';
class Basic_Controller
{
    protected $IS_LOGGED;
    protected $DNI;

    private $TOKEN;
    private $FUNCIONALIDADES_ACCIONES;

    function __construct()
    {
        $headers = getallheaders();
        if (array_key_exists("Authorization", $headers)) {
            $this->TOKEN = substr(getallheaders()["Authorization"], 7);
            $result = AuthJWT::validarToken($this->TOKEN);

            if ($result == false) {
                $this->IS_LOGGED = false;
            } else {
                $this->DNI = $result;
                $LoginService = new Login_Service();
                $this->FUNCIONALIDADES_ACCIONES = $LoginService->obtenerFuncionalidades($this->DNI);
                $this->IS_LOGGED = true;
            }
        } else {
            $this->IS_LOGGED = false;
        }
    }

    /*
     * Esta funcion determina sin usuario puede o no realizar una acción sobre una determinada funcionalidad
     */
    function canUseAction($funcionalidad, $accion)
    { 
        return array_key_exists($funcionalidad, $this->FUNCIONALIDADES_ACCIONES) && in_array($accion, $this->FUNCIONALIDADES_ACCIONES[$funcionalidad]);
    }

    function echoForbidden($funcionalidad, $accion)
    {
        $toret = array("STATUS" => "KO", "CODE" => "403", "RESOURCES" => array("MSG" => "No puedes realizar la accion '$accion' sobre la funcionalidad '$funcionalidad'"));
        echo json_encode($toret);
    }

    function echoBadRequest($msg)
    {
        $toret = array("STATUS" => "KO", "CODE" => "404", "RESOURCES" => array("MSG" => $msg));
        echo json_encode($toret);
    }

    function echoUnauthorized()
    {
        $toret = array("STATUS" => "KO", "CODE" => "401", "RESOURCES" => array("MSG" => "Debe estar autenticado para realizar esa petición"));
        echo json_encode($toret);
    }

    function echoOk($RESOURCES)
    {
        $toret = array("STATUS" => "OK", "CODE" => "200", "RESOURCES" => $RESOURCES);
        echo json_encode($toret);
    }

    function echoServerUploadFileError($RESOURCES)
    {
        $toret = array("STATUS" => "NOK", "CODE" => "5001", "RESOURCES" => $RESOURCES);
        echo json_encode($toret);
    }

    function echoConstraintError($RESOURCES)
    {
        $toret = array("STATUS" => "NOK", "CODE" => "4001", "RESOURCES" => $RESOURCES);
        echo json_encode($toret);
    }
    
    function echoDuplicatedError($RESOURCES)
    {
        $toret = array("STATUS" => "NOK", "CODE" => "4002", "RESOURCES" => $RESOURCES);
        echo json_encode($toret);
    }

    function echoNonExistent($RESOURCES)
    {
        $toret = array("STATUS" => "NOK", "CODE" => "4004", "RESOURCES" => $RESOURCES);
        echo json_encode($toret);
    }

    function echoResourceNotFound($RESOURCES)
    {
        $toret = array("STATUS" => "NOK", "CODE" => "4005", "RESOURCES" => $RESOURCES);
        echo json_encode($toret);
    }

    function echoSpaceOccuped($RESOURCES)
    {
        $toret = array("STATUS" => "NOK", "CODE" => "40011", "RESOURCES" => $RESOURCES);
        echo json_encode($toret);
    }

    function echoGroupsOccuped($RESOURCES)
    {
        $toret = array("STATUS" => "NOK", "CODE" => "40012", "RESOURCES" => $RESOURCES);
        echo json_encode($toret);
    }

    function echoTeachersOccuped($RESOURCES)
    {
        $toret = array("STATUS" => "NOK", "CODE" => "40013", "RESOURCES" => $RESOURCES);
        echo json_encode($toret);
    }

} 
