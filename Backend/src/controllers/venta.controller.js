import { Venta, Producto } from "../models/relaciones.js";

export default {
  crearVenta: async (req, res) => {
    const { productos, total, nombreUsuario } = req.body;
    try {

      for (const item of productos) {
        const producto = await Producto.findByPk(item.id);

        if (producto.stock < item.cantidad) { //solo para el uso de prueba, se tiene que arreglar en el front
          return res.status(400).send(`Stock insuficiente para ${producto.nombre}`);
        }
      }

      const nuevaVenta = await Venta.create({ //pq
        nombreUsuario,
        total,
        fecha: new Date()
      });

      for (const item of productos) {
        const producto = await Producto.findByPk(item.id);

        producto.stock -= item.cantidad;
        await producto.save(); //funcion de sequelize para actualizar (UPDATE producto...)
        //addProducto es un metodo generado por sequelize el cual inserta datos en la tabla intermedia
        //en este caso agarramos la venta y le insertamos el producto en el primer parametro..
        // luego con el objeto through le agregamos los campos extras (cantidad)
        // como estamos dentro del for hacemos este proceso por cada producto que este en el carrito..


        await nuevaVenta.addProducto(producto, { through: { cantidad: item.cantidad } });

      }
      return res.status(201).json({ message: "Exito al crear venta", id_venta: nuevaVenta.id });
    } catch (error) {
      console.error("Error al crear venta:", error);
      return res.status(500).send("Error en la base de datos");
    }
  }
}