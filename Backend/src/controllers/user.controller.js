
import userService from "../services/user.service.js"

export default {
    login: async (req, res) => {

        let user = {
            username: req.body.username,
            password: req.body.password
        }
        let systemUser = await userService.loginUser(user)

        if (systemUser) {
            res.redirect("/api/usuarios/admin/dashboard");
        } else {
            res.status(401).render("login", { error: "Usuario o contraseña incorrectos" });
        }

    },
    renderLogin: (req, res) => {
        res.status(200).render("login");
    },
    renderDashboard: (req, res) => {

        const productos = [ // aca necesitariamos el servicio de productos para recuperarlos de la BD... 
            { id: 1, nombre: "Producto 1", precio: 100 }
        ];
        res.status(200).render("dashboard", { productos });

    }


}