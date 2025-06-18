import Producto from "./Producto.js";
import Venta from "./Venta.js";

Producto.belongsToMany(Venta, { through: 'productos_ventas', foreignKey: 'productoId', otherKey: 'ventaId' });
Venta.belongsToMany(Producto, { through: 'productos_ventas', foreignKey: 'ventaId', otherKey: 'productoId' });

export { Producto, Venta };