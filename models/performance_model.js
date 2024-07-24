"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Performance = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const { Schema } = mongoose_1.default;
const performanceSchema = new Schema({
    machine: {
        type: String,
        required: true,
    },
    operation_time: {
        type: Number,
        required: true,
    },
    cycle_time: {
        type: Number,
        required: true,
    },
    processed: {
        type: Number,
        required: true,
    },
    state: {
        type: Boolean,
        required: true,
    },
}, {
    timestamps: true,
});
performanceSchema.plugin(mongoose_paginate_v2_1.default);
exports.Performance = mongoose_1.default.model("performances", performanceSchema);
