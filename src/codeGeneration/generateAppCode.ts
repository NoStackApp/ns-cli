import {associationTypes, formTypes, nodeTypes} from '../constants'
import {StackInfo} from '../constants/types'

import {createConfigFile} from './createConfigFile'
import {createHighestLevelFiles} from './createHighestLevelFiles'
import {createQueryFile} from './createQueryFile'
import {createTopProjectDirs, srcDir} from './createTopProjectDirs'
import {createTypeFile} from './createTypeFile'

const execa = require('execa')
const fs = require('fs-extra')
const Listr = require('listr')

export async function generateCodeFiles(appName: string) {
  // console.log(`stacklocation=${appName}/stack.json`)
  const currentStack: StackInfo = await fs.readJSON(`${appName}/stack.json`) // await generateJSON.bind(this)(template, appName)
  // console.log(`currentStack=${currentStack}`)
  await createTopProjectDirs(currentStack, appName)

  // const config = await createConfigFile(currentStack, appName)
  // console.log(config)
  const configText = await createConfigFile(currentStack, appName)
  // console.log(`configText=${configText}`)
  fs.outputFile(`${srcDir}/config/index.js`, configText)

  // const fs = require('fs-extra')
  // const currentStack: object = fs.readJsonSync('stack.json')

  // this.log(JSON.stringify(currentStack, null, 2))
  await createHighestLevelFiles(currentStack, appName)

  // const sourcePropsDir = `${appName}/src/source-props`
  // await createFragmentsFile(currentStack)

  const sources = currentStack.sources
  //mapObject

  await Promise.all(Object.keys(sources).map(async source => {
    await createQueryFile(currentStack, source)
  }))

  await Promise.all(Object.keys(sources).map(
    async (source: string) => {
      // console.log(`source=${source}`)
      const types = sources[source].selections
      // console.log(`types=${JSON.stringify(types)}`)

      const {selectionRoot} = currentStack.sources[source]
      await Promise.all(types.map(
        async (type: string) => {
          const assnType = currentStack.types[type].sources[source].assnType
          const dataType = currentStack.types[type].dataType

          let nodeType = currentStack.types[type].sources[source].nodeType
          if (selectionRoot === type) nodeType = nodeTypes.ROOT

          let formType = formTypes.SINGLE_INSTANCE
          if (assnType === associationTypes.MULTIPLE) {
            formType = formTypes.LIST
          }

          try {
            const boilerPlateType = formType + dataType + nodeType
            console.log(`type=${type}, assnType=${assnType}, nodeType=${nodeType}`)

            try {
              await createTypeFile(type, source, boilerPlateType, currentStack)
            } catch (errWithCreate) {
              throw new Error(`error with first createTypeFile: ${errWithCreate}`)
            }

            if (assnType === associationTypes.MULTIPLE) {
              console.log('assnType === associationTypes.MULTIPLE is true!')
              const creationBoilerPlateType = formTypes.CREATION + dataType + nodeType
              await createTypeFile(type, source, creationBoilerPlateType, currentStack)

              const singularBoilerPlateType = formTypes.SINGLE_INSTANCE + dataType + nodeType
              await createTypeFile(type, source, singularBoilerPlateType, currentStack)
            }
          } catch (err) {
            throw new Error(`error creating type files: ${err}`)
          }

          // const {selectionRoot} = currentStack.sources[source]
          //
          // // await createTypeFile(type, source, associationTypes.SINGLE_REQUIRED + dataType, currentStack)
          // if (selectionRoot === type) await createTypeFile(type, source, associationTypes.SINGLE_REQUIRED + dataType + 'Root', currentStack)
          // else await createTypeFile(type, source, associationTypes.SINGLE_REQUIRED + dataType, currentStack)
          //
          // if (assnType === associationTypes.MULTIPLE) {  // currently just string is supported
          //
          //   if (selectionRoot === type) await createTypeFile(type, source, boilerPlateTypes.CREATION_ROOT_TYPE, currentStack)
          //   else await createTypeFile(type, source, boilerPlateTypes.CREATION_NON_ROOT, currentStack)
          //
          //   // console.log(`about to createTypeFile for a Multiple.  type=${type}, selectionRoot=${selectionRoot}`)
          //   if (selectionRoot === type) await createTypeFile(type, source, boilerPlateTypes.MULTIPLE_ROOT, currentStack)
          //   else await createTypeFile(type, source, boilerPlateTypes.MULTIPLE_STRING, currentStack)
          // }
        }
      ))
    }
  ))
}

export async function generateAppCode(appName: string) {
  const tasks = new Listr([
    // {
    //   title: 'Generate the Code Files',
    //   task: async () => {
    //     try {
    //       await generateCodeFiles(appName)
    //     } catch (err) {
    //       console.log(`git error when attempting to generate the code: ${err}`)
    //       throw new Error(err)
    //     }
    //     return
    //   }
    // },
    {
      title: 'Make First Git Commit',
      task: async () => {
        try {
          await execa(
            'git',
            ['-C', appName, 'add', '.']
          )
        } catch (err) {
          console.log(`git error when adding changed files.  Perhaps your generated code didn't change?: ${err}`)
          return
        }

        try {
          await execa(
            'git',
            ['-C', appName, 'commit', '-m', 'generated no-stack code :tada:']
          )
        } catch (err) {
          console.log(`git error when attempting to commit the generation of code.  Perhaps your generated code didn't change? ${err}`)
          return
        }
      },
    },
  ])

  return tasks

}
