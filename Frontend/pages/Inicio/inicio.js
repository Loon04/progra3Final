

async function ejecutarInicio() { // funcion principal que ejecuta las subFunciones fundamentales
    const usuario = localStorage.getItem("usuario"); // obtenemos el usuario del Local Storage
    cambiadorTema();// funcion que permite cambiar de tema
    if (!usuario) {
        window.location.href = "../../index.html" // si no hay usuario se redirige al inicio.
    } else {
        cargarDataCarritoHeader(); // funcion que carga el carrito en el header
        cargarProductos();
        salirSesion();
    }
}

let carrito = JSON.parse(localStorage.getItem('carrito')) || []; //aca esta el get del carrito para manejarlo global.

async function cargarProductos() { // esta funcion se encarga de recuperar los datos asyncronos.

    const request = await fetch("http://localhost:5000/api/productos/activos");
    let data = await request.json();
    data = await data.map((el) => ({ ...el, cantidad: 0 })) // a los datos que vienen de prueba le agregamos el campo cantidad

    funcionFiltro(data);// fucion que filtra los productos si se selecciona alguno.

}



function seleccion(container, selector) {
    const funBoton = container.querySelector(selector)
    return funBoton
}
//esta funcion se encarga de actualizar el carro y manejar las cantidades que el usuario
//va agregando---->
function actualizarCarrito(container, selector, producto) {
    seleccion(container, selector).addEventListener('click', () => {
        const funBoton = container.querySelector(selector);
        const elemento = carrito.find(el => el.id == producto.id);
        const spanCant = container.querySelector(".cant-span");
        //si el producto ya estae en el carrito le sumamos la cantidad
        if (elemento) {
            elemento.cantidad++;
        } else {
            //si no lo agregamos al carrito con cantidad 1
            carrito.push({ ...producto, cantidad: 1 })
        }
        //aca definimos animaciones y elementos que se crean para que la ui 
        //indique que el usuario esta operando el carrito
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
        cargarDataCarritoHeader();//esta funcion es para actualizar los datos en el header
        save()// save guarda el carrito en el local storage
    })
}
// save guarda el carrito en el local storage
function save() {
    localStorage.setItem('carrito', JSON.stringify(carrito)); //aca esta el set
}
//paginator implementa la funcionalidad de paginar los productos
function paginator(data, productosRenderizar) {
    const pagContainer = document.getElementById("pag-container");
    //Creamos los botones para paginar
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
    //funcion auxiliar para mostrar pagina
    function mostrarPagina() {
        //corta los datos desde indiceActual hasta los productos que se tienen que renderizar
        const slicedData = data.slice(indiceActual, indiceActual + productosRenderizar);
        renderizarProductos(slicedData);
    }
    //cuando hacen click en next se verifica que no llegamos al final de los datos
    next.addEventListener("click", () => {
        if (indiceActual + productosRenderizar < data.length) {
            //y sumamos al indice actual 3 productos mas
            indiceActual += productosRenderizar;
            mostrarPagina();
        }
    });
    //lo mismo pero restando..
    prev.addEventListener("click", () => {
        if (indiceActual - productosRenderizar >= 0) {
            indiceActual -= productosRenderizar;
            mostrarPagina();
        }
    });
}

