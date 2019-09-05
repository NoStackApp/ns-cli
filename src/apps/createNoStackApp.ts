// import cli from 'cli-ux'

import {logProgress} from './logging'

const fs = require('fs-extra')
const shell = require('shelljs')

const LOGFILE = 'noStackLog.txt'

/*
'yarn'
'--save-dev typescript'
'apollo-client',
'graphql ',
'react-apollo apollo-link ',
'apollo-cache-inmemory',
'apollo-fetch'
'apollo-link-context',
'apollo-link-http',
'axios formik',
'graphql-tag',
'jsonwebtoken',
'react-graph-vis',
'react-spinkit uuid',
'styled-components',
'styled-components',
 */

const installationList = [
  // 'typescript',
  'apollo-client',
  'graphql',
  'react-apollo',
  'apollo-link',
  'apollo-cache-inmemory',
  'apollo-fetch',
  'apollo-link-context',
  'apollo-link-http',
  'axios',
  'formik',
  'graphql-tag',
  'jsonwebtoken',
  'react-graph-vis',
  'react-spinkit',
  'styled-components',
  'uuid',
  'no-stack',
]

const errorMessage = (details: string) => `installation error: ${details}. Check out the error log noStackLog.txt.  If needed, please contact NoStack support.`

export async function createNoStackApp(appName: string) {
  // shell.echo('-ne', '                          (0% installed.  installing react...)\r);
  // cli.action.start('starting installation', {stdout: true})
  logProgress('installing create-react-app... this could take a few minutes...')
  if (shell.exec(`npx create-react-app ${appName} >> ${LOGFILE}`, {silent: true}).code !== 0) {
    throw new Error(errorMessage(`problem installing create-react-app.  You may try calling 'create-react-app ${appName}' directly and see what messages are reported.`))
  }

  shell.exec(`mv ${LOGFILE} ${appName}`)
  console.log('A basic react app was created.  Now we need to add a lot of packages for Apollo.  This will take a while...')

  shell.cd(appName)

  installationList.map((packageToInstall: string) => {
    logProgress(`Installing ${packageToInstall}...`)
    if (shell.exec(`npm install ${packageToInstall} --save >> ../${LOGFILE} 2>&1`).code !== 0) {
      console.log(`problem reported installing ${packageToInstall}.  Will see whether fatal...`)
      // throw new Error('problem installing material for Apollo.  Please contact NoStack support.')
      // shell.exit(1)
    }
  })

  // if (shell.exec(`/home/yisrael/projects/ns-cli/bin/create-no-stack-app "${appName}"`).code !== 0) {
  //   throw new Error('problem installing material for Apollo.  Please contact NoStack support.')
  //   shell.exit(1)
  // }
  logProgress("Apollo and no-stack packages have been added... installing'...")
  // shell.exec(`jq " .dependencies=$(jq '.dependencies | .["no-stack"]="git+https://github.com/NoStackApp/no-stack.git"' package.json )" package.json | sponge package.json >> ${LOGFILE}`, {silent: true})
  // logProgress("Apollo packages have been added... now adding no-stack and installing'...")

  /*
  # add no-stack
jq " .dependencies=$(jq '.dependencies | .["no-stack"]="git+ssh://git@github.com/NoStackApp/no-stack"' package.json )" package.json | sponge package.json

should create: /home/yisrael/projects/temp/app275/node_modules/no-stack/dist/no-stack.js
   */

  // logProgress("now installing'...")
  if (shell.exec(`npm install >> ${LOGFILE}`, {silent: true}).code !== 0) {
    throw new Error(errorMessage('problem running npm install'))
  }

  if (shell.exec(`npm audit fix >> ${LOGFILE}`, {silent: true}).code !== 0) {
    throw new Error(errorMessage('problem running npm install'))
  }

  if (shell.exec(`npm install >> ${LOGFILE}`, {silent: true}).code !== 0) {
    throw new Error(errorMessage('problem running npm install'))
  }

  // check for existence of installed files...
  const noStackInstalled = await fs.pathExists('node_modules/no-stack/dist/no-stack.esm.js')

  if (!noStackInstalled) {
    throw new Error(errorMessage('no-stack.js file not found'))
  }

  // if (shell.exec(`npm install >> ${LOGFILE}`, {silent: true}).code !== 0) {
  //   throw new Error('problem with the installation.  Please contact NoStack support.')
  //   shell.exit(1)
  // }
  // cli.action.stop() // shows 'starting a process... done'

  logProgress(`Installation is complete.  Enter 'cd ${appName}' and 'npm start' to try running the newly installed app locally`)

}
