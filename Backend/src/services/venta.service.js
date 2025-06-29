import VentasRepo from "../repository/VentasRepository.js";

export default { // servicio donde manejamos las ventas
    createVenta: async ({ usuario, total }) => {
        return await VentasRepo.create({ usuario, total });
    }
}