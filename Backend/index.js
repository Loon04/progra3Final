import express from "express";
import userRoutes from "./routes/user.route.js"
import routerConfig from "./routes/index.routes.js";

const configBasicaAPI = (app) => {
    app.use(express.json()); // pueda recibir jsons
    app.use(express.urlencoded({ extended: true })); // pueda recibir forms 


    app.use("/api/usuarios", userRoutes);

}
const configuracionRouter = (app) => {
    app.use("/api/", routerConfig.rutas_init)
}

const init = () => {
    const app = express();

    configBasicaAPI(app);
    configuracionRouter(app);

    const PORT = 5000;
    app.listen(PORT, () => console.log(`servidor corriendo en : http://localhost:${PORT}`));

}
init();


