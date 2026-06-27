<?php
header('Content-Type: application/json');

$host = "172.31.43.24";
$db = "techzone_db";
$user = "techzone_user";
$password = "techzone123";

$data = json_decode(file_get_contents("php://input"), true);

$id_usuario = intval($data["id_usuario"] ?? 0);
$items = $data["items"] ?? [];

if ($id_usuario <= 0 || count($items) === 0) {
    echo json_encode(["success" => false, "message" => "Pedido inválido."]);
    exit;
}

$conn = new mysqli($host, $user, $password, $db);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Error de conexión."]);
    exit;
}

$conn->begin_transaction();

try {
    $total = 0;

    foreach ($items as $item) {
        $id_producto = intval($item["id"]);
        $cantidad = intval($item["quantity"]);

        $stmtStockCheck = $conn->prepare("
            SELECT nombre, stock, precio
            FROM productos
            WHERE id_producto = ?
            FOR UPDATE
        ");

        $stmtStockCheck->bind_param("i", $id_producto);
        $stmtStockCheck->execute();
        $producto = $stmtStockCheck->get_result()->fetch_assoc();

        if (!$producto) {
            throw new Exception("Producto no encontrado.");
        }

        if ($producto["stock"] < $cantidad) {
            throw new Exception("Stock insuficiente para: " . $producto["nombre"]);
        }

        $total += floatval($producto["precio"]) * $cantidad;
    }

    $stmtPedido = $conn->prepare("
        INSERT INTO pedidos (id_usuario, total, estado)
        VALUES (?, ?, 'pendiente')
    ");

    $stmtPedido->bind_param("id", $id_usuario, $total);
    $stmtPedido->execute();

    $id_pedido = $conn->insert_id;

    $stmtDetalle = $conn->prepare("
        INSERT INTO detalle_pedido
        (id_pedido, id_producto, cantidad, precio_unitario, subtotal)
        VALUES (?, ?, ?, ?, ?)
    ");

    $stmtStockUpdate = $conn->prepare("
        UPDATE productos
        SET stock = stock - ?
        WHERE id_producto = ?
    ");

    foreach ($items as $item) {
        $id_producto = intval($item["id"]);
        $cantidad = intval($item["quantity"]);

        $stmtPrecio = $conn->prepare("
            SELECT precio
            FROM productos
            WHERE id_producto = ?
        ");

        $stmtPrecio->bind_param("i", $id_producto);
        $stmtPrecio->execute();
        $productoPrecio = $stmtPrecio->get_result()->fetch_assoc();

        $precio = floatval($productoPrecio["precio"]);
        $subtotal = $cantidad * $precio;

        $stmtDetalle->bind_param(
            "iiidd",
            $id_pedido,
            $id_producto,
            $cantidad,
            $precio,
            $subtotal
        );

        $stmtDetalle->execute();

        $stmtStockUpdate->bind_param(
            "ii",
            $cantidad,
            $id_producto
        );

        $stmtStockUpdate->execute();
    }

    $conn->commit();

    echo json_encode([
        "success" => true,
        "message" => "Pedido registrado correctamente.",
        "id_pedido" => $id_pedido
    ]);

} catch (Exception $e) {
    $conn->rollback();

    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}

$conn->close();
?>