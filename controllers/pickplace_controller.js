"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pagination_query_1 = require("../utils/pagination_query");
const pickplace_services_1 = __importDefault(require("../services/pickplace_services"));
class PickPlaceController {
    async index(req, res) {
        const { page, limit } = (0, pagination_query_1.paginationQuery)(req.query);
        console.log(limit);
        const data = await new pickplace_services_1.default().index({ page, limit });
        if (!data.success) {
            return res.status(404).send(data);
        }
        return res.status(200).send(data);
    }
    async latest(req, res) {
        const data = await new pickplace_services_1.default().latest();
        if (!data.success) {
            return res.status(404).send(data);
        }
        return res.status(200).send(data);
    }
}
exports.default = PickPlaceController;
