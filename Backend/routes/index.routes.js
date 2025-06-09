import { Router } from "express";
import usuarioRoutes from "./user.route.js"
const rutas_init = () => {
    const router = Router();


    router.use("/usuarios", usuarioRoutes);
    return router;
}

export default {
    rutas_init: rutas_init
};