const SOCIAL_API = "http://3.137.148.4:3000";
let productoActualId = null;

document.addEventListener("DOMContentLoaded", () => {
    cargarDetalleProducto();
});

async function cargarDetalleProducto() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    productoActualId = id;

    const container = document.getElementById("product-detail-container");

    if (!id || !container) {
        container.innerHTML = `<p style="color:#ff6b6b">Producto no válido.</p>`;
        return;
    }

    try {
        const response = await fetch(`obtener_producto.php?id=${id}`);
        const data = await response.json();

        if (!data.success) {
            container.innerHTML = `<p style="color:#ff6b6b">Producto no encontrado.</p>`;
            return;
        }

        const p = data.producto;

        const caracteristicas = p.caracteristicas
            ? p.caracteristicas.split("|")
            : ["Producto original", "Garantía TechZone", "Stock disponible", "Soporte técnico"];

        container.innerHTML = `
            <div class="product-detail-card glass-card">
                <div class="product-detail-image">
                    <img src="${p.imagen || 'images/default.jpg'}" alt="${p.nombre}">
                </div>

                <div class="product-detail-info">
                    <span class="badge">PRODUCTO TECHZONE</span>

                    <h1>${p.nombre}</h1>

                    <div class="product-rating">
                        ★★★★★ <span>5.0</span>
                    </div>

                    <p class="product-detail-price">
                        S/ ${Number(p.precio).toLocaleString()}
                    </p>

                    <p class="product-detail-desc">
                        ${p.descripcion || "Sin descripción disponible."}
                    </p>

                    <div class="product-meta">
                        <p><strong>Categoría:</strong> ${p.categoria || "General"}</p>
                        <p><strong>Vendido por:</strong> ${p.vendedor || "TechZone Perú"}</p>
                        <p><strong>Stock disponible:</strong> ${p.stock}</p>
                        <p><strong>Estado:</strong> ${p.estado}</p>
                        <div class="product-features">
                            <h3>Características</h3>
                            <ul>
                                ${caracteristicas.map(c => `<li>${c}</li>`).join("")}
                            </ul>
                        </div>
                    </div>

                    <button class="btn-primary" onclick="agregarDesdeDetalle(${p.id_producto}, '${p.nombre}', ${p.precio}, '${p.imagen}')">
                        Agregar al carrito
                    </button>
                    <div class="product-share-box">
                        <h3>Comparte este producto</h3>
                        <p>Envía este producto a tus amigos o guárdalo para verlo después.</p>

                        <div class="share-actions">
                            <button class="btn-outline" onclick="copiarEnlaceProducto()">
                                📋 Copiar enlace
                            </button>

                            <button class="btn-outline" onclick="compartirWhatsApp()">
                                💬 WhatsApp
                            </button>

                            <button class="btn-outline" onclick="compartirFacebook()">
                                Facebook
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        cargarComentarios();
        cargarProductosRelacionados(p.id_producto, p.id_categoria);
    } catch (error) {
        console.error(error);
        container.innerHTML = `<p style="color:#ff6b6b">Error cargando producto.</p>`;
    }
}

function volverCatalogo() {
    window.location.href = "index.html#productos";
}

function agregarDesdeDetalle(id, nombre, precio, imagen) {
    let carrito = JSON.parse(localStorage.getItem("techzone_cart")) || [];

    const existente = carrito.find(item => Number(item.id) === Number(id));

    if (existente) {
        existente.quantity += 1;
    } else {
        carrito.push({
            id: id,
            name: nombre,
            price: Number(precio),
            image: imagen,
            quantity: 1
        });
    }

    localStorage.setItem("techzone_cart", JSON.stringify(carrito));

    alert("Producto agregado al carrito.");
}
async function cargarComentarios() {
    const contenedor = document.getElementById("comentarios-container");
    if (!contenedor || !productoActualId) return;

    contenedor.innerHTML = `<p style="color:var(--text-dim)">Cargando comentarios...</p>`;

    try {
        const response = await fetch(`${SOCIAL_API}/comentarios/${productoActualId}`);
        const comentarios = await response.json();
        actualizarResumenRating(comentarios);

        if (!comentarios || comentarios.length === 0) {
            contenedor.innerHTML = `<p style="color:var(--text-dim)">Aún no hay comentarios para este producto.</p>`;
            return;
        }

        contenedor.innerHTML = comentarios.map(c => {
            const inicial = (c.usuario || "A").charAt(0).toUpperCase();

            return `
                <div class="comment-card comment-pro">
                    <div class="comment-top">
                        <div class="comment-avatar">${inicial}</div>

                        <div>
                            <strong>${c.usuario}</strong>
                            <div class="comment-stars">${generarEstrellas(c.rating || 5)}</div>
                            <small>${formatearFechaComentario(c.fecha)}</small>
                        </div>
                    </div>

                    <p>${c.comentario}</p>

                    <div class="comment-actions">
                        <button class="btn-outline btn-small" onclick="darLikeComentario('${c._id}')">
                            👍 Útil ${c.likes || 0}
                        </button>

                        <button class="btn-outline btn-small" onclick="darReaccionComentario('${c._id}', '❤️')">
                            ❤️ ${contarReaccion(c.reacciones, '❤️')}
                        </button>

                        <button class="btn-outline btn-small" onclick="darReaccionComentario('${c._id}', '🔥')">
                            🔥 ${contarReaccion(c.reacciones, '🔥')}
                        </button>

                        <button class="btn-outline btn-small" onclick="mostrarRespuesta('${c._id}')">
                            💬 Responder
                        </button>
                    </div>

                    <div id="respuesta-${c._id}" class="reply-form" style="display:none;">
                        <textarea id="texto-${c._id}" placeholder="Escribe una respuesta..."></textarea>

                        <button class="btn-primary btn-small" onclick="responderComentario('${c._id}')">
                            Enviar respuesta
                        </button>
                    </div>

                    ${(c.respuestas || []).map(r => `
                        <div class="reply-card reply-pro">
                            <strong>${r.usuario}</strong>
                            <small>${formatearFechaComentario(r.fecha)}</small>
                            <p>${r.respuesta}</p>
                        </div>
                    `).join("")}
                </div>
            `;
        }).join("");

    } catch (error) {
        console.error(error);
        contenedor.innerHTML = `<p style="color:#ff6b6b">Error cargando comentarios.</p>`;
    }
}

async function publicarComentario() {
    const textarea = document.getElementById("nuevo-comentario");
    const comentario = textarea.value.trim();
    const rating = Number(document.getElementById("comentario-rating").value);

    if (!comentario) {
        alert("Escribe un comentario.");
        return;
    }

    const usuarioGuardado = sessionStorage.getItem("techzone_user");
    const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado).nombres : "Anónimo";

    await fetch(`${SOCIAL_API}/comentarios`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id_producto: productoActualId,
            usuario,
            comentario,
            rating
        })
    });

    textarea.value = "";
    cargarComentarios();
}

async function darLikeComentario(idComentario) {
    await fetch(`${SOCIAL_API}/comentarios/${idComentario}/like`, {
        method: "POST"
    });

    cargarComentarios();
}

function mostrarRespuesta(idComentario) {
    const div = document.getElementById(`respuesta-${idComentario}`);
    if (!div) return;

    div.style.display = div.style.display === "none" ? "block" : "none";
}

async function responderComentario(idComentario) {
    const textarea = document.getElementById(`texto-${idComentario}`);
    const respuesta = textarea.value.trim();

    if (!respuesta) {
        alert("Escribe una respuesta.");
        return;
    }

    const usuarioGuardado = sessionStorage.getItem("techzone_user");
    const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado).nombres : "Anónimo";

    await fetch(`${SOCIAL_API}/comentarios/${idComentario}/responder`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            usuario,
            respuesta
        })
    });

    cargarComentarios();
}

function formatearFechaComentario(fecha) {
    if (!fecha) return "Hace un momento";

    const ahora = new Date();
    const fechaComentario = new Date(fecha);
    const diff = Math.floor((ahora - fechaComentario) / 1000);

    if (diff < 60) return "Hace unos segundos";
    if (diff < 3600) return `Hace ${Math.floor(diff / 60)} min`;
    if (diff < 86400) return `Hace ${Math.floor(diff / 3600)} h`;

    return fechaComentario.toLocaleDateString("es-PE");
}
function generarEstrellas(rating) {
    const r = Number(rating) || 5;
    return "★".repeat(r) + "☆".repeat(5 - r);
}

function actualizarResumenRating(comentarios) {
    const ratingBox = document.querySelector(".product-rating");
    const summary = document.getElementById("rating-summary");
    const barsContent = document.getElementById("rating-bars-content");

    if (!summary || !barsContent) return;

    if (!comentarios || comentarios.length === 0) {
        summary.style.display = "none";
        return;
    }

    summary.style.display = "grid";

    const ratings = comentarios.map(c => Number(c.rating) || 5);
    const total = ratings.length;
    const promedio = ratings.reduce((a, b) => a + b, 0) / total;
    const redondeado = Math.round(promedio);

    const conteo = {
        5: ratings.filter(r => r === 5).length,
        4: ratings.filter(r => r === 4).length,
        3: ratings.filter(r => r === 3).length,
        2: ratings.filter(r => r === 2).length,
        1: ratings.filter(r => r === 1).length
    };

    document.querySelector(".rating-main").innerHTML = `
        <h3>${promedio.toFixed(1)}</h3>
        <p>${generarEstrellas(redondeado)}</p>
        <span>${total} opiniones</span>
    `;

    barsContent.innerHTML = [5, 4, 3, 2, 1].map(n => {
        const porcentaje = total > 0 ? (conteo[n] / total) * 100 : 0;

        return `
            <div class="rating-bar-row">
                <span>${n} ★</span>
                <div class="rating-bar">
                    <div style="width:${porcentaje}%"></div>
                </div>
                <small>${conteo[n]}</small>
            </div>
        `;
    }).join("");

    if (ratingBox) {
        ratingBox.innerHTML = `
            ${generarEstrellas(redondeado)}
            <span>${promedio.toFixed(1)} / 5 (${total} valoraciones)</span>
        `;
    }
}

function contarReaccion(reacciones, tipo) {
    if (!reacciones) return 0;
    return reacciones.filter(r => r.tipo === tipo).length;
}

async function darReaccionComentario(idComentario, tipo) {
    await fetch(`${SOCIAL_API}/comentarios/${idComentario}/reaccion`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ tipo })
    });

    cargarComentarios();
}
async function cargarProductosRelacionados(idProducto, idCategoria) {
    const contenedor = document.getElementById("related-products");
    if (!contenedor || !idCategoria) return;

    try {
        const response = await fetch(`productos_relacionados.php?id_producto=${idProducto}&id_categoria=${idCategoria}`);
        const productos = await response.json();

        if (!productos || productos.length === 0) {
            contenedor.innerHTML = `<p style="color:var(--text-dim)">No hay productos relacionados por ahora.</p>`;
            return;
        }

        contenedor.innerHTML = productos.map(p => `
            <div class="related-card">
                <img src="${p.image || 'images/default.jpg'}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p>S/ ${Number(p.price).toLocaleString()}</p>
                <button class="btn-outline w-full" onclick="window.location.href='producto.html?id=${p.id}'">
                    Ver producto
                </button>
            </div>
        `).join("");

    } catch (error) {
        console.error(error);
        contenedor.innerHTML = `<p style="color:#ff6b6b">Error cargando productos relacionados.</p>`;
    }
}
function copiarEnlaceProducto() {
    navigator.clipboard.writeText(window.location.href);
    alert("Enlace copiado.");
}

function compartirWhatsApp() {
    const url = encodeURIComponent(window.location.href);
    const texto = encodeURIComponent("Mira este producto en TechZone Perú:");
    window.open(`https://wa.me/?text=${texto}%20${url}`, "_blank");
}
function compartirFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
}