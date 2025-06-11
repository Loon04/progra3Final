# 🛒 Sistema de Autoservicio - Proyecto Final

Este proyecto es un sistema de autoservicio desarrollado como entrega final para la materia Programación 3. La aplicación está dividida en dos grandes partes:

- 🧑‍💼 **Panel administrativo (SSR)**: Renderizado del lado del servidor con vistas EJS. Permite a los administradores gestionar productos y visualizar sus ventas.
- 🧑‍💻 **Frontend para usuarios (CSR)**: Interfaz de cliente renderizada del lado del cliente, pensada para que los usuarios puedan ver productos activos, agregar al carrito y realizar una compra.

## 🚀 Tecnologías principales

- **Backend (Node.js + Express)**: API REST + SSR con EJS.
- **Base de datos**: MySQL.
- **Frontend de usuario (CSR)**: HTML, CSS y JavaScript puro (sin frameworks).
- **Renderizado del admin**: EJS + Express.
- **PDFKit**: Para generar el ticket de compra en PDF.

---

## 🧩 Estructura general del sistema


## 🧑‍💼 Panel Admin (SSR)

Los administradores acceden a una interfaz renderizada desde el servidor (con EJS) donde pueden:

- Crear, editar o eliminar productos.
- Ver ventas realizadas.
- Descargar reportes en PDF.

Rutas protegidas y controladas desde Express con middleware.

---

## 🛍️ Frontend de usuario (CSR)

Los usuarios finales interactúan con una interfaz ligera y dinámica que permite:

- Ver productos disponibles (traídos desde la API).
- Agregar productos al carrito.
- Completar una compra (simulación).
- Descargar ticket de compra en PDF.

Toda esta lógica funciona desde el cliente (CSR) consumiendo la API del backend.

---

## 🔗 Cómo iniciar el proyecto

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/lucas22-f/progra3Final.git
   cd progra3Final
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```
   Configurar la base de datos en `src/database/connection.js`.

--- 
## ( Servidor todavia en desarrollo ).

3. **Iniciar el servidor:**
   ```bash
   npm start
   ```

4. **Acceder:**
   - **Admin SSR:** [http://localhost:3000/admin](http://localhost:3000/admin)
   - **Usuario CSR:** [http://localhost:3000/](http://localhost:3000/) (index.html desde public)

---