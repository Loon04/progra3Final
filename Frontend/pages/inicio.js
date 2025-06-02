function ejecutarInicio() {
    const usuario = localStorage.getItem("usuario");

    if (!usuario) {
        window.location.href = "../index.html"
    } else {
        console.log("pantalla inicio")
    }
}

ejecutarInicio();