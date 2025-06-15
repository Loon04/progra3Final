import { Router } from "express";
import usuarioRoutes from "./user.route.js"
import productoRoutes from "./product.route.js";

const rutas_init = () => {
    const router = Router();


    router.use("/usuarios", usuarioRoutes);
    router.use("/", productoRoutes);
    return router;
}

export default {
    rutas_init: rutas_init
};