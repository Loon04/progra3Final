async function cargarProductos() {
    const productContainer = document.getElementsByClassName("product-container")[0];
    const request = await fetch("../db/test-productos.json");
    const data = await request.json();

    productContainer.innerHTML = "";

    data.forEach(element => {
        productContainer.innerHTML += `
            <div class="col cardWidth">
                <div class="card">
                    <img src="${element.imagen}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${element.nombre}</h5>
                        <p class="card-text">${element.descripcion}</p>
                    </div>
                </div>
            </div>`
    });

}