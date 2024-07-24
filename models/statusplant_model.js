"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusPlant = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const { Schema } = mongoose_1.default;
const statusPlant = new Schema({
    testing: {
        type: Object,
        required: true,
    },
    pickplace: {
        type: Object,
        required: true,
    },
}, {
    timestamps: true,
});
statusPlant.plugin(mongoose_paginate_v2_1.default);
exports.StatusPlant = mongoose_1.default.model("statusplants", statusPlant);
