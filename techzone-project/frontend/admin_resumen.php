<?php
header('Content-Type: application/json');

$host = "172.31.43.24";
$db = "techzone_db";
$user = "techzone_user";
$password = "techzone123";

$conn = new mysqli($host, $user, $password, $db);

if ($conn->connect_error) {
    echo json_encode(["success" => false]);
    exit;
}

function getTotal($conn, $sql) {
    $result = $conn->query($sql);
    if (!$result) return 0;
    $row = $result->fetch_assoc();
    return $row["total"] ?? 0;
}

$totalUsuarios = getTotal($conn, "SELECT COUNT(*) total FROM usuarios");
$totalClientes = getTotal($conn, "SELECT COUNT(*) total FROM usuarios WHERE id_rol = 1");
$totalVendedores = getTotal($conn, "SELECT COUNT(*) total FROM usuarios WHERE id_rol = 2");
$totalAdmins = getTotal($conn, "SELECT COUNT(*) total FROM usuarios WHERE id_rol = 3");

$totalPedidos = getTotal($conn, "SELECT COUNT(*) total FROM pedidos");
$ventasTotales = getTotal($conn, "SELECT IFNULL(SUM(total),0) total FROM pedidos");
$pedidosPendientes = getTotal($conn, "SELECT COUNT(*) total FROM pedidos WHERE estado = 'pendiente'");
$pedidosPagados = getTotal($conn, "SELECT COUNT(*) total FROM pedidos WHERE estado = 'pagado'");

$productosActivos = getTotal($conn, "SELECT COUNT(*) total FROM productos WHERE estado = 'activo'");
$productosInactivos = getTotal($conn, "SELECT COUNT(*) total FROM productos WHERE estado = 'inactivo'");
$stockTotal = getTotal($conn, "SELECT IFNULL(SUM(stock),0) total FROM productos WHERE estado = 'activo'");
$stockBajo = getTotal($conn, "SELECT COUNT(*) total FROM productos WHERE estado = 'activo' AND stock <= 5");

echo json_encode([
    "success" => true,

    "usuarios" => $totalUsuarios,
    "clientes" => $totalClientes,
    "vendedores" => $totalVendedores,
    "admins" => $totalAdmins,

    "pedidos" => $totalPedidos,
    "ventas" => $ventasTotales,
    "pendientes" => $pedidosPendientes,
    "pagados" => $pedidosPagados,

    "productos_activos" => $productosActivos,
    "productos_inactivos" => $productosInactivos,
    "stock_total" => $stockTotal,
    "stock_bajo" => $stockBajo
]);

$conn->close();
?>