import {UserInfo} from '../constants/types'
import {genericApiCall} from '../tools/genericApiCall'

export async function createStackQuery(userInfo: UserInfo) {
  const {password, email, name, stack, licenseId} = userInfo

  const query = `mutation {
    CreateStack(
      name: "${stack}"
      licenseId: "${licenseId}"
      modName: "${name}"
      modEmail: "${email}"
      modPassword: "${password}"
    ) {
        id,
        name,
        clientId,
        moderators { id }
    }
  }`

  const returnedData = await genericApiCall(query, userInfo)
  // console.log(`returnedData=${JSON.stringify(returnedData, null, 2)}`)

  // eslint-disable-next-line require-atomic-updates
  userInfo.stackId = returnedData.CreateStack.id
  // eslint-disable-next-line require-atomic-updates
  userInfo.id = returnedData.CreateStack.moderators[0].id

  return returnedData
}
