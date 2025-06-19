import Producto from "./Producto.js";
import ProductoVenta from "./ProductoVenta.js";
import Venta from "./Venta.js";

Producto.belongsToMany(Venta, { through: ProductoVenta, foreignKey: 'productoId', otherKey: 'ventaId' });
Venta.belongsToMany(Producto, { through: ProductoVenta, foreignKey: 'ventaId', otherKey: 'productoId' });

export { Producto, Venta, ProductoVenta };