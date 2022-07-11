<?php
include_once './Controller/Basic_Controller.php';
include_once './Service/Usuario_service.php';

class Usuarios_controller extends Basic_Controller
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
            case 'edit-password':
                $this->modificarPassEmail();
                break;
            default:
                $this->notFound("No se puede realizar esa acción");
        }
    }
}

function addUsuario()
{
    if (!isset($_POST['dni'])) {
        $this->notFound("Es necesario enviar el dni para añadir un usaurio");
    } elseif (!isset($_POST['nombre'])) {
        $this->notFound("Es necesario enviar el nombre para añadir un usaurio");
    } elseif (!isset($_POST['apellidos'])) {
        $this->notFound("Es necesario enviar los apellidos para añadir un usaurio");
    } elseif (!isset($_POST['email'])) {
        $this->notFound("Es necesario enviar el email para añadir un usaurio");
    } elseif (!isset($_POST['password'])) {
        $this->notFound("Es necesario enviar la contraseña para añadir un usaurio");
    } else {
        $dni = $_POST['dni'];
        $nombre = $_POST['nombre'];
        $apellidos = $_POST['apellidos'];
        $email = $_POST['email'];
        $password = $_POST['password'];

        try {
            $Usuarios_Service = new Usuarios_service();
            $resultado = $Usuarios_Service->addUsuario($dni, $nombre, $apellidos, $email, $password);
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
                    $this->notFound("Usuario duplicada");
                    break;
            }
        }

    }
}
function mostrarTodos()
{
    $Usuarios_Service = new Usuarios_service();
    $resultado = $Usuarios_Service->mostrarTodos();
    $this->echoOk($resultado);
}

function deleteUsuario()
{
    if (!isset($_POST['dni'])) {
        $this->notFound("Es necesario enviar el dni para borrar");
    } else {
        $dni = $_POST['dni'];
        try {
            $Usuarios_Service = new Usuarios_service();
            $resultado = $Usuarios_Service->deleteUsuario($dni);
            if ($resultado) {
                $this->echoOk(array("resultado" => "Usuario eliminado"));
            } else {
                $this->notFound(array("resultado" => $resultado));
            }
        } catch (ValidationException $ex) {
            $this->notFound($ex->getERROR());
        } catch (ResourceNotFound $ex) {
            $this->notFound($ex->getERROR());
        }
    }
}
private function modificarPassEmail()
{
    if (!isset($_POST['password']) && !isset($_POST['email'])) {
        $this->notFound("Es necesario enviar la nueva contraseña  para modificarla");
    } else {
        $email = $_POST['email'];
        $password = $_POST['password'];

        try {
            $Usuarios_Service = new Usuarios_service();
            $resultado = $Usuarios_Service->modificarPasswordEmail($this->DNI,$email, $password);
            if ($resultado) {
                $this->echoOk(array("resultado" => strval($resultado)));
            } else {
                $this->echoOk(array("resultado" => "La contraseña no se pudo cambiar"));
            }
        } catch (ResourceNotFound $ex) {
            $this->notFound($ex->getERROR());
        } catch (ValidationException $ex) {
            $this->notFound($ex->getERROR());
        }
    }
}
}