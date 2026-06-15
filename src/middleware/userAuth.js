const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const userAuth = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        const { token } = cookies;
        if (!token) {
            throw new Error("Token not found...");
        }
        const verifyToken = await jwt.verify(token, "SUMIT@krk$123");
        const { _id } = verifyToken;
        const findUser = await User.findById(_id);
        if (!findUser) {
            throw new Error("User Not found..")
        }
        req.user = findUser;
        next();
    }catch(err){
        res.status(400).send("Error"+err.message);
    }
}

module.exports = {
    userAuth
}