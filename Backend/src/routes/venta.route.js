import { Router } from "express";
import ventaController from "../controllers/venta.controller.js";

const ventaRouter = Router()

ventaRouter.post("/", ventaController.crearVenta);

export default ventaRouter;