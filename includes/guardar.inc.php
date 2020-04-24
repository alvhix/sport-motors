<?php
require_once 'dbh.inc.php';
session_start();

// Obtengo las variables del formulario
$marca = filter_input(INPUT_POST, 'marca');
$modelo = filter_input(INPUT_POST, 'modelo');
$kilometraje = filter_input(INPUT_POST, 'kilometraje');
$precio = filter_input(INPUT_POST, 'precio');

$color = filter_input(INPUT_POST, 'color');
$año = filter_input(INPUT_POST, 'año');
$potencia = filter_input(INPUT_POST, 'potencia');
$combustible = filter_input(INPUT_POST, 'combustible');

// Si las variables están seteadas
if (isset($marca) && isset($modelo) && isset($kilometraje) && isset($precio) && isset($color) && isset($año) && isset($potencia) && isset($combustible)) {
    // Si los campos no están vacíos
    if (!empty($marca) && !empty($modelo) && !empty($kilometraje) && !empty($precio) && !empty($color) && !empty($año) && !empty($potencia) && !empty($combustible)) {
        if ($stmt = $conn->prepare("INSERT INTO coches (marca, modelo, kilometraje, precio, color, año, potencia, combustible) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"));
        $stmt->bind_param("ssiisiis", $marca, $modelo, $kilometraje, $precio, $color, $año, $potencia, $combustible);
        $stmt->execute();
        $stmt->close();
        $_SESSION['exito'] = true;
    }
}

$conn->close();

header("Location: ../formulario.php");
exit();
