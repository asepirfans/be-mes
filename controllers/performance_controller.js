"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pagination_query_1 = require("../utils/pagination_query");
const performance_services_1 = __importDefault(require("../services/performance_services"));
class PerformanceController {
    async index(req, res) {
        const { page, limit } = (0, pagination_query_1.paginationQuery)(req.query);
        const { machine } = req.params;
        const data = await new performance_services_1.default().index(machine, { page, limit });
        if (!data.success) {
            return res.status(404).send(data);
        }
        return res.status(200).send(data);
    }
    async latest(req, res) {
        const { machine } = req.params;
        const data = await new performance_services_1.default().latest(machine);
        if (!data.success) {
            return res.status(404).send(data);
        }
        return res.status(200).send(data);
    }
}
exports.default = PerformanceController;
