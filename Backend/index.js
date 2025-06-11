import express from "express";
import routerConfig from "./src/routes/index.routes.js";

const configBasicaAPI = (app) => {
    app.use(express.json()); // pueda recibir jsons
    app.use(express.urlencoded({ extended: true })); // pueda recibir forms 
}
const configuracionRouter = (app) => {
    app.use("/api/", routerConfig.rutas_init())
}

const configuracionMotorPlantillas = (app) => {
    app.set("view engine", "ejs");
    app.set("views", "./views");
}

const init = () => {
    const app = express();

    configBasicaAPI(app);
    configuracionRouter(app);

    const PORT = 5000;
    app.listen(PORT, () => console.log(`servidor corriendo en : http://localhost:${PORT}`));

}
init();


