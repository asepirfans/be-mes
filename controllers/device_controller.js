"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_services_1 = __importDefault(require("../services/device_services"));
class DeviceController {
    async input(req, res) {
        const data = await new device_services_1.default().input(req.body);
        if (!data.success) {
            return res.status(400).send(data);
        }
        return res.status(200).send(data);
    }
    async monitorProduction(req, res) {
        const { machine } = req.params;
        const data = await new device_services_1.default().monitorProduction(machine);
        if (!data.success) {
            return res.status(404).send(data);
        }
        return res.status(200).send(data);
    }
    async statusPlant(req, res) {
        const data = await new device_services_1.default().statusPlant();
        if (!data.success) {
            return res.status(404).send(data);
        }
        return res.status(200).send(data);
    }
}
exports.default = DeviceController;
