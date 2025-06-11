import express from "express";
import routerConfig from "./routes/index.routes.js";
import { join, __dirname } from "./utils/utils.js";

const configBasicaAPI = (app) => {
    app.use(express.json()); // pueda recibir jsons
    app.use(express.urlencoded({ extended: true })); // pueda recibir forms 
}
const configuracionRouter = (app) => { // configuracion de las rutas 
    app.use("/api/", routerConfig.rutas_init())
}
const configuracionStatic = (app) => { // configuracion de archivos estaticos
    app.use(express.static(join(__dirname, "public")));
}
const configuracionMotorPlantillas = (app) => { // configuracion de motor de plantillas 
    app.set("view engine", "ejs");
    app.set("views", join(__dirname, "views"));
}

const init = () => {
    const app = express();

    configBasicaAPI(app);
    configuracionMotorPlantillas(app);
    configuracionStatic(app);
    configuracionRouter(app);

    const PORT = 5000;
    app.listen(PORT, () => console.log(`servidor corriendo en : http://localhost:${PORT}`));

}
init();


