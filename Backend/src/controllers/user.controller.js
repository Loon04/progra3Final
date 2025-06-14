
import userService from "../services/user.service.js"
import productService from "../services/product.service.js"

export default {
    login: async (req, res) => {

        let user = {
            username: req.body.username,
            password: req.body.password
        }
        let systemUser = await userService.loginUser(user)
        console.log(systemUser);
        
        if (systemUser) {
            res.redirect("/api/usuarios/admin/dashboard");
        } else {
            res.status(401).render("login", { error: "Usuario o contraseña incorrectos" });
        }

    },
    renderLogin: (req, res) => {
        res.status(200).render("login");
    },
    renderDashboard: async (req, res) => {

        let productos = await productService.getProducts();

        res.status(200).render("dashboard", {productos});

    }


}