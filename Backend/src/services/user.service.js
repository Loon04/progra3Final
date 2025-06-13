import UserDao from "../DAO/UserDao.js";

export default {
    getUserLogin: (req) => {
        return req.body;
    },
    getUserRegister: (req) => {
        return req.body;
    },
    loginUser: async (reqUser) => {
        return UserDao.getUser(reqUser.username);
    }
}