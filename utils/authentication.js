"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Authentication {
    static passwordHash = (password) => {
        return bcrypt_1.default.hash(password, 10);
    };
    static passwordCompare = (password, hashedPassword) => {
        return bcrypt_1.default.compare(password, hashedPassword);
    };
    static generateToken = (id, name, role) => {
        const secretKey = process.env['JWT_SECRET_KEY'] || "secret";
        const token = jsonwebtoken_1.default.sign({
            id, name, role
        }, secretKey, {
            expiresIn: "24h"
        });
        return token;
    };
}
exports.default = Authentication;
