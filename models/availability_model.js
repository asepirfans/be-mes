"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Availability = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const { Schema } = mongoose_1.default;
const availabilitySchema = new Schema({
    machine: {
        type: String,
        required: true,
    },
    operation_time: {
        type: Number,
        required: true,
    },
    down_time: {
        type: Number,
        required: true,
    },
    running_time: {
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
availabilitySchema.plugin(mongoose_paginate_v2_1.default);
exports.Availability = mongoose_1.default.model("availabilities", availabilitySchema);
