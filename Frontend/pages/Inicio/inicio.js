localStorage.removeItem('carrito'); //POR AHORA

async function ejecutarInicio() {
    const usuario = localStorage.getItem("usuario");

    if (!usuario) {
        window.location.href = "../../index.html"
    } else {
        await cargarDatos()
        cargarProductos(data);
    }
}

let carrito = JSON.parse(localStorage.getItem('carrito')) || []; //aca esta el get

async function cargarProductos(data) {
    const productContainer = document.getElementsByClassName("product-container")[0];
    const fragment = document.createDocumentFragment();
    //const request = await fetch("../../db/test-productos.json");
    //const data = await request.json();


    productContainer.innerHTML = "";


    data.forEach(element => {
        if (element.activo) {
            const productDiv = document.createElement('div');
            productDiv.className = 'card m-2';
            productDiv.style.width = '18rem';
            productDiv.innerHTML += `
            <img src="${element.imagen}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${element.nombre}</h5>
                <p class="card-text">${element.descripcion}</p>
                <a href="#" class="btn btn-primary">Agregar al carrito</a>
                </div>
        </div>`

            fragment.appendChild(productDiv);

            actualizarCarrito(productDiv, '.btn', element)
        }
    });
    productContainer.appendChild(fragment);
}


async function cargarDatos() {
    try {
        const request = await fetch("../../db/test-productos.json");
        data = await request.json();
    } catch (error) {
        console.log(error);
    }
}

function seleccion(container, selector) {
    const funBoton = container.querySelector(selector)
    return funBoton
}

function actualizarCarrito(container, selector, producto) {
    seleccion(container, selector).addEventListener('click', () => {
        carrito.push(producto)
        console.log(carrito);
        save()
    })
}

function save() {
    localStorage.setItem('carrito', JSON.stringify(carrito)); //aca esta el set
}
ejecutarInicio();