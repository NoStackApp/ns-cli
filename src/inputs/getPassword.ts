import {promptTypes, promptUser} from './promptUser'

const testPassword = async (password: string) => {
  if (!password || password.length === 0)
    return 'No value returned.  Please enter a password now.'

  if (!password || password.length < 8)
    return 'Your password must be at least 8 characters'

  const upperCaseCheck = /(.*[A-Z].*)/
  if (!upperCaseCheck.test(password))
    return 'The password must contain at least one capital letter'

  const digitCheck = /(.*[0-9].*)/
  if (!digitCheck.test(password))
    return 'The password must contain at least one digit from 0 to 9'

  const specialCharacterCheck = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
  if (!specialCharacterCheck.test(password))
    return 'The password must contain at least one special character'

  return ''
}

export async function getPassword(password: string | undefined) {
  let prompt = `Please enter a password of at least 8 characters,
          and make sure to include a number, a special character and an uppercase letter.`
  if (password) {
    prompt = await testPassword(password)
  }
  if (prompt.length === 0) return password

  return promptUser(
    'password',
    promptTypes.PASSWORD,
    prompt,
    testPassword
  )
}
