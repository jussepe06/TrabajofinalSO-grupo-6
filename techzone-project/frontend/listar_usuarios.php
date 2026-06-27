<?php
header('Content-Type: application/json');

$host = "172.31.43.24";
$db = "techzone_db";
$user = "techzone_user";
$password = "techzone123";

$conn = new mysqli($host, $user, $password, $db);

if ($conn->connect_error) {
    echo json_encode([]);
    exit;
}

$sql = "
SELECT
    u.id_usuario,
    CONCAT(u.nombres, ' ', u.apellidos) AS nombre,
    u.correo,
    r.nombre AS rol
FROM usuarios u
LEFT JOIN roles r
ON u.id_rol = r.id_rol
ORDER BY u.id_usuario DESC
";

$result = $conn->query($sql);

if (!$result) {
    echo json_encode([]);
    exit;
}

$usuarios = [];

while ($row = $result->fetch_assoc()) {
    $usuarios[] = $row;
}

echo json_encode($usuarios);

$conn->close();
?>