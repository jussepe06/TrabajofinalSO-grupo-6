let cart = [];
let usuarioLogueado = "Invitado";

const products = [
    { id: 1, name: "Laptop Gamer Titan Z1", price: 12499, image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800" },
    { id: 2, name: "Teclado Nebula RGB", price: 589, image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=800" },
    { id: 3, name: "Marvel's Spider-Man 2", price: 299, image: "images/Spiderman2.jpg" },
    { id: 4, name: "Audífonos Void 7.1", price: 849, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800" },
    { id: 5, name: "PlayStation 5 Console", price: 2499, image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800" },
    { id: 6, name: "GPU Vortex RTX 4090", price: 8750, image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800" }
];

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    updateMetrics();
    updateCartUI();
    setInterval(updateMetrics, 5000);

    const cartIcon = document.querySelector(".cart-icon");
    if (cartIcon) cartIcon.addEventListener("click", () => toggleCart());
});

function renderProducts() {
    const container = document.getElementById("products-container");
    if (!container) return;

    container.innerHTML = products.map(p => `
        <div class="glass-card product-card">
            <div class="product-img-wrapper">
                <img src="${p.image}" alt="${p.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h3>${p.name}</h3>
                <p class="product-price">S/ ${p.price.toLocaleString()}</p>
                <button class="btn-add-cart" onclick="addToCart(${p.id})">
                    <span class="material-icons-round">add_shopping_cart</span>
                    Agregar al carrito
                </button>
            </div>
        </div>
    `).join("");
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);

    if (existing) existing.quantity += 1;
    else cart.push({ ...product, quantity: 1 });

    updateCartUI();
    toggleCart(true);
}

function updateCartUI() {
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total-val");

    if (!cartCount || !cartItems || !cartTotal) return;

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    if (cart.length === 0) {
        cartItems.innerHTML = `<p style="color:var(--text-dim); text-align:center;">El carrito está vacío</p>`;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <small>Cantidad: ${item.quantity}</small>
                </div>
                <strong>S/ ${(item.price * item.quantity).toLocaleString()}</strong>
            </div>
        `).join("");
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
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
    const cpuVal = document.getElementById("cpu-val");
    const ramVal = document.getElementById("ram-val");
    const procVal = document.getElementById("proc-val");
    const cpuFill = document.getElementById("cpu-fill");
    const ramFill = document.getElementById("ram-fill");

    try {
        const response = await fetch("api.php");
        if (!response.ok) throw new Error("API no disponible");

        const data = await response.json();

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

        if (data.procesos && procVal) {
            procVal.textContent = data.procesos;
        }

    } catch (error) {
        console.error("Error métricas:", error);
    }
}

function showRegister() {
    document.getElementById("auth-title").textContent = "Crear cuenta";
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";
}

function showLogin() {
    document.getElementById("auth-title").textContent = "Iniciar sesión";
    document.getElementById("register-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
}

async function registrarUsuario() {
    const nombres = document.getElementById("reg-nombres").value.trim();
    const apellidos = document.getElementById("reg-apellidos").value.trim();
    const correo = document.getElementById("reg-correo").value.trim();
    const password = document.getElementById("reg-password").value.trim();
    const telefono = document.getElementById("reg-telefono").value.trim();
    const direccion = document.getElementById("reg-direccion").value.trim();

    if (!nombres || !apellidos || !correo || !password) {
        alert("Completa nombres, apellidos, correo y contraseña.");
        return;
    }

    try {
        const response = await fetch("registrar_usuario.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombres,
                apellidos,
                correo,
                password,
                telefono,
                direccion
            })
        });

        const data = await response.json();
        alert(data.message);

        if (data.success) {
            document.getElementById("reg-nombres").value = "";
            document.getElementById("reg-apellidos").value = "";
            document.getElementById("reg-correo").value = "";
            document.getElementById("reg-password").value = "";
            document.getElementById("reg-telefono").value = "";
            document.getElementById("reg-direccion").value = "";
            showLogin();
        }

    } catch (error) {
        console.error(error);
        alert("Error al registrar usuario. Verifica la conexión con el servidor.");
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
            usuarioLogueado = data.usuario.nombres;
            document.getElementById("auth-modal").style.display = "none";
        }

    } catch (error) {
        console.error(error);
        alert("Error al iniciar sesión. Verifica la conexión con el servidor.");
    }
}

function procesarCompraMaster() {
    if (cart.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    const tarjeta = document.getElementById("card-number")?.value || "";

    if (tarjeta.length < 16) {
        alert("Error de pasarela: número de tarjeta inválido.");
        return;
    }

    const totalCompra = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    alert(`Compra procesada correctamente por S/ ${totalCompra.toLocaleString()} a nombre de ${usuarioLogueado}.`);

    cart = [];
    updateCartUI();
    toggleCart(false);
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
}const pass = document.getElementById('login-password').value.trim();

    // Verificación exacta
    if(user === "admin" && pass === "123456") {
        usuarioLogueado = user;
        document.getElementById('login-modal').style.display = 'none';
        alert(`Acceso Concedido. Bienvenido Administrador ${user}.`);
    } else {
        alert("Acceso Denegado: Usuario o contraseña incorrectos.");
    }
}

function procesarCompraMaster() {
    if (cart.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    const tarjeta = document.getElementById('card-number').value;
    if (tarjeta.length < 16) {
        alert("Error de Pasarela: Número de tarjeta inválido.");
        return;
    
