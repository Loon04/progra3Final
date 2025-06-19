import { Venta, Producto } from "../models/relaciones.js";

export default{ 
crearVenta: async(req, res) =>{
const { productos, total, nombreUsuario } = req.body;
  try {

    const nuevaVenta = await Venta.create({ //pq
        nombreUsuario,
        total,
        fecha: new Date()
    });

    for (const item of productos) {
        const producto = await Producto.findByPk(item.id);

        if (producto.stock < item.cantidad) { //solo para el uso de prueba, se tiene que arreglar en el front
        return res.status(400).send(`Stock insuficiente para ${producto.nombre}`);
        }

    producto.stock -= item.cantidad;
    await producto.save(); //funcion de sequelize

    await nuevaVenta.addProducto(producto, { //funcion de sequelize q lo crea a partir de una relacion
    through: {} //no se como ponerle cantidad a producto_ventas con sequ
      });
    }

    return res.status(201).send("Exito al crear venta" + nuevaVenta.id);

  } catch (error) {
    console.error("Error al crear venta:", error);
    return res.status(500).send("Error en la base de datos");
  }
}
}