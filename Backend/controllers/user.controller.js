import userService from "../services/user.service.js"

export default {

    register: (req, res) => {
        const usuario = userService.getUserRegister(req);
        res.status(200).json(usuario);

    },
    login: (req, res) => {
        const usuario = userService.getUserLogin(req);
        res.status(200).json(usuario);

    }


}