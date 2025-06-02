
function obtenerUsuarioYcargar() {
    const formInicio = document.getElementById("formInicio")

    formInicio.addEventListener("submit", (e) => {
        e.preventDefault();
        const usuario = e.target[0].value.trim();
        if (!usuario) {
            return
        }
        localStorage.setItem("usuario", usuario);
        window.location.href = "./pages/Inicio.html"
    })
}


function runApp() {
    obtenerUsuarioYcargar();
}

runApp();