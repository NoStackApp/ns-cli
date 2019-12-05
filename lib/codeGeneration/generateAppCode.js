"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createConfigFile_1 = require("./createConfigFile");
const createHighestLevelFiles_1 = require("./createHighestLevelFiles");
const createQueryFile_1 = require("./createQueryFile");
const createTopProjectDirs_1 = require("./createTopProjectDirs");
const createTypeFiles_1 = require("./typeFiles/createTypeFiles");
const execa = require('execa');
const fs = require('fs-extra');
const Listr = require('listr');
const path = require('path');
exports.appNameFromPath = (appDir) => {
    if (appDir === '.')
        return path.basename(path.resolve());
    return path.basename(appDir); // appDir.match(/([^\/]*)\/*$/)![1].substring(2)
};
async function generateCodeFiles(appDir, userClass, jsonPath) {
    // console.log(`stacklocation=${appDir}/stack.json`)
    const currentStack = await fs.readJSON(jsonPath); // await generateJSON.bind(this)(template, appDir)
    await createTopProjectDirs_1.createTopProjectDirs(currentStack, appDir);
    // console.log(`appDir=${appDir}`)
    const appName = exports.appNameFromPath(appDir);
    const configText = await createConfigFile_1.createConfigFile(currentStack, appName);
    // console.log(`configText=${configText}`)
    fs.outputFile(`${createTopProjectDirs_1.srcDir}/config/index.js`, configText);
    await createHighestLevelFiles_1.createHighestLevelFiles(currentStack, appDir, userClass);
    const sources = currentStack.sources;
    //mapObject
    await Promise.all(Object.keys(sources).map(async (source) => {
        await createQueryFile_1.createQueryFile(currentStack, source);
    }));
    await createTypeFiles_1.createTypeFiles(sources, userClass, currentStack);
}
exports.generateCodeFiles = generateCodeFiles;
async function generateAppCode(appDir, userClass, jsonPath) {
    const tasks = new Listr([
        {
            title: 'Generate the Code Files',
            task: async () => {
                try {
                    await generateCodeFiles(appDir, userClass, jsonPath);
                }
                catch (err) {
                    console.log(`git error when attempting to generate the code: ${err}`);
                    throw new Error(err);
                }
                return;
            }
        },
        {
            title: 'Make First Git Commit',
            task: async () => {
                try {
                    await execa('git', ['-C', appDir, 'add', '.']);
                }
                catch (err) {
                    console.log(`git error when adding changed files.  Perhaps your generated code didn't change?: ${err}`);
                    return;
                }
                try {
                    await execa('git', ['-C', appDir, 'commit', '-m', 'generated no-stack code :tada:']);
                }
                catch (err) {
                    console.log(`git error when attempting to commit the generation of code.  Perhaps your generated code didn't change? ${err}`);
                    return;
                }
            },
        },
    ]);
    return tasks;
}
exports.generateAppCode = generateAppCode;
