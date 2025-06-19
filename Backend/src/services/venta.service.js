import VentasRepo from "../repository/VentasRepository.js";

export default {
    createVenta: async ({ usuario, total }) =>{
        return await VentasRepo.create({ usuario, total });
    }
}