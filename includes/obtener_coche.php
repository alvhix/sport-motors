<?php
require_once 'dbh.inc.php';
$id = filter_input(INPUT_POST, 'id');

if (isset($id)) {
    if (!empty($id)) {
        if ($stmt = $conn->prepare("SELECT * FROM coches WHERE id = ?")) {
            $stmt->bind_param('i', $id);
            $stmt->execute();
            $stmt->store_result();

            if ($stmt->num_rows === 1) {
                $stmt->bind_result($id, $marca, $modelo, $color, $año, $potencia, $combustible, $kilometraje, $precio);
                $stmt->fetch();
                $stmt->close();
                $arr = array('id' => $id, 'marca' => $marca, 'modelo' => $modelo, 'color' => $color, 'año' => $año, 'potencia' => $potencia, 'combustible' => $combustible, 'kilometraje' => $kilometraje, 'precio' => $precio);
                echo json_encode($arr);
            }
        }
    }
}
