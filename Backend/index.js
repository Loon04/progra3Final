import express, { json } from "express";
import userRoutes from "./routes/user.route.js"
const init = () => {
    const app = express();
    configBasicaAPI(app);
    const PORT = 5000;
    app.listen(PORT, () => console.log(`servidor corriendo en : http://localhost:${PORT}`));

}

const configBasicaAPI = (app) => {
    app.use(express.json()); // pueda recibir jsons
    app.use(express.urlencoded({ extended: true })); // pueda recibir forms 


    app.use("/api/users", userRoutes);

}


init();


