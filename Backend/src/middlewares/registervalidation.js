
function validarRegister(req, res, next) {// Middleware, para validar el form del register
    const { username, password } = req.body;
    let errores = [];

    if (!username) errores.push("el usuario es requerido");
    if (!password || password.length < 2) errores.push("La contraseña debe tener al menos 2 caracteres");

    if (errores.length > 0) {
        return res.status(400).render("register", { errores, old: req.body });
    }

    next();


}

export { validarRegister }