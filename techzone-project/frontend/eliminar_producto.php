<?php
header('Content-Type: application/json');

$host = "172.31.43.24";
$db = "techzone_db";
$user = "techzone_user";
$password = "techzone123";

$data = json_decode(file_get_contents("php://input"), true);

$id_producto = intval($data["id_producto"] ?? 0);
$id_vendedor = intval($data["id_vendedor"] ?? 0);

if ($id_producto <= 0 || $id_vendedor <= 0) {
    echo json_encode(["success" => false, "message" => "Datos inválidos."]);
    exit;
}

$conn = new mysqli($host, $user, $password, $db);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Error de conexión."]);
    exit;
}

$stmt = $conn->prepare("
    UPDATE productos 
    SET estado = 'inactivo'
    WHERE id_producto = ? AND id_vendedor = ?
");

$stmt->bind_param("ii", $id_producto, $id_vendedor);

if ($stmt->execute() && $stmt->affected_rows > 0) {
    echo json_encode(["success" => true, "message" => "Producto eliminado correctamente."]);
} else {
    echo json_encode(["success" => false, "message" => "No puedes eliminar este producto."]);
}

$stmt->close();
$conn->close();
?>
