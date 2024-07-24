"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parameter = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const { Schema } = mongoose_1.default;
const parameterSchema = new Schema({
    machine: {
        type: String,
        required: true,
    },
    loading_time: {
        type: Number,
        required: true,
    },
    cycle_time: {
        type: Number,
        required: true,
    },
    oee_target: {
        type: Number,
        required: true,
    },
    target_count: {
        type: Number,
        required: true,
    },
    object_type: {
        type: String,
        required: true,
    },
    state: {
        type: Boolean,
        required: true,
    },
}, {
    timestamps: true,
});
parameterSchema.plugin(mongoose_paginate_v2_1.default);
exports.Parameter = mongoose_1.default.model("paramaters", parameterSchema);
