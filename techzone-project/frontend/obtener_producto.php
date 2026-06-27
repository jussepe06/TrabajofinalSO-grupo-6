<?php
header('Content-Type: application/json');

$host = "172.31.43.24";
$db = "techzone_db";
$user = "techzone_user";
$password = "techzone123";

$id_producto = intval($_GET["id"] ?? 0);

$conn = new mysqli($host, $user, $password, $db);

if ($conn->connect_error || $id_producto <= 0) {
    echo json_encode(["success" => false]);
    exit;
}

$stmt = $conn->prepare("
    SELECT
        p.id_producto,
        p.nombre,
        p.descripcion,
        p.precio,
        p.stock,
        p.imagen,
        p.estado,
        p.caracteristicas,
        p.id_categoria,
        c.nombre AS categoria,
        CONCAT(u.nombres, ' ', u.apellidos) AS vendedor
    FROM productos p
    LEFT JOIN categorias c
    ON p.id_categoria = c.id_categoria
    LEFT JOIN usuarios u
    ON p.id_vendedor = u.id_usuario
    WHERE p.id_producto = ?
    LIMIT 1
");

$stmt->bind_param("i", $id_producto);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["success" => false]);
    exit;
}

$producto = $result->fetch_assoc();

echo json_encode([
    "success" => true,
    "producto" => $producto
]);

$stmt->close();
$conn->close();
?>
