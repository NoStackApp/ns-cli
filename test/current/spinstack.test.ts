import {expect, test} from '@oclif/test'

import {appName, testModerator, testStack} from '../testConstants'

require('dotenv').config({path: __dirname + '/./../../.env'})

const appFlow = `${__dirname}/../testFlowSpec.txt`
const email = process.env.EMAIL as string
const fileName = `${appName}/stack.json`
const fs = require('fs-extra')

describe('spinstack', function () {
  this.timeout(0)
  test
    .stdout()
    .command(['spinstack',
      '-u', testModerator,
      '-s', testStack,
      '-a', appName,
      '-t', appFlow,
      '-e', email,
    ])
    .it('creates the stack', async function () {
      expect(fs.pathExistsSync(fileName))
    })

  // test
  //   .stdout()
  //   .command(['spinstack', '--name', 'jeff'])
  //   .it('runs hello --name jeff', ctx => {
  //     expect(ctx.stdout).to.contain('hello jeff')
  //   })
})
