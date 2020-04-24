<?php
require_once 'dbh.inc.php';
$borrar = filter_input(INPUT_POST, 'borrar');

if (isset($borrar)) {
    if ($borrar) {
        if ($result = $conn->query("TRUNCATE TABLE coches")) {
            echo "Se han eliminado todos los coches correctamente";
        }
    }
}
