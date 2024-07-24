"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OEE = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const { Schema } = mongoose_1.default;
const oeeSchema = new Schema({
    machine: {
        type: String,
        required: true,
    },
    availability: {
        type: Number,
        required: true,
    },
    quality: {
        type: Number,
        required: true,
    },
    performance: {
        type: Number,
        required: true,
    },
    oee: {
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
oeeSchema.plugin(mongoose_paginate_v2_1.default);
exports.OEE = mongoose_1.default.model("oees", oeeSchema);
