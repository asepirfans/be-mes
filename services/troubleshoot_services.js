"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const troubleshoot_model_1 = __importDefault(require("../models/troubleshoot_model"));
class TroubleshootService {
    async index(machine, { page, limit }) {
        const data = await troubleshoot_model_1.default.paginate({
            machine: machine,
        }, {
            page: page,
            limit: limit,
            sort: { _id: -1 },
        });
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
    async new(data) {
        const troubleshoot = new troubleshoot_model_1.default(data);
        await troubleshoot.save();
        return {
            success: true,
            message: "Data saved",
            data: troubleshoot,
        };
    }
    async update(id, state) {
        const troubleshoot = await troubleshoot_model_1.default.findOneAndUpdate({ _id: id }, { state: state });
        if (!troubleshoot) {
            return {
                success: false,
                message: "Data not found",
                data: null
            };
        }
        return {
            success: true,
            message: "Data updated",
            data: troubleshoot
        };
    }
}
exports.default = TroubleshootService;
