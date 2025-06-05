function iniciarCarrito() {

    const carritoStorage = localStorage.getItem("carrito");
    let carrito = JSON.parse(carritoStorage);
    renderizarProductosCarrito(carrito);
}

function renderizarProductosCarrito(carrito) {
    const contenedorProductos = document.getElementById("product-container");
    const totalPrice = document.getElementById("total-price");
    contenedorProductos.innerHTML = "";
    let suma = 0;

    carrito.forEach(element => {
        const div = document.createElement("div");
        const nombre = document.createElement("p");
        const precio = document.createElement("p");

        nombre.innerText = element.nombre;
        precio.innerText = "$" + element.precio;
        const img = document.createElement("img");
        img.src = "../../img/logo.png";
        img.className = "imgCarrito";

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-button-product  btn btn-danger";
        deleteBtn.innerHTML = `<i class="fa-regular fa-trash-can"></i>`
        const cantidad = document.createElement("div");
        cantidad.innerText = "cantidad: " + element.cantidad;
        const btnSumCantidad = document.createElement("button");
        btnSumCantidad.innerText = "+";
        btnSumCantidad.className = "btn btn-secondary m-2"
        btnSumCantidad.addEventListener("click", () => sumarCantidad(element, carrito))
        const btnRestCantidad = document.createElement("button");
        btnRestCantidad.innerText = "-";
        btnRestCantidad.className = "btn btn-secondary m-2"
        btnRestCantidad.addEventListener("click", () => restarCantidad(element, carrito))
        cantidad.appendChild(btnSumCantidad);
        cantidad.appendChild(btnRestCantidad);
        cantidad.appendChild(deleteBtn);

        suma += element.precio * element.cantidad;

        div.appendChild(nombre);
        div.appendChild(img);
        div.appendChild(precio);
        div.appendChild(cantidad);

        contenedorProductos.appendChild(div);

        actualizarCarritoBorrar(div, '.delete-button-product', element, carrito)
    })
    totalPrice.innerText = "";
    totalPrice.innerText = "$" + suma.toFixed(2);

}


function EliminarProducto(carrito, producto) {
    const nuevosProductos = carrito.filter(item => item.id !== producto.id);

    carrito.length = 0;
    carrito.push(...nuevosProductos);
}

function seleccion(container, selector) {
    const funBoton = container.querySelector(selector)
    return funBoton
}

function save(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito)); //aca esta el set
}

function actualizarCarritoBorrar(container, selector, producto, carrito) {
    seleccion(container, selector).addEventListener('click', () => {
        EliminarProducto(carrito, producto)
        renderizarProductosCarrito(carrito);
        save(carrito)
    })
}

function sumarCantidad(producto, carrito) {
    if (producto.cantidad < 5) producto.cantidad++; // Luego cambiamos depende el stock del admin
    console.log(carrito);
    save(carrito)
    renderizarProductosCarrito(carrito)
}
function restarCantidad(producto, carrito) {
    if (producto.cantidad > 1) producto.cantidad--;
    console.log(carrito);
    save(carrito)
    renderizarProductosCarrito(carrito)
}

iniciarCarrito();