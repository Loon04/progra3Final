import conn from "../database/dbConfig.js";



export default {

    async getUserLogin(user) {
        const [rows] = await conn.execute("SELECT * from usuarios WHERE username = ? AND password = ?", [user.username, user.password]);
        if (rows.length > 0) {
            return rows;
        }
        return null;
    },
    async getFastUser() {
        const [user] = await conn.query("SELECT * from usuarios LIMIT 1");
        if (user) return user[0];
        return null;
    }


} 