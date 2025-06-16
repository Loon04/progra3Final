import { Router } from "express";
import productController from "../controllers/product.controller.js";

const productoRoutes = Router();

productoRoutes.put("/admin/:id", productController.updateProductActive)
productoRoutes.delete("/admin/:id", productController.deleteProduct);

export default productoRoutes;