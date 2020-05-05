import {UserInfo} from '../constants/types'
import {genericApiCall} from '../tools/genericApiCall'

const fs = require('fs-extra')

export async function modifyStackFromSpec(templateFile: string, userInfo: UserInfo, sampleEmail: string, addedSuffix: string, resetLevel: string) {
  // console.log(`in modifyStackFromSpec, userInfo:${JSON.stringify(userInfo)}`)
  let templateString = ''
  try {
    templateString = await fs.readFile(templateFile, 'utf8')

  } catch (err) {
    console.error(err)
    throw new Error(`error building stack from template: ${err}`)
  }

  const query = `mutation {
      DataSpec(template: "${templateString.replace(/\n/g, '\\n')}", platformId:"${userInfo.stackId}", sampleEmail: "${sampleEmail}", addedSuffix: "${addedSuffix}", resetLevel: ${resetLevel})
  }
  `

  const returnedData = await genericApiCall(query, userInfo)
  console.log(`returnedData=${JSON.stringify(returnedData)}`)
  return returnedData.DataSpec
}
