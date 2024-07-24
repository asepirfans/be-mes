"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlyAdmin = void 0;
const jwt_decode_1 = require("jwt-decode");
const onlyAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).send({ message: "Unauthorized" });
    }
    const decoded = (0, jwt_decode_1.jwtDecode)(token);
    if (decoded.role !== "admin") {
        return res.status(401).send({ message: "You are not admin" });
    }
    next();
};
exports.onlyAdmin = onlyAdmin;
