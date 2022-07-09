<?php
include_once './Controller/Basic_Controller.php';
include_once './Service/Roles_service.php';

class Roles_controller extends Basic_Controller
{

    function __construct()
    {
        parent::__construct();
        $this->controller();
    }

    function controller()
    {
        if (!$this->IS_LOGGED) {
            $this->unauthorized();
        } else if (!isset($_REQUEST['action'])) {
            $this->notFound("Es necesario indicar una acción");
        } else {
            switch ($_REQUEST['action']) {
                case 'add':
                    $this->canUseAction("ROL", "ADD") ? $this->addRol() : $this->forbidden("ROL", "ADD");
                    break;
                case 'showall':
                    $this->canUseAction("ROL", "SHOWALL") ? $this->mostrarRoles() : $this->forbidden("ROL", "SHOWALL");
                    break;
                case 'delete':
                    $this->canUseAction("ROL", "DELETE") ? $this->deleteRol() : $this->forbidden("ROL", "DELETE");
                    break;
                default:
                    $this->notFound("No se puede realizar esa acción");
            }
        }

    }

    function addRol()
    {
        if (!isset($_POST['nombre'])) {
            $this->notFound("Es necesario enviar el nombre para añadir un rol");
        } else {
            $nombre = $_POST['nombre'];

            try {
                $Roles_Service = new Roles_service();
                $resultado = $Roles_Service->addRol($nombre);
                if ($resultado) {
                    $this->echoOk(array("resultado" => $resultado));
                } else {
                    $this->echoOk(array("resultado" => "El rol no se pudo añadir"));
                }
            } catch (ValidationException $ex) {
                $this->notFound($ex->getERROR());
            }
            catch (DBException $ex) {
                switch ($ex->getERROR()){
                    case "4002":
                        $this->notFound("Accion duplicada");
                        break;
                }
            }

        }
    }

    function mostrarRoles()
    {
        $Roles_Service = new Roles_service();
        $resultado = $Roles_Service->mostrarRoles();
        $this->echoOk($resultado);
    }

    function deleteRol()
    {
        if (!isset($_POST['id'])) {
            $this->notFound("Es necesario enviar el id para borrar");
        } else {
            $id = $_POST['id'];
            try {
                $Roles_Service = new Roles_service();
                $resultado = $Roles_Service->deleteRol($id);
                if ($resultado) {
                    $this->echoOk(array("resultado" => "Rol eliminado"));
                } else {
                    $this->notFound(array("resultado" => "El rol no se pudo eliminar"));
                }
            } catch (ValidationException $ex) {
                $this->notFound($ex->getERROR());
            }
        }

    }


}
