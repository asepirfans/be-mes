"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_services_1 = __importDefault(require("../services/auth_services"));
class AuthController {
    async login(req, res) {
        const { username, password } = req.body;
        const data = await new auth_services_1.default().login({ username, password });
        if (!data.success) {
            return res.status(401).send(data);
        }
        return res.status(200).send(data);
    }
    async register(req, res) {
        const { username, password, name, role } = req.body;
        const data = await new auth_services_1.default().register({
            username,
            password,
            name,
            role,
        });
        if (!data.success) {
            return res.status(401).send(data);
        }
        return res.status(200).send(data);
    }
    async logout(req, res) {
        return res.status(200).send({
            success: true,
            message: "Logout Success",
            data: null,
        });
    }
}
exports.default = AuthController;
