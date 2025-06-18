import { DataTypes } from "sequelize";
import sequelize from "../database/dbConfig.js";

const Usuario = sequelize.define("Usuario", {
    id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
}, {
    tableName: "usuarios"
})

export default Usuario;