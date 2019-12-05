"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const getAppDir_1 = require("../inputs/getAppDir");
const errorMessage_1 = require("../tools/errorMessage");
// import {logProgress} from './logging'
const execa = require('execa');
const fs = require('fs-extra');
const Listr = require('listr');
const LOGFILE = 'noStackLog.txt';
const installationList = [
    '@apollo/react-common',
    '@apollo/react-components',
    '@apollo/react-hoc',
    '@apollo/react-hooks',
    '@shopify/react-compose',
    'apollo-cache-inmemory',
    'apollo-client',
    'graphql',
    'apollo-link',
    'apollo-fetch',
    'apollo-link-context',
    'apollo-link-http',
    'axios',
    'formik',
    'graphql-tag',
    'jsonwebtoken',
    'react-graph-vis',
    'react-select',
    'react-spinkit',
    'styled-components',
    'react-select',
    'uuid',
    'yup',
    '@nostack/no-stack@alpha',
];
async function createNoStackApp(appDir, baseApp) {
    if (baseApp) {
        const tasksCopyFromBaseApp = new Listr([
            {
                title: 'Check for baseApp',
                task: async () => {
                    const isBaseApp = await fs.pathExists(baseApp);
                    if (!isBaseApp) {
                        throw new Error(errorMessage_1.errorMessage(`the folder for ${baseApp} does not exist. Please confirm it or create it separately`));
                    }
                }
            },
            {
                title: 'Copy directory to new app directory',
                task: async () => {
                    const finalAppDir = await getAppDir_1.getAppDir(appDir) || '';
                    await execa('cp', ['-r', baseApp, finalAppDir]).catch((error) => {
                        throw new Error(`${chalk_1.default.red(`error copying over from ${baseApp}.`)} Here is the error reported:\n${error}`);
                    });
                },
            }
        ]);
        return tasksCopyFromBaseApp;
    }
    const tasksFullInstallation = new Listr([
        {
            title: 'Run create-react-app',
            task: async () => {
                // shell.exec(`npx create-react-app ${appDir} >> ${LOGFILE}`)
                const isAppFolder = await fs.pathExists(appDir);
                if (isAppFolder) {
                    throw new Error(errorMessage_1.errorMessage(`a folder for ${appDir} already exists. Please choose a different app name`));
                }
                const upperCaseCheck = /(.*[A-Z].*)/;
                if (upperCaseCheck.test(appDir)) {
                    throw new Error(errorMessage_1.errorMessage(`The ${appDir} contains at least one capital, which create-react-app does not permit.`));
                }
                await execa('npx', ['create-react-app', appDir, `>> ${LOGFILE}`]).catch((error) => {
                    throw new Error(`${chalk_1.default.red('error running create-react-app.')} You may try calling 'create-react-app ${appDir}' directly and see what messages are reported. Here is the error reported:\n${error}`);
                });
            }
        },
        {
            title: 'Install Additional Packages Locally...',
            task: async () => {
                return new Listr(installationList.map((item) => {
                    return {
                        title: item,
                        task: async () => {
                            await execa('npm', ['install', '--prefix', appDir, '--save', item]).catch((error) => {
                                throw new Error(`${chalk_1.default.red(`error installing ${item}.`)} You may try installing ${item} directly by running 'npm install --save ${item}' directly and see what messages are reported. Here is the error reported:\n${error}`);
                            });
                        },
                    };
                }));
            }
        },
        {
            title: 'Confirm Installation',
            task: async () => {
                // shell.exec(`npx create-react-app ${appDir} >> ${LOGFILE}`)
                const noStackFile = `${appDir}/node_modules/@nostack/no-stack/dist/no-stack.esm.js`;
                const isNoStackFile = await fs.pathExists(noStackFile);
                if (!isNoStackFile) {
                    throw new Error(errorMessage_1.errorMessage('no-stack did not install properly.'));
                }
            }
        },
    ]);
    return tasksFullInstallation;
    // logProgress(`${chalk.green('Installation is complete!')} Run the other utilities to create the full app`)
}
exports.createNoStackApp = createNoStackApp;
