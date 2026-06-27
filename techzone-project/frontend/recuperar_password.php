<?php
header('Content-Type: application/json');

$host = "172.31.43.24";
$db = "techzone_db";
$user = "techzone_user";
$password = "techzone123";

$data = json_decode(file_get_contents("php://input"), true);

$correo = trim($data["correo"] ?? "");
$nuevaPassword = trim($data["password"] ?? "");

if ($correo === "" || $nuevaPassword === "") {
    echo json_encode([
        "success" => false,
        "message" => "Completa correo y nueva contraseña."
    ]);
    exit;
}

$conn = new mysqli($host, $user, $password, $db);

if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "Error de conexión."
    ]);
    exit;
}

$passwordHash = password_hash($nuevaPassword, PASSWORD_DEFAULT);

$stmt = $conn->prepare("
    UPDATE usuarios
    SET password = ?
    WHERE correo = ?
");

$stmt->bind_param("ss", $passwordHash, $correo);

if ($stmt->execute() && $stmt->affected_rows > 0) {
    echo json_encode([
        "success" => true,
        "message" => "Contraseña actualizada correctamente."
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Correo no encontrado."
    ]);
}

$stmt->close();
$conn->close();
?>
