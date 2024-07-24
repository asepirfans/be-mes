"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user_model"));
const authentication_1 = __importDefault(require("../utils/authentication"));
const errorResponse = {
    success: false,
    message: "Wrong username or password!",
    data: null,
};
class AuthServices {
    async login({ username, password }) {
        const user = await user_model_1.default.findOne({ username });
        if (user != null) {
            const isPasswordMatch = await authentication_1.default.passwordCompare(password, user.password);
            if (isPasswordMatch) {
                const token = authentication_1.default.generateToken(user.id, user.name, user.role);
                return {
                    success: true,
                    message: "Login Success",
                    data: {
                        token: token,
                        user: user,
                    },
                };
            }
            else {
                return errorResponse;
            }
        }
        else {
            return errorResponse;
        }
    }
    async register({ username, password, name, role, }) {
        if (!username || !password || !name || !role) {
            return {
                success: false,
                message: "username, password, name and role is required",
                data: null,
            };
        }
        const user = await user_model_1.default.findOne({ username });
        if (user) {
            return {
                success: false,
                message: "Username already exists",
                data: null,
            };
        }
        const passwordHash = await authentication_1.default.passwordHash(password);
        const newUser = new user_model_1.default({
            name,
            username,
            password: passwordHash,
            role,
        });
        await newUser.save();
        return {
            success: true,
            message: "Register Success",
            data: null,
        };
    }
    async logout() {
        return {
            success: true,
            message: "Logout Success",
            data: null,
        };
    }
}
exports.default = AuthServices;
