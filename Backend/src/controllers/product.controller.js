import productService from "../services/product.service.js"

export default {
    deleteProduct: async (req, res) => {
        const id = req.params.id;
        try {
            const resultado = await productService.deleteProduct(id);
            if (resultado === 0) { //si el resultado es 0 no encontro el id
                return res.status(404).json({ mensaje: "producto no encontrado." });
            }
            return res.redirect("/api/usuarios/admin/dashboard");
        } catch (error) {
            return res.status(500).json({ mensaje: "Error en la base de datos." });
        }
    },
    updateProductActive: async (req, res) => {
        let id = req.params.id;
        try {
            const product = await productService.getById(id) // obtenemos el producto para checkear que exista
            product.toJSON(); // parseamos para obtener solo el objeto
            if (!product) return res.status(404).json({ mensaje: "producto no encontrado." });// si no lo encontramos ERR 400
            const nuevoEstado = product.activo ? 0 : 1; //aca cambiamos el estado dependiendo en que esta es como un toggle
            const actualizado = await productService.putProduct(id, { activo: nuevoEstado });//actualizamos
            if (actualizado) {//si logra actualizar redirige al dashboard
                return res.redirect("/api/usuarios/admin/dashboard");
            } else {//si no error 500 de la bd
                return res.status(500).json({ mensaje: "No se pudo actualizar el producto." });
            }
        } catch (error) {
            return res.status(500).send("Error en la base de datos.");
        }
    },
    renderAddProduct: (req, res) => {
        return res.status(200).render("addProducto", { errors: [], old: {} });
    },
    renderEditProduct: async (req, res) => {
        let id = req.params.id;
        let producto = await productService.getById(id);
        producto.toJSON();
        return res.status(200).render("editProducto", { producto, errors: [], old: {} });
    },
    addProduct: async (req, res) => {
        let bodyProduct = req.body;
        try {
            if (req.file) bodyProduct.imagen = req.file.path; //(usariamos req.file.filename si estuvieramos guardando localmente)agrego el nombre de la imagen al body
            let productoCreado = await productService.createProduct(bodyProduct);

            if (productoCreado) {
                return res.status(200).redirect("/api/usuarios/admin/dashboard");
            } else {
                return res.status(500).json({ mensaje: "Error en la base de datos." });
            }
        } catch (error) {
            console.error("Error al crear producto:", error);
            return res.status(500).json({ mensaje: "Error en la base de datos" });
        }
    },
    editProduct: async (req, res) => {
        let bodyNewProduct = req.body;
        let id = req.params.id;
        try {
            let productoModificado = await productService.updateProduct(id, bodyNewProduct);
            if (productoModificado) {
                return res.status(200).redirect("/api/usuarios/admin/dashboard");
            } else {
                return res.status(500).json({ mensaje: "Error en la base de datos." });
            }
        } catch (error) {
            console.error("Error al editar producto:", error);
            return res.status(500).json({ mensaje: "Error en la base de datos." });
        }
    },
    renderInactives: async (req, res) => {
        let productos = await productService.getInactivos();
        return res.render("inactive", { productos });
    },
    getAll: async (req, res) => {
        let productos = await productService.getProducts();
        return res.status(200).json(productos);
    },
    getPagination: async (req, res) => {
        let page = parseInt(req.query.page) || 1;
        const pageTam = 3;

        const { count, rows } = await productService.getPaginationProducts(page, pageTam);

        return res.status(200).json({ items: rows, totalItems: count, currentPage: page, totalPages: Math.ceil(count / pageTam) });
    },
    getActivos: async (req, res) => {
        const productos = await productService.getActiveProducts()
        return res.status(200).json(productos);
    }
}