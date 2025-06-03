function ejecutarInicio() {
    const usuario = localStorage.getItem("usuario");

    if (!usuario) {
        window.location.href = "../../index.html"
    } else {
        cargarProductos();
    }
}

async function cargarProductos() {
    const productContainer = document.getElementsByClassName("product-container")[0];
    const request = await fetch("../../db/test-productos.json");
    const data = await request.json();


    productContainer.innerHTML = "";


    data.forEach(element => {
        if (element.activo) {
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
        }

    });




}

ejecutarInicio();