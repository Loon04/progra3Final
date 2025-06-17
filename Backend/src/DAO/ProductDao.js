import conn from "../database/dbConfig.js";
//DAO data access object
export default {
    async getAll() {
        const [rows] = await conn.query("SELECT * from productos");
        return rows;
    },

    async getById(id) { //[{},{}]
        const [rows] = await conn.execute("SELECT * from productos WHERE id = ?", [id]);
        return rows; //[{}]
    },

    async update(id, updatedCampos = Object) { //put //rev para /editar
        //const [rows] = await conn.execute("UPDATE productos SET activo= 0 WHERE id = ?", [product.activo,product.id]);
        //return rows
        const keys = Object.keys(updatedCampos);
        const values = Object.values(updatedCampos);
        const setClause = keys.map(key => `${key} = ?`).join(", "); //el map pasa las consultas a string "nombre = ?"
        const [rows] = await conn.execute(`UPDATE productos SET ${setClause} WHERE id = ?`, [...values, id]);
        return rows;
    },

    async delete(id) {
        const [rows] = await conn.execute("DELETE from productos WHERE id = ?", [id]);
        return rows; //un objeto con info del cambio. No es como el rows de getAll(). Tambien tiene el segundo obj. Desestructurar
    },
    async createProduct(bodyProduct) {
        try {
            const { nombre, descripcion, precio, stock, imagen, tipo } = bodyProduct;
            const [rows] = await conn.execute("INSERT into productos (nombre, descripcion, precio, stock, imagen,tipo) values(?,?,?,?,?,?)", [nombre, descripcion, precio, stock, imagen, tipo])
            if (rows.length > 0) return rows;
            return null
        } catch (error) {
            return error;
        }
    },
    async updateProduct(id, bodyNewProduct) {
        try {
            const { nombre, descripcion, precio, stock, imagen, tipo } = bodyNewProduct;
            const [rows] = await conn.execute("UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, imagen = ?, tipo = ? WHERE id = ?", [nombre, descripcion, precio, stock, imagen, tipo, id])
            if (rows.affectedRows != 0) return true;
            console.log(rows);
            return false
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    async obtenerInactivos() {
        try {
            const [rows] = await conn.query("SELECT * FROM productos WHERE activo=0")
            if (rows.length > 0) return rows;
            return null
        } catch (error) {
            return error
        }
    }
}