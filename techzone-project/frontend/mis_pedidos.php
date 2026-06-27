<?php
header('Content-Type: application/json');

$host = "172.31.43.24";
$db = "techzone_db";
$user = "techzone_user";
$password = "techzone123";

$id_usuario = intval($_GET["id_usuario"] ?? 0);

$conn = new mysqli($host, $user, $password, $db);

if ($conn->connect_error) {
    echo json_encode([]);
    exit;
}

$stmt = $conn->prepare("
    SELECT
        id_pedido,
        fecha_pedido,
        total,
        estado
    FROM pedidos
    WHERE id_usuario = ?
    ORDER BY fecha_pedido DESC
");

$stmt->bind_param("i", $id_usuario);
$stmt->execute();

$result = $stmt->get_result();

$pedidos = [];

while ($row = $result->fetch_assoc()) {
    $pedidos[] = $row;
}

echo json_encode($pedidos);

$stmt->close();
$conn->close();
?>
