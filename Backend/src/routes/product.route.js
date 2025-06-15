import { Router } from "express";
import productController from "../controllers/product.controller.js";

const productoRoutes = Router();

productoRoutes.delete("/admin/productos/:id", productController.deleteProduct);

export default productoRoutes;