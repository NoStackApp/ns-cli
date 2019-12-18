import chalk from 'chalk'

import {getAppDir} from '../inputs/getAppDir'
import {errorMessage} from '../tools/errorMessage'

const execa = require('execa')
const fs = require('fs-extra')
const Listr = require('listr')

const LOGFILE = 'noStackLog.txt'

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
]

export async function createNoStackApp(appDir: string, baseApp: string) {
  if (baseApp) {
    const tasksCopyFromBaseApp = new Listr([
      {
        title: 'Check for baseApp',
        task: async () => {
          const isBaseApp = await fs.pathExists(baseApp)

          if (!isBaseApp) {
            throw new Error(errorMessage(`the folder for ${baseApp} does not exist. Please confirm it or create it separately`))
          }
        }
      },
      {
        title: 'Copy directory to new app directory',
        task: async () => {
          const finalAppDir = await getAppDir(appDir) || ''

          await execa(
            'cp',
            ['-r', baseApp, finalAppDir]
          ).catch(
            (error: any) => {
              throw new Error(`${chalk.red(`error copying over from ${baseApp}.`)} Here is the error reported:\n${error}`)
            }
          )
        },
      }
    ])
    return tasksCopyFromBaseApp
  }

  const tasksFullInstallation = new Listr([
    {
      title: 'Run create-react-app',
      task: async () => {
        // shell.exec(`npx create-react-app ${appDir} >> ${LOGFILE}`)

        const isAppFolder = await fs.pathExists(appDir)

        if (isAppFolder) {
          throw new Error(errorMessage(`a folder for ${appDir} already exists. Please choose a different app name`))
        }

        const upperCaseCheck = /(.*[A-Z].*)/
        if (upperCaseCheck.test(appDir)) {
          throw new Error(errorMessage(`The ${appDir} contains at least one capital, which create-react-app does not permit.`))
        }

        await execa(
          'npx',
          ['create-react-app', appDir, `>> ${LOGFILE}`]
        ).catch(
          (error: any) => {
            throw new Error(`${chalk.red('error running create-react-app.')} You may try calling 'create-react-app ${appDir}' directly and see what messages are reported. Here is the error reported:\n${error}`)
          }
        )
      }
    },
    {
      title: 'Confirm CRA Installation',
      task: async () => {
        const errorText = 'create-react-app did not run correctly.  This could be' +
          'caused by a globally installed copy of create-react-app.  The global installation is no' +
          'longer being supported.  If you do have one installed globally, you should really uninstall' +
          'it and use "npx create-react-app" instead.'
        const jsonFile = `${appDir}/package.json`
        const isJsonFile = await fs.pathExists(jsonFile)

        if (!isJsonFile) {
          throw new Error(errorMessage(errorText))
        }

        // const scriptsFound = await findInFiles.find('scripts:', appDir, 'project.json')
        // throw new Error(`scriptsFound=${JSON.stringify(scriptsFound)}`)
      }
    },
    {
      title: 'Install Additional Packages Locally...',
      task:  async () => {
        return new Listr(installationList.map((item: string) => {
          return {
            title: item,
            task: async () => {
              await execa(
                'npm',
                ['install', '--prefix', appDir, '--save', item]
              ).catch(
                (error: any) => {
                  throw new Error(`${chalk.red(`error installing ${item}.`)} You may try installing ${item} directly by running 'npm install --save ${item}' directly and see what messages are reported. Here is the error reported:\n${error}`)
                }
              )
            },
          }
        }
        ))
      }
    },
    {
      title: 'Confirm Installation',
      task: async () => {
        // shell.exec(`npx create-react-app ${appDir} >> ${LOGFILE}`)

        const noStackFile = `${appDir}/node_modules/@nostack/no-stack/dist/no-stack.esm.js`
        const isNoStackFile = await fs.pathExists(noStackFile)

        if (!isNoStackFile) {
          throw new Error(errorMessage('no-stack did not install properly.'))
        }

      }
    },

  ])

  return tasksFullInstallation
  // logProgress(`${chalk.green('Installation is complete!')} Run the other utilities to create the full app`)
}
