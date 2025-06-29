import { Router } from "express";
import usuarioRoutes from "./user.route.js"
import productoRoutes from "./product.route.js";
import ventaRouter from "./venta.route.js";

const rutas_init = () => { // router principal el cual define los demas routers para cada parte del servidor
    const router = Router();


    router.use("/usuarios", usuarioRoutes);
    router.use("/productos", productoRoutes);
    router.use("/venta", ventaRouter)
    return router;
}

export default {
    rutas_init: rutas_init
};