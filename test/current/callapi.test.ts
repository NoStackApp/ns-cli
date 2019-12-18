import {expect, test} from '@oclif/test'

import {resourcesDirectory, testModerator, testStack} from '../testConstants'

const queriesDir = `${resourcesDirectory}/queries`
const queryFile = `${queriesDir}/queryFiles/platformInfo.gql`
const varFile = `${queriesDir}/variables/platformInfo.json`
// const nock = require('nock')

const result = `{
  "data": {
    "platformInfo": "{\\"clientId\\":\\"7s3hjbkm4grejpfskepau58ko1\\"}"
  }
}`

// const scope = nock('https://api.matchlynx.com/graphql')
//   .post('/platformInfo')
//   .reply(200, result)
//   .persist()
const http = 'http'
describe('test of callapi', function () {
  this.timeout(15000)
  test
    .nock(`${http}://localhost:3000/graphql`, api => api
      .post('/platformInfo')
      .reply(200, result)
      ).stdout()
    .command(['callapi',
      '-u', testModerator,
      '-s', testStack,
      '-q', queryFile,
      '-v', varFile
    ])
    .it('calls api correctly', ctx => {
      console.log("now we're in the base of the it call...")
      expect(ctx.stdout).to.contain('7s3hjbkm4grejpfskepau58ko1')
    })
})
