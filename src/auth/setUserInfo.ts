import {UserInfo} from '../constants/types'
import {stacksDirectory} from '../genericApiCall'

export const fs = require('fs-extra')

export async function setUserInfo(userInfo: UserInfo) {
  const stackDirectory = `${stacksDirectory}/${userInfo.stack}`
  const userFile = `${stackDirectory}/${userInfo.name}.json`
  try {
    await fs.outputJson(userFile, userInfo)
    console.log(`in setUserInfo.  userFile=${userFile}`)
  } catch (err) {
    console.error(err)
  }
}
