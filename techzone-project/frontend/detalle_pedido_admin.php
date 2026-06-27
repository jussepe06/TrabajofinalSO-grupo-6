<?php
header('Content-Type: application/json');

$host = "172.31.43.24";
$db = "techzone_db";
$user = "techzone_user";
$password = "techzone123";

$id_pedido = intval($_GET["id_pedido"] ?? 0);

$conn = new mysqli($host, $user, $password, $db);

if ($conn->connect_error || $id_pedido <= 0) {
    echo json_encode([]);
    exit;
}

$stmt = $conn->prepare("
    SELECT
        pr.nombre AS producto,
        dp.cantidad,
        dp.precio_unitario,
        dp.subtotal
    FROM detalle_pedido dp
    INNER JOIN productos pr
    ON dp.id_producto = pr.id_producto
    WHERE dp.id_pedido = ?
");

$stmt->bind_param("i", $id_pedido);
$stmt->execute();

$result = $stmt->get_result();

$detalles = [];

while ($row = $result->fetch_assoc()) {
    $detalles[] = $row;
}

echo json_encode($detalles);

$stmt->close();
$conn->close();
?>
