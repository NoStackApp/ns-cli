const Listr = require('listr')

import {loginUser} from '../auth/loginUser'
import {UserInfo} from '../constants/types'

import {createStackQuery} from './create-stack-query'

export async function createStackAndModerator(userInfo: UserInfo) {
  const tasks = new Listr([
    {
      title: 'Create the new stack',
      task: async () => {
        await createStackQuery(userInfo)
      }
    },
    // {
    //   title: 'Log in the moderator',
    //   task: async () => {
    //     await loginUser(userInfo)
    //   }
    // },
  ])

  return tasks

}
