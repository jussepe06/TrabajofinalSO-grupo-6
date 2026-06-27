let cart = [];
let usuarioLogueado = "Invitado";

let products = [];

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

    container.innerHTML = products.map(product => `
        <div class="glass-card product-card">
            <div class="product-img-wrapper">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-price">S/ ${product.price.toLocaleString()}</p>
                <button class="btn-add-cart" onclick="addToCart(${product.id})">
                    <span class="material-icons-round">add_shopping_cart</span>
                    Agregar al carrito
                </button>
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
                <div>
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

                <strong>
                    S/ ${(Number(item.price) * item.quantity).toLocaleString()}
                </strong>
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
            updateCartUI();
            toggleCart(false);
        }

    } catch (error) {
        console.error(error);
        alert("Error al procesar el pedido.");
    }
}

function switchTab(tabName, element) {
    document.querySelectorAll(".admin-tab").forEach(btn => btn.classList.remove("active"));
    element.classList.add("active");

    const title = document.querySelector(".admin-content .content-header h2");

    const titles = {
        users: "Usuarios del Sistema",
        inventory: "Inventario Maestro",
        sales: "Reportes de Ventas",
        system: "Monitoreo del Sistema"
    };

    if (title) title.textContent = titles[tabName] || "Panel Administrativo";
}

function aplicarRol(idRol, nombreRol) {
    const adminPanel = document.getElementById("admin");
    const productos = document.getElementById("productos");
    const monitoreo = document.getElementById("monitoreo");
    const vendedorTools = document.getElementById("vendedor-tools");

    const navAdmin = document.getElementById("nav-admin");
    const navMonitoreo = document.getElementById("nav-monitoreo");

    alert(`Bienvenido ${usuarioLogueado}. Rol: ${nombreRol}`);
    
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
        if (adminPanel) adminPanel.style.display = "block";
        if (monitoreo) monitoreo.style.display = "none";
        if (vendedorTools) vendedorTools.style.display = "block";

        if (navAdmin) navAdmin.parentElement.style.display = "block";
        if (navMonitoreo) navMonitoreo.parentElement.style.display = "none";

        cargarMisProductos();
    }

    if (idRol == 3) {
        // Administrador
        if (productos) productos.style.display = "block";
        if (adminPanel) adminPanel.style.display = "block";
        if (monitoreo) monitoreo.style.display = "block";
        if (vendedorTools) vendedorTools.style.display = "block";

        if (navAdmin) navAdmin.parentElement.style.display = "block";
        if (navMonitoreo) navMonitoreo.parentElement.style.display = "block";
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

async function editarProducto(idProducto, nombreActual, descripcionActual, precioActual, stockActual, imagenActual) {
    const nombre = prompt("Nuevo nombre:", nombreActual);
    if (nombre === null) return;

    const descripcion = prompt("Nueva descripción:", descripcionActual);
    if (descripcion === null) return;

    const precio = prompt("Nuevo precio:", precioActual);
    if (precio === null) return;

    const stock = prompt("Nuevo stock:", stockActual);
    if (stock === null) return;

    const imagen = prompt("Nueva imagen URL/ruta:", imagenActual || "");
    if (imagen === null) return;

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
        cargarMisProductos();
        cargarProductosDesdeBD();
    }
}

function increaseQuantity(productId) {
    const item = cart.find(p => Number(p.id) === Number(productId));
    if (item) {
        item.quantity += 1;
        updateCartUI();
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

    const section = document.getElementById("mis-pedidos-section");
    const lista = document.getElementById("pedidos-lista");

    if (!section || !lista) return;

    section.style.display = "block";
    section.scrollIntoView({ behavior: "smooth" });

    lista.innerHTML = `<p style="color:var(--text-dim)">Cargando pedidos...</p>`;

    const response = await fetch(`mis_pedidos.php?id_usuario=${window.usuarioActual.id}`);
    const pedidos = await response.json();

    if (pedidos.length === 0) {
        lista.innerHTML = `<p style="color:var(--text-dim)">Aún no tienes pedidos registrados.</p>`;
        return;
    }

    lista.innerHTML = pedidos.map(p => `
        <div class="pedido-card">
            <h4>Pedido #${p.id_pedido}</h4>
            <p><strong>Fecha:</strong> ${p.fecha_pedido}</p>
            <p><strong>Total:</strong> S/ ${Number(p.total).toLocaleString()}</p>
            <p><strong>Estado:</strong> ${p.estado}</p>
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