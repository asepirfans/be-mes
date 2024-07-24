"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user_model"));
class UserService {
    async index({ page, limit, }) {
        const data = await user_model_1.default.paginate({}, { page: page, limit: limit, sort: { _id: -1 } });
        if (!data) {
            return {
                success: false,
                message: "Data not found",
                data: null,
            };
        }
        return {
            success: true,
            message: "Data found",
            data: data,
        };
    }
    async update(id, data) {
        const user = await user_model_1.default.findById(id);
        if (!user) {
            return {
                success: false,
                message: "User not found",
                data: null,
            };
        }
        const updatedUser = await user_model_1.default.findByIdAndUpdate(id, data, { new: true });
        return {
            success: true,
            message: "User updated",
            data: updatedUser,
        };
    }
    async destroy(id) {
        const user = await user_model_1.default.findById(id);
        if (!user) {
            return {
                success: false,
                message: "User not found",
                data: null,
            };
        }
        const deletedUser = await user_model_1.default.findByIdAndDelete(id);
        return {
            success: true,
            message: "User deleted",
            data: deletedUser,
        };
    }
}
exports.default = UserService;
