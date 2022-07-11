<?php
include_once './Controller/Basic_Controller.php';
include_once './Service/Universidades_service.php';
include_once './Utils/ResourceNotFound.php';

class Universidades_controller extends Basic_Controller
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
            $this->notFound("Es necesario indicar un acción");
        } else {
            switch ($_REQUEST['action']) {
                case 'add': 
                    $this->canUseAction("UNIVERSIDAD", "ADD") ? $this->addUniversidad() : $this->forbidden("UNIVERSIDAD", "ADD");
                    break;
                case 'info_add': 
                    $this->canUseAction("UNIVERSIDAD", "ADD") ? $this->info_add() : $this->forbidden("UNIVERSIDAD", "ADD");
                    break;
                case 'showall': 
                    $this->canUseAction("UNIVERSIDAD", "SHOWALL") ? $this->mostrarTodas() : $this->forbidden("UNIVERSIDAD", "SHOWALL");
                    break;
                case 'delete': 
                    $this->canUseAction("UNIVERSIDAD", "DELETE") ? $this->deleteUniversidad() : $this->forbidden("UNIVERSIDAD", "DELETE");
                    break;
                case 'show':
                    $this->canUseAction("UNIVERSIDAD", "SHOWCURRENT") ? $this->show() : $this->forbidden("UNIVERSIDAD", "SHOWCURRENT");
                    break;
                case 'edit': 
                    $this->canUseAction("UNIVERSIDAD", "EDIT") ? $this->editUniversidad() : $this->forbidden("UNIVERSIDAD", "EDIT");
                    break;
                default: 
                    $this->notFound("No se puede realizar esa acción");
            }
        }
    }

    function addUniversidad()
    {
        if (!isset($_POST['nombre'])) {
            $this->notFound("Es necesario enviar el nombre para añadir una universidad");
        } elseif (!isset($_POST['ciudad'])) {
            $this->notFound("Es necesario enviar el nombre de la ciudad para añadir una universidad");
        } elseif (!isset($_POST['responsable'])) {
            $this->notFound("Es necesario enviar el nombre del responsable para añadir una universidad");
        } else {
            $nombre = $_POST['nombre'];
            $ciudad = $_POST['ciudad'];
            $responsable = $_POST['responsable'];

            try {
                $Universidades_Service = new Universidades_service();
                $resultado = $Universidades_Service->addUniversidad($nombre, $ciudad, $responsable);
                if ($resultado) {
                    $this->echoOk(array("resultado" => strval($resultado)));
                } else {
                    $this->echoOk(array("resultado" => "La universidad no se pudo añadir"));
                }
            } catch (ValidationException $ex) {
                $this->notFound($ex->getERROR());
            } catch (DBException $ex) {
                switch ($ex->getERROR()) {
                    case "4002":
                        $this->notFound("Universidad duplicada");
                        break;
                    case "4004":
                        $this->notFound("Alguno de los elementos introducidos no existe en la base de datos");
                        break;
                }
            }
        }
    }

    function mostrarTodas()
    {
        $Universidades_Service = new Universidades_service();
        $resultado = $Universidades_Service->mostrarTodas();
        $this->echoOk($resultado);
    }

    function deleteUniversidad()
    {
        if (!isset($_POST['id'])) {
            $this->notFound("Es necesario enviar el id para borrar");
        } else {
            $id = $_POST['id'];
            try {
                $Universidades_Service = new Universidades_service();
                $resultado = $Universidades_Service->deleteUniversidad($id);
                if ($resultado) {
                    $this->echoOk(array("resultado" => "Universidad eliminada"));
                } else {
                    $this->notFound(array("resultado" => "La universidad no se pudo eliminar"));
                }
            } catch (ValidationException $ex) {
                $this->notFound($ex->getERROR());
            }
        }
    }

    function editUniversidad()
    {
        if (!isset($_POST['id'])) {
            $this->notFound("Es necesario enviar el id de la universidad para editarla");
        } elseif (!isset($_POST['nombre'])) {
            $this->notFound("Es necesario enviar el nombre de la universidad para editarla");
        } elseif (!isset($_POST['ciudad'])) {
            $this->notFound("Es necesario enviar el nombre de la ciudad para añadir editarla");
        } elseif (!isset($_POST['responsable'])) {
            $this->notFound("Es necesario enviar el nombre del responsable para editarla");
        } else {
            $id = $_POST['id'];
            $nombre = $_POST['nombre'];
            $ciudad = $_POST['ciudad'];
            $responsable = $_POST['responsable'];

            try {
                $Universidades_Service = new Universidades_service();
                $resultado = $Universidades_Service->editUniversidad($id, $nombre, $ciudad, $responsable);
                if ($resultado) {
                    $this->echoOk(array("resultado" => strval($resultado)));
                } else {
                    $this->echoOk(array("resultado" => "la universidad no se pudo editar"));
                }
            } catch (ValidationException $ex) {
                $this->notFound($ex->getERROR());
            } catch (ResourceNotFound $ex) {
                $this->notFound($ex->getERROR());
            } catch (DBException $ex) {
                switch ($ex->getERROR()) {
                    case "4002":
                        $this->notFound("Universidad duplicada");
                        break;
                }
            }
        }
    }

    function show()
    {
        if (!isset($_POST['id'])) {
            $this->notFound("Es necesario enviar el id para mostrar la universidad");
        } else {
            $id = $_POST['id'];
            try {
                $Universidades_Service = new Universidades_service();
                $resultado = $Universidades_Service->show($id);
                if ($resultado) {
                    $this->echoOk($resultado);
                } else {
                    $this->notFound(array("resultado" => "La universidad no se pudo mostrar"));
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

        $Universidades_Service = new Universidades_service();
        $resultado = $Universidades_Service->info_add();
        $this->echoOk($resultado);
    }
}
