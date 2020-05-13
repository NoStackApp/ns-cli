"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTypeFile = void 0;
const constants_1 = require("../../constants");
const inflections_1 = require("../../tools/inflections");
const createTopProjectDirs_1 = require("../createTopProjectDirs");
const makeDirs_1 = require("../makeDirs");
const replacementTags_1 = require("../replacementTags");
const boilderPlateToDir_1 = require("./boilderPlateToDir");
const fs = require('fs-extra');
const Handlebars = require('handlebars');
const boilerPlateFromInfo = (boilerPlateInfo) => constants_1.boilerPlates[boilerPlateInfo.formType + boilerPlateInfo.dataType + boilerPlateInfo.nodeType];
async function generateTypeFile(type, source, boilerPlateInfo, currentStack) {
    console.log(`in generateTypeFile, type=${type}, boilerPlateInfo=${JSON.stringify(boilerPlateInfo)}`);
    const boilerPlate = boilerPlateFromInfo(boilerPlateInfo);
    // console.log(`in generateTypeFile, typeName=${typeName}, boilerPlate=${boilerPlate}`)
    const dir = boilderPlateToDir_1.boilerPlateToDir(type, boilerPlateInfo.formType);
    // console.log(`in generateTypeFile, dir=${dir}`)
    const path = `${createTopProjectDirs_1.compDir}/${inflections_1.singularName(source)}/${dir}`;
    const dirList = [
        path
    ];
    const tags = replacementTags_1.replacementTags(type, source, currentStack);
    // if (boilerPlate === 'genericCreationFormRoot') {
    //   console.log(`tags = ${JSON.stringify(tags, null, 2)}`)
    // }
    // console.log(`options is: ${JSON.stringify(options)}`)
    await makeDirs_1.makeDirs(dirList);
    try {
        const template = Handlebars.compile(await fs.readFile(`${constants_1.boilerplateDir}/${boilerPlate}.js`, 'utf-8'));
        await fs.outputFile(`${path}/index.js`, template(tags));
    }
    catch (err) {
        console.error(err);
        throw new Error(`error with generateFromBoilerPlate: ${err}`);
    }
}
exports.generateTypeFile = generateTypeFile;
