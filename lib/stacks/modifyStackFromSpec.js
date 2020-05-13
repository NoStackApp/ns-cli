"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifyStackFromSpec = void 0;
const genericApiCall_1 = require("../tools/genericApiCall");
const fs = require('fs-extra');
async function modifyStackFromSpec(templateFile, userInfo, sampleEmail, addedSuffix, resetLevel) {
    // console.log(`in modifyStackFromSpec, userInfo:${JSON.stringify(userInfo)}`)
    let templateString = '';
    try {
        templateString = await fs.readFile(templateFile, 'utf8');
    }
    catch (err) {
        console.error(err);
        throw new Error(`error building stack from template: ${err}`);
    }
    const query = `mutation {
      DataSpec(template: "${templateString.replace(/\n/g, '\\n')}", platformId:"${userInfo.stackId}", sampleEmail: "${sampleEmail}", addedSuffix: "${addedSuffix}", resetLevel: ${resetLevel})
  }
  `;
    const returnedData = await genericApiCall_1.genericApiCall(query, userInfo);
    console.log(`returnedData=${JSON.stringify(returnedData)}`);
    return returnedData.DataSpec;
}
exports.modifyStackFromSpec = modifyStackFromSpec;
