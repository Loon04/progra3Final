// localStorage.removeItem('carrito'); //POR AHORA

async function ejecutarInicio() {
    const usuario = localStorage.getItem("usuario");
    cambiadorTema();
    if (!usuario) {
        window.location.href = "../../index.html"
    } else {
        cargarProductos();
    }
}

let carrito = JSON.parse(localStorage.getItem('carrito')) || []; //aca esta el get

async function cargarProductos() {

    const request = await fetch("../../db/test-productos.json");
    let data = await request.json();
    data = await data.map((el) => ({ ...el, cantidad: 0 }))

    funcionFiltro(data);

}



function seleccion(container, selector) {
    const funBoton = container.querySelector(selector)
    return funBoton
}

function actualizarCarrito(container, selector, producto) {
    seleccion(container, selector).addEventListener('click', () => {
        const funBoton = container.querySelector(selector);
        const elemento = carrito.find(el => el.id == producto.id);
        const spanCant = container.querySelector(".cant-span");

        if (elemento) {
            elemento.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 })
        }
        funBoton.classList.remove("btn-primary")
        funBoton.classList.add("btn-success")
        funBoton.innerText = "✔️ Agregado"
        setTimeout(() => {
            funBoton.innerText = "✅ Agregar mas"
        }, 1500)
        if (!elemento) {
            spanCant.innerText = "Cantidad: 1";
        } else {
            spanCant.innerText = `Cantidad: ${elemento.cantidad}`
        }
        save()
    })
}

function save() {
    localStorage.setItem('carrito', JSON.stringify(carrito)); //aca esta el set
}

function paginator(data, productosRenderizar) {
    const pagContainer = document.getElementById("pag-container");
    pagContainer.innerHTML = "";
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
    //aca la sacamos si ya esta agregada 
    productContainer.classList.remove('fade');
    // Agregamos esta linea para reiniciar las animaciones 
    void productContainer.offsetWidth;
    productContainer.classList.add('fade');
    data.forEach(element => {

        const productDiv = document.createElement('div');
        productDiv.className = 'card m-2';
        productDiv.style.width = '18rem';

        const enCarrito = carrito.find(el => el.id == element.id);
        const cantidad = enCarrito ? enCarrito.cantidad : 0;

        productDiv.innerHTML += `
            <img src="${element.imagen}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${element.nombre}</h5>
                <p class="card-text">${element.descripcion}</p>
                <a href="#" class="btn ${enCarrito ? 'btn-success' : 'btn-primary'}">
                ${enCarrito ? '✅ Agregar más' : 'Agregar al carrito'}
            </a>
                <span class="cant-span">${cantidad > 0 ? `Cantidad: ${cantidad}` : ''}</span>
                </div>
        </div>`

        fragment.appendChild(productDiv);
        actualizarCarrito(productDiv, '.btn', element)
    }
    );
    productContainer.appendChild(fragment);
}

//funcion filtro donde llegan los datos y distribuimos dependiendo si elusuario filtra o no
function funcionFiltro(data) {
    const filtros = document.getElementsByClassName("filtro");
    let dataAccesorios = [];
    let dataRepuestos = [];
    //definimos cantidad de elementos a renderizar para usar el paginador
    const renderProduct = 3;

    //llamamos a la funcion que renderiza productos( por primera vez al iniciar la pagina)
    renderizarProductos(data.slice(0, renderProduct));
    //llamamos al paginador para que ejecute la logica
    paginator(data, renderProduct);

    //manejamos filtros dependiendo de que necesite el usuario.
    filtros[0].addEventListener("click", () => {
        //cada vez que el usuario seleccione un tipo de filtro todo el proceso se repite  --> renderizar-paginar... 
        renderizarProductos(data.slice(0, renderProduct));
        paginator(data, renderProduct);

    })
    filtros[1].addEventListener("click", () => {
        dataAccesorios = data.filter(el => el.tipo == "Accesorio");
        renderizarProductos(dataAccesorios.slice(0, renderProduct));
        paginator(dataAccesorios, renderProduct);
    })
    filtros[2].addEventListener("click", () => {
        dataRepuestos = data.filter(el => el.tipo == "Repuesto");
        renderizarProductos(dataRepuestos.slice(0, renderProduct));
        paginator(dataRepuestos, renderProduct);
    })
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

ejecutarInicio();