import {expect, test} from '@oclif/test'

import {testModerator, testStack} from './testLoginData'

require('dotenv').config({path: __dirname + '/./../../.env'})

const appName = 'testStackApp'
const appFlowsDir = `${__dirname}/../../resources/appFlows`
const appFlow = `${appFlowsDir}/sampleTemplate2`
const email = process.env.EMAIL as string

describe('spinstack', () => {
  test
    .stdout()
    .command(['spinstack',
      '-u', testModerator,
      '-s', testStack,
      '-a', appName,
      '-t', appFlow,
      '-e', email,
    ])
    .it('creates the stack', () => {
      expect(`${appName}/stack.json`).to.contain('userClasses')
    })

  // test
  //   .stdout()
  //   .command(['spinstack', '--name', 'jeff'])
  //   .it('runs hello --name jeff', ctx => {
  //     expect(ctx.stdout).to.contain('hello jeff')
  //   })
})
