import {GraphQLClient} from 'graphql-request'
import * as path from 'path'

import {liveServer} from '../constants'
import {UserInfo} from '../constants/types'

require('dotenv').config({path: path.join(__dirname, '/./../.env')})

const isDev = process.env.NODE_ENV === 'development'
// console.log(`process.env.LOCAL_SERVER=${process.env.LOCAL_SERVER}`)

const server: string = isDev ? process.env.LOCAL_SERVER as string : liveServer
// console.log(`server=${server}`)

export async function refreshAccessToken(userInfo: UserInfo) {
  const REFRESH_ACTION_ID = '9039e9c4-5b88-4575-8ed4-1fa1b27dc7a7'
  const executionParameters = {
    refreshToken: userInfo.refreshToken,
    platformId: userInfo.stackId,
  }
  const embeddableExecutionParameters = JSON.stringify(executionParameters).replace(/"/g, '\\"')
  // console.log('embeddableExecutionParameters=', embeddableExecutionParameters)
  const query = `mutation {
        Execute(actionId: "${REFRESH_ACTION_ID}",
        executionParameters: "${embeddableExecutionParameters}",
        unrestricted: true)
      }
  `
  const client = new GraphQLClient(server, {
    headers: {},
  })

  console.log('query=', query)
  // eslint-disable-next-line require-atomic-updates
  userInfo.accessToken = await client.request(query).then(data => {
    console.log(`data: ${JSON.stringify(data)}`)
    const Execute = JSON.parse(data.Execute)  // .AuthenticationResult // AccessToken
    console.log(`Execute=${JSON.stringify(Execute, null, 2)}`)
    return (Execute.AuthenticationResult.AccessToken)
    // console.log(`newAccessToken=${newAccessToken}`)
  })
  console.log(`userInfo.accessToken=${userInfo.accessToken}`)
  // .catch(refreshError => {
  //   console.log(`error With refresh: ${refreshError.response.errors[0]}`)
  // })
}
