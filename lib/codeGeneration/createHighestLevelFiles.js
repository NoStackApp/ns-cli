"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHighestLevelFiles = void 0;
const constants_1 = require("../constants");
const createTopProjectDirs_1 = require("./createTopProjectDirs");
const generateAppCode_1 = require("./generateAppCode");
const generateAppFile_1 = require("./generateAppFile");
const fs = require("fs-extra");
const Handlebars = require("handlebars");
async function createHighestLevelFiles(currentStack, appDir, userClass) {
    // DeleteInstanceMenu
    await fs.copy(`${constants_1.boilerplateDir}/DeleteInstanceMenu.js`, `${createTopProjectDirs_1.compDir}/DeleteInstanceMenu/index.js`);
    // EditInstanceForm
    await fs.copy(`${constants_1.boilerplateDir}/EditInstanceForm.js`, `${createTopProjectDirs_1.compDir}/EditInstanceForm/index.js`);
    // LoginForm
    await fs.copy(`${constants_1.boilerplateDir}/LoginForm.js`, `${createTopProjectDirs_1.compDir}/LoginForm/index.js`);
    // Forgot Password Button
    await fs.copy(`${constants_1.boilerplateDir}/ForgotPasswordButton.js`, `${createTopProjectDirs_1.compDir}/ForgotPasswordButton/index.js`);
    await fs.copy(`${constants_1.boilerplateDir}/ResetPasswordForm.js`, `${createTopProjectDirs_1.compDir}/ForgotPasswordButton/ResetPasswordForm.js`);
    await fs.copy(`${constants_1.boilerplateDir}/SendCodeForm.js`, `${createTopProjectDirs_1.compDir}/ForgotPasswordButton/SendCodeForm.js`);
    // RegistrationForm
    await fs.copy(`${constants_1.boilerplateDir}/RegistrationForm.js`, `${createTopProjectDirs_1.compDir}/RegistrationForm/index.js`);
    // RegistrationForm.style
    await fs.copy(`${constants_1.boilerplateDir}/RegistrationForm.style.js`, `${createTopProjectDirs_1.compDir}/RegistrationForm/RegistrationForm.style.js`);
    // RegistrationField
    await fs.copy(`${constants_1.boilerplateDir}/RegistrationField.js`, `${createTopProjectDirs_1.compDir}/RegistrationForm/RegistrationField.js`);
    // AuthTabs
    await fs.copy(`${constants_1.boilerplateDir}/AuthTabs.js`, `${createTopProjectDirs_1.compDir}/AuthTabs/index.js`);
    // client file
    await fs.copy(`${constants_1.boilerplateDir}/client.js`, `${createTopProjectDirs_1.srcDir}/client/index.js`);
    // flattenData file
    await fs.copy(`${constants_1.boilerplateDir}/flattenData.js`, `${createTopProjectDirs_1.srcDir}/flattenData/index.js`);
    // index.js
    await fs.copy(`${constants_1.boilerplateDir}/index.js`, `${createTopProjectDirs_1.srcDir}/index.js`);
    // NavBar
    const navBar = Handlebars.compile(await fs.readFile(`${constants_1.boilerplateDir}/NavBar.js`, "utf-8"));
    await fs.outputFile(`${createTopProjectDirs_1.compDir}/NavBar/index.js`, navBar({ appName: generateAppCode_1.appNameFromPath(appDir) }));
    // App file
    await generateAppFile_1.generateAppFile(currentStack, userClass);
    // store stack meta data
    await fs.outputJson(`${appDir}/docs/stack.json`, currentStack);
}
exports.createHighestLevelFiles = createHighestLevelFiles;
