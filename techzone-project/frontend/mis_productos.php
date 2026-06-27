<?php
header('Content-Type: application/json');

$host = "172.31.43.24";
$db = "techzone_db";
$user = "techzone_user";
$password = "techzone123";

$id_vendedor = intval($_GET["id_vendedor"] ?? 0);

$conn = new mysqli($host, $user, $password, $db);

if ($conn->connect_error) {
    echo json_encode([]);
    exit;
}

$stmt = $conn->prepare("
    SELECT id_producto, nombre, descripcion, precio, stock, imagen
    FROM productos
    WHERE id_vendedor = ? AND estado = 'activo'
");

$stmt->bind_param("i", $id_vendedor);
$stmt->execute();

$result = $stmt->get_result();

$productos = [];

while ($row = $result->fetch_assoc()) {
    $productos[] = $row;
}

echo json_encode($productos);

$stmt->close();
$conn->close();
?>
