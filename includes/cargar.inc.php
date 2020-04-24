<?php
require_once 'dbh.inc.php';
$arr = array();

if ($result = $conn->query("SELECT * FROM coches")) {
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            array_push($arr, $row);
        }
    }
}

echo json_encode($arr);
