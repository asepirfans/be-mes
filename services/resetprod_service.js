"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const availability_model_1 = require("../models/availability_model");
const parameter_model_1 = require("../models/parameter_model");
const mongoose_1 = __importDefault(require("mongoose"));
const performance_model_1 = require("../models/performance_model");
const quality_model_1 = require("../models/quality_model");
const oee_model_1 = require("../models/oee_model");
const statusplant_model_1 = require("../models/statusplant_model");
class ResetProdService {
    async resetAll(machine) {
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        try {
            await parameter_model_1.Parameter.updateMany({ machine: machine, state: true }, { state: false });
            await availability_model_1.Availability.updateMany({ machine: machine, state: true }, { state: false });
            await performance_model_1.Performance.updateMany({ machine: machine, state: true }, { state: false });
            await quality_model_1.Quality.updateMany({ machine: machine, state: true }, { state: false });
            await oee_model_1.OEE.updateMany({ machine: machine, state: true }, { state: false });
            await statusplant_model_1.StatusPlant.updateMany({}, {
                $set: {
                    pickplace: { status: false, pb_start: false, pb_stop: false },
                    testing: { status: false, pb_start: false, pb_stop: false },
                },
            });
            await session.commitTransaction();
            return {
                success: true,
                message: "Data reset successfully",
                data: {
                    pickplace: { status: false, pb_start: false, pb_stop: false },
                    testing: { status: false, pb_start: false, pb_stop: false },
                },
            };
        }
        catch (error) {
            await session.abortTransaction();
            session.endSession();
            return {
                success: false,
                message: "Error while resetting data : " + error,
                data: null,
            };
        }
    }
}
exports.default = ResetProdService;
