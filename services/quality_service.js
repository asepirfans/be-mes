"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const quality_model_1 = require("../models/quality_model");
class QualityService {
    async index(machine, { page, limit }) {
        const data = await quality_model_1.Quality.paginate({ machine: machine }, { page: page, limit: limit, sort: { _id: -1 } });
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
    async latest(machine) {
        const data = await quality_model_1.Quality.findOne({ machine: machine }, null, {
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
    async defect(id, defect) {
        const quality = await quality_model_1.Quality.findById(id);
        if (!quality) {
            return {
                success: false,
                message: "Data quality not found",
                data: null,
            };
        }
        if (quality?.good == 0) {
            return {
                success: false,
                message: "No product processed",
                data: null,
            };
        }
        if (defect > quality?.good) {
            return {
                success: false,
                message: "Defect cannot be greater than good",
                data: null,
            };
        }
        const data = await quality_model_1.Quality.findOneAndUpdate({ _id: id }, {
            $inc: {
                defect: defect,
                good: -defect,
            },
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
            message: "Data successfully updated",
            data: data,
        };
    }
}
exports.default = QualityService;
