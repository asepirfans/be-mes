"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validateParameter = [
    (0, express_validator_1.check)("machine").isString(),
    (0, express_validator_1.check)("loading_time").isInt(),
    (0, express_validator_1.check)("cycle_time").isDecimal(),
    (0, express_validator_1.check)("oee_target").isInt(),
    (0, express_validator_1.check)("object_type").isString(),
    (0, express_validator_1.check)("target_count").isInt(),
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
exports.default = validateParameter;
