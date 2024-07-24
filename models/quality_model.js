"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quality = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const { Schema } = mongoose_1.default;
const qualitySchema = new Schema({
    machine: {
        type: String,
        required: true,
    },
    good: {
        type: Number,
        required: true,
    },
    defect: {
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
qualitySchema.plugin(mongoose_paginate_v2_1.default);
exports.Quality = mongoose_1.default.model("qualities", qualitySchema);
