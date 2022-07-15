<?php

include_once './Controller/Basic_Controller.php';
include_once './Service/Horarios_service.php';
include_once './Utils/ResourceNotFound.php';

class Horarios_controller extends Basic_Controller
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
                case 'add': //añadir
                    $this->canUseAction("HORARIO", "ADD") ? $this->addHorario() : $this->forbidden("HORARIO", "ADD");
                    break;
                case 'info_add': //Get info to add
                    $this->canUseAction("HORARIO", "ADD") ? $this->info_add() : $this->forbidden("HORARIO", "ADD");
                    break;
                case 'showall': //ver todos
                    $this->canUseAction("HORARIO", "SHOWALL") ? $this->mostrarTodos() : $this->forbidden("HORARIO", "SHOWALL");
                    break;
                case 'delete': //borrar
                    $this->canUseAction("HORARIO", "DELETE") ? $this->deleteHorario() : $this->forbidden("HORARIO", "DELETE");
                    break;
                case 'show': //ver 1
                    $this->canUseAction("HORARIO", "SHOWCURRENT") ? $this->show() : $this->forbidden("HORARIO", "SHOWCURRENT");
                    break;
                case 'edit': //editar
                    $this->canUseAction("HORARIO", "EDIT") ? $this->editHorario() : $this->forbidden("HORARIO", "EDIT");
                    break;
                case 'calendar': //editar
                    $this->canUseAction("HORARIO", "ASISTENCIA") ? $this->calendar() : $this->forbidden("HORARIO", "ASISTENCIA");
                    break;
                case 'asistencia': //editar
                    $this->canUseAction("HORARIO", "ASISTENCIA") ? $this->asistencia() : $this->forbidden("HORARIO", "ASISTENCIA");
                    break;
                default: //caso default
                    $this->notFound("No se puede realizar esa acción");
            }
        }
    }

    function addHorario()
    {
        if (!isset($_POST['anho'])) {
            $this->notFound("Es necesario enviar el id del año académico para añadir un horario");
        } elseif (!isset($_POST['profesor'])) {
            $this->notFound("Es necesario enviar id del profesor para añadir un horario");
        } elseif (!isset($_POST['espacio'])) {
            $this->notFound("Es necesario enviar id del espacio para añadir un horario");
        } elseif (!isset($_POST['grupo'])) {
            $this->notFound("Es necesario enviar id del grupo para añadir un horario");
        } elseif (!isset($_POST['asignatura'])) {
            $this->notFound("Es necesario enviar id de la asignatura para añadir un horario");
        } elseif (!isset($_POST['titulacion'])) {
            $this->notFound("Es necesario enviar el id de la titulación para añadir un horario");
        } elseif (!isset($_POST['fecha'])) {
            $this->notFound("Es necesario enviar la fecha para añadir un horario");
        } elseif (!isset($_POST['hora_inicio'])) {
            $this->notFound("Es necesario enviar la hora de inicio para añadir un horario");
        } elseif (!isset($_POST['hora_fin'])) {
            $this->notFound("Es necesario enviar la hora de fin para añadir un horario");
        } elseif (!isset($_POST['asistencia'])) {
            $this->notFound("Es necesario enviar la asistencia para añadir un horario");
        } elseif (!isset($_POST['dia'])) {
            $this->notFound("Es necesario enviar el día añadir un horario");
        } else {
            $anho = $_POST['anho'];
            $profesor = $_POST['profesor'];
            $espacio = $_POST['espacio'];
            $grupo = $_POST['grupo'];
            $asignatura = $_POST['asignatura'];
            $titulacion = $_POST['titulacion'];
            $fecha = $_POST['fecha'];
            $hora_inicio = $_POST['hora_inicio'];
            $hora_fin = $_POST['hora_fin'];
            $asistencia = $_POST['asistencia'];
            $dia = $_POST['dia'];

            try {
                $Horarios_Service = new Horarios_service();
                $resultado = $Horarios_Service->addHorario($anho, $profesor, $espacio, $grupo, $asignatura, $titulacion, $fecha, $hora_inicio, $hora_fin, $asistencia, $dia);
                if ($resultado) {
                    $this->echoOk(array("resultado" => strval($resultado)));
                } else {
                    $this->echoOk(array("resultado" => "El horario no se pudo añadir"));
                }
            } catch (ValidationException $ex) {
                $this->notFound($ex->getERROR());
            } catch (DBException $ex) {
                switch ($ex->getERROR()) {
                    case "4001":
                        $this->notFound("Ya existe un horario establecido a esa hora del día en este espacio.");
                        break;
                    case "4002":
                        $this->notFound("Horario duplicado");
                        break;
                    case "4004":
                        $this->notFound("Alguno de los elementos introducidos no existe en la base de datos.");
                        break;
                    case "40011":
                        $this->notFound("El espacio seleccionado no se encuentra disponible en este horario");
                        break;
                    case "40012":
                        $this->notFound("El grupo seleccionado no se encuentra disponible en este horario");
                        break;
                    case "40013":
                        $this->notFound("El profesor seleccionado no se encuentra disponible en este horario");
                        break;
                }
            }
        }
    }

    function mostrarTodos()
    {
        $Horarios_Service = new Horarios_service();
        $resultado = $Horarios_Service->mostrarTodos();
        $this->echoOk($resultado);
    }

    function deleteHorario()
    {
        if (!isset($_POST['id'])) {
            $this->notFound("Es necesario enviar el id para borrar un horario.");
        } else {
            $id = $_POST['id'];
            try {
                $Horarios_Service = new Horarios_service();
                $resultado = $Horarios_Service->deleteHorario($id);
                if ($resultado) {
                    $this->echoOk(array("resultado" => "Horario eliminado"));
                } else {
                    $this->notFound(array("resultado" => "El horario no se pudo eliminar"));
                }
            } catch (ValidationException $ex) {
                $this->notFound($ex->getERROR());
            } catch (ResourceNotFound $rnf) {
                $this->notFound("No se ha podido encontrar el id introducido.");
            }
        }
    }

    function editHorario()
    {
        if (!isset($_POST['id'])) {
            $this->notFound("Es necesario enviar el id para editar un horario");
        } elseif (!isset($_POST['anho'])) {
            $this->notFound("Es necesario enviar el id del año académico para editar un horario");
        } elseif (!isset($_POST['profesor'])) {
            $this->notFound("Es necesario enviar id del profesor para editar un horario");
        } elseif (!isset($_POST['espacio'])) {
            $this->notFound("Es necesario enviar id del espacio para editar un horario");
        } elseif (!isset($_POST['grupo'])) {
            $this->notFound("Es necesario enviar id del grupo para editar un horario");
        } elseif (!isset($_POST['asignatura'])) {
            $this->notFound("Es necesario enviar id de la asignatura para editar un horario");
        } elseif (!isset($_POST['titulacion'])) {
            $this->notFound("Es necesario enviar el id de la titulación para editar un horario");
        } elseif (!isset($_POST['fecha'])) {
            $this->notFound("Es necesario enviar la fecha para editar un horario");
        } elseif (!isset($_POST['hora_inicio'])) {
            $this->notFound("Es necesario enviar la hora de inicio para editar un horario");
        } elseif (!isset($_POST['hora_fin'])) {
            $this->notFound("Es necesario enviar la hora de fin para editar un horario");
        } elseif (!isset($_POST['asistencia'])) {
            $this->notFound("Es necesario enviar la asistencia para editar un horario");
        } elseif (!isset($_POST['dia'])) {
            $this->notFound("Es necesario enviar el día editar un horario");
        } else {
            $id = $_POST['id'];
            $anho = $_POST['anho'];
            $profesor = $_POST['profesor'];
            $espacio = $_POST['espacio'];
            $grupo = $_POST['grupo'];
            $asignatura = $_POST['asignatura'];
            $titulacion = $_POST['titulacion'];
            $fecha = $_POST['fecha'];
            $hora_inicio = $_POST['hora_inicio'];
            $hora_fin = $_POST['hora_fin'];
            $asistencia = $_POST['asistencia'];
            $dia = $_POST['dia'];

            try {
                $Horarios_Service = new Horarios_service();
                $resultado = $Horarios_Service->editHorario($id, $anho, $profesor, $espacio, $grupo, $asignatura, $titulacion, $fecha, $hora_inicio, $hora_fin, $asistencia, $dia);
                if ($resultado) {
                    $this->echoOk(array("resultado" => strval($resultado)));
                } else {
                    $this->echoOk(array("resultado" => "No se ha podido editar el horario"));
                }
            } catch (ValidationException $ex) {
                $this->notFound($ex->getERROR());
            } catch (DBException $ex) {
                switch ($ex->getERROR()) {
                    case "4001":
                        $this->notFound("Ya existe un horario establecido a esa hora del día en este espacio.");
                        break;
                    case "4002":
                        $this->notFound("Horario duplicado");
                        break;
                    case "4004":
                        $this->notFound("Alguno de los elementos introducidos no existe en la base de datos");
                        break;
                    case "40011":
                        $this->notFound("El espacio seleccionado no se encuentra disponible en este horario");
                        break;
                    case "40012":
                        $this->notFound("El grupo seleccionado no se encuentra disponible en este horario");
                        break;
                    case "40013":
                        $this->notFound("El profesor seleccionado no se encuentra disponible en este horario");
                        break;
                }
            } catch (ResourceNotFound $rnf) {
                $this->notFound("No se ha podido encontrar el id introducido.");
            }
        }
    }

    function show()
    {
        if (!isset($_POST['id'])) {
            $this->notFound("Es necesario enviar el id para mostrar el horario");
        } else {
            $id = $_POST['id'];
            try {
                $Horarios_Service = new Horarios_service();
                $resultado = $Horarios_Service->show($id);
                if ($resultado) {
                    $this->echoOk($resultado);
                } else {
                    $this->notFound(array("resultado" => "El horario no se pudo mostrar"));
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
                $Horarios_Service = new Horarios_service();
                $resultado = $Horarios_Service->asistencia($id,$asistencia);
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

    function info_add()
    {
        $Horarios_Service = new Horarios_service();
        $resultado = $Horarios_Service->info_add();
        $this->echoOk($resultado);
    }

    private function calendar()
    {
        $Horarios_Service = new Horarios_service();
        $resultado = $Horarios_Service->getTutorias($this->DNI);
        $this->echoOk($resultado);
    }
}
