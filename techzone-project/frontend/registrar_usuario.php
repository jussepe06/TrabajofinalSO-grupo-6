<?php
header('Content-Type: application/json');

$host = "172.31.43.24";
$db = "techzone_db";
$user = "techzone_user";
$password = "techzone123";

$data = json_decode(file_get_contents("php://input"), true);

$nombres = trim($data["nombres"] ?? "");
$apellidos = trim($data["apellidos"] ?? "");
$correo = trim($data["correo"] ?? "");
$clave = trim($data["password"] ?? "");
$telefono = trim($data["telefono"] ?? "");
$direccion = trim($data["direccion"] ?? "");

// Rol recibido desde el frontend.
// 1 = cliente
// 2 = vendedor
$id_rol = intval($data["id_rol"] ?? 1);

// Seguridad: desde la web solo se permite cliente o vendedor.
// Administrador NO puede crearse desde la web.
if ($id_rol !== 1 && $id_rol !== 2) {
    $id_rol = 1;
}

if ($nombres === "" || $apellidos === "" || $correo === "" || $clave === "") {
    echo json_encode([
        "success" => false,
        "message" => "Completa nombres, apellidos, correo y contraseña."
    ]);
    exit;
}

$claveHash = password_hash($clave, PASSWORD_DEFAULT);

$conn = new mysqli($host, $user, $password, $db);

if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "Error de conexión con la base de datos."
    ]);
    exit;
}

$stmt = $conn->prepare("
    INSERT INTO usuarios 
    (nombres, apellidos, correo, password, telefono, direccion, id_rol)
    VALUES (?, ?, ?, ?, ?, ?, ?)
");

$stmt->bind_param(
    "ssssssi",
    $nombres,
    $apellidos,
    $correo,
    $claveHash,
    $telefono,
    $direccion,
    $id_rol
);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Usuario registrado correctamente."
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "No se pudo registrar. Puede que el correo ya exista."
    ]);
}

$stmt->close();
$conn->close();
?>