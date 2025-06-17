import { Router } from "express";
import productController from "../controllers/product.controller.js";

const productoRoutes = Router();

productoRoutes.put("/admin/:id", productController.updateProductActive)
productoRoutes.delete("/admin/:id", productController.deleteProduct);
productoRoutes.get("/admin/nuevo", productController.renderAddProduct);
productoRoutes.post("/admin/nuevo", productController.addProduct);
productoRoutes.get("/admin/edit/:id", productController.renderEditProduct);
productoRoutes.put("/admin/edit/:id", productController.editProduct);

productoRoutes.get("/admin/inactives", productController.renderInactives);
productoRoutes.get("/all", productController.getAll);

export default productoRoutes;