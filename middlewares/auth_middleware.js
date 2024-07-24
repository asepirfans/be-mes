"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = exports.validateLogin = exports.auth = void 0;
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send({ message: "Unauthorized" });
    }
    let secretKey = process.env["JWT_SECRET_KEY"] || "secret";
    const token = req.headers.authorization.split(" ")[1];
    try {
        const credential = jsonwebtoken_1.default.verify(token, secretKey);
        if (credential) {
            return next();
        }
        return res.status(401).send({ message: "Token Invalid" });
    }
    catch (error) {
        return res.status(401).send({ message: "Unauthorized", error: error });
    }
};
exports.auth = auth;
exports.validateLogin = [
    (0, express_validator_1.check)("username").isString(),
    (0, express_validator_1.check)("password").isString(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array(),
            });
        }
        next();
    },
];
exports.validateRegister = [
    (0, express_validator_1.check)("username").isString(),
    (0, express_validator_1.check)("password").isString(),
    (0, express_validator_1.check)("name").isString(),
    (0, express_validator_1.check)("role").isString(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array(),
            });
        }
        next();
    }
];
