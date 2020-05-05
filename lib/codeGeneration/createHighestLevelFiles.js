"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const makecode_1 = require("../commands/makecode");
const constants_1 = require("../constants");
const inflections_1 = require("../tools/inflections");
const createTopProjectDirs_1 = require("./createTopProjectDirs");
const generateAppCode_1 = require("./generateAppCode");
const generateFromBoilerPlate_1 = require("./generateFromBoilerPlate");
const fs = require('fs-extra');
async function createHighestLevelFiles(currentStack, appDir, userClass) {
    // const boilerPlateDir = `${boilerplateDir}/codeGeneration/boilerplates`
    const appName = generateAppCode_1.appNameFromPath(appDir);
    // shell.cp()
    // NavBar
    let options = {
        files: '',
        from: [
            /__AppName__/g
        ],
        to: [
            appName
        ]
    };
    await fs.outputJson(`${appDir}/docs/stack.json`, currentStack, (err) => {
        if (err) {
            // @ts-ignore
            throw new Error(console.error(err));
        }
    });
    await generateFromBoilerPlate_1.generateFromBoilerPlate(`${constants_1.boilerplateDir}/NavBar.js`, `${createTopProjectDirs_1.compDir}/NavBar/index.js`, options);
    // DeleteInstanceMenu
    await fs.copy(`${constants_1.boilerplateDir}/DeleteInstanceMenu.js`, `${createTopProjectDirs_1.compDir}/DeleteInstanceMenu/index.js`);
    // EditInstanceForm
    await fs.copy(`${constants_1.boilerplateDir}/EditInstanceForm.js`, `${createTopProjectDirs_1.compDir}/EditInstanceForm/index.js`);
    // client file
    await fs.copy(`${constants_1.boilerplateDir}/client.js`, `${createTopProjectDirs_1.srcDir}/client/index.js`);
    // flattenData file
    await fs.copy(`${constants_1.boilerplateDir}/flattenData.js`, `${createTopProjectDirs_1.srcDir}/flattenData/index.js`);
    // index.js
    await fs.copy(`${constants_1.boilerplateDir}/index.js`, `${createTopProjectDirs_1.srcDir}/index.js`);
    // App
    if (!currentStack.userClasses[userClass]) {
        const err = (new makecode_1.noNameError());
        err.message = `template contains no userClass '${userClass}'`;
        throw (err);
    }
    const source = currentStack.userClasses[userClass].topSource;
    if (!source) {
        const err = (new makecode_1.noNameError());
        err.message = 'template contains no sources';
        throw (err);
    }
    const highestLevel = 'highestLevel';
    const sourceInfo = currentStack.sources[source];
    const highestLevelList = sourceInfo.selectedTree[highestLevel];
    // console.log(`highestLevelList for ${source}=${JSON.stringify(highestLevelList)}`)
    let topComponentType = sourceInfo.root;
    let topComponent = inflections_1.singularName(topComponentType);
    const topComponentSetting = `${userClass}Id={ currentUser.id }`;
    if (highestLevelList.length === 1) {
        topComponentType = highestLevelList[0];
        topComponent = inflections_1.pluralName(topComponentType);
        // topComponentSetting = `${userClass}Id={ currentUser.id }`
    }
    // console.log(`topComponentType for ${source}=${topComponentType}`)
    // todo: remove this
    if (!topComponentType) {
        const err = (new makecode_1.noNameError());
        err.message = `source ${source} contains no selected items`;
        throw (err);
    }
    if (currentStack.types[topComponentType].sources[source].assnType === constants_1.associationTypes.SINGLE_REQUIRED) {
        topComponent = inflections_1.singularName(topComponentType);
    }
    /*
  "constraints": {"toDoSource":
   {"constraintType": "ID", "typeName": "project", "value": "currentProjectId"}},

     loop and for every constraint:
     if value=__currentUser__
        topComponentSetting += ' userId={ currentUser.id }'
      if typeName==="ID"

        topComponentSetting += ' ${typeName}Id={ ${value} }'
      else
        topComponentSetting += ' ${typeName}Value={ ${value} }'
     */
    options = {
        files: '',
        from: [
            /__SourceName__/g,
            /__TopComponentName__/g,
            /__TopComponentPropSetting__/g,
        ],
        to: [
            inflections_1.singularName(source),
            topComponent,
            topComponentSetting,
        ]
    };
    await generateFromBoilerPlate_1.generateFromBoilerPlate(`${constants_1.boilerplateDir}/App.js`, `${createTopProjectDirs_1.srcDir}/App.js`, options);
    // config
    // const configText = await createConfigFile(currentStack, appDir)
    // // console.log(`configText=${configText}`)
    // fs.outputFile(`${srcDir}/config/index.js`, configText)
    // options = {files: '', from: [], to: []}
    // await generateFromBoilerPlate(`${boilerplateDir}/config.js`, `${srcDir}/config/index.js`, options)
}
exports.createHighestLevelFiles = createHighestLevelFiles;
