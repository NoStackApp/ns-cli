import {GraphQLClient} from 'graphql-request'

import {secureDirectory} from '../auth/config'
import {getUserInfo} from '../auth/getUserInfo'
import {loginUser} from '../auth/loginUser'
import {refreshAccessToken} from '../auth/refreshAccessToken'
import {setUserInfo} from '../auth/setUserInfo'
import {liveServer} from '../constants'
import {UserInfo} from '../constants/types'

export const fs = require('fs-extra')
require('dotenv').config({path: __dirname + '/./../../.env'})

const isDev = process.env.NODE_ENV === 'development'
// console.log(`isDev=${isDev}`)
// console.log(`process.env.LOCAL_SERVER=${process.env.LOCAL_SERVER}`)

const server: string = isDev ? process.env.LOCAL_SERVER as string : liveServer
export const stacksDirectory = `${secureDirectory}/noStackInfo`

export async function genericApiCall(query: string, userInfo: UserInfo, variables: object = {}) {
  // console.log(`in genericAPICall, userInfo=${JSON.stringify(userInfo)}`)
  // console.log(`query=${query}`)

  const client = new GraphQLClient(server, {
    headers: {
      jwt: userInfo.accessToken
    }
  })

  let dataReturned: any = ''
  // let finished = false
  await client.request(query, variables).then(data => {
    // console.log(`data=/${JSON.stringify(data)}`)
    dataReturned = data
    // finished = true
  })
    .catch(async err => {
      // console.log(JSON.stringify(err))
      if (!err.response) {
        console.log(`server time out: ${err}`)
      }

      if (err.code === 103 || err.response.errors[0].code === 103) {
        try {
          await refreshAccessToken(userInfo)
        } catch (refreshError) {
          // console.log(`error with refreshing token: ${JSON.stringify(refreshError.response.errors)}`)
          if (refreshError.response.errors[0] === 'error executing action: Error: NotAuthorizedException: Invalid Refresh Token') {
            // console.log('error with refreshing token!')
            await loginUser(userInfo)
            try {
              await getUserInfo(userInfo) // second try
            } catch (errReadingLogin) {
              // console.error(errReadingLogin)
              throw new Error(errReadingLogin.response.errors) // GraphQL response errors
            }
          }
        }

        await setUserInfo(userInfo)

        const clientAfterRefresh = new GraphQLClient(server, {
          headers: {
            jwt: userInfo.accessToken
          }
        })
        try {
          await clientAfterRefresh.request(query, variables).then(data => {
            // console.log(data)
            dataReturned = data
            // finished = true
          })
        } catch (err) {
          throw new Error(`${err.response.errors[0]}`)
        }
        // refreshAccessTokenForUser(currentRefreshToken,user)
      } else {
        // console.log(err.response.errors) // GraphQL response errors
        // console.log(JSON.stringify(err.response.data)) // Response data if available
        throw new Error(`We are sorry, this call has produced an error on the server.
            Please contact info@nostack.net.
            Here's some info about the server error: ${err.response.errors[0]}`)
      }
    })

  return dataReturned
}
