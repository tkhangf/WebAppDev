const jwt = require("jsonwebtoken");
const config = require("../config");
const { BadRequestError } = require("../helpers/errors");

const verifyToken = (req, res, next) => {
    const authHeader = String(req.headers.authorization || "");
    let token = null;

    if (authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7, authHeader.length);
    }

    if (!token) {
        return next(new BadRequestError(401, "Không có quyền truy cập"));
    }

    jwt.verify(token, config.jwt.secret, (error, decoded) => {
        if (error) {
            console.log(error);
            return next(new BadRequestError(401, "Không có quyền truy cập"));
        }
        req.userId = decoded.id;
        return next();
    });
};

module.exports = {
    verifyToken,
};
