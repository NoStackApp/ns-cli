const Listr = require('listr')
// const prompts = require('prompts');
const input = require('listr-input')
import {loginUser} from '../auth/loginUser'
import {UserInfo} from '../constants/types'

import {createStackQuery} from './create-stack-query'

// const verifyUser = async () => {
//   const response = await prompts({
//     typeName: 'text',
//     name: 'userConfirmed',
//     message: `You must log in your moderator to proceed. Please check your email for a verification
//             message from 'info@nostack.net' with the title 'Your verification link. When you've verified,
//             hit enter. `,
//   })
//   console.log(response)
//   // if (response !== 'y') {
//   //   throw new Error('Please check the email account that you used.  Sometimes emails' +
//   //     'can take a while to come as well.  You cannot proceed without a confirmed moderator.')
//   // }
//
//   return response
// }

export async function createStackAndModerator(userInfo: UserInfo) {
  const tasks = new Listr([
    {
      title: 'Create the new stack',
      task: async () => {
        await createStackQuery(userInfo)
      },
    },
    {
      title: 'Verify moderator identity',
      task: () => input('Verify your moderator via email, then hit enter.', {
        // validate: value => value.length > 0,
        // done: credentials => got('https://myapi.com', {
        //   headers: {
        //     Authorization: `Bearer ${credentials}`
        //   }
        // })
      }),
    },
    {
      title: 'Log in the moderator',
      task: async () => {
        await loginUser(userInfo)
      },
    },
  ])

  return tasks
}
