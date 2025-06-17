import ProductDao from "../DAO/ProductDao.js";

export default {
    getProducts: () => {
        return ProductDao.getAll();
    },
    getById: (id) => {
        return ProductDao.getById(id);
    },
    putProduct: (id, campos) => {
        return ProductDao.update(id, campos);
    },
    deleteProduct: (id) => {
        return ProductDao.delete(id);
    },
    createProduct: async (bodyProduct) => {
        return ProductDao.createProduct(bodyProduct);
    },
    updateProduct: async (id, bodyNewProduct) => {
        return ProductDao.updateProduct(id, bodyNewProduct);
    }
}