"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promptUser_1 = require("./promptUser");
const fs = require('fs-extra');
const testAppName = async (appName) => {
    if (!appName || appName.length === 0)
        return 'Please enter a name for your app (all numbers and lowercase letters, no spaces).';
    const upperCaseCheck = /(.*[A-Z].*)/;
    if (upperCaseCheck.test(appName))
        return `The appName '${appName}' contains at least one capital, which create-react-app does not permit.`;
    if (await fs.pathExists(appName))
        return `There already exists a directory for ${appName}.  Either delete the directory and try again or give a new name.`;
    return '';
};
async function getAppName(appName) {
    let prompt = 'Please enter a name for your app (all numbers and lowercase letters, no spaces).';
    if (appName) {
        prompt = await testAppName(appName);
    }
    if (prompt.length === 0)
        return appName;
    return promptUser_1.promptUser('appName', promptUser_1.promptTypes.TEXT, prompt, testAppName);
}
exports.getAppName = getAppName;
