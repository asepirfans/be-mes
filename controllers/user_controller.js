"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pagination_query_1 = require("../utils/pagination_query");
const user_services_1 = __importDefault(require("../services/user_services"));
class UserController {
    async index(req, res) {
        const { page, limit } = (0, pagination_query_1.paginationQuery)(req.query);
        const data = await new user_services_1.default().index({ page, limit });
        if (!data.success) {
            return res.status(404).send(data);
        }
        return res.status(200).send(data);
    }
    async update(req, res) {
        const { id } = req.params;
        const data = await new user_services_1.default().update(id, req.body);
        if (!data.success) {
            return res.status(400).send(data);
        }
        return res.status(200).send(data);
    }
    async destroy(req, res) {
        const { id } = req.params;
        const data = await new user_services_1.default().destroy(id);
        if (!data.success) {
            return res.status(400).send(data);
        }
        return res.status(200).send(data);
    }
}
exports.default = UserController;
