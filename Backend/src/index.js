import express from "express";
import routerConfig from "./routes/index.routes.js";
import cors from "cors";
import { join, __dirname } from "./utils/utils.js";
import methodOverride from "method-override";
import dotenv from "dotenv";
dotenv.config({ path: './src/.env' });
import sequelize from "./database/dbConfig.js";
import "./models/Producto.js"
import "./models/Venta.js";
import "./models/relaciones.js";
import "./models/Usuario.js";


// middlewares
const configBasicaAPI = (app) => {
    app.use(express.urlencoded({ extended: true })); // pueda recibir forms 
    app.use(express.json()); // pueda recibir jsons
    app.use(methodOverride('_method')); //para que en html se pueda usar PUT y DELETE
    app.use(cors());

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
const init = async () => {
    const app = express();

    configBasicaAPI(app);
    configuracionMotorPlantillas(app);
    configuracionStatic(app);
    configuracionRouter(app);
    try {
        await sequelize.sync()
        const PORT = 5000;
        app.listen(PORT, () => console.log(`servidor corriendo en : http://localhost:${PORT}`));
    } catch (error) {
        console.log("Error al sincronizar la bd", error);
    }

}
init();


