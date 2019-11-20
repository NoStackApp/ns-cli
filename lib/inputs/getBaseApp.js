"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promptUser_1 = require("./promptUser");
const fs = require('fs-extra');
const testBaseApp = async (baseApp) => {
    if (baseApp.length > 0 && !await fs.pathExists(baseApp))
        return `The baseApp directory that you provided, '${baseApp}', does not exist.
    Please enter a new name or add the directory '${baseApp}' now.`;
    return '';
};
async function getBaseApp(baseApp) {
    let prompt = 'Please enter your baseApp now';
    if (baseApp) {
        prompt = await testBaseApp(baseApp);
    }
    if (prompt.length === 0)
        return baseApp;
    return promptUser_1.promptUser('baseApp', promptUser_1.promptTypes.TEXT, prompt, testBaseApp);
}
exports.getBaseApp = getBaseApp;
