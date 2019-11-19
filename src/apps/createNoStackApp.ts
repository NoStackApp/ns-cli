import chalk from 'chalk'

import {getAppName} from '../inputs/getAppName'
import {errorMessage} from '../tools/errorMessage'

// import {logProgress} from './logging'

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
  '@nostack/no-stack@alpha',
]

export async function createNoStackApp(appName: string, baseApp: string) {
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
          let finalAppName = appName
          finalAppName = await getAppName(finalAppName) || ''

          await execa(
            'cp',
            ['-r', baseApp, finalAppName]
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
        // shell.exec(`npx create-react-app ${appName} >> ${LOGFILE}`)

        const isAppFolder = await fs.pathExists(appName)

        if (isAppFolder) {
          throw new Error(errorMessage(`a folder for ${appName} already exists. Please choose a different app name`))
        }

        const upperCaseCheck = /(.*[A-Z].*)/
        if (upperCaseCheck.test(appName)) {
          throw new Error(errorMessage(`The ${appName} contains at least one capital, which create-react-app does not permit.`))
        }

        await execa(
          'npx',
          ['create-react-app', appName, `>> ${LOGFILE}`]
        ).catch(
          (error: any) => {
            throw new Error(`${chalk.red('error running create-react-app.')} You may try calling 'create-react-app ${appName}' directly and see what messages are reported. Here is the error reported:\n${error}`)
          }
        )
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
                ['install', '--prefix', appName, '--save', item]
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
        // shell.exec(`npx create-react-app ${appName} >> ${LOGFILE}`)

        const noStackFile = `${appName}/node_modules/@nostack/no-stack/dist/no-stack.esm.js`
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
