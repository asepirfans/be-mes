"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class MongoDB {
    constructor() {
        mongoose_1.default.Promise = global.Promise;
        mongoose_1.default.set("strictQuery", false);
    }
    async connect() {
        try {
            const mongo = await mongoose_1.default.connect(process.env.MONGO_URL);
            console.log(`MongoDB connected: ${mongo.connection.host}`);
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = MongoDB;
