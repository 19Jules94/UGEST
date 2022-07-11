<?php

include_once './Controller/Basic_Controller.php';
include_once './Service/Centros_service.php';
include_once './utils/ResourceNotFound.php';

class Centros_controller extends Basic_Controller
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
                    $this->canUseAction("CENTRO", "ADD") ? $this->addCentro() : $this->forbidden("CENTRO", "ADD");
                    break;
                case 'info_add': 
                    $this->canUseAction("CENTRO", "ADD") ? $this->info_add() : $this->forbidden("CENTRO", "ADD");
                    break;
                case 'showall': 
                    $this->canUseAction("CENTRO", "SHOWALL") ? $this->mostrarTodos() : $this->forbidden("CENTRO", "SHOWALL");
                    break;
                case 'delete': 
                    $this->canUseAction("CENTRO", "DELETE") ? $this->deleteCentro() : $this->forbidden("CENTRO", "DELETE");
                    break;
                case 'show': 
                    $this->canUseAction("CENTRO", "SHOWCURRENT") ? $this->show() : $this->forbidden("CENTRO", "SHOWCURRENT");
                    break;
                case 'edit': 
                    $this->canUseAction("CENTRO", "EDIT") ? $this->editCentro() : $this->forbidden("CENTRO", "EDIT");
                    break;
                default: 
                    $this->notFound("No se puede realizar esa acción");
            }
        }
    }

    function addCentro()
    {
        if (!isset($_POST['nombre'])) {
            $this->notFound("Es necesario enviar el nombre para añadir un centro");
        } elseif (!isset($_POST['universidad'])) {
            $this->notFound("Es necesario enviar id de la universidad para añadir un centro");
        } elseif (!isset($_POST['ciudad'])) {
            $this->notFound("Es necesario enviar el nombre de la ciudad para añadir un centro");
        } elseif (!isset($_POST['responsable'])) {
            $this->notFound("Es necesario enviar el nombre del responsable para añadir un centro");
        } else {
            $nombre = $_POST['nombre'];
            $universidad = $_POST['universidad'];
            $ciudad = $_POST['ciudad'];
            $responsable = $_POST['responsable'];

            try {
                $Centros_Service = new Centros_service();
                $resultado = $Centros_Service->addCentro($nombre, $universidad, $ciudad, $responsable);
                if ($resultado) {
                    $this->echoOk(array("resultado" => strval($resultado)));
                } else {
                    $this->echoOk(array("resultado" => "El centro no se pudo añadir"));
                }
            } catch (ValidationException $ex) {
                $this->notFound($ex->getERROR());
            } catch (DBException $ex) {
                switch ($ex->getERROR()) {
                    case "4002":
                        $this->notFound("Centro duplicado");
                        break;
                    case "4004":
                        $this->notFound("Alguno de los elementos introducidos no existe en la base de datos.");
                        break;
                }
            }
        }
    }

    function mostrarTodos()
    {
        $Centros_Service = new Centros_service();
        $resultado = $Centros_Service->mostrarTodos();
        $this->echoOk($resultado);
    }

    function deleteCentro()
    {
        if (!isset($_POST['id'])) {
            $this->notFound("Es necesario enviar el id para borrar un centro");
        } else {
            $id = $_POST['id'];
            try {
                $Centros_Service = new Centros_service();
                $resultado = $Centros_Service->deleteCentro($id);
                if ($resultado) {
                    $this->echoOk(array("resultado" => "Centro eliminado"));
                } else {
                    $this->notFound(array("resultado" => "El centro no se pudo eliminar"));
                }
            } catch (ValidationException $ex) {
                $this->notFound($ex->getERROR());
            }
            catch (ResourceNotFound $rnf){
                $this->notFound("No se ha podido encontrar el id introducido.");
            }
        }
    }

    function editCentro()
    {
        if (!isset($_POST['id'])) {
            $this->notFound("Es necesario enviar el id del centro para editarlo");
        } elseif (!isset($_POST['nombre'])) {
            $this->notFound("Es necesario enviar el nombre del centro para editarlo");
        } elseif (!isset($_POST['universidad'])) {
            $this->notFound("Es necesario enviar id de la universidad para editar un centro");
        } elseif (!isset($_POST['ciudad'])) {
            $this->notFound("Es necesario enviar el nombre de la ciudad para editar el centro");
        } elseif (!isset($_POST['responsable'])) {
            $this->notFound("Es necesario enviar el nombre del responsable para editar el centro");
        } else {
            $id = $_POST['id'];
            $nombre = $_POST['nombre'];
            $universidad = $_POST['universidad'];
            $ciudad = $_POST['ciudad'];
            $responsable = $_POST['responsable'];

            try {
                $Centros_Service = new Centros_service();
                $resultado = $Centros_Service->editCentro($id, $nombre, $universidad, $ciudad, $responsable);
                if ($resultado) {
                    $this->echoOk(array("resultado" => strval($resultado)));
                } else {
                    $this->echoOk(array("resultado" => "El centro no se pudo editar"));
                }
            } catch (ValidationException $ex) {
                $this->notFound($ex->getERROR());
            } catch (ResourceNotFound $ex) {
                $this->notFound($ex->getERROR());
            } catch (DBException $ex) {
                switch ($ex->getERROR()) {
                    case "4002":
                        $this->notFound("Centro duplicado");
                        break;
                    case "4004":
                        $this->notFound("Alguno de los elementos introducidos no existe en la base de datos");
                        break;
                }
            }
            catch (ResourceNotFound $rnf){
                $this->notFound("No se ha podido encontrar el id introducido.");
            }
        }
    }

    function show()
    {
        if (!isset($_POST['id'])) {
            $this->notFound("Es necesario enviar el id para mostrar el centro");
        } else {
            $id = $_POST['id'];
            try {
                $Centros_Service = new Centros_service();
                $resultado = $Centros_Service->show($id);
                if ($resultado) {
                    $this->echoOk($resultado);
                } else {
                    $this->notFound(array("resultado" => "El centro no se pudo mostrar"));
                }
            } catch (ValidationException $ex) {
                $this->notFound($ex->getERROR());
            } catch (ResourceNotFound $ex) {
                $this->notFound($ex->getERROR());
            }
        }
    }

    function info_add()
    {

        $Centros_Service = new Centros_service();
        $resultado = $Centros_Service->info_add();
        $this->echoOk($resultado);
    }
}
