import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";
export default {

    async getUserLogin(user) {
        // const [rows] = await conn.execute("SELECT * from usuarios WHERE username = ? AND password = ?", [user.username, user.password]);
        const usuario = await Usuario.findOne({
            where: {
                username: user.username,
            }
        })

        if (!usuario) return null;

        const userEncontrado = await bcrypt.compare(user.password, usuario.password)

        return userEncontrado || null;
    },
    async registerAdmin(user) {
        let username = user.username;
        let pass = user.password;
        const password = await bcrypt.hash(pass, 10);
        const adminUser = await Usuario.create({ username, password });
        return adminUser || null;
    }


} 