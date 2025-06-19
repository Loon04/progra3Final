import { DataTypes } from "sequelize";
import sequelize from "../database/dbConfig.js";



const ProductoVenta = sequelize.define("productos_ventas", {
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
}, {
    tableName: "productos_ventas",
    timestamps: true
})

export default ProductoVenta;