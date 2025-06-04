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

        suma += element.precio;
        div.appendChild(nombre);
        div.appendChild(img);
        div.appendChild(precio);
        contenedorProductos.appendChild(div);
    })
    totalPrice.innerText = "";
    totalPrice.innerText = "$" + suma;

}



iniciarCarrito();