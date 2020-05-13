"use strict";
// import {PJSON} from '@oclif/config'
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStackName = exports.getNewStackName = exports.stackExists = void 0;
const genericApiCall_1 = require("../tools/genericApiCall");
const promptUser_1 = require("./promptUser");
async function stackExists(stackName) {
    // console.log(`in resetStackCall, userInfo:${JSON.stringify(userInfo)}`)
    let userInfo = {
        name: '',
        stack: '',
        password: '',
        email: '',
        licenseId: '',
        stackId: '',
        refreshToken: '',
        accessToken: '',
        id: '',
    };
    const query = `query {
      stackExists(stackName:"${stackName}")
  }
  `;
    const returnedData = await genericApiCall_1.genericApiCall(query, userInfo);
    return returnedData.stackExists;
}
exports.stackExists = stackExists;
const testStackName = async (stackName, isNew) => {
    if (!stackName || stackName.length === 0)
        return 'Please enter a name for your stack (all numbers and letters, no spaces).';
    if (stackName.length > 128)
        return 'A stack name cannot exceed 128 letters';
    const charactersCheck = /[^a-zA-Z0-9]/g;
    if (charactersCheck.test(stackName))
        return `The stackName '${stackName}' contains forbidden characters.  A stack name can contain
    uppercase and lowercase letters (a-z, A-Z), numbers (0-9)`;
    const alreadyExists = await stackExists(stackName);
    if (isNew && alreadyExists)
        return `There already exists a stack with the name ${stackName}.  Please select something else.`;
    if (!isNew && !alreadyExists)
        return `There is no stack with the name ${stackName}.  Please check the name.`;
    return '';
};
const testNewStack = async (stackName) => testStackName(stackName, true);
const testExistingStack = async (stackName) => testStackName(stackName, false);
async function getNewStackName(stackName) {
    let prompt = 'Please enter a name for your stack (all numbers and lowercase letters, no spaces).';
    if (stackName) {
        prompt = await testNewStack(stackName);
    }
    if (prompt.length === 0)
        return stackName;
    return promptUser_1.promptUser('stackName', promptUser_1.promptTypes.TEXT, prompt, testNewStack);
}
exports.getNewStackName = getNewStackName;
async function getStackName(stackName) {
    let prompt = 'Please enter a name for your stack (all numbers and lowercase letters, no spaces).';
    if (stackName) {
        prompt = await testExistingStack(stackName);
    }
    if (prompt.length === 0)
        return stackName;
    return promptUser_1.promptUser('stackName', promptUser_1.promptTypes.TEXT, prompt, testExistingStack);
}
exports.getStackName = getStackName;
