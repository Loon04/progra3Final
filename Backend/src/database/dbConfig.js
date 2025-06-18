import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config({ path: './src/.env' });

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: "mysql"
    }
)
try {
    await sequelize.authenticate();
} catch (error) {
    console.error("No se pudo conectar", error);
}



export default sequelize;