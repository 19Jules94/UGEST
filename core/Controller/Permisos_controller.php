<?php
include_once './Controller/Basic_Controller.php';
include_once './Service/Permisos_service.php';

class Permisos_controller extends Basic_Controller
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
                    $this->canUseAction("PERMISO", "ADD") ? $this->addPermiso() : $this->forbidden("PERMISO", "ADD");
                    break;
                case 'info_add':
                    $this->canUseAction("PERMISO", "ADD") ? $this->info_add() : $this->forbidden("PERMISO", "ADD");
                    break;
                case 'showall':
                    $this->canUseAction("PERMISO", "SHOWALL") ? $this->mostrarTodos() : $this->forbidden("PERMISO", "SHOWALL");
                    break;
                case 'delete': 
                    $this->canUseAction("PERMISO", "DELETE") ? $this->deletePermiso() : $this->forbidden("PERMISO", "DELETE");
                    break;
                default: 
                    $this->notFound("No se puede realizar esa acción");
            }
        }
    }

    function addPermiso()
    {

        if (!isset($_POST['rol'])) {
            $this->notFound("Es necesario enviar el rol para añadir un permiso");
        } else if (!isset($_POST['funcionalidad'])) {
            $this->notFound("Es necesario enviar la funcionalidad para añadir un permiso");
        } else if (!isset($_POST['accion'])) {
            $this->notFound("Es necesario enviar la accion para añadir un permiso");
        } else {

            $rol = $_POST['rol'];
            $funcionalidad = $_POST['funcionalidad'];
            $action = $_POST['accion'];

            try {
                $Permisos_Service = new Permisos_service();
                $resultado = $Permisos_Service->addPermiso($rol, $funcionalidad, $action);

                if ($resultado) {
                    $this->echoOk(array("resultado" => $resultado));
                } else {
                    $this->echoOk(array("resultado" => "El permiso no se pudo añadir"));
                }

            } catch (ValidationException $ex) {
                $this->notFound($ex->getERROR());
            } catch (DBException $ex) {
                switch ($ex->getERROR()) {
                    case "4002":
                        $this->notFound("Permiso duplicado");
                        break;

                    case "4004":
                        $this->notFound("Alguno de los campos no existe en la base de datos.");
                        break;
                }
            }
        }
    }

    function mostrarTodos()
    {
        $Permisos_Service = new Permisos_service();
        $resultado = $Permisos_Service->mostrarTodos();
        $this->echoOk($resultado);
    }

    function deletePermiso()
    {

        if (!isset($_POST['rol'])) {
            $this->notFound("Es necesario enviar el rol para añadir un permiso");
        } else if (!isset($_POST['funcionalidad'])) {
            $this->notFound("Es necesario enviar la funcionalidad para añadir un permiso");
        } else if (!isset($_POST['accion'])) {
            $this->notFound("Es necesario enviar la accion para añadir un permiso");
        } else {

            $rol = $_POST['rol'];
            $funcionalidad = $_POST['funcionalidad'];
            $action = $_POST['accion'];
            try {
                $Permisos_Service = new Permisos_service();
                $resultado = $Permisos_Service->deletePermiso($rol, $funcionalidad, $action);
                if ($resultado) {
                    $this->echoOk(array("resultado" => "Permiso eliminado"));
                } else {
                    $this->notFound(array("resultado" => "El permiso no se pudo eliminar"));
                }
            } catch (ValidationException $ex) {
                $this->notFound($ex->getERROR());
            } catch (ResourceNotFound $ex) {
                $this->notFound($ex->getERROR());
            } catch (DBException $ex) {
                switch ($ex->getERROR()) {
                    case "4004":
                        $this->notFound("Alguno de los campos no existe en la base de datos.");
                        break;
                }
            }
        }
    }

    function info_add()
    {
        $Permisos_Service = new Permisos_service();
        $resultado = $Permisos_Service->info_add();
        $this->echoOk($resultado);
    }

}