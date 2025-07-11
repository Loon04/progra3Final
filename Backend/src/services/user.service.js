import UserRepo from "../repository/UserRepository.js";

export default { // servicio donde utilizamos diferentes funciones relacionadas con los usuarios
    getUserLogin: (req) => {
        return req.body;
    },
    getUserRegister: (req) => {
        return req.body;
    },
    loginUser: async (reqUser) => {
        return UserRepo.getUserLogin(reqUser);
    },
    registerAdmin: async (user) => {
        return UserRepo.registerAdmin(user);
    }
}