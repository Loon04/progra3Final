import conn from "../database/dbConfig.js";

export default {
    async getAll() {
        const [rows] = await conn.query("SELECT * from productos");
        return rows;
    }
}