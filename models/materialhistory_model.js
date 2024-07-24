"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialHistory = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const { Schema } = mongoose_1.default;
const materialHistorySchema = new Schema({
    machine: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
materialHistorySchema.plugin(mongoose_paginate_v2_1.default);
exports.MaterialHistory = mongoose_1.default.model("materialhistories", materialHistorySchema);
