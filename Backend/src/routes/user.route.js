import { Router } from "express";
import userController from "../controllers/user.controller.js"
const usuarioRoutes = Router();
usuarioRoutes.get("/admin/login", userController.renderLogin)
usuarioRoutes.post("/admin/login", userController.login)

usuarioRoutes.get("/admin/dashboard", userController.renderDashboard);

export default usuarioRoutes;