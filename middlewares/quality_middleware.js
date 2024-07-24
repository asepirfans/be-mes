"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQualityDefect = void 0;
const express_validator_1 = require("express-validator");
exports.validateQualityDefect = [
    (0, express_validator_1.check)("defect").isInt(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array(),
            });
        }
        next();
    }
];
