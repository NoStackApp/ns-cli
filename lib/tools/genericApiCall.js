"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_request_1 = require("graphql-request");
const config_1 = require("../auth/config");
const getUserInfo_1 = require("../auth/getUserInfo");
const loginUser_1 = require("../auth/loginUser");
const refreshAccessToken_1 = require("../auth/refreshAccessToken");
const setUserInfo_1 = require("../auth/setUserInfo");
const constants_1 = require("../constants");
exports.fs = require('fs-extra');
require('dotenv').config({ path: __dirname + '/./../../.env' });
// console.log(`__dirname + '/./../.env'=${__dirname + '/./../../.env'}`)
const isDev = process.env.NODE_ENV === 'development';
// console.log(`isDev=${isDev}`)
// console.log(`process.env.LOCAL_SERVER=${process.env.LOCAL_SERVER}`)
const server = isDev ? process.env.LOCAL_SERVER : constants_1.liveServer;
// console.log(`in genericAPICall, server=${server}`)
// tslint:disable-next-line:no-http-string
// export const server = 'http://localhost:3000/graphql'
exports.stacksDirectory = `${config_1.secureDirectory}/noStackInfo`;
async function genericApiCall(query, userInfo, variables = {}) {
    // console.log(`in genericAPICall, userInfo=${JSON.stringify(userInfo)}`)
    // console.log(`query=${query}`)
    const client = new graphql_request_1.GraphQLClient(server, {
        headers: {
            jwt: userInfo.accessToken
        }
    });
    let dataReturned = '';
    // let finished = false
    await client.request(query, variables).then(data => {
        // console.log(`data=${JSON.stringify(data)}`)
        dataReturned = data;
        // finished = true
    })
        .catch(async (err) => {
        // console.log(JSON.stringify(err))
        if (!err.response) {
            console.log(`server time out: ${err}`);
        }
        if (err.code === 103 || err.response.errors[0].code === 103) {
            try {
                await refreshAccessToken_1.refreshAccessToken(userInfo);
            }
            catch (refreshError) {
                // console.log(`error with refreshing token: ${JSON.stringify(refreshError.response.errors)}`)
                if (refreshError.response.errors[0] === 'error executing action: Error: NotAuthorizedException: Invalid Refresh Token') {
                    // console.log('error with refreshing token!')
                    await loginUser_1.loginUser(userInfo);
                    try {
                        await getUserInfo_1.getUserInfo(userInfo); // second try
                    }
                    catch (errReadingLogin) {
                        // console.error(errReadingLogin)
                        throw new Error(errReadingLogin.response.errors); // GraphQL response errors
                    }
                }
            }
            await setUserInfo_1.setUserInfo(userInfo);
            const clientAfterRefresh = new graphql_request_1.GraphQLClient(server, {
                headers: {
                    jwt: userInfo.accessToken
                }
            });
            // } catch {
            //   await loginUser(userInfo)
            //
            //   try {
            //     await getUserInfo(userInfo) // second try
            //   } catch (errReadingLogin) {
            //     console.error(errReadingLogin)
            //     throw new Error(errReadingLogin.response.errors) // GraphQL response errors
            //   }
            //
            // }
            // if (!clientAfterRefresh) throw new Error('problem refreshing the tokens.')
            try {
                await clientAfterRefresh.request(query, variables).then(data => {
                    // console.log(data)
                    dataReturned = data;
                    // finished = true
                });
            }
            catch (err) {
                throw new Error(`${err.response.errors[0]}`);
            }
            // refreshAccessTokenForUser(currentRefreshToken,user)
        }
        else {
            // console.log(err.response.errors) // GraphQL response errors
            // console.log(JSON.stringify(err.response.data)) // Response data if available
            throw new Error('We are sorry, this call has produced an error on the server.  Please contact info@nostack.net.'); // GraphQL response errors
        }
    });
    // let clientAfterRefresh = null
    // if (!finished) {
    //   // console.log('trying again')
    //
    //   // try {
    //   clientAfterRefresh = new GraphQLClient(server, {
    //     headers: {
    //       jwt: userInfo.accessToken
    //     }
    //   })
    //   // } catch {
    //   //   await loginUser(userInfo)
    //   //
    //   //   try {
    //   //     await getUserInfo(userInfo) // second try
    //   //   } catch (errReadingLogin) {
    //   //     console.error(errReadingLogin)
    //   //     throw new Error(errReadingLogin.response.errors) // GraphQL response errors
    //   //   }
    //   //
    //   // }
    //   // if (!clientAfterRefresh) throw new Error('problem refreshing the tokens.')
    //   try {
    //     await clientAfterRefresh.request(query, variables).then(data => {
    //       // console.log(data)
    //       dataReturned = data
    //       finished = true
    //     })
    //   } catch (err) {
    //     if (err.code === 103 || err.response.errors[0].code === 103) {
    //       // must be that the refresh token has expired
    //       await loginUser(userInfo)
    //       try {
    //         await getUserInfo(userInfo) // second try
    //       } catch (errReadingLogin) {
    //         // console.error(errReadingLogin)
    //         throw new Error(errReadingLogin.response.errors) // GraphQL response errors
    //       }
    //     }
    //
    //     // third try's the charm...
    //     clientAfterRefresh = new GraphQLClient(server, {
    //       headers: {
    //         jwt: userInfo.accessToken
    //       }
    //     })
    //     try {
    //       await clientAfterRefresh.request(query, variables).then(data => {
    //         // console.log(data)
    //         dataReturned = data
    //         finished = true
    //       })
    //     } catch (err) {
    //       throw new Error(`${err.response.errors[0]}`)
    //     }
    //   }
    // }
    return dataReturned;
}
exports.genericApiCall = genericApiCall;
