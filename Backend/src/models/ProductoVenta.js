import { DataTypes } from "sequelize";
import sequelize from "../database/dbConfig.js";


//para agregar campos extra en la tabla intermedia
//tenemos que definir el modelo en nuestra app de node
//para que sequelize nos permita agregar mas campos en este caso 
// CANTIDAD ... 
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