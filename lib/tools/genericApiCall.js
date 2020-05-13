"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genericApiCall = exports.stacksDirectory = exports.fs = void 0;
const graphql_request_1 = require("graphql-request");
const config_1 = require("../auth/config");
const getUserInfo_1 = require("../auth/getUserInfo");
const loginUser_1 = require("../auth/loginUser");
const refreshAccessToken_1 = require("../auth/refreshAccessToken");
const setUserInfo_1 = require("../auth/setUserInfo");
const constants_1 = require("../constants");
exports.fs = require('fs-extra');
require('dotenv').config({ path: __dirname + '/./../../.env' });
const isDev = process.env.NODE_ENV === 'development';
// console.log(`isDev=${isDev}`)
// console.log(`process.env.LOCAL_SERVER=${process.env.LOCAL_SERVER}`)
const server = isDev ? process.env.LOCAL_SERVER : constants_1.liveServer;
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
        // console.log(`data=/${JSON.stringify(data)}`)
        dataReturned = data;
        // finished = true
    })
        .catch(async (err) => {
        // console.log(JSON.stringify(err))
        if (!err.response) {
            console.log(`server time out: ${err}`);
        }
        if (err.code === 103 || (err.response && err.response.errors[0].code === 103)) {
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
            try {
                await clientAfterRefresh.request(query, variables).then(data => {
                    // console.log(data)
                    dataReturned = data;
                    // finished = true
                });
            }
            catch (err) {
                if (err.code === 103 || (err.response && err.response.errors[0].code === 103)) {
                    try {
                        await loginUser_1.loginUser(userInfo);
                    }
                    catch (_a) {
                        throw new Error(`There is apparently an error with logging in ${userInfo.name} to ${userInfo.stack}.
              You might try confirming that you got the spelling correct.  info@nostack.net`);
                    }
                    const clientAfterRefresh = new graphql_request_1.GraphQLClient(server, {
                        headers: {
                            jwt: userInfo.accessToken
                        }
                    });
                    try {
                        await clientAfterRefresh.request(query, variables).then(data => {
                            // console.log(data)
                            dataReturned = data;
                            // finished = true
                            return dataReturned;
                        });
                    }
                    catch (err) {
                        throw new Error(`This call has produced an error on the server.
            Please contact info@nostack.net if you think that the call should have worked.
            Here's some info about the server error: ${JSON.stringify(err, null, 2)}`);
                    }
                }
                throw new Error(`${JSON.stringify(err.response.errors[0], null, 2)}`);
            }
            // refreshAccessTokenForUser(currentRefreshToken,user)
        }
        else {
            const lastError = err.response.errors[0];
            // console.log(err.response.errors) // GraphQL response errors
            // console.log(JSON.stringify(err.response.data)) // Response data if available
            throw new Error(`This call has produced an error on the server.
            Please contact info@nostack.net if you think it shouldn't have.
            The error type is ${lastError.errorType}.
            The error message is ${lastError.message}.
            The error path is ${lastError.path}.
            Here's some info about the server error: ${JSON.stringify(lastError, null, 2)}`);
        }
    });
    return dataReturned;
}
exports.genericApiCall = genericApiCall;
