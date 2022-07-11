<?php

include_once './Controller/Basic_Controller.php';
include_once './Service/Edificios_service.php';

class Edificios_controller extends Basic_Controller
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
                    $this->canUseAction("EDIFICIO", "ADD") ? $this->addEdificio() : $this->forbidden("EDIFICIO", "ADD");
                    break;
                case 'info_add':
                    $this->canUseAction("EDIFICIO", "ADD") ? $this->info_add() : $this->forbidden("EDIFICIO", "ADD");
                    break;
                case 'showall':
                    $this->canUseAction("EDIFICIO", "SHOWALL") ? $this->mostrarTodos() : $this->forbidden("EDIFICIO", "SHOWALL");
                    break;
                case 'delete':
                    $this->canUseAction("EDIFICIO", "DELETE") ? $this->deleteEdificio() : $this->forbidden("EDIFICIO", "DELETE");
                    break;
                case 'show':
                    $this->canUseAction("EDIFICIO", "SHOWCURRENT") ? $this->show() : $this->forbidden("EDIFICIO", "SHOWCURRENT");
                    break;
                case 'edit':
                    $this->canUseAction("EDIFICIO", "EDIT") ? $this->editEdificio() : $this->forbidden("EDIFICIO", "EDIT");
                    break;
            }
        }

    }

    private function addEdificio()
    {
        if (!isset($_POST['universidad']) || !isset($_POST['nombre']) || !isset($_POST['ubicacion'])) {
            $this->notFound("Es necesario enviar la universidad, el nombre y la ubicación para crear un edificio");
        } else {
            $universidad = $_POST['universidad'];
            $nombre = $_POST['nombre'];
            $ubicacion = $_POST['ubicacion'];

            try {
                $Edificio_Service = new Edificios_service();
                $resultado = $Edificio_Service->addEdificio($universidad, $nombre, $ubicacion);
                if ($resultado) {
                    $this->echoOk(array("resultado" => $resultado));
                } else {
                    $this->echoOk(array("resultado" => "El edificio no se pudo añadir"));
                }
            } catch (ValidationException $ex) {
                $this->notFound($ex->getERROR());
            } catch (DBException $ex) {
                switch ($ex->getERROR()) {
                    case "4002":
                        $this->notFound("Ese edificio ya existe");
                        break;
                    case "4004":
                        $this->notFound("No existe esa universidad");
                        break;
                }
            }

        }
    }

    private function info_add()
    {
        $Edificios_Service = new Edificios_service();
        $resultado = $Edificios_Service->info_add();
        $this->echoOk($resultado);
    }

    private function mostrarTodos()
    {
        $Edificios_Service = new Edificios_service();
        $resultado = $Edificios_Service->mostrarTodos();
        $this->echoOk($resultado);
    }

    private function deleteEdificio()
    {
        if (!isset($_POST['id'])) {
            $this->notFound("Es necesario enviar el id para borrar");
        } else {
            $id = $_POST['id'];
            try {
                $Edificios_Service = new Edificios_service();
                $resultado = $Edificios_Service->deleteEdificio($id);
                if ($resultado) {
                    $this->echoOk(array("resultado" => "Edificio eliminado"));
                } else {
                    $this->notFound(array("resultado" => "El edificio no se pudo eliminar"));
                }
            } catch (ValidationException $ex) {
                $this->notFound($ex->getERROR());
            } catch (ResourceNotFound $ex) {
                $this->notFound($ex->getERROR());
            }
        }
    }

    private function show()
    {
        if (!isset($_POST['id'])) {
            $this->notFound("Es necesario enviar el id para mostrar el edificio");
        } else {
            $id = $_POST['id'];
            try {
                $Edificios_Service = new Edificios_service();
                $resultado = $Edificios_Service->show($id);
                if ($resultado) {
                    $this->echoOk($resultado);
                } else {
                    $this->notFound(array("resultado" => "El edificio no se pudo mostrar"));
                }
            } catch (ValidationException $ex) {
                $this->notFound($ex->getERROR());
            } catch (ResourceNotFound $ex) {
                $this->notFound($ex->getERROR());
            }
        }
    }

    private function editEdificio()
    {
        if (!isset($_POST['id'])) {
            $this->notFound("Es necesario enviar el id del edifio para editarlo");
        } elseif (!isset($_POST['universidad'])) {
            $this->notFound("Es necesario enviar el id de la universidad para editar el edificio");
        } elseif (!isset($_POST['nombre'])) {
            $this->notFound("Es necesario enviar el nombre del edificio para añadir editarlo");
        } elseif (!isset($_POST['ubicacion'])) {
            $this->notFound("Es necesario enviar la ubicación del edificio para editarlo");
        } else {
            $id = $_POST['id'];
            $id_UNIVERSIDAD = $_POST['universidad'];
            $nombre = $_POST['nombre'];
            $ubicacion = $_POST['ubicacion'];

            try {
                $Edificios_Service = new Edificios_service();
                $resultado = $Edificios_Service->editEdificio($id, $id_UNIVERSIDAD, $nombre, $ubicacion);
                if ($resultado) {
                    $this->echoOk(array("resultado" => strval($resultado)));
                } else {
                    $this->echoOk(array("resultado" => "El edificio no se pudo editar"));
                }
            } catch (ValidationException $ex) {
                $this->notFound($ex->getERROR());
            } catch (DBException $ex) {
                switch ($ex->getERROR()) {
                    case "4002":
                        $this->notFound("Edificio duplicado");
                        break;
                }
            } catch (ResourceNotFound $ex) {
                $this->notFound($ex->getERROR());
            }

        }
    }


}