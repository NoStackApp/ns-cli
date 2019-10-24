"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import chalk from 'chalk'
// import {loginUser} from '../../auth/loginUser'
const constants_1 = require("../constants");
const createConfigFile_1 = require("./createConfigFile");
const createFragmentsFile_1 = require("./createFragmentsFile");
const createHighestLevelFiles_1 = require("./createHighestLevelFiles");
const createQueryFile_1 = require("./createQueryFile");
const createTopProjectDirs_1 = require("./createTopProjectDirs");
const createTypeFile_1 = require("./createTypeFile");
// import {createStackQuery} from '../../stacks/create-stack-query'
// import {createModerator} from '../../stacks/createModerator'
const execa = require('execa');
const fs = require('fs-extra');
const Listr = require('listr');
async function generateCodeFiles(appName) {
    // console.log(`stacklocation=${appName}/stack.json`)
    const currentStack = await fs.readJSON(`${appName}/stack.json`); // await generateJSON.bind(this)(template, appName)
    // console.log(`currentStack=${currentStack}`)
    await createTopProjectDirs_1.createTopProjectDirs(currentStack, appName);
    // const config = await createConfigFile(currentStack, appName)
    // console.log(config)
    const configText = await createConfigFile_1.createConfigFile(currentStack, appName);
    // console.log(`configText=${configText}`)
    fs.outputFile(`${createTopProjectDirs_1.srcDir}/config/index.js`, configText);
    // const fs = require('fs-extra')
    // const currentStack: object = fs.readJsonSync('stack.json')
    // this.log(JSON.stringify(currentStack, null, 2))
    await createHighestLevelFiles_1.createHighestLevelFiles(currentStack, appName);
    // const sourcePropsDir = `${appName}/src/source-props`
    await createFragmentsFile_1.createFragmentsFile(currentStack);
    const sources = currentStack.sources;
    //mapObject
    await Promise.all(Object.keys(sources).map(async (source) => {
        await createQueryFile_1.createQueryFile(currentStack, source);
    }));
    await Promise.all(Object.keys(sources).map(async (source) => {
        // console.log(`source=${source}`)
        const types = sources[source].selections;
        // console.log(`types=${JSON.stringify(types)}`)
        await Promise.all(types.map(async (type) => {
            const assnType = currentStack.types[type].sources[source].assnType;
            const dataType = currentStack.types[type].dataType;
            // console.log(`type=${type}, assnType=${assnType}`)
            const { selectionRoot } = currentStack.sources[source];
            // await createTypeFile(type, source, associationTypes.SINGLE_REQUIRED + dataType, currentStack)
            if (selectionRoot === type)
                await createTypeFile_1.createTypeFile(type, source, constants_1.associationTypes.SINGLE_REQUIRED + dataType + 'Root', currentStack);
            else
                await createTypeFile_1.createTypeFile(type, source, constants_1.associationTypes.SINGLE_REQUIRED + dataType, currentStack);
            if (assnType === constants_1.associationTypes.MULTIPLE) { // currently just string is supported
                if (selectionRoot === type)
                    await createTypeFile_1.createTypeFile(type, source, constants_1.boilerPlateTypes.CREATION_ROOT_TYPE, currentStack);
                else
                    await createTypeFile_1.createTypeFile(type, source, constants_1.boilerPlateTypes.CREATION_NON_ROOT, currentStack);
                // console.log(`about to createTypeFile for a Multiple.  type=${type}, selectionRoot=${selectionRoot}`)
                if (selectionRoot === type)
                    await createTypeFile_1.createTypeFile(type, source, constants_1.boilerPlateTypes.MULTIPLE_ROOT, currentStack);
                else
                    await createTypeFile_1.createTypeFile(type, source, constants_1.boilerPlateTypes.MULTIPLE_STRING, currentStack);
            }
        }));
    }));
}
exports.generateCodeFiles = generateCodeFiles;
async function generateAppCode(appName) {
    const tasks = new Listr([
        {
            title: 'Generate the Code Files',
            task: async () => {
                await generateCodeFiles(appName);
            }
        },
        {
            title: 'Make First Git Commit',
            task: async () => {
                try {
                    await execa('git', ['-C', appName, 'add', '.']);
                }
                catch (err) {
                    console.log(`git error when adding changed files.  Perhaps your generated code didn't change?: ${err}`);
                    return;
                }
                try {
                    await execa('git', ['-C', appName, 'commit', '-m', 'generated no-stack code :tada:']);
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
