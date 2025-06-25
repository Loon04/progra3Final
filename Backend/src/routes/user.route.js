import { Router } from "express";
import userController from "../controllers/user.controller.js"
import { validarLogin } from "../middlewares/loginvalidation.js";
import { validarRegister } from "../middlewares/registervalidation.js";
const usuarioRoutes = Router();
usuarioRoutes.get("/admin/login", userController.renderLogin)
usuarioRoutes.post("/admin/login", validarLogin, userController.login)
usuarioRoutes.get("/admin/fast-access", userController.fastAcces);
usuarioRoutes.get("/admin/dashboard", userController.renderDashboard);
usuarioRoutes.get("/register/admin", userController.renderRegister);
usuarioRoutes.post("/register/admin", validarRegister, userController.registerAdmin);

export default usuarioRoutes;