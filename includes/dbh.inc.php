<?php
$host = 'localhost';
$username = 'root';
$password = '';
$dbname = 'concesionario';
$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("La conexión con MySQL ha fallado: " . $conn->connect_error);
}
