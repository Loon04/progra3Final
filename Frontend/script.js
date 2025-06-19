function obtenerUsuarioYcargar() { // funcion principal del index donde inicializamos el sistema
    const usuario = localStorage.getItem("usuario"); //obtenemos el usuario desde el localStorage
    const formInicio = document.getElementById("formInicio") // obtenemos el form para guardar el usuario al comenzar

    formInicio.addEventListener("submit", (e) => {
        e.preventDefault();
        const usuario = e.target[0].value.trim(); // guardamos el valor del form en la variable
        if (!usuario) {// si no ingreso nada elusuario retornamos y no hacemos nada..
            return
        }
        localStorage.setItem("usuario", JSON.stringify(usuario));// guardamos el user en el local storage
        window.location.href = "./pages/Inicio/Inicio.html"// una vez guardado redirigimos al inicio.
    })

    const btnLogin = document.getElementById('boton-admin')
    btnLogin.addEventListener('click', () => {
        loadAdminSystem();

    });

}

async function loadAdminSystem() {

    window.location.href = "http://localhost:5000/api/usuarios/admin/login";

}

function runApp() { // funcion que arranca la funcion principal
    obtenerUsuarioYcargar();
}

runApp();