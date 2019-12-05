"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateAppCode_1 = require("../codeGeneration/generateAppCode");
const promptUser_1 = require("./promptUser");
const fs = require('fs-extra');
const testAppDir = async (appDir) => {
    const appName = generateAppCode_1.appNameFromPath(appDir);
    if (!appDir || appName.length === 0)
        return 'Your directory is missing for your app.  Please enter a path and a final directory name (all numbers and lowercase letters, no spaces).';
    const upperCaseCheck = /(.*[A-Z].*)/;
    if (upperCaseCheck.test(appDir))
        return `The appName '${appName}' contains at least one capital, which create-react-app does not permit.  Please enter a new path...`;
    if (await fs.pathExists(appDir))
        return `There already exists a directory ${appDir}.  Either delete the directory and try again or give a new name.  Please enter a path again...`;
    return '';
};
async function getAppDir(appDir) {
    let prompt = 'Please enter a path for your app.  The actual directory of the app must be all numbers and lowercase letters, with no spaces.';
    if (appDir) {
        prompt = await testAppDir(appDir);
    }
    if (prompt.length === 0)
        return appDir;
    return promptUser_1.promptUser('appDir', promptUser_1.promptTypes.TEXT, prompt, testAppDir);
}
exports.getAppDir = getAppDir;
