"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStackQuery = void 0;
const genericApiCall_1 = require("../tools/genericApiCall");
async function createStackQuery(userInfo) {
    const { password, email, name, stack, licenseId } = userInfo;
    const query = `mutation {
    CreateStack(
      name: "${stack}"
      licenseId: "${licenseId}"
      modName: "${name}"
      modEmail: "${email}"
      modPassword: "${password}"
    ) {
        id,
        name,
        clientId,
        moderators { id }
    }
  }`;
    const returnedData = await genericApiCall_1.genericApiCall(query, userInfo);
    // console.log(`returnedData=${JSON.stringify(returnedData, null, 2)}`)
    userInfo.stackId = returnedData.CreateStack.id;
    userInfo.id = returnedData.CreateStack.moderators[0].id;
    return returnedData;
}
exports.createStackQuery = createStackQuery;
