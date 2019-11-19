import {promptTypes, promptUser} from './promptUser'

let Isemail = require('isemail')

const testEmail = async (email: string) => {
  if (!Isemail.validate(email))
    return 'invalid email.  please try again'

  return ''
}

export async function getEmail(email: string | undefined) {
  let prompt = 'Please enter the email address for the moderator.'
  if (email) {
    prompt = await testEmail(email)
  }
  if (prompt.length === 0) return email

  return promptUser(
    'email',
    promptTypes.TEXT,
    prompt,
    testEmail
  )
}
