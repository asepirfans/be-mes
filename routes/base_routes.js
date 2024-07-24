"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class BaseRoutes {
    router;
    constructor() {
        this.router = express_1.default.Router();
        this.routes();
    }
}
exports.default = BaseRoutes;
