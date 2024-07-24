"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const troubleshoot_services_1 = __importDefault(require("../services/troubleshoot_services"));
const pagination_query_1 = require("../utils/pagination_query");
class TroubleshootController {
    async index(req, res) {
        const { page, limit } = (0, pagination_query_1.paginationQuery)(req.query);
        const { machine } = req.params;
        const data = await new troubleshoot_services_1.default().index(machine, {
            page,
            limit,
        });
        if (!data.success) {
            return res.status(404).send(data);
        }
        return res.status(200).send(data);
    }
    async new(req, res) {
        const troubleshoot = await new troubleshoot_services_1.default().new(req.body);
        if (!troubleshoot.success) {
            return res.status(400).send(troubleshoot);
        }
        return res.status(200).send(troubleshoot);
    }
    async update(req, res) {
        const { id } = req.params;
        const { state } = req.body;
        const troubleshoot = await new troubleshoot_services_1.default().update(id, state);
        if (!troubleshoot.success) {
            return res.status(400).send(troubleshoot);
        }
        return res.status(200).send(troubleshoot);
    }
}
exports.default = TroubleshootController;
