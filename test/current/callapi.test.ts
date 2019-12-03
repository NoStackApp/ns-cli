import {expect, test} from '@oclif/test'

import {resourcesDirectory, testModerator, testStack} from '../testConstants'

const queriesDir = `${resourcesDirectory}/queries`
const queryFile = `${queriesDir}/queryFiles/platformInfo.gql`
const varFile = `${queriesDir}/variables/platformInfo.json`

describe('test of callapi', function () {
  this.timeout(15000)
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
