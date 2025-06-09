function iniciarCarrito() {

    let usuariols = localStorage.getItem("usuario");
    if (!usuariols) {
        window.location.href = "../../index.html"
    } else {
        cambiadorTema();
        const carritoStorage = localStorage.getItem("carrito");
        let carrito = JSON.parse(carritoStorage);

        renderizarProductosCarrito(carrito);
    }

}

function renderizarProductosCarrito(carrito) {
    if (!carrito || carrito.length === 0) {
        const contenedorSeccionProductos = document.getElementsByClassName('section-cart')[0];
        contenedorSeccionProductos.innerHTML = "";
        const seccionVacia = document.createElement('div');
        seccionVacia.className = "text-center text-secondary fs-5"

        seccionVacia.innerText = "Para continuar, debe agregar al menos un producto";

        contenedorSeccionProductos.appendChild(seccionVacia);
    } else {
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
            img.src = element.imagen;
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
        finalizarCompra(carrito);
    }
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
    save(carrito)
    renderizarProductosCarrito(carrito)
}
function restarCantidad(producto, carrito) {
    if (producto.cantidad > 1) producto.cantidad--;
    save(carrito)
    renderizarProductosCarrito(carrito)
}

function finalizarCompra(carrito) {
    const btnFinalizarCompra = document.querySelector('.finalizar-compra')
    btnFinalizarCompra.addEventListener('click', () => {

        generarTicket(carrito)
    });
}

function generarTicket(carrito) {
    //uso un CND en carrito.html. En la parte de carrito creamos el pdf y deberiamos borrar el carrito(al menos)
    //Uso jsPDF que es el constructor de PDFs
    //Funciona como pygame con posiciones en la hoja a4 predeterminada
    //por ahora el paso a ticket.html esta acá porque no se descargaba el archivo pdf por el tiempo de carga
    //es un canvas
    const usuarioStorage = localStorage.getItem("usuario");
    const usuario = JSON.parse(usuarioStorage);
    let totalCompra = 0;
    let cadena = '*';
    let precioX = 140;

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('', '', ''); /////////////

    pdf.text('TecStore', 10, 10) //titulo (texto,x,y) y= lineas de texto
    pdf.text(`${cadena.repeat(85)}`, 10, 20)

    pdf.text(`Comprador ${usuario}`, 10, 30)

    const fechaActual = new Date().toLocaleDateString();
    const horaActual = new Date().toLocaleTimeString();

    pdf.text(`Fecha ${fechaActual} - Hora ${horaActual}`, 10, 40)

    pdf.text("Cant.", 10, 50)
    pdf.text('Item', 35, 50)
    pdf.text('Precio', precioX, 50)
    pdf.text('Total', 170, 50)

    pdf.text(`${cadena.repeat(85)}`, 10, 60)

    let y = 70;
    carrito.forEach((item) => {
        pdf.text(`${item.cantidad}`, 10, y);
        pdf.text(`${item.nombre}`, 35, y)
        pdf.text(`$${item.precio}`, precioX, y)
        pdf.text(`$${item.precio * item.cantidad}`, 170, y)
        y += 10;
        totalCompra += item.precio * item.cantidad
    });

    pdf.text('TOTAL', 10, y + 10)
    pdf.text(`$${totalCompra}`, 170, y + 10)

    //acá al pdf le da un formato URI(para identificar el recurso por nombre o locacion).
    //Use URI para poder mostrar el ticket y descargar 
    //desde la pagina ticket. Yo creo que hay que borrar el localStorage al salir de la pagina carrito
    //esto es por si el usuario cierra la pagina ticket sin haber vuelto al inicio o cerrado de mala forma la ventana
    //EL pdfBase64 esta codificado en base64, Se usa para pasar de binario a ASCII.
    //lo guarda en el SesionStorage esto para que si el usuario completa la compra se borre para que no
    //tenga problemas al generar otro ticket si sigue en la sesion
    //Lo voy a usar para pasarle al <iframe> en el src="" que seria la ruta en donde esta el pdf
    const pdfBase64 = pdf.output('datauristring');
    sessionStorage.setItem('ticketPDF', pdfBase64);

    setTimeout(() => {
        window.location.href = "../Ticket/ticket.html";
    }, 1000);
}

function cambiadorTema() {
    const btnTema = document.getElementById("themeBtn");
    const body = document.getElementsByTagName("body")[0];
    const headerContainer = document.getElementsByTagName("header")[0];
    const footer = document.getElementsByTagName("footer")[0];
    const temaGuardado = localStorage.getItem("tema");

    if (temaGuardado === "true") {
        body.classList.add("dark");
        body.classList.add("darkLinks");
        headerContainer.classList.add("darkHeader");
        footer.classList.add("darkFooter");
    } else {
        body.classList.remove("dark");
        body.classList.remove("darkLinks")
        headerContainer.classList.remove("darkHeader");
        footer.classList.remove("darkFooter");
    }

    btnTema.addEventListener("click", () => {
        let darkMode = body.classList.toggle("dark");
        body.classList.toggle("darkLinks");
        headerContainer.classList.toggle("darkHeader");
        footer.classList.toggle("darkFooter");
        localStorage.setItem("tema", darkMode);
    });
}


iniciarCarrito();