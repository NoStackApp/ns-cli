const errorEx = require('error-ex')

import {Command, flags} from '@oclif/command'

import {getUserInfo} from '../auth/getUserInfo'
import {newUserInfo} from '../auth/newUserInfo'
import {UserInfo} from '../constants/types'
import {isRequired} from '../inputs/isRequired'
import {callApiHelper} from '../tools/callApiHelper'

export const noNameError = errorEx('noNameError')

export default class Callapi extends Command {
  static description = 'Make a call to the nostack api. Takes care of auth for the user. ' +
    'You need to specify ' +
    'a file with the graphql query and another one with a json of the variables, if any' +
    'are used.'

  static examples = [
    '$ nostack callapi -u irnold1y -s TestStack1y -q ~/projects/no-stack-queries/queries/unitData1y.graphql -v ~/projects/no-stack-queries/variables/unitData1y.json\n',
  ]

  static flags = {
    user: flags.string({char: 'u', description: 'moderator for stack'}),
    stack: flags.string({char: 's', description: 'stack'}),
    queryFile: flags.string({char: 'q', description: 'graphql file containing a single query'}),
    variablesFile: flags.string({char: 'v', description: 'json file with query variables'}),
    help: flags.help({char: 'h'}),
  }

  static args = []

  async run() {
    // const {args, flags} = this.parse(Callapi)
    const {flags} = this.parse(Callapi)
    const user = flags.user || isRequired('user', 'callapi', '-u')
    const stack = flags.stack || isRequired('stack', 'callapi', '-s')
    const queryFile = flags.queryFile || isRequired('queryFile', 'callapi', '-q')
    const variablesFile = flags.variablesFile || ''

    // this.log(`in callapi, queryFile=${queryFile}`)

    let userInfo: UserInfo = newUserInfo(user)
    userInfo.stack = stack
    // console.log(`in spinstack, userInfo:${JSON.stringify(userInfo)}`)
    userInfo = await getUserInfo(userInfo)

    const queryData = await callApiHelper(queryFile, userInfo, variablesFile)
    this.log(`Result:\n${JSON.stringify(queryData, null, 2)}`)
  }
}
