import { Router } from "express";
import ventaController from "../controllers/venta.controller.js";

const ventaRouter = Router()

ventaRouter.post("/", ventaController.crearVenta);
ventaRouter.get("/panel", ventaController.renderVentas);
ventaRouter.get("/all", ventaController.getAllVentas);
export default ventaRouter;