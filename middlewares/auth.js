
const jwt = require('jsonwebtoken');
const User = require('../models/userModels');
const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Authorization header not found"
            })
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "token not found"
            });
        }
        const decoded = jwt.verify(token, "SECRET MESSAGE");
        const user = await User.findOne({ where: { id: decoded.user.id } });
        if (!user) {
            return res.status(404).json({
                message: "user not found"
            });

        }
        req.user = user;
        next();
    } catch (e) {
        return res.status(500).send(e);
    }
}

const isSeller = async (req, res, next) => {
    if (req.user.dataValues.isSeller) {
        next();
    } else {
        return res.status(401).json({
            message: "you are not a seller"
        })
    }
}
module.exports = {
    isAuthenticated,
    isSeller
}