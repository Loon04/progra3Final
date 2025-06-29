function validarEditarProducto(req, res, next) {// creamos funcion middleware para validar los campos del form de editar producto
    const { nombre, precio, stock, tipo, descripcion } = req.body;
    const errors = [];
    if (!nombre) errors.push({ errMessage: "Nombre es requerido", type: "nombre" });
    else if (nombre.length < 3) errors.push({ errMessage: "El nombre debe tener al menos 3 caracteres", type: "title" });

    if (!precio) errors.push({ errMessage: "Precio es requerido", type: "precio" });
    else if (isNaN(precio) || Number(precio) <= 0) errors.push({ errMessage: "El precio debe ser un número mayor a 0", type: "precio" });

    if (!stock) errors.push({ errMessage: "Stock es requerido", type: "stock" });
    else if (!Number.isInteger(Number(stock)) || Number(stock) < 0) errors.push({ errMessage: "El stock debe ser un número entero mayor o igual a 0", type: "stock" });

    if (!tipo) errors.push({ errMessage: "El tipo es requerido", type: "tipo" });

    if (!descripcion) errors.push({ errMessage: "Descripcion es requerida", type: "desc" });
    else if (descripcion.length < 10) errors.push({ errMessage: "La descripción debe tener al menos 10 caracteres", type: "desc" });

    if (!req.file) errors.push({ errMessage: "Imagen es requerida", type: "img" })

    if (errors.length > 0) {
        return res.status(400).render("addProducto", { errors, old: req.body });
    }

    next();
}

export { validarEditarProducto }