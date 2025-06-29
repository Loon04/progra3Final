import Producto from "../models/Producto.js";
//DAO data access object
export default {
    async getAll() {
        let productos = await Producto.findAll();
        return productos.map(producto => producto.toJSON());
    },

    async getById(id) { //[{},{}]
        let respuesta = await Producto.findOne({ where: { id: id } })
        return respuesta || null;
    },

    async updateProductActive(id, nuevoEstado) { //metodo que cambia el estado del campo Activo.
        const [updatedRows] = await Producto.update(
            { activo: nuevoEstado.activo },
            { where: { id } }
        );
        return updatedRows > 0;
    },

    async delete(id) {
        const deleteRow = await Producto.destroy({ where: { id } }); //un objeto con una confirmacion tecnica
        return deleteRow > 0; //. Si encontro el id devuelve 1 sino 0. La validacion esta en el controlador. 
        // No es como el rows de getAll(). Tambien tiene el segundo obj(metadatos). Desestructurar.
    },
    async createProduct(bodyProduct) {
        try {//metodo para crear productos!
            const productoCreado = await Producto.create(bodyProduct);
            return productoCreado;
        } catch (error) {
            return error;
        }
    },
    async updateProduct(id, bodyNewProduct) {
        try {//metodo para hacer update de todos los campos
            const [updatedRows] = await Producto.update(bodyNewProduct, { where: { id } });
            return updatedRows > 0;
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    async obtenerInactivos() {
        try { // metodo para obtener inactivos
            const rows = await Producto.findAll({ where: { activo: 0 } });
            return rows.length > 0 ? rows : null;
        } catch (error) {
            return error;
        }
    },
    async getPaginationProducts(page, pageSize) {
        const offset = (page - 1) * pageSize; // offset es para saber desde donde empezar a mostrar
        const limit = pageSize;

        return await Producto.findAndCountAll({
            limit,
            offset
        })
    },
    async getActivos() { //no es lo mismo que obtenerInactivos()
        let productos = await Producto.findAll({ where: { activo: 1 } });
        return productos.map(producto => producto.toJSON());
    }
}