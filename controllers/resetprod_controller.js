"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resetprod_service_1 = __importDefault(require("../services/resetprod_service"));
class ResetProdController {
    async reset(req, res) {
        const { machine } = req.params;
        const data = await new resetprod_service_1.default().resetAll(machine);
        if (!data.success) {
            return res.status(400).send(data);
        }
        return res.status(200).send(data);
    }
}
exports.default = ResetProdController;
