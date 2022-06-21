<?php
include_once 'C:\wamp64\www\UGEST\core\Model\Base_model.php';

class Base_model {

    protected $db;

    function __construct() {
        $this->db = Connect();
    }

}

?>