"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validateUpdateMaterial = [
    (0, express_validator_1.check)("type").isString(),
    (0, express_validator_1.check)("value").isInt(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array(),
            });
        }
        next();
    },
];
exports.default = validateUpdateMaterial;
