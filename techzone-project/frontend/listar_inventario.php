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
    p.id_producto,
    p.nombre,
    p.precio,
    p.stock,
    p.estado,
    p.imagen,
    CONCAT(u.nombres, ' ', u.apellidos) AS vendedor
FROM productos p
LEFT JOIN usuarios u
ON p.id_vendedor = u.id_usuario
ORDER BY p.id_producto DESC
";

$result = $conn->query($sql);

$productos = [];

while ($row = $result->fetch_assoc()) {
    $productos[] = $row;
}

echo json_encode($productos);

$conn->close();
?>
