"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParameter = void 0;
const parameter_model_1 = require("../models/parameter_model");
const getParameter = async (machine) => {
    const newestParameter = await parameter_model_1.Parameter.findOne({ machine: machine, state: true }, null, {
        sort: { _id: -1 },
    });
    if (!newestParameter) {
        return {
            machine: machine,
            oee_target: 0,
            loading_time: 0,
            target_count: 0,
            cycle_time: 0,
            object_type: "",
            state: false,
        };
    }
    return newestParameter;
};
exports.getParameter = getParameter;
