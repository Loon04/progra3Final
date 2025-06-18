import { DataTypes } from "sequelize";
import sequelize from "../database/dbConfig.js";

const Producto = sequelize.define('Producto', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.TEXT },
    precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false },
    imagen: { type: DataTypes.STRING },
    tipo: { type: DataTypes.STRING, allowNull: false },
    activo: { type: DataTypes.SMALLINT }
}, {
    tableName: "productos",
    timestamps: false
})

export default Producto;
