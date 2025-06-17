import productService from "../services/product.service.js"

export default {
    deleteProduct: async (req, res) => {
        let id = req.params.id;
        try {
            const resultado = await productService.deleteProduct(id);

            if (resultado === 0) {
                return res.status(404).send("Producto no encontrado");
            }
            return res.redirect("/api/usuarios/admin/dashboard");
        } catch (error) {
            return res.status(500).send("Error en la base de datos.");
        }
    },
    updateProductActive: async (req, res) => {
        let id = req.params.id;
        try {
            const [product] = await productService.getById(id) //para saber en que estado esta el producto 
            //console.log(product); //desestructurar el array para tener el objeto
            if (!product) return res.status(404).send("Producto no encontrado");

            const nuevoEstado = product.activo ? 0 : 1; //es un if
            await productService.putProduct(id, { activo: nuevoEstado });

            return res.redirect("/api/usuarios/admin/dashboard");
        } catch (error) {
            console.error(error);
            return res.status(500).send("Error en la base de datos.");
        }
    },
    renderAddProduct: (req, res) => {
        return res.status(200).render("addProducto");
    },
    renderEditProduct: async (req, res) => {
        let id = req.params.id;
        let [producto] = await productService.getById(id);
        return res.status(200).render("editProducto", { producto });
    }
}