import { Router } from "express";
import productController from "../controllers/product.controller.js";
import upload from "../middlewares/multerConfig.js";

const productoRoutes = Router();

productoRoutes.put("/admin/:id", productController.updateProductActive)
productoRoutes.delete("/admin/:id", productController.deleteProduct);
productoRoutes.get("/admin/nuevo", productController.renderAddProduct);
productoRoutes.post("/admin/nuevo",upload.single("imagen"), productController.addProduct); 
//single -> le dice a multer que vas a recibir un solo archivo
//"imagen" el nombre del input en el formulario HTML
productoRoutes.get("/admin/edit/:id", productController.renderEditProduct);
productoRoutes.put("/admin/edit/:id", productController.editProduct);

productoRoutes.get("/admin/inactives", productController.renderInactives);
productoRoutes.get("/all", productController.getAll);
productoRoutes.get("/", productController.getPagination);

export default productoRoutes;