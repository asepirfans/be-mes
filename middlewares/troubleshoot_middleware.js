"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTroubleshoot = void 0;
const express_validator_1 = require("express-validator");
exports.validateTroubleshoot = [
    (0, express_validator_1.check)("machine").isString(),
    (0, express_validator_1.check)("name").isString(),
    (0, express_validator_1.check)("problem").isString(),
    (0, express_validator_1.check)("state").isBoolean(),
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
