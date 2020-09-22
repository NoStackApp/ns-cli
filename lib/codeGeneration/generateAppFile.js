"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAppFile = void 0;
const makecode_1 = require("../commands/makecode");
const constants_1 = require("../constants");
const inflections_1 = require("../tools/inflections");
const createTopProjectDirs_1 = require("./createTopProjectDirs");
const fs = require('fs-extra');
const Handlebars = require('handlebars');
async function generateAppFile(currentStack, userClass) {
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
    // todo: remove this
    if (!topComponentType) {
        const err = (new makecode_1.noNameError());
        err.message = `source ${source} contains no selected items`;
        throw (err);
    }
    if (currentStack.types[topComponentType].sources[source].assnType === constants_1.associationTypes.SINGLE_REQUIRED) {
        topComponent = inflections_1.singularName(topComponentType);
    }
    const appFile = Handlebars.compile(await fs.readFile(`${constants_1.boilerplateDir}/App.js`, 'utf-8'));
    const appFileContents = appFile({
        sourceName: inflections_1.singularName(source),
        topComponentName: topComponent,
        topComponentPropSetting: topComponentSetting,
        userTypeId: `TYPE_${inflections_1.allCaps(userClass)}_ID`
    });
    // console.log(appFileContents)
    await fs.outputFile(`${createTopProjectDirs_1.srcDir}/App.js`, appFileContents);
}
exports.generateAppFile = generateAppFile;
