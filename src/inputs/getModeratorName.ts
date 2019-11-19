// import {PJSON} from '@oclif/config'

import {UserInfo} from '../constants/types'
import {genericApiCall} from '../tools/genericApiCall'

import {promptTypes, promptUser} from './promptUser'

export async function moderatorExists(moderatorName: string) {
  // console.log(`in resetModeratorCall, userInfo:${JSON.stringify(userInfo)}`)

  let userInfo: UserInfo = {
    name: '',
    stack: '',
    password: '',
    email: '',
    licenseId: '',
    stackId: '',
    refreshToken: '',
    accessToken: '',
    id: '',
  }

  const query = `query {
      moderatorExists(moderatorName:"${moderatorName}")
  }
  `

  const returnedData = await genericApiCall(query, userInfo)
  return returnedData.moderatorExists
}

const testModeratorName = async (moderatorName: string) => {
  if (!moderatorName || moderatorName.length === 0)
    return 'Please enter a name for your moderator (all numbers and letters, no spaces).'

  if (moderatorName.length > 128)
    return 'A moderator name cannot exceed 128 letters'

  const charactersCheck = /[^a-zA-Z0-9]/g
  if (charactersCheck.test(moderatorName))
    return `The moderatorName '${moderatorName}' contains forbidden characters.  A moderator name can contain
    uppercase and lowercase letters (a-z, A-Z), numbers (0-9)`

  if (await moderatorExists(moderatorName))
    return `There already exists a moderator with the name ${moderatorName}.  Please select something else.`

  return ''
}

export async function getModeratorName(moderatorName: string | undefined) {
  let prompt = 'Please enter a name for your moderator (all numbers and lowercase letters, no spaces).'

  if (moderatorName) {
    prompt = await testModeratorName(moderatorName)
  }
  if (prompt.length === 0) return moderatorName

  return promptUser(
    'moderatorName',
    promptTypes.TEXT,
    prompt,
    testModeratorName
  )
}
