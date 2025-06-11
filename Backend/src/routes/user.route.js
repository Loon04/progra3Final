import { Router } from "express";
import userController from "../controllers/user.controller.js"
const usuarioRoutes = Router();

usuarioRoutes.post("/register", userController.register)

usuarioRoutes.post("/login", userController.login)


export default usuarioRoutes;