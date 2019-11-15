"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genericApiCall_1 = require("../tools/genericApiCall");
async function resetStackCall(userInfo) {
    // console.log(`in resetStackCall, userInfo:${JSON.stringify(userInfo)}`)
    const query = `mutation {
      ResetStack(stackId:"${userInfo.stackId}")
  }
  `;
    const returnedData = await genericApiCall_1.genericApiCall(query, userInfo);
    // console.log(`returnedData=${JSON.stringify(returnedData)}`)
    return returnedData.ResetStack;
}
exports.resetStackCall = resetStackCall;
