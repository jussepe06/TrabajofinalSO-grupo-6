let cart = [];
let usuarioLogueado = "Invitado";
let products = [];
let categoriaActual = 0;

async function cargarProductosDesdeBD() {
    try {
        const response = await fetch("listar_productos.php");
        products = await response.json();
        renderProducts();
    } catch (error) {
        console.error("Error cargando productos:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const usuarioGuardado = sessionStorage.getItem("techzone_user");

    if (usuarioGuardado) {
        window.usuarioActual = JSON.parse(usuarioGuardado);
        usuarioLogueado = window.usuarioActual.nombres;

        const authModal = document.getElementById("auth-modal");
        if (authModal) authModal.style.display = "none";

        const userMenu = document.getElementById("user-menu");
        const userNameHeader = document.getElementById("user-name-header");

        if (userMenu) userMenu.style.display = "block";
        if (userNameHeader) userNameHeader.textContent = window.usuarioActual.nombres;

        window.sesionRestaurada = true;
        aplicarRol(window.usuarioActual.id_rol, window.usuarioActual.rol);
        window.sesionRestaurada = false;
    } else {
        const authModal = document.getElementById("auth-modal");
        if (authModal) authModal.style.display = "flex";
    }

    cart = JSON.parse(localStorage.getItem("techzone_cart")) || [];

    cargarProductosDesdeBD();
    updateMetrics();
    updateCartUI();
    setInterval(updateMetrics, 5000);

    const cartIcon = document.querySelector(".cart-icon");
    if (cartIcon) cartIcon.addEventListener("click", () => toggleCart());
});

function renderProducts() {
    const container = document.getElementById("products-container");
    if (!container) return;

    const productosFiltrados = categoriaActual === 0
        ? products
        : products.filter(p => Number(p.id_categoria) === Number(categoriaActual));

    if (productosFiltrados.length === 0) {
        container.innerHTML = `<p style="color:var(--text-dim)">No hay productos en esta categoría.</p>`;
        return;
    }

    container.innerHTML = productosFiltrados.map(product => `
        <div class="glass-card product-card product-card-pro">
            <div class="product-category-badge">
                ${product.categoria || "General"}
            </div>

            <div class="product-img-wrapper">
                <img src="${product.image}" alt="${product.name}">
            </div>

            <div class="product-info">
                <h3>${product.name}</h3>

                <div class="product-mini-rating">
                    ★★★★★ <span>4.8</span>
                </div>

                <p class="product-price">S/ ${Number(product.price).toLocaleString()}</p>

                <p class="stock-label">
                    ${product.stock > 0 ? "✔ Stock disponible" : "Sin stock"}
                </p>

                <div class="product-actions-card">
                    <button class="btn-outline w-full" onclick="verDetalleProducto(${product.id})">
                        Ver Detalles
                    </button>

                    <button class="btn-add-cart" onclick="addToCart(${product.id})">
                        <span class="material-icons-round">add_shopping_cart</span>
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    `).join("");
}

function addToCart(productId) {
    const product = products.find(p => Number(p.id) === Number(productId));

    if (!product) {
        alert("Producto no encontrado.");
        return;
    }

    const existing = cart.find(item => Number(item.id) === Number(productId));

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: Number(product.price),
            image: product.image,
            quantity: 1
        });
    }

    updateCartUI();
    guardarCarrito();
    toggleCart(true);
}

