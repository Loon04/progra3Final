import { Router } from "express";
import { usuarioRoutes } from "./user.route.js"
const rutas_init = () => {
    const router = Router();


    router.use("/usuarios", usuarioRoutes);
    return router;
}

module.exports = { rutas_init }