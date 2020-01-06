import {UserInfo} from '../constants/types'
import {genericApiCall} from '../tools/genericApiCall'

export async function deleteStackQuery(userInfo: UserInfo) {
  const {stackId} = userInfo

  const query = `mutation {
	DeleteStack(
		stackId: "${stackId}"
	)
}`

  const returnedData = await genericApiCall(query, userInfo)
  // console.log(`returnedData=${JSON.stringify(returnedData, null, 2)}`)

  // userInfo.stackId = returnedData.DeleteStack.id
  // console.log(`final userInfo=${JSON.stringify(userInfo)}`)

  return returnedData
}
