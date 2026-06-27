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
    p.descripcion,
    p.precio,
    p.stock,
    p.imagen,
    p.id_categoria,
    c.nombre AS categoria
FROM productos p
INNER JOIN categorias c
    ON p.id_categoria = c.id_categoria
WHERE p.estado = 'activo'
";

$result = $conn->query($sql);

$productos = [];

while ($row = $result->fetch_assoc()) {

    $productos[] = [
        "id" => $row["id_producto"],
        "name" => $row["nombre"],
        "description" => $row["descripcion"],
        "price" => floatval($row["precio"]),
        "stock" => intval($row["stock"]),
        "image" => $row["imagen"] ?: "images/default.jpg",
        "id_categoria" => intval($row["id_categoria"]),
        "categoria" => $row["categoria"]
    ];

}

echo json_encode($productos);

$conn->close();
?>