const Listr = require('listr')

import {UserInfo} from '../constants/types'

import {deleteStackQuery} from './delete-stack-query'

export async function deleteStackAndModerator(userInfo: UserInfo) {
  const tasks = new Listr([
    {
      title: 'Delete the Stack',
      task: async () => {
        await deleteStackQuery(userInfo)
      },
    },
  ])

  return tasks
}
