<?php
include_once './Controller/Basic_Controller.php';
include_once './Service/Acciones_service.php';

class Acciones_controller extends Basic_Controller
{

    function __construct()
    {
        parent::__construct();
        $this->controller();
    }

    function controller()
    {
        if (!$this->IS_LOGGED) {
            $this->echoUnauthorized();
        } else if (!isset($_REQUEST['action'])) {
            $this->echoBadRequest("Es necesario indicar una acción");
        } else {
            switch ($_REQUEST['action']) {                
                case 'showall'://ver todas
                    $this->canUseAction("ACCION", "SHOWALL") ? $this->mostrarTodas() : $this->echoForbidden("ACCION", "SHOWALL");
                    break;
            
                default://caso default
                    $this->echoBadRequest("No se puede realizar esa acción");
            }
        }

    }
    function mostrarTodas()
    {
        $Acciones_Service = new Acciones_service();
        $resultado = $Acciones_Service->showall();
        $this->echoOk($resultado);
    }

}