function updateCartUI() {
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total-val");

    if (!cartCount || !cartItems || !cartTotal) return;

    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <p style="color: var(--text-dim); text-align:center;">
                El carrito está vacío
            </p>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image || 'images/default.jpg'}" class="cart-item-img">

                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <small>S/ ${Number(item.price).toLocaleString()} c/u</small>

                    <div class="cart-controls">
                        <button onclick="decreaseQuantity(${item.id})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="increaseQuantity(${item.id})">+</button>
                    </div>

                    <button class="remove-item" onclick="removeFromCart(${item.id})">
                        Quitar
                    </button>
                </div>

                <strong>S/ ${(item.price * item.quantity).toLocaleString()}</strong>
            </div>
        `).join("");
    }

    const total = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
    cartTotal.textContent = `S/ ${total.toLocaleString()}`;
}

function toggleCart(forceOpen = null) {
    const sidebar = document.getElementById("cart-sidebar");
    if (!sidebar) return;

    if (forceOpen === true) sidebar.classList.add("active");
    else if (forceOpen === false) sidebar.classList.remove("active");
    else sidebar.classList.toggle("active");
}

async function updateMetrics() {
    try {
        const response = await fetch("api.php");
        if (!response.ok) throw new Error("API no disponible");

        const data = await response.json();

        const cpuVal = document.getElementById("cpu-val");
        const ramVal = document.getElementById("ram-val");
        const procVal = document.getElementById("proc-val");
        const cpuFill = document.getElementById("cpu-fill");
        const ramFill = document.getElementById("ram-fill");

        if (data.cpu && cpuVal && cpuFill) {
            const cpuPercent = Math.round(parseFloat(data.cpu) * 100);
            cpuVal.textContent = `${cpuPercent}%`;
            cpuFill.style.width = `${cpuPercent}%`;
        }

        if (data.ram && ramVal && ramFill) {
            const parts = data.ram.split("/");
            const used = parseInt(parts[0]);
            const total = parseInt(parts[1]);
            const ramPercent = Math.round((used / total) * 100);
            ramVal.textContent = `${ramPercent}%`;
            ramFill.style.width = `${ramPercent}%`;
        }

        if (data.procesos && procVal) procVal.textContent = data.procesos;
    } catch (error) {
        console.error("Error métricas:", error);
    }
}

function showRoleSelection() {
    document.getElementById("auth-title").textContent = "Tipo de cuenta";
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "none";
    document.getElementById("role-selection").style.display = "block";
}

function selectRole(roleId) {
    document.getElementById("role-selection").style.display = "none";
    document.getElementById("register-form").style.display = "block";

    document.getElementById("reg-rol").value = roleId;

    const roleText = roleId === 2 ? "Vendedor" : "Cliente";
    document.getElementById("auth-title").textContent = "Crear cuenta";
    document.getElementById("selected-role-text").textContent = `Cuenta seleccionada: ${roleText}`;
}

function showRegister() {
    showRoleSelection();
}

function showLogin() {
    document.getElementById("auth-title").textContent = "Iniciar sesión";
    document.getElementById("register-form").style.display = "none";
    document.getElementById("role-selection").style.display = "none";
    document.getElementById("login-form").style.display = "block";
    const recover = document.getElementById("recover-form");
    if (recover) recover.style.display = "none";
}

async function registrarUsuario() {
    const nombres = document.getElementById("reg-nombres").value.trim();
    const apellidos = document.getElementById("reg-apellidos").value.trim();
    const correo = document.getElementById("reg-correo").value.trim();
    const password = document.getElementById("reg-password").value.trim();
    const telefono = document.getElementById("reg-telefono").value.trim();
    const direccion = document.getElementById("reg-direccion").value.trim();
    const id_rol = document.getElementById("reg-rol").value;

    if (!nombres || !apellidos || !correo || !password) {
        alert("Completa nombres, apellidos, correo y contraseña.");
        return;
    }

    try {
        const response = await fetch("registrar_usuario.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombres, apellidos, correo, password, telefono, direccion, id_rol })
        });

        const data = await response.json();
        alert(data.message);

        if (data.success) showLogin();
    } catch (error) {
        console.error(error);
        alert("Error al registrar usuario.");
    }
}

async function loginUsuario() {
    const correo = document.getElementById("login-correo").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (!correo || !password) {
        alert("Ingrese correo y contraseña.");
        return;
    }

    try {
        const response = await fetch("login.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ correo, password })
        });

        const data = await response.json();
        alert(data.message);

        if (data.success) {
            usuarioLogueado = data.usuario.nombres;
            window.usuarioActual = data.usuario;
            sessionStorage.setItem("techzone_user", JSON.stringify(data.usuario));
            usuarioLogueado = data.usuario.nombres;

            document.getElementById("auth-modal").style.display = "none";

            const userMenu = document.getElementById("user-menu");
            const userNameHeader = document.getElementById("user-name-header");

            if (userMenu) userMenu.style.display = "block";
            if (userNameHeader) userNameHeader.textContent = data.usuario.nombres;

            aplicarRol(data.usuario.id_rol, data.usuario.rol);
        }

    } catch (error) {
        console.error(error);
        alert("Error al iniciar sesión.");
    }
}

async function procesarCompraMaster() {
    if (!window.usuarioActual || !window.usuarioActual.id) {
        alert("Debes iniciar sesión para comprar.");
        return;
    }

    if (cart.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    const tarjeta = document.getElementById("card-number")?.value || "";

    if (tarjeta.length < 16) {
        alert("Número de tarjeta inválido.");
        return;
    }

    try {
        const response = await fetch("procesar_pedido.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id_usuario: window.usuarioActual.id,
                items: cart
            })
        });

        const data = await response.json();
        alert(data.message);

        if (data.success) {
            cart = [];
            guardarCarrito();
            updateCartUI();
            toggleCart(false);
            cargarProductosDesdeBD();
        }

    } catch (error) {
        console.error(error);
        alert("Error al procesar el pedido.");
    }
}

function switchTab(tabName, element) {
    document.querySelectorAll(".admin-tab").forEach(btn => {
        btn.classList.remove("active");
    });

    element.classList.add("active");

    document.querySelectorAll(".admin-section-content").forEach(section => {
        section.style.display = "none";
    });

    const sectionMap = {
        users: "users-content",
        inventory: "inventory-content",
        sales: "sales-content",
        system: "system-content"
    };

    const selectedSection = document.getElementById(sectionMap[tabName]);

    if (selectedSection) {
        selectedSection.style.display = "block";
    }
}

function aplicarRol(idRol, nombreRol) {
    const adminPanel = document.getElementById("admin");
    const productos = document.getElementById("productos");
    const monitoreo = document.getElementById("monitoreo");
    const vendedorTools = document.getElementById("vendedor-tools");

    const navAdmin = document.getElementById("nav-admin");
    const navMonitoreo = document.getElementById("nav-monitoreo");

    if (!window.sesionRestaurada) {
    alert(`Bienvenido ${usuarioLogueado}. Rol: ${nombreRol}`);
}
    
    const btnRegisterHeader = document.getElementById("btn-register-header");
    if (btnRegisterHeader) btnRegisterHeader.style.display = "none";

    if (idRol == 1) {
        // Cliente
        if (productos) productos.style.display = "block";
        if (adminPanel) adminPanel.style.display = "none";
        if (monitoreo) monitoreo.style.display = "none";
        if (vendedorTools) vendedorTools.style.display = "none";

        if (navAdmin) navAdmin.parentElement.style.display = "none";
        if (navMonitoreo) navMonitoreo.parentElement.style.display = "none";
    }

    if (idRol == 2) {
    // Vendedor
    if (productos) productos.style.display = "block";

    // Ocultar panel admin completo
    if (adminPanel) adminPanel.style.display = "none";

    if (monitoreo) monitoreo.style.display = "none";

    // Mostrar herramientas vendedor
    if (vendedorTools) vendedorTools.style.display = "block";

    if (navAdmin) navAdmin.parentElement.style.display = "none";
    if (navMonitoreo) navMonitoreo.parentElement.style.display = "none";

    cargarMisProductos();
}

    if (idRol == 3) {
        // Administrador
        if (productos) productos.style.display = "block";
        if (adminPanel) adminPanel.style.display = "block";
        if (monitoreo) monitoreo.style.display = "block";
        if (vendedorTools) vendedorTools.style.display = "none";

        if (navAdmin) navAdmin.parentElement.style.display = "block";
        if (navMonitoreo) navMonitoreo.parentElement.style.display = "block";
        cargarResumenAdmin();
        cargarUsuariosAdmin();
        cargarInventarioAdmin();
        cargarPedidosAdmin();
    }
}

function vistaCliente() {
    document.getElementById("productos").style.display = "block";
    document.getElementById("admin").style.display = "none";
    document.getElementById("monitoreo").style.display = "none";
}

function vistaVendedor() {
    document.getElementById("productos").style.display = "block";
    document.getElementById("admin").style.display = "block";
    document.getElementById("monitoreo").style.display = "none";
}

function vistaAdmin() {
    document.getElementById("productos").style.display = "block";
    document.getElementById("admin").style.display = "block";
    document.getElementById("monitoreo").style.display = "block";
}

async function agregarProducto() {
    const nombre = document.getElementById("prod-nombre").value.trim();
    const descripcion = document.getElementById("prod-descripcion").value.trim();
    const precio = document.getElementById("prod-precio").value;
    const stock = document.getElementById("prod-stock").value;
    const imagenUrl = document.getElementById("prod-imagen-url").value.trim();
    const imagenFile = document.getElementById("prod-imagen-file").files[0];
    const categoria = document.getElementById("prod-categoria").value;

    if (!nombre || !precio || !stock) {
        alert("Completa nombre, precio y stock.");
        return;
    }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("precio", precio);
    formData.append("stock", stock);
    formData.append("imagen_url", imagenUrl);
    formData.append("id_vendedor", window.usuarioActual.id);
    formData.append("id_categoria", categoria);

    if (imagenFile) {
        formData.append("imagen_file", imagenFile);
    }

    try {
        const response = await fetch("agregar_producto.php", {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        alert(data.message);

        if (data.success) {
            document.getElementById("prod-nombre").value = "";
            document.getElementById("prod-descripcion").value = "";
            document.getElementById("prod-precio").value = "";
            document.getElementById("prod-stock").value = "";
            document.getElementById("prod-imagen-url").value = "";
            document.getElementById("prod-imagen-file").value = "";
        }

    } catch (error) {
        console.error(error);
        alert("Error al agregar producto.");
    }
}

async function cargarMisProductos() {
    if (!window.usuarioActual || window.usuarioActual.id_rol != 2) return;

    const contenedor = document.getElementById("mis-productos-lista");
    if (!contenedor) return;

    const response = await fetch(`mis_productos.php?id_vendedor=${window.usuarioActual.id}`);
    const productos = await response.json();

    if (productos.length === 0) {
        contenedor.innerHTML = `<p style="color:var(--text-dim)">Aún no tienes productos registrados.</p>`;
        return;
    }

    contenedor.innerHTML = productos.map(p => `
        <div class="mis-productos-card">
            <div>
                <h4>${p.nombre}</h4>
                <p>${p.descripcion || "Sin descripción"}</p>
                <p><strong>Precio:</strong> S/ ${parseFloat(p.precio).toLocaleString()}</p>
                <p><strong>Stock:</strong> ${p.stock}</p>

                <div class="product-actions">
                    <button class="btn-outline" onclick="editarProducto(${p.id_producto}, '${p.nombre}', '${p.descripcion}', ${p.precio}, ${p.stock}, '${p.imagen}')">
                        Editar
                    </button>

                    <button class="btn-outline" onclick="eliminarProducto(${p.id_producto})">
                        Eliminar
                    </button>
                </div>
            </div>

            <img 
                src="${p.imagen || 'images/default.jpg'}" 
                class="vendor-product-img" 
                alt="${p.nombre}"
            >
        </div>
    `).join("");
}
async function eliminarProducto(idProducto) {
    if (!confirm("¿Seguro que deseas eliminar este producto?")) return;

    const response = await fetch("eliminar_producto.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id_producto: idProducto,
            id_vendedor: window.usuarioActual.id
        })
    });

    const data = await response.json();
    alert(data.message);

    if (data.success) {
        cargarMisProductos();
        cargarProductosDesdeBD();
    }
}

function editarProducto(idProducto, nombreActual, descripcionActual, precioActual, stockActual, imagenActual) {
    let modal = document.getElementById("edit-product-modal");

    if (!modal) {
        modal = document.createElement("div");
        modal.id = "edit-product-modal";
        modal.className = "admin-modal";

        modal.innerHTML = `
            <div class="admin-modal-box">
                <div class="admin-modal-header">
                    <h2>Editar Producto</h2>
                    <button class="btn-close" onclick="cerrarModalEditarProducto()">X</button>
                </div>

                <input type="hidden" id="edit-prod-id">

                <input type="text" id="edit-prod-nombre" placeholder="Nombre del producto">
                <textarea id="edit-prod-descripcion" placeholder="Descripción"></textarea>
                <input type="number" id="edit-prod-precio" placeholder="Precio">
                <input type="number" id="edit-prod-stock" placeholder="Stock">
                <input type="text" id="edit-prod-imagen" placeholder="URL o ruta de imagen">

                <button class="btn-primary w-full" onclick="guardarEdicionProducto()">
                    Guardar Cambios
                </button>
            </div>
        `;

        document.body.appendChild(modal);
    }

    document.getElementById("edit-prod-id").value = idProducto;
    document.getElementById("edit-prod-nombre").value = nombreActual || "";
    document.getElementById("edit-prod-descripcion").value = descripcionActual || "";
    document.getElementById("edit-prod-precio").value = precioActual || "";
    document.getElementById("edit-prod-stock").value = stockActual || "";
    document.getElementById("edit-prod-imagen").value = imagenActual || "";

    modal.style.display = "flex";
}

function cerrarModalEditarProducto() {
    const modal = document.getElementById("edit-product-modal");
    if (modal) modal.style.display = "none";
}

async function guardarEdicionProducto() {
    const idProducto = document.getElementById("edit-prod-id").value;
    const nombre = document.getElementById("edit-prod-nombre").value.trim();
    const descripcion = document.getElementById("edit-prod-descripcion").value.trim();
    const precio = document.getElementById("edit-prod-precio").value;
    const stock = document.getElementById("edit-prod-stock").value;
    const imagen = document.getElementById("edit-prod-imagen").value.trim();

    if (!nombre || !precio || !stock) {
        alert("Completa nombre, precio y stock.");
        return;
    }

    const response = await fetch("editar_producto.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id_producto: idProducto,
            id_vendedor: window.usuarioActual.id,
            nombre,
            descripcion,
            precio,
            stock,
            imagen
        })
    });

    const data = await response.json();
    alert(data.message);

    if (data.success) {
        cerrarModalEditarProducto();
        cargarMisProductos();
        cargarProductosDesdeBD();

        if (window.usuarioActual && window.usuarioActual.id_rol == 3) {
            cargarInventarioAdmin();
        }
    }
}

function increaseQuantity(productId) {
    const item = cart.find(p => Number(p.id) === Number(productId));
    if (item) {
        item.quantity += 1;
        updateCartUI();
        guardarCarrito();
    }
}

function decreaseQuantity(productId) {
    const item = cart.find(p => Number(p.id) === Number(productId));
    if (!item) return;

    item.quantity -= 1;

    if (item.quantity <= 0) {
        cart = cart.filter(p => Number(p.id) !== Number(productId));
    }

    updateCartUI();
}

function removeFromCart(productId) {
    cart = cart.filter(p => Number(p.id) !== Number(productId));
    updateCartUI();
    guardarCarrito();
}

function toggleUserDropdown() {
    const dropdown = document.getElementById("user-dropdown");
    if (!dropdown) return;

    if (dropdown.classList.contains("open")) {
        dropdown.classList.remove("open");
    } else {
        dropdown.classList.add("open");
    }
}

function cerrarSesion() {
    window.usuarioActual = null;
    sessionStorage.removeItem("techzone_user"); 
    usuarioLogueado = "Invitado";
    cart = [];
    updateCartUI();

    document.getElementById("auth-modal").style.display = "flex";

    const userMenu = document.getElementById("user-menu");
    if (userMenu) userMenu.style.display = "none";

    const dropdown = document.getElementById("user-dropdown");
    if (dropdown) dropdown.classList.remove("open");

    showLogin();
}

async function mostrarMisPedidos() {
    const dropdown = document.getElementById("user-dropdown");
    if (dropdown) dropdown.classList.remove("open");

    const modal = document.getElementById("pedidos-modal");
    const lista = document.getElementById("pedidos-lista");

    if (!modal || !lista) return;

    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100vw";
    modal.style.height = "100vh";
    modal.style.background = "rgba(0,0,0,0.92)";
    modal.style.backdropFilter = "blur(12px)";
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.zIndex = "999999999";

    const box = modal.querySelector(".pedidos-box");
    if (box) {
        box.style.width = "600px";
        box.style.maxWidth = "90vw";
        box.style.maxHeight = "80vh";
        box.style.overflowY = "auto";
        box.style.padding = "2rem";
        box.style.background = "rgba(15,15,25,0.98)";
        box.style.border = "1px solid rgba(255,255,255,0.12)";
        box.style.borderRadius = "20px";
        box.style.color = "white";
    }

    lista.innerHTML = `<p style="color:var(--text-dim)">Cargando pedidos...</p>`;

    const response = await fetch(`mis_pedidos.php?id_usuario=${window.usuarioActual.id}`);
    const pedidos = await response.json();

    console.log("Pedidos recibidos:", pedidos);

    if (!pedidos || pedidos.length === 0) {
        lista.innerHTML = `<p style="color:var(--text-dim)">Aún no tienes pedidos registrados.</p>`;
        return;
    }

    lista.innerHTML = pedidos.map(p => `
    <div class="pedido-card pedido-card-pro">
        <div class="pedido-card-header">
            <h4>Pedido #${p.id_pedido}</h4>
            ${estadoBadge(p.estado)}
        </div>

        <p><strong>Fecha:</strong> ${p.fecha_pedido}</p>
        <p><strong>Total:</strong> S/ ${Number(p.total).toLocaleString()}</p>

        <button class="btn-outline btn-small" onclick="verDetalleMiPedido(${p.id_pedido})">
            Ver detalles
        </button>
    </div>
    `).join("");
}

function ocultarMisPedidos() {
    const section = document.getElementById("mis-pedidos-section");
    if (section) section.style.display = "none";
}

function cerrarMisPedidos() {
    const modal = document.getElementById("pedidos-modal");
    if (modal) modal.style.display = "none";
}
function showRecoverPassword() {
    document.getElementById("auth-title").textContent = "Recuperar contraseña";

    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "none";
    document.getElementById("role-selection").style.display = "none";

    document.getElementById("recover-form").style.display = "block";
}
async function recuperarPassword() {
    const correo = document.getElementById("recover-correo").value.trim();
    const password = document.getElementById("recover-password").value.trim();

    if (!correo || !password) {
        alert("Completa todos los campos.");
        return;
    }

    try {
        const response = await fetch("recuperar_password.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                correo,
                password
            })
        });

        const data = await response.json();

        alert(data.message);

        if (data.success) {
            showLogin();
        }

    } catch (error) {
        console.error(error);
        alert("Error al recuperar contraseña.");
    }
}
async function cargarResumenAdmin() {
    try {
        const response = await fetch("admin_resumen.php");
        const data = await response.json();

        if (!data.success) return;

        document.getElementById("users-dashboard-cards").innerHTML = `
            <div class="admin-stat-card">
                <h3>${data.usuarios}</h3>
                <p>Usuarios Totales</p>
            </div>

            <div class="admin-stat-card">
                <h3>${data.clientes}</h3>
                <p>Clientes</p>
            </div>

            <div class="admin-stat-card">
                <h3>${data.vendedores}</h3>
                <p>Vendedores</p>
            </div>

            <div class="admin-stat-card">
                <h3>${data.admins}</h3>
                <p>Administradores</p>
            </div>
        `;

        document.getElementById("inventory-dashboard-cards").innerHTML = `
            <div class="admin-stat-card">
                <h3>${data.productos_activos}</h3>
                <p>Productos Activos</p>
            </div>

            <div class="admin-stat-card">
                <h3>${data.productos_inactivos}</h3>
                <p>Productos Inactivos</p>
            </div>

            <div class="admin-stat-card">
                <h3>${data.stock_total}</h3>
                <p>Stock Total</p>
            </div>

            <div class="admin-stat-card">
                <h3>${data.stock_bajo}</h3>
                <p>Stock Bajo</p>
            </div>
        `;

        document.getElementById("sales-dashboard-cards").innerHTML = `
            <div class="admin-stat-card">
                <h3>${data.pedidos}</h3>
                <p>Pedidos Totales</p>
            </div>

            <div class="admin-stat-card">
                <h3>S/ ${Number(data.ventas).toLocaleString()}</h3>
                <p>Ventas Totales</p>
            </div>

            <div class="admin-stat-card">
                <h3>${data.pendientes}</h3>
                <p>Pedidos Pendientes</p>
            </div>

            <div class="admin-stat-card">
                <h3>${data.pagados}</h3>
                <p>Pedidos Pagados</p>
            </div>
        `;

    } catch (error) {
        console.error("Error cargando resumen admin:", error);
    }
}
async function cargarUsuariosAdmin() {
    const contenedor = document.getElementById("usuarios-tabla");
    if (!contenedor) return;

    try {
        const response = await fetch("listar_usuarios.php");
        const usuarios = await response.json();

        if (!usuarios || usuarios.length === 0) {
            contenedor.innerHTML = `<p style="color:var(--text-dim)">No hay usuarios registrados.</p>`;
            return;
        }

        let filas = "";

        usuarios.forEach(u => {
            filas += `
                <tr>
                    <td>${u.id_usuario}</td>
                    <td>${u.nombre}</td>
                    <td>${u.correo}</td>
                    <td>${u.rol}</td>
                </tr>
            `;
        });

        contenedor.innerHTML = `
            <div class="admin-table-wrapper">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Rol</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filas}
                    </tbody>
                </table>
            </div>
        `;

    } catch (error) {
        console.error("Error cargando usuarios:", error);
        contenedor.innerHTML = `<p style="color:#ff6b6b">Error cargando usuarios.</p>`;
    }
}
async function cargarInventarioAdmin() {
    const contenedor = document.getElementById("inventario-tabla");
    if (!contenedor) return;

    try {
        const response = await fetch("listar_inventario.php");
        const productos = await response.json();

        if (!productos || productos.length === 0) {
            contenedor.innerHTML = `<p style="color:var(--text-dim)">No hay productos registrados.</p>`;
            return;
        }

        contenedor.innerHTML = `
            <div class="admin-table-wrapper">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>ID</th>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Estado</th>
                            <th>Vendedor</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${productos.map(p => `
                            <tr>
                                <td>
                                    <img src="${p.imagen || 'images/default.jpg'}" class="inventory-thumb" alt="${p.nombre}">
                                </td>
                                <td>${p.id_producto}</td>
                                <td>${p.nombre}</td>
                                <td>S/ ${Number(p.precio).toLocaleString()}</td>
                                <td>${p.stock}</td>
                                <td>${estadoBadge(p.estado)}</td>
                                <td>${p.vendedor || "Sin vendedor"}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `;
    } catch (error) {
        console.error("Error cargando inventario:", error);
        contenedor.innerHTML = `<p style="color:#ff6b6b">Error cargando inventario.</p>`;
    }
}
async function cargarPedidosAdmin() {
    const contenedor = document.getElementById("ventas-tabla");
    if (!contenedor) return;

    try {
        const response = await fetch("listar_pedidos_admin.php");
        const pedidos = await response.json();

        if (!pedidos || pedidos.length === 0) {
            contenedor.innerHTML = `<p style="color:var(--text-dim)">No hay pedidos registrados.</p>`;
            return;
        }

        contenedor.innerHTML = `
            <div class="admin-table-wrapper">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>ID Pedido</th>
                            <th>Cliente</th>
                            <th>Fecha</th>
                            <th>Total</th>
                            <th>Estado</th>
                            <th>Detalle</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${pedidos.map(p => `
                            <tr>
                                <td>${p.id_pedido}</td>
                                <td>${p.cliente || "Sin cliente"}</td>
                                <td>${p.fecha_pedido}</td>
                                <td>S/ ${Number(p.total).toLocaleString()}</td>
                                <td>${estadoBadge(p.estado)}</td>
                                <td>
                                    <button class="btn-outline btn-small" onclick="verDetallePedido(${p.id_pedido})">
                                        Detalles
                                    </button>
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `;
    } catch (error) {
        console.error("Error cargando pedidos:", error);
        contenedor.innerHTML = `<p style="color:#ff6b6b">Error cargando pedidos.</p>`;
    }
}
function estadoBadge(estado) {
    const e = String(estado).toLowerCase();

    if (e === "activo" || e === "pagado" || e === "entregado") {
        return `<span class="badge-status success">${estado}</span>`;
    }

    if (e === "pendiente") {
        return `<span class="badge-status warning">${estado}</span>`;
    }

    if (e === "inactivo" || e === "cancelado") {
        return `<span class="badge-status danger">${estado}</span>`;
    }

    return `<span class="badge-status">${estado}</span>`;
}
async function verDetallePedido(idPedido) {
    const response = await fetch(`detalle_pedido_admin.php?id_pedido=${idPedido}`);
    const detalles = await response.json();

    let contenido = "";

    if (!detalles || detalles.length === 0) {
        contenido = `<p style="color:var(--text-dim)">No hay detalles para este pedido.</p>`;
    } else {
        contenido = `
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio Unit.</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    ${detalles.map(d => `
                        <tr>
                            <td>${d.producto}</td>
                            <td>${d.cantidad}</td>
                            <td>S/ ${Number(d.precio_unitario).toLocaleString()}</td>
                            <td>S/ ${Number(d.subtotal).toLocaleString()}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `;
    }

    abrirModalAdmin("Detalle del Pedido #" + idPedido, contenido);
}

function abrirModalAdmin(titulo, contenido) {
    let modal = document.getElementById("admin-modal");

    if (!modal) {
        modal = document.createElement("div");
        modal.id = "admin-modal";
        modal.className = "admin-modal";
        modal.innerHTML = `
            <div class="admin-modal-box">
                <div class="admin-modal-header">
                    <h2 id="admin-modal-title"></h2>
                    <button class="btn-close" onclick="cerrarModalAdmin()">X</button>
                </div>
                <div id="admin-modal-content"></div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    document.getElementById("admin-modal-title").textContent = titulo;
    document.getElementById("admin-modal-content").innerHTML = contenido;

    modal.style.display = "flex";
}

function cerrarModalAdmin() {
    const modal = document.getElementById("admin-modal");
    if (modal) modal.style.display = "none";
}
async function verDetalleMiPedido(idPedido) {
    const response = await fetch(`detalle_pedido_admin.php?id_pedido=${idPedido}`);
    const detalles = await response.json();

    let contenido = "";

    if (!detalles || detalles.length === 0) {
        contenido = `<p style="color:var(--text-dim)">No hay detalles para este pedido.</p>`;
    } else {
        contenido = `
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio Unit.</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    ${detalles.map(d => `
                        <tr>
                            <td>${d.producto}</td>
                            <td>${d.cantidad}</td>
                            <td>S/ ${Number(d.precio_unitario).toLocaleString()}</td>
                            <td>S/ ${Number(d.subtotal).toLocaleString()}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `;
    }

    abrirModalAdmin("Detalle de mi Pedido #" + idPedido, contenido);
}
function verDetalleProducto(idProducto) {
    window.location.href = `producto.html?id=${idProducto}`;
}
function guardarCarrito() {
    localStorage.setItem("techzone_cart", JSON.stringify(cart));
}

function filtrarCategoria(idCategoria, boton) {
    categoriaActual = Number(idCategoria);

    document.querySelectorAll("#category-filters .tab-pill").forEach(btn => {
        btn.classList.remove("active");
    });

    boton.classList.add("active");

    renderProducts();
}