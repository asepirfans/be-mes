"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const { Schema } = mongoose_1.default;
const troubleshootSchema = new Schema({
    machine: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    problem: {
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
troubleshootSchema.plugin(mongoose_paginate_v2_1.default);
const Troubleshoot = mongoose_1.default.model("troubleshoots", troubleshootSchema);
exports.default = Troubleshoot;
