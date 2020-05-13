// import {PJSON} from '@oclif/config'

import {UserInfo} from '../constants/types'
import {genericApiCall} from '../tools/genericApiCall'

import {promptTypes, promptUser} from './promptUser'

export async function stackExists(stackName: string) {
  // console.log(`in resetStackCall, userInfo:${JSON.stringify(userInfo)}`)

  const userInfo: UserInfo = {
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
      stackExists(stackName:"${stackName}")
  }
  `

  const returnedData = await genericApiCall(query, userInfo)
  return returnedData.stackExists
}

const testStackName = async (stackName: string, isNew: boolean) => {
  if (!stackName || stackName.length === 0)
    return 'Please enter a name for your stack (all numbers and letters, no spaces).'

  if (stackName.length > 128)
    return 'A stack name cannot exceed 128 letters'

  const charactersCheck = /[^a-zA-Z0-9]/g
  if (charactersCheck.test(stackName))
    return `The stackName '${stackName}' contains forbidden characters.  A stack name can contain
    uppercase and lowercase letters (a-z, A-Z), numbers (0-9)`

  const alreadyExists = await stackExists(stackName)

  if (isNew && alreadyExists) return `There already exists a stack with the name ${stackName}.  Please select something else.`
  if (!isNew && !alreadyExists) return `There is no stack with the name ${stackName}.  Please check the name.`

  return ''
}

const testNewStack = async (stackName: string) => testStackName(stackName, true)
const testExistingStack = async (stackName: string) => testStackName(stackName, false)

export async function getNewStackName(stackName: string | undefined) {
  let prompt = 'Please enter a name for your stack (all numbers and lowercase letters, no spaces).'

  if (stackName) {
    prompt = await testNewStack(stackName)
  }
  if (prompt.length === 0) return stackName

  return promptUser(
    'stackName',
    promptTypes.TEXT,
    prompt,
    testNewStack,
  )
}

export async function getStackName(stackName: string | undefined) {
  let prompt = 'Please enter a name for your stack (all numbers and lowercase letters, no spaces).'

  if (stackName) {
    prompt = await testExistingStack(stackName)
  }
  if (prompt.length === 0) return stackName

  return promptUser(
    'stackName',
    promptTypes.TEXT,
    prompt,
    testExistingStack,
  )
}
