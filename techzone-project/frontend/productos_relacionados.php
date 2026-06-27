<?php
header('Content-Type: application/json');

$host = "172.31.43.24";
$db = "techzone_db";
$user = "techzone_user";
$password = "techzone123";

$id_producto = intval($_GET["id_producto"] ?? 0);
$id_categoria = intval($_GET["id_categoria"] ?? 0);

$conn = new mysqli($host, $user, $password, $db);

if ($conn->connect_error) {
    echo json_encode([]);
    exit;
}

$stmt = $conn->prepare("
    SELECT 
        id_producto AS id,
        nombre AS name,
        precio AS price,
        imagen AS image
    FROM productos
    WHERE estado = 'activo'
    AND id_categoria = ?
    AND id_producto != ?
    LIMIT 4
");

$stmt->bind_param("ii", $id_categoria, $id_producto);
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
