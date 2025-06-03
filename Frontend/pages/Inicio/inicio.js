function ejecutarInicio() {
    const usuario = localStorage.getItem("usuario");

    if (!usuario) {
        window.location.href = "../../index.html"
    } else {
        cargarProductos();
    }
}

async function cargarProductos() {

    const request = await fetch("../../db/test-productos.json");
    const data = await request.json();
    const pagContainer = document.getElementById("pag-container");
    const productosRenderizar = 3;
    console.log(data)
    const pagData = data.slice(0, productosRenderizar);
    console.log(pagData);
    renderizarProductos(pagData);

    pagContainer.innerHTML = ` 
                    <nav aria-label="Page navigation example" style="width: 17rem;">
                        <ul class="pagination">
                            <li class="page-item"><a class="btn page-link" id="prev"">Previous</a></li>
                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                            <li class="page-item"><a class="page-link" href="#">4</a></li>
                            <li class="page-item"><a class="btn page-link" id="next">Next</a></li>
                        </ul>
                    </nav>`

    paginator(data, productosRenderizar);


}
function paginator(data, productosRenderizar) {
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
    productContainer.innerHTML = "";

    data.forEach((element, index) => {


        productContainer.innerHTML += `
            <div class="card m-2" style="width: 18rem;">
            <img src="${element.imagen}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${element.nombre}</h5>
                <p class="card-text">${element.descripcion}</p>
                <a href="#" class="btn btn-primary">Agregar al carrito</a>
            </div>
        </div>
            `


    });
}
ejecutarInicio();