function iniciarTicket() {
    let usuario = localStorage.getItem("usuario");
    if (!usuario) {
        window.location.href = "../../index.html"
    } else {
        cambiadorTema();
        mostarTicket();
        manejadorReinicioContinua();
    }

}

function mostarTicket() {
    const uriPDF = sessionStorage.getItem('ticketPDF');
    const contenedorPDF = document.getElementById('contenedor-pdf')

    const divPDF = document.createElement('div');
    divPDF.className = "ratio ratio-4x3 container-fluid";
    divPDF.style = "max-width: 400px";
    divPDF.innerHTML = `<iframe src="${uriPDF}" width="100%" height=100%></iframe>`

    const btnDescargar = document.createElement('button');
    btnDescargar.className = "btn btn-primary w-20% center-text d-block mx-auto m-2";
    btnDescargar.textContent = "Descargar Ticket"
    btnDescargar.addEventListener('click', () => {
        const link = document.createElement("a");
        link.href = uriPDF;
        link.download = "ticket.pdf";
        link.click();
    });

    contenedorPDF.appendChild(btnDescargar)
    contenedorPDF.appendChild(divPDF);
}

function cambiadorTema() {
    const btnTema = document.getElementById("themeBtn");
    const body = document.getElementsByTagName("body")[0];
    const headerContainer = document.getElementsByTagName("header")[0];
    const footer = document.getElementsByTagName("footer")[0];
    const temaGuardado = localStorage.getItem("tema");
    console.log(footer);
    if (temaGuardado === "true") {
        body.classList.add("dark");
        body.classList.add("darkLinks");
        headerContainer.classList.add("darkHeader");
        footer.classList.add("darkFooter");
        btnTema.innerHTML = `<i class="fa-solid fa-sun fa-lg"></i> Tema`;
    } else {
        body.classList.remove("dark");
        body.classList.remove("darkLinks")
        headerContainer.classList.remove("darkHeader");
        footer.classList.remove("darkFooter");
        btnTema.innerHTML = `<i class="fa-solid fa-moon fa-lg"></i> Tema`;
    }

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

function manejadorReinicioContinua() {
    const btnContenedor = document.getElementById("btnContenedor");
    btnContenedor.className = "container-fluid d-flex";
    const btnVolver = document.createElement("button")
    const btnSalir = document.createElement("button")
    btnContenedor.style = "max-width: 400px";
    btnVolver.className = "btn btn-primary w-20% center-text d-block mx-auto m-2"
    btnSalir.className = "btn btn-danger w-20% center-text d-block mx-auto m-2"
    btnVolver.innerText = "Hacer otra compra";
    btnSalir.innerText = "Salir"
    btnVolver.addEventListener("click", () => reiniciarCompra())
    btnSalir.addEventListener("click", () => salir())
    btnContenedor.appendChild(btnVolver);
    btnContenedor.appendChild(btnSalir);
    console.log(btnContenedor);
}
function reiniciarCompra() {
    localStorage.setItem("carrito", JSON.stringify([]));
    window.location.href = "../Inicio/Inicio.html"
}
function salir() {
    localStorage.removeItem("carrito")
    localStorage.removeItem("usuario")
    localStorage.removeItem("tema")
    window.location.href = "../../index.html"
}

iniciarTicket();