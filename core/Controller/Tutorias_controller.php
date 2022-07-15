<?php

include_once './Controller/Basic_Controller.php';
include_once './Service/Tutorias_service.php';
include_once './utils/ResourceNotFound.php';

class Tutorias_controller extends Basic_Controller
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
                    $this->canUseAction("TUTORIA", "ADD") ? $this->addTutoria() : $this->forbidden("TUTORIA", "ADD");
                    break;
                case 'info_add': 
                    $this->canUseAction("TUTORIA", "ADD") ? $this->info_add() : $this->forbidden("TUTORIA", "ADD");
                    break;
                case 'showall': 
                    $this->canUseAction("TUTORIA", "SHOWALL") ? $this->mostrartodas() : $this->forbidden("TUTORIA", "SHOWALL");
                    break;
                case 'delete':
                    $this->canUseAction("TUTORIA", "DELETE") ? $this->delete() : $this->forbidden("TUTORIA", "DELETE");
                    break;
                case 'show': 
                    $this->canUseAction("TUTORIA", "SHOWCURRENT") ? $this->show() : $this->forbidden("TUTORIA", "SHOWCURRENT");
                    break;
                case 'edit': 
                    $this->canUseAction("TUTORIA", "EDIT") ? $this->editTutoria() : $this->forbidden("TUTORIA", "EDIT");
                    break;
                case 'calendar': 
                    $this->canUseAction("TUTORIA", "ASISTENCIA") ? $this->calendar() : $this->forbidden("TUTORIA", "ASISTENCIA");
                    break;
                case 'asistencia': 
                    $this->canUseAction("TUTORIA", "ASISTENCIA") ? $this->asistencia() : $this->forbidden("TUTORIA", "ASISTENCIA");
                    break;
                default: 
                    $this->notFound("No se puede realizar esa acción");
            }
        }
    }

    function addTutoria()
    {
        if (!isset($_POST['anho'])) {
            $this->notFound("Es necesario enviar el id del año académico para añadir una tutoría");
        } elseif (!isset($_POST['profesor'])) {
            $this->notFound("Es necesario enviar id del profesor para añadir una tutoría");
        } elseif (!isset($_POST['espacio'])) {
            $this->notFound("Es necesario enviar id del espacio para añadir una tutoría");
        }  elseif (!isset($_POST['asistencia'])) {
            $this->notFound("Es necesario enviar la asistencia para añadir una tutoría");
        }  elseif (!isset($_POST['fecha'])) {
            $this->notFound("Es necesario enviar la fecha para añadir una tutoría");
        }   elseif (!isset($_POST['hora_inicio'])) {
            $this->notFound("Es necesario enviar la hora de inicio para añadir una tutoría");
        }   elseif (!isset($_POST['hora_fin'])) {
            $this->notFound("Es necesario enviar la hora de fin para añadir una tutoría");
        }else {
            $anho = $_POST['anho'];
            $profesor = $_POST['profesor'];
            $espacio = $_POST['espacio'];
            $asistencia = $_POST['asistencia'];
            $fecha = $_POST['fecha'];
            $hora_inicio = $_POST['hora_inicio'];
            $hora_fin = $_POST['hora_fin'];

            try {
                $Tutorias_Service = new Tutorias_service();
                $resultado = $Tutorias_Service->addTutoria($anho, $profesor, $espacio, $asistencia, $fecha, $hora_inicio, $hora_fin);
                if ($resultado) {
                    $this->echoOk(array("resultado" => strval($resultado)));
                } else {
                    $this->echoOk(array("resultado" => "La tutoria no se pudo añadir"));
                }
            } catch (ValidationException $ex) {
                $this->notFound($ex->getERROR());
            } catch (DBException $ex) {
                switch ($ex->getERROR()) {
                    case "4002":
                        $this->notFound("Tutoria duplicada");
                        break;
                    case "4004":
                        $this->notFound("Alguno de los elementos introducidos no existe en la base de datos.");
                        break;
                }
            }
        }
    }

    function mostrartodas()
    {
        $Tutorias_Service = new Tutorias_service();
        $resultado = $Tutorias_Service->mostrarTodas();
        $this->echoOk($resultado);
    }

    function delete()
    {
        if (!isset($_POST['id'])) {
            $this->notFound("Es necesario enviar el id para borrar una tutoria.");
        } else {
            $id = $_POST['id'];
            try {
                $Tutorias_Service = new Tutorias_service();
                $resultado = $Tutorias_Service->delete($id);
                if ($resultado) {
                    $this->echoOk(array("resultado" => "Horario eliminado"));
                } else {
                    $this->notFound(array("resultado" => "La tutoria no se pudo eliminar"));
                }
            } catch (ValidationException $ex) {
                $this->notFound($ex->getERROR());
            }
            catch (ResourceNotFound $rnf){
                $this->notFound("No se ha podido encontrar el id introducido.");
            }
        }
    }

    function editTutoria()
    {
        if (!isset($_POST['id'])) {
            $this->notFound("Es necesario enviar el id para editar una tutoría");
        } elseif (!isset($_POST['anho'])) {
            $this->notFound("Es necesario enviar el id del año académico para añadir una tutoría");
        } elseif (!isset($_POST['profesor'])) {
            $this->notFound("Es necesario enviar id del profesor para añadir una tutoría");
        } elseif (!isset($_POST['espacio'])) {
            $this->notFound("Es necesario enviar id del espacio para añadir una tutoría");
        }  elseif (!isset($_POST['asistencia'])) {
            $this->notFound("Es necesario enviar la asistencia para añadir una tutoría");
        }  elseif (!isset($_POST['fecha'])) {
            $this->notFound("Es necesario enviar la fecha para añadir una tutoría");
        }   elseif (!isset($_POST['hora_inicio'])) {
            $this->notFound("Es necesario enviar la hora de inicio para añadir una tutoría");
        }   elseif (!isset($_POST['hora_fin'])) {
            $this->notFound("Es necesario enviar la hora de fin para añadir una tutoría");
        }else {
            $id = $_POST['id'];
            $anho = $_POST['anho'];
            $profesor = $_POST['profesor'];
            $espacio = $_POST['espacio'];
            $asistencia = $_POST['asistencia'];
            $fecha = $_POST['fecha'];
            $hora_inicio = $_POST['hora_inicio'];
            $hora_fin = $_POST['hora_fin'];

            try {
                $Tutorias_Service = new Tutorias_service();
                $resultado = $Tutorias_Service->editTutoria($id, $anho, $profesor, $espacio, $asistencia, $fecha, $hora_inicio, $hora_fin);
                if ($resultado) {
                    $this->echoOk(array("resultado" => strval($resultado)));
                } else {
                    $this->echoOk(array("resultado" => "No se ha podido editar la tutoría"));
                }
            } catch (ValidationException $ex) {
                $this->notFound($ex->getERROR());
            } catch (DBException $ex) {
                switch ($ex->getERROR()) {
                    case "4002":
                        $this->notFound("Tutoría duplicada");
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
            $this->notFound("Es necesario enviar el id para mostrar la tutoría");
        } else {
            $id = $_POST['id'];
            try {
                $Tutorias_Service = new Tutorias_service();
                $resultado = $Tutorias_Service->show($id);
                if ($resultado) {
                    $this->echoOk($resultado);
                } else {
                    $this->notFound(array("resultado" => "La tutoría no se pudo mostrar"));
                }
            } catch (ValidationException $ex) {
                $this->notFound($ex->getERROR());
            } catch (ResourceNotFound $ex) {
                $this->notFound($ex->getERROR());
            }
        }
    }

    function asistencia()
    {
        if (!isset($_POST['id'])) {
            $this->notFound("Es necesario enviar el id para marcar la asistencia");
        } elseif (!isset($_POST['asistencia'])) {
            $this->notFound("Es necesario enviar la asistencia");
        } else {
            $id = $_POST['id'];
            $asistencia= $_POST['asistencia'];
            try {
                $Tutorias_Service = new Tutorias_service();
                $resultado = $Tutorias_Service->asistencia($id,$asistencia);
                if ($resultado) {
                    $this->echoOk($resultado);
                } else {
                    $this->notFound(array("resultado" => "La asistencia no se pudo marcar"));
                }
            } catch (ResourceNotFound $ex) {
                $this->notFound($ex->getERROR());
            }
        }
    }
    function calendar(){
        $Tutorias_Service = new Tutorias_service();
        $resultado = $Tutorias_Service->getTutorias($this->DNI);
        $this->echoOk($resultado);
    }

    function info_add()
    {
        $Tutorias_Service = new Tutorias_service();
        $resultado = $Tutorias_Service->info_add();
        $this->echoOk($resultado);
    }
}