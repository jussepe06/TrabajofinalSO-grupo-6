<?php
header('Content-Type: application/json');

$host = "172.31.43.24";
$db = "techzone_db";
$user = "techzone_user";
$password = "techzone123";

$data = json_decode(file_get_contents("php://input"), true);

$correo = trim($data["correo"] ?? "");
$clave = trim($data["password"] ?? "");

if ($correo === "" || $clave === "") {
    echo json_encode(["success" => false, "message" => "Ingrese correo y contraseña."]);
    exit;
}

$conn = new mysqli($host, $user, $password, $db);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Error de conexión con la base de datos."]);
    exit;
}

$stmt = $conn->prepare("
    SELECT u.id_usuario, u.nombres, u.apellidos, u.correo, u.password, u.id_rol, r.nombre AS rol_nombre
    FROM usuarios u
    INNER JOIN roles r ON u.id_rol = r.id_rol
    WHERE u.correo = ?
");

$stmt->bind_param("s", $correo);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $usuario = $result->fetch_assoc();

    if (password_verify($clave, $usuario["password"])) {
        echo json_encode([
            "success" => true,
            "message" => "Inicio de sesión correcto.",
            "usuario" => [
                "id" => $usuario["id_usuario"],
                "nombres" => $usuario["nombres"],
                "apellidos" => $usuario["apellidos"],
                "correo" => $usuario["correo"],
                "id_rol" => $usuario["id_rol"],
                "rol" => $usuario["rol_nombre"]
            ]
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Contraseña incorrecta."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Usuario no encontrado."]);
}

$stmt->close();
$conn->close();
?>