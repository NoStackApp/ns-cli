import {expect, test} from '@oclif/test'

import {testModerator, testStack} from './testLoginData'

const queriesDir = `${__dirname}/../../resources/queries`
const queryFile = `${queriesDir}/queryFiles/platformInfo.graphql`
const varFile = `${queriesDir}/variables/platformInfo.json`

describe('callapi', () => {
  test
    .stdout()
    .command(['callapi',
      '-u', testModerator,
      '-s', testStack,
      '-q', queryFile,
      '-v', varFile
    ])
    .it('calls api correctly', ctx => {
      expect(ctx.stdout).to.contain('7s3hjbkm4grejpfskepau58ko1')
    })
})
