import conn from "../database/dbConfig.js";
//DAO data access object
export default {
    async getAll() {
        const [rows] = await conn.query("SELECT * from productos");
        return rows;
    },

    async getById(id){
        const [rows] = await conn.execute("SELECT * from productos WHERE id = ?", [id]);
        return rows
    },

    async delete(id){
        const [rows] = await conn.execute("DELETE from productos WHERE id = ?", [id]);
        return rows;
    }
}