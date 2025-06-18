import Usuario from "../models/Usuario.js";

export default {

    async getUserLogin(user) {
        // const [rows] = await conn.execute("SELECT * from usuarios WHERE username = ? AND password = ?", [user.username, user.password]);
        let usuario = await Usuario.findOne({
            where: {
                username: user.username,
                password: user.password,
            }
        })

        return usuario || null;
    },
    async getFastUser() {
        const usuario = await Usuario.findOne();
        return usuario || null;
    }


} 