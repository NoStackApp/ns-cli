"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secureDirectory = void 0;
const untildify = require('untildify');
exports.secureDirectory = untildify('~/secure');
