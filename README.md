# TrabajofinalSO-grupo-6
Trabajo hecho por el grupo 6 del curso de sistemas operativos y acá se va a subir todos los documentos del trabajo
# Resumen técnico:
# TechZone E-Commerce

TechZone es una plataforma de comercio electrónico integral y escalable construida bajo una arquitectura de contenedores. El proyecto está diseñado para ofrecer una experiencia de compra fluida mientras mantiene una separación limpia entre su núcleo de ventas y sus funcionalidades sociales.

## Tecnologías y Arquitectura

El proyecto está dividido en múltiples servicios orquestados a través de Docker:

*   **Aplicación Web Principal (`techzone-project`):**
    *   **Backend:** Desarrollado en PHP 8.0 montado sobre un servidor Apache.
    *   **Frontend:** Construido con HTML5, CSS3 y Vanilla JavaScript para la interactividad del cliente y la gestión administrativa.
    *   **Base de Datos Relacional:** MySQL 5.7 para el almacenamiento de usuarios, inventario de productos y procesamiento de pedidos.
*   **Microservicio Social (`techzone-social-api`):**
    *   **Backend:** API RESTful construida con Node.js y Express.
    *   **Base de Datos NoSQL:** Integración con MongoDB para el manejo de interacciones sociales rápidas y escalables.
*   **Infraestructura:** Docker y Docker Compose para levantar todos los servicios con un solo comando.

## Instalación y Despliegue Local

Para ejecutar este proyecto en tu máquina local, asegúrate de tener [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/) instalados.

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/TrabajofinalSO-grupo-6.git
   cd TrabajofinalSO-grupo-6/techzone-project
