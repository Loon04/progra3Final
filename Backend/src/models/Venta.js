import { DataTypes } from "sequelize";
import sequelize from "../database/dbConfig.js";

const Venta = sequelize.define("Venta", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombreUsuario: { type: DataTypes.STRING, allowNull: false },
    fecha: { type: DataTypes.DATE },
    total: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
}, {
    tableName: 'ventas'
})

export default Venta;


