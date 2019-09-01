import {loginUser} from '../auth/loginUser'
// import {setUserInfo} from '../auth/setUserInfo'
import {UserInfo} from '../constants/types'
// import {genericApiCall} from '../genericApiCall'

import {createModerator} from './createModerator'
import {createStack} from './createStack'

export async function quickStartForModerator(userInfo: UserInfo) {
  await createModerator(userInfo)
  await createStack(userInfo)
  await loginUser(userInfo)
}
