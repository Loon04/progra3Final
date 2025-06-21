import UserRepo from "../repository/UserRepository.js";

export default {
    getUserLogin: (req) => {
        return req.body;
    },
    getUserRegister: (req) => {
        return req.body;
    },
    loginUser: async (reqUser) => {
        return UserRepo.getUserLogin(reqUser);
    },
    getFastUser: async () => {
        return UserRepo.getFastUser();
    },
    registerAdmin: async (user) => {
        return UserRepo.registerAdmin(user);
    }
}