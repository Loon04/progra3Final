import ProductRepo from "../repository/ProductRepository.js";

export default {
    getProducts: () => {
        return ProductRepo.getAll();
    },
    getById: (id) => {
        return ProductRepo.getById(id);
    },
    putProduct: (id, estado) => {
        return ProductRepo.updateProductActive(id, estado);
    },
    deleteProduct: (id) => {
        return ProductRepo.delete(id);
    },
    createProduct: async (bodyProduct) => {
        return ProductRepo.createProduct(bodyProduct);
    },
    updateProduct: async (id, bodyNewProduct) => {
        return ProductRepo.updateProduct(id, bodyNewProduct);
    },
    getInactivos: async () => {
        return ProductRepo.obtenerInactivos();
    },
    getPaginationProducts: async (page, pageSize) => {
        return ProductRepo.getPaginationProducts(page, pageSize);
    }
}