import { Router } from "express";
import productController from "../controllers/product.controller.js";

const productoRoutes = Router();

productoRoutes.put("/admin/productos/:id", productController.updateProductActive)
productoRoutes.delete("/admin/productos/:id", productController.deleteProduct);

export default productoRoutes;