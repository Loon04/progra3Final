import { Router } from "express";
import userController from "../controllers/user.controller.js"
const usuarioRoutes = Router();
usuarioRoutes.get("/admin/login", userController.renderLogin)
usuarioRoutes.post("/admin/login", userController.login)
usuarioRoutes.get("/admin/fast-access", userController.fastAcces);
usuarioRoutes.get("/admin/dashboard", userController.renderDashboard);
usuarioRoutes.get("/register/admin", userController.renderRegister);
usuarioRoutes.post("/register/admin", userController.registerAdmin);

export default usuarioRoutes;