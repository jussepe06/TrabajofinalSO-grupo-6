<?php
header('Content-Type: application/json');

$host = "172.31.43.24";
$db = "techzone_db";
$user = "techzone_user";
$password = "techzone123";

$nombre = trim($_POST["nombre"] ?? "");
$descripcion = trim($_POST["descripcion"] ?? "");
$precio = floatval($_POST["precio"] ?? 0);
$stock = intval($_POST["stock"] ?? 0);
$imagen_url = trim($_POST["imagen_url"] ?? "");
$id_vendedor = intval($_POST["id_vendedor"] ?? 0);
$id_categoria = intval($_POST["id_categoria"] ?? 1);

$imagen = $imagen_url;

if (isset($_FILES["imagen_file"]) && $_FILES["imagen_file"]["error"] === UPLOAD_ERR_OK) {

    $uploadDir = "uploads/";

    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $fileName = time() . "_" . basename($_FILES["imagen_file"]["name"]);
    $targetPath = $uploadDir . $fileName;

    if (move_uploaded_file($_FILES["imagen_file"]["tmp_name"], $targetPath)) {
        $imagen = $targetPath;
    }
}

if ($nombre === "" || $precio <= 0 || $stock < 0) {
    echo json_encode([
        "success" => false,
        "message" => "Completa nombre, precio y stock."
    ]);
    exit;
}

$conn = new mysqli($host, $user, $password, $db);

if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "Error de conexión con la base de datos."
    ]);
    exit;
}

$stmt = $conn->prepare("
    INSERT INTO productos
    (
        nombre,
        descripcion,
        precio,
        stock,
        imagen,
        estado,
        id_vendedor,
        id_categoria
    )
    VALUES
    (
        ?, ?, ?, ?, ?, 'activo', ?, ?
    )
");

$stmt->bind_param(
    "ssdisi",
    $nombre,
    $descripcion,
    $precio,
    $stock,
    $imagen,
    $id_vendedor,
    $id_categoria
);

if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "Producto agregado correctamente."
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => $stmt->error
    ]);

}

$stmt->close();
$conn->close();
?>