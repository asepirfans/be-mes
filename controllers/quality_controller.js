"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const quality_service_1 = __importDefault(require("../services/quality_service"));
const pagination_query_1 = require("../utils/pagination_query");
class QualityController {
    async index(req, res) {
        const { page, limit } = (0, pagination_query_1.paginationQuery)(req.query);
        const { machine } = req.params;
        const data = await new quality_service_1.default().index(machine, { page, limit });
        if (!data.success) {
            return res.status(404).send(data);
        }
        return res.status(200).send(data);
    }
    async latest(req, res) {
        const { machine } = req.params;
        const data = await new quality_service_1.default().latest(machine);
        if (!data.success) {
            return res.status(404).send(data);
        }
        return res.status(200).send(data);
    }
    async defect(req, res) {
        const { id } = req.params;
        const { defect } = req.body;
        const data = await new quality_service_1.default().defect(id, defect);
        if (!data.success) {
            return res.status(400).send(data);
        }
        return res.status(200).send(data);
    }
}
exports.default = QualityController;