function renderizarProductos(data) {
    //obtenemos el container para disponer los productos
    const productContainer = document.getElementsByClassName("product-container")[0];
    const fragment = document.createDocumentFragment();

    productContainer.innerHTML = "";
    //aca la sacamos si ya esta agregada 
    productContainer.classList.remove('fade');
    // Agregamos esta linea para reiniciar las animaciones 
    void productContainer.offsetWidth;
    productContainer.classList.add('fade');

    //recorremos los datos y creamos las cards
    data.forEach(element => {
        if (element.activo === 1) {


            const productDiv = document.createElement('div');
            productDiv.className = 'card m-2';
            productDiv.style.width = '18rem';
            //esta constante la utilizamos mas adelante para checkear si el usuario agrego el producto al carrito
            const enCarrito = carrito.find(el => el.id == element.id);

            //esta otra la usamos para modificar las cards y agregar la cantidad si el usuario lo agrego al carro
            const cantidad = enCarrito ? enCarrito.cantidad : 0;

            productDiv.innerHTML += `
            <img src="http://localhost:5000/img/imgProductos/${element.imagen}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${element.nombre}</h5>
                <p class="card-text">${element.descripcion}</p>
                <div class="price-cont">
                    <p class="precio-card">$ ${element.precio}</p>
                </div>
                <a href="#" class="btn ${enCarrito ? 'btn-success' : 'btn-primary'}">
                ${enCarrito ? '✅ Agregar más' : 'Agregar al carrito'}
            </a>
                <span class="cant-span">${cantidad > 0 ? `Cantidad: ${cantidad}` : ''}</span>
                </div>
        </div>`

            fragment.appendChild(productDiv);
            //llamamos a la funcion actualizar carrito para que este escuchando los cambios..
            actualizarCarrito(productDiv, '.btn', element)
        }
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

//Cambiador de tema agrega clases para pisar los colores claros en este caso
function cambiadorTema() {

    //seleccionamos los elementos a modificar
    const btnTema = document.getElementById("themeBtn");
    const body = document.getElementsByTagName("body")[0];
    const headerContainer = document.getElementsByTagName("header")[0];
    const footer = document.getElementsByTagName("footer")[0];
    //preguntamos al localStorage el tema
    const temaGuardado = localStorage.getItem("tema");

    //si esta en "true" esto es para la primera carga..
    if (temaGuardado === "true") {
        //se agregan estas clases
        body.classList.add("dark");
        body.classList.add("darkLinks");
        headerContainer.classList.add("darkHeader");
        footer.classList.add("darkFooter");
        btnTema.innerHTML = `<i class="fa-solid fa-sun fa-lg"></i> Tema`;
    } else {
        //si no se quitan
        body.classList.remove("dark");
        body.classList.remove("darkLinks")
        headerContainer.classList.remove("darkHeader");
        footer.classList.remove("darkFooter");
        btnTema.innerHTML = `<i class="fa-solid fa-moon fa-lg"></i> Tema`;
    }
    //y el click hace toggle a las clases 
    btnTema.addEventListener("click", () => {
        let darkMode = body.classList.toggle("dark");
        btnTema.innerHTML = darkMode
            ? `<i class="fa-solid fa-sun fa-lg"></i> Tema`
            : `<i class="fa-solid fa-moon fa-lg"></i> Tema`;
        body.classList.toggle("darkLinks");
        headerContainer.classList.toggle("darkHeader");
        footer.classList.toggle("darkFooter");
        localStorage.setItem("tema", darkMode);
    });
}
//esta funcion carga el carrito en el header
function cargarDataCarritoHeader() {
    //seleccionamos el contenedor del icono
    const cartHeader = document.getElementById("cartIcon");
    // si no hay carrito o esta vacio muestra solo "Carrito"
    if (!carrito || carrito.length === 0) {
        cartHeader.innerHTML += "Carrito";
        return
    }
    //creamos estos elementos para representar la info
    const p = document.createElement("p");
    const p1 = document.createElement("p");
    const div = document.createElement("div");
    let cartCantidad = 0;
    let total = 0;
    cartHeader.innerHTML = "";
    //calculamos
    carrito.forEach((el) => {
        cartCantidad += el.cantidad;
        total += el.cantidad * el.precio;
    })
    //y agregamos los elementos al icon del header
    cartHeader.innerHTML += `<i class="fa-solid fa-cart-shopping fa-lg"></i>`;
    p.innerText = cartCantidad;
    p1.innerText = "$" + total.toFixed(1);
    p.className = "m-0 p-0";
    p1.className = "m-0 p-0";
    p.style.fontSize = "10px";
    p1.style.fontSize = "10px";
    div.appendChild(p);
    div.appendChild(p1);
    cartHeader.appendChild(div);


}

function salir() {
    localStorage.removeItem("carrito")
    localStorage.removeItem("usuario")
    localStorage.removeItem("tema")
    window.location.href = "../../index.html"
}

function salirSesion() {
    const btnSalida = document.getElementById('salirBtn');
    btnSalida.addEventListener('click', () => salir());
}

ejecutarInicio();