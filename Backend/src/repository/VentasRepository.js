import { Venta } from "../models/relaciones.js";
//
export default {
    async create({nombreUsuario, total})  {
        try {
            const ventaCreado = await Venta.create({ //un solo obj 
                nombreUsuario,
                total,
                fecha: new Date()
            });
            return ventaCreado;
        } catch (error) {
            return error;
        }
    }
}