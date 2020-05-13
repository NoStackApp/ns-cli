"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logProgress = void 0;
const chalk = require('chalk');
exports.logProgress = (message) => console.log(chalk.green(message));
