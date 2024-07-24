"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Testing = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const { Schema } = mongoose_1.default;
const testingSchema = new Schema({
    timestamp: {
        type: Number,
        required: true,
    },
    values: {
        type: [Object],
        required: true,
    },
}, {
    timestamps: true,
});
testingSchema.plugin(mongoose_paginate_v2_1.default);
exports.Testing = mongoose_1.default.model("testings", testingSchema);
