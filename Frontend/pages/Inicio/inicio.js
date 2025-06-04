// localStorage.removeItem('carrito'); //POR AHORA

async function ejecutarInicio() {
    const usuario = localStorage.getItem("usuario");

    if (!usuario) {
        window.location.href = "../../index.html"
    } else {
        cargarProductos();
    }
}

let carrito = JSON.parse(localStorage.getItem('carrito')) || []; //aca esta el get

async function cargarProductos() {

    const request = await fetch("../../db/test-productos.json");
    const data = await request.json();

    let renderProduct = 3;
    const pagData = data.slice(0, 3);

    renderizarProductos(pagData);


    paginator(data, renderProduct);

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

function paginator(data, productosRenderizar) {
    const pagContainer = document.getElementById("pag-container");
    pagContainer.innerHTML += `
        <nav aria-label="Page navigation example" style=width:17rem>
            <p>Pagina:</p>
            <ul class="pagination">
                <li></li>
                <li class="page-item"><a class="btn page-link" id="prev">Anterior</a></li>
                
                <li class="page-item"><a class="btn page-link" id="next">Siguiente</a></li>
            </ul>
        </nav>
    `
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");
    let indiceActual = 0;

    function mostrarPagina() {
        const slicedData = data.slice(indiceActual, indiceActual + productosRenderizar);
        console.log(slicedData);
        renderizarProductos(slicedData);
    }

    next.addEventListener("click", () => {
        if (indiceActual + productosRenderizar < data.length) {
            indiceActual += productosRenderizar;
            mostrarPagina();
        }
    });

    prev.addEventListener("click", () => {
        if (indiceActual - productosRenderizar >= 0) {
            indiceActual -= productosRenderizar;
            mostrarPagina();
        }
    });
}

function renderizarProductos(data) {
    const productContainer = document.getElementsByClassName("product-container")[0];
    const fragment = document.createDocumentFragment();

    productContainer.innerHTML = "";
    data.forEach(element => {

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
    );
    productContainer.appendChild(fragment);
}



ejecutarInicio();