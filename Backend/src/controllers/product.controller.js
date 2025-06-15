import productService from "../services/product.service.js"

export default {
    deleteProduct: async (req, res) => {
    try {
        let id = req.params.id;
        const resultado = await productService.deleteProduct(id);
    
        if (resultado === 0) {
        return res.status(404).send("Producto no encontrado");
        }
    return res.redirect("/api/usuarios/admin/dashboard"); 
    } catch (error) {
        return res.status(500).send("Error en la base de datos.");
    }
    }
}