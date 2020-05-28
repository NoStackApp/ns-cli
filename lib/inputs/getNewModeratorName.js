"use strict";
// import {PJSON} from '@oclif/config'
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExistingModeratorName = exports.getNewModeratorName = exports.moderatorExists = void 0;
const genericApiCall_1 = require("../tools/genericApiCall");
const promptUser_1 = require("./promptUser");
async function moderatorExists(moderatorName) {
    // console.log(`in resetModeratorCall, userInfo:${JSON.stringify(userInfo)}`)
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
      moderatorExists(moderatorName:"${moderatorName}")
  }
  `;
    const returnedData = await genericApiCall_1.genericApiCall(query, userInfo);
    return returnedData.moderatorExists;
}
exports.moderatorExists = moderatorExists;
const testModeratorName = async (moderatorName, isNew) => {
    if (!moderatorName || moderatorName.length === 0)
        return 'Please enter a name for your moderator (all numbers and letters, no spaces).';
    if (moderatorName.length > 128)
        return 'A moderator name cannot exceed 128 letters';
    const charactersCheck = /[^a-zA-Z0-9]/g;
    if (charactersCheck.test(moderatorName))
        return `The moderatorName '${moderatorName}' contains forbidden characters.  A moderator name can contain
    uppercase and lowercase letters (a-z, A-Z), numbers (0-9)`;
    // const alreadyExists = await moderatorExists(moderatorName)
    //
    // if (isNew && alreadyExists) return `There already exists a moderator with the name ${moderatorName}.  Please select something else.`
    // if (!isNew && !alreadyExists) return `There is no moderator with the name ${moderatorName}.  Please check the name.`
    return '';
};
const testNewModerator = async (moderatorName) => testModeratorName(moderatorName, true);
const testExistingModerator = async (moderatorName) => testModeratorName(moderatorName, false);
async function getNewModeratorName(moderatorName) {
    let prompt = 'Please enter a name for your moderator (all numbers and lowercase letters, no spaces).';
    if (moderatorName) {
        prompt = await testNewModerator(moderatorName);
    }
    if (prompt.length === 0)
        return moderatorName;
    return promptUser_1.promptUser('moderatorName', promptUser_1.promptTypes.TEXT, prompt, testNewModerator);
}
exports.getNewModeratorName = getNewModeratorName;
async function getExistingModeratorName(moderatorName) {
    let prompt = 'Please enter a name for your moderator (all numbers and lowercase letters, no spaces).';
    if (moderatorName) {
        prompt = await testExistingModerator(moderatorName);
    }
    if (prompt.length === 0)
        return moderatorName;
    return promptUser_1.promptUser('moderatorName', promptUser_1.promptTypes.TEXT, prompt, testExistingModerator);
}
exports.getExistingModeratorName = getExistingModeratorName;
