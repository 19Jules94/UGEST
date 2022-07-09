<?php
include_once './Controller/Basic_Controller.php';
include_once './Service/AAcademico_service.php';

class AAcademico_controller extends Basic_Controller
{

    function __construct()
    {
        parent::__construct();
        $this->controller();
    }

    private function controller()
    {
        if (!$this->IS_LOGGED) {
            $this->unauthorized();
        } else if (!isset($_REQUEST['action'])) {
            $this->notFound("Es necesario indicar un acción");
        } else {
            switch ($_REQUEST['action']) {
                case 'add':
                    $this->canUseAction("AACADEMICO", "ADD") ? $this->addAAcademico() : $this->forbidden("ANHO_ACADEMICO", "ADD");
                    break;
                case 'showall'://ver todos
                    $this->canUseAction("AACADEMICO", "SHOWALL") ? $this->mostrarTodos() : $this->forbidden("ANHO_ACADEMICO", "SHOWALL");
                    break;
                case 'delete':
                    $this->canUseAction("AACADEMICO", "DELETE") ? $this->deleteAAcademico() : $this->forbidden("ANHO_ACADEMICO", "DELETE");
                    break;
                default:
                    $this->notFound("No se puede realizar esa acción");
            }
        }
    }

    private function addAAcademico()
    {
        if (!isset($_POST['id'])) {
            $this->notFound("Es necesario enviar el id para añadir un año académico");
        } else {
            $id = $_POST['id'];
            try {
                $Anho_Academico_Service = new AAcademico_service();
                $resultado = $Anho_Academico_Service->addAAcademico($id);
                if ($resultado) {
                    $this->echoOk(array("resultado" => strval($resultado)));
                } else {
                    $this->echoOk(array("resultado" => $resultado));
                }
            } catch (ValidationException $ex) {
                $this->notFound($ex->getERROR());
            } catch (DBException $ex) {
                switch ($ex->getERROR()) {
                    case "4002":
                        $this->notFound("Año duplicado");
                        break;
                }
            }
        }
    }

    private function mostrarTodos()
    {
        $Anho_Academico_Service = new AAcademico_service();
        $resultado = $Anho_Academico_Service->mostrarTodos();
        $this->echoOk($resultado);
    }

    private function deleteAAcademico()
    {
        if (!isset($_POST['id'])) {
            $this->notFound("Es necesario enviar el id para borrar un año académico");
        } else {
            $id = $_POST['id'];
            try {
                $Anho_Academico_Service = new AAcademico_service();
                $resultado = $Anho_Academico_Service->deleteAAcademico($id);
                if ($resultado) {
                    $this->echoOk(array("resultado" => "Anho eliminado"));
                } else {
                    $this->notFound(array("resultado" => $resultado));
                }
            } catch (ValidationException $ex) {
                $this->notFound($ex->getERROR());
            } catch (ResourceNotFound $ex){
                $this->notFound($ex->getERROR());
            }
        }

    }


}