"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMessage = void 0;
const chalk_1 = require("chalk");
exports.errorMessage = (details) => `installation error: ${chalk_1.default.red(details)}. If needed, please contact NoStack support: info@nostack.net.`;
