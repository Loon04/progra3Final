import { Router } from "express";
import productController from "../controllers/product.controller.js";
import upload from "../middlewares/multerConfig.js";
import { validarAgregarProducto } from "../middlewares/addProductoValidation.js";
import { validarEditarProducto } from "../middlewares/editProductoValidation.js";

const productoRoutes = Router();

productoRoutes.put("/admin/:id", productController.updateProductActive)
productoRoutes.delete("/admin/:id", productController.deleteProduct);
productoRoutes.get("/admin/nuevo", productController.renderAddProduct);
productoRoutes.post("/admin/nuevo", upload.single("imagen"), validarAgregarProducto, productController.addProduct);
//single -> le dice a multer que vas a recibir un solo archivo
//"imagen" el nombre del input en el formulario HTML
productoRoutes.get("/admin/edit/:id", productController.renderEditProduct);
productoRoutes.put("/admin/edit/:id", upload.single("imagen"), validarEditarProducto, productController.editProduct);

productoRoutes.get("/admin/inactives", productController.renderInactives);
productoRoutes.get("/all", productController.getAll);
productoRoutes.get("/", productController.getPagination);
productoRoutes.get("/activos", productController.getActivos);

export default productoRoutes;