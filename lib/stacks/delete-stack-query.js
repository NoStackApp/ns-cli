"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStackQuery = void 0;
const genericApiCall_1 = require("../tools/genericApiCall");
async function deleteStackQuery(userInfo) {
    const { stackId } = userInfo;
    const query = `mutation {
	DeleteStack(
		stackId: "${stackId}"
	)
}`;
    const returnedData = await genericApiCall_1.genericApiCall(query, userInfo);
    // console.log(`returnedData=${JSON.stringify(returnedData, null, 2)}`)
    // userInfo.stackId = returnedData.DeleteStack.id
    // console.log(`final userInfo=${JSON.stringify(userInfo)}`)
    return returnedData;
}
exports.deleteStackQuery = deleteStackQuery;
