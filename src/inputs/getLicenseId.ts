// import {PJSON} from '@oclif/config'

import {UserInfo} from '../constants/types'
import {genericApiCall} from '../tools/genericApiCall'

import {promptTypes, promptUser} from './promptUser'

export async function licenseValid(licenseId: string) {
  // console.log(`in resetLicenseCall, userInfo:${JSON.stringify(userInfo)}`)

  let userInfo: UserInfo = {
    name: '',
    stack: '',
    password: '',
    email: '',
    licenseId: '',
    stackId: '',
    refreshToken: '',
    accessToken: '',
    id: '',
  }

  const query = `query {
      licenseValid(licenseId:"${licenseId}")
  }
  `

  const returnedData = await genericApiCall(query, userInfo)
  return returnedData.licenseValid
}

const testLicenseId = async (licenseId: string) => {
  if (!licenseId || licenseId.length === 0)
    return 'Please enter your license now.'

  if (!await licenseValid(licenseId))
    return `The license numbers you entered, '${licenseId}', is either invalid or maxed out.
      Please check the number and try again.  If you think that there is a problem with your
      registration, please contact info@nostack.net.`

  return ''
}

export async function getLicenseId(licenseId: string | undefined) {
  let prompt = 'Please enter a name for your license (all numbers and lowercase letters, no spaces).'

  if (licenseId) {
    prompt = await testLicenseId(licenseId)
  }
  if (prompt.length === 0) return licenseId

  return promptUser(
    'licenseId',
    promptTypes.PASSWORD,
    prompt,
    testLicenseId
  )
}
