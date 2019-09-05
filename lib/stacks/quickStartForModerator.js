"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loginUser_1 = require("../auth/loginUser");
// import {genericApiCall} from '../genericApiCall'
const createModerator_1 = require("./createModerator");
const createStack_1 = require("./createStack");
async function quickStartForModerator(userInfo) {
    await createModerator_1.createModerator(userInfo);
    await createStack_1.createStack(userInfo);
    await loginUser_1.loginUser(userInfo);
}
exports.quickStartForModerator = quickStartForModerator;
