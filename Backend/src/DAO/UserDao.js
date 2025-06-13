import conn from "../database/dbConfig.js";



export default {

    async getUser(username) {
        const [rows] = await conn.execute("SELECT * from usuarios WHERE username = ? ", [username]);
        return rows;
    }


}