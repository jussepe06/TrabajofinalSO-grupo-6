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
    p.id_pedido,
    CONCAT(u.nombres, ' ', u.apellidos) AS cliente,
    p.fecha_pedido,
    p.total,
    p.estado
FROM pedidos p
LEFT JOIN usuarios u
ON p.id_usuario = u.id_usuario
ORDER BY p.fecha_pedido DESC
";

$result = $conn->query($sql);

$pedidos = [];

while ($row = $result->fetch_assoc()) {
    $pedidos[] = $row;
}

echo json_encode($pedidos);

$conn->close();
?>
