"use strict";
// const findInFiles = require('find-in-files')
// import {AddedCode} from '../constants/types'
//
// const fs = require('fs-extra')
// const readdir = require('@mrmlnc/readdir-enhanced')
// const regexReplace = require('regex-replace')
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertAddedCode = void 0;
// const recursive = require('recursive-readdir')
//rootDir: string
const chalk_1 = require("chalk");
const execa = require("execa");
const path = require("path");
const fs = require('fs-extra');
exports.insertAddedCode = async (appDir) => {
    const baseDir = path.resolve(process.cwd(), appDir);
    const gruntDir = path.resolve(__dirname, '../..');
    const docsDir = appDir + '/docs/';
    const addedCodeJsonFile = docsDir + 'addedCode.json';
    const existsComponents = await fs.pathExists(addedCodeJsonFile);
    let addedCode = {};
    if (!existsComponents) {
        fs.writeJson(addedCodeJsonFile, addedCode);
        return;
    }
    addedCode = fs.readJson(addedCodeJsonFile);
    if (Object.keys(addedCode).length === 0) {
        // no added code to add
        return;
    }
    await execa(`${gruntDir}/node_modules/.bin/grunt`, ['--appDir=' + baseDir, `--base=${gruntDir}`]).catch((error) => {
        throw new Error(`${chalk_1.default.red('error inserting added code.')} Here is the error reported:\n${error}`);
    });
    // console.log(`gruntDir=${gruntDir}`)
};
