
import userService from "../services/user.service.js"
import productService from "../services/product.service.js"

export default {
    login: async (req, res) => {

        let user = {
            username: req.body.username,
            password: req.body.password
        }
        let systemUser = await userService.loginUser(user)

        if (systemUser) {
            return res.redirect("/api/usuarios/admin/dashboard");
        } else {
            return res.status(401).render("login", { error: "Usuario o contraseña incorrectos", errores: [] });
        }

    },
    renderLogin: (req, res) => {
        res.status(200).render("login", { error: null, errores: [] });
    },
    renderDashboard: async (req, res) => {

        let productos = await productService.getProducts();
        return res.status(200).render("dashboard", { productos });

    },
    fastAcces: async (req, res) => {

        const user = { username: "admin", password: "admin" }

        return res.status(200).send(user);


    },
    registerAdmin: async (req, res) => {
        const reqUser = req.body;
        try {
            let userAdmin = await userService.registerAdmin(reqUser);
            if (userAdmin) {
                // Si todo salió bien, redirige al login de admin
                return res.status(200).redirect("/api/usuarios/admin/login");

            } else {
                return res.status(500).json({ message: "error" });
            }
        } catch (error) {
            console.error('Error al registrar administrador:', error);
            return res.status(500).json({ message: "Error en la base de datos." });
        }

    },
    renderRegister: async (req, res) => {
        res.render("register", { error: null, errores: [] });
    }


}