export default {

    register: (req, res) => {
        const usuario = req.body;
        res.status(200).json(usuario);

    },
    login: (req, res) => {
        const usuario = req.body;
        res.status(200).json(usuario);

    }


}