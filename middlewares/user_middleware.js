"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserUpdate = void 0;
const express_validator_1 = require("express-validator");
exports.validateUserUpdate = [
    (0, express_validator_1.check)("name").isString(),
    (0, express_validator_1.check)("username").isString(),
    (0, express_validator_1.check)("role").isString(),
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
