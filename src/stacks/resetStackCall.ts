import {UserInfo} from '../constants/types'
import {genericApiCall} from '../tools/genericApiCall'

export async function resetStackCall(userInfo: UserInfo) {
  // console.log(`in resetStackCall, userInfo:${JSON.stringify(userInfo)}`)

  const query = `mutation {
      ResetStack(stackId:"${userInfo.stackId}")
  }
  `

  const returnedData = await genericApiCall(query, userInfo)
  // console.log(`returnedData=${JSON.stringify(returnedData)}`)
  return returnedData.ResetStack
}
