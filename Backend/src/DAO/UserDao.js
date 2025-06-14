import conn from "../database/dbConfig.js";



export default {

    async getUserLogin(user) {
        const [rows] = await conn.execute("SELECT * from usuarios WHERE username = ? AND password = ?", [user.username, user.password]);
        if (rows.length > 0) {
            return rows;
        }
        return null;
    }


} 