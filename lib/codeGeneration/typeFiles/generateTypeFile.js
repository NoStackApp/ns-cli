"use strict";
// import {string} from '@oclif/command/lib/flags'
// import {Replacement} from 'tslint'
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const inflections_1 = require("../../tools/inflections");
const createReplacementOptions_1 = require("../createReplacementOptions");
const createTopProjectDirs_1 = require("../createTopProjectDirs");
const generateFromBoilerPlate_1 = require("../generateFromBoilerPlate");
const makeDirs_1 = require("../makeDirs");
const boilderPlateToDir_1 = require("./boilderPlateToDir");
const boilerPlateFromInfo = (boilerPlateInfo) => constants_1.boilerPlates[boilerPlateInfo.formType + boilerPlateInfo.dataType + boilerPlateInfo.nodeType];
async function generateTypeFile(type, source, boilerPlateInfo, currentStack) {
    // console.log(`in generateTypeFile, typeName=${typeName}, boilerPlateInfo=${JSON.stringify(boilerPlateInfo)}`);
    // const parentType = currentStack.types[typeName].sources[source].parentType
    const boilerPlate = boilerPlateFromInfo(boilerPlateInfo);
    // console.log(`in generateTypeFile, typeName=${typeName}, boilerPlate=${boilerPlate}`);
    const dir = boilderPlateToDir_1.boilerPlateToDir(type, boilerPlateInfo.formType);
    // console.log(`in generateTypeFile, dir=${dir}`);
    // if (boilerPlate !== boilerPlates[associationTypes.MULTIPLE]) {
    //   dir = singularName(typeName)
    // }
    const path = `${createTopProjectDirs_1.compDir}/${inflections_1.singularName(source)}/${dir}`;
    const dirList = [
        path
    ];
    // console.log(`before createReplacementOptions(${typeName}, ${source})`);
    const options = createReplacementOptions_1.createReplacementOptions(type, source, currentStack);
    // const options: ReplacementOptions = createReplacementOptions(typeName, source, boilerPlate, currentStack)
    // console.log(`options is: ${JSON.stringify(options)}`)
    await makeDirs_1.makeDirs(dirList);
    try {
        await generateFromBoilerPlate_1.generateFromBoilerPlate(`${constants_1.boilerplateDir}/${boilerPlate}.js`, `${path}/index.js`, options);
        // console.log('success creating file')
    }
    catch (err) {
        console.error(err);
        throw new Error(`error with generateFromBoilerPlate: ${err}`);
    }
}
exports.generateTypeFile = generateTypeFile;
