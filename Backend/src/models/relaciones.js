import Producto from "./Producto.js";
import ProductoVenta from "./ProductoVenta.js";
import Venta from "./Venta.js";

// Aca en el configurador de relaciones creamos la relacion entre modelos
// para que sequelize nos cree la tabla intermedia producto_ventas

// Entonces generamos a partir del modelo que creamos ProductoVenta la tabla intermedia .... 
Producto.belongsToMany(Venta, { through: ProductoVenta, foreignKey: 'productoId', otherKey: 'ventaId' });
Venta.belongsToMany(Producto, { through: ProductoVenta, foreignKey: 'ventaId', otherKey: 'productoId' });

export { Producto, Venta, ProductoVenta };