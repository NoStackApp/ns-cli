export const isRequired = (paramName: string, commandName: string, flag: string) => {
  //   this.log("param ${paramName} is required for this creation)
  //   return

  if (flag && commandName) {
    console.log(`Error calling command ${commandName}: the parameter '${paramName}' is required.
     You can use the flag '--${paramName}' or '-${flag}'.`)
    return process.exit(1)
  }

  throw new Error(`param ${paramName} is required for this creation`)
}


/*
  if (!userInfo.password) {
    response = await prompts({
      type: 'password',
      name: 'password',
      message: `User ${userInfo.name} is not logged in. What is their password?`
    })
    userInfo.password = response.password
  }

 */
