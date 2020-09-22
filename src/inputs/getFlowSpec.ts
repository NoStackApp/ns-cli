import {promptTypes, promptUser} from './promptUser'

const fs = require('fs-extra')

const testFlowSpec = async (flowSpec: string) => {
  if (!flowSpec || flowSpec.length === 0)
    return 'Please enter a name for your app (all numbers and lowercase letters, no spaces).'

  if (!await fs.pathExists(flowSpec))
    return `The flow spec file that you provided, '${flowSpec}', does not exist.
    Please enter a new name or add the file '${flowSpec}' now.`

  return ''
}

export async function getFlowSpec(flowSpec: string | undefined) {
  let prompt = 'Please enter your flow spec file.'
  if (flowSpec) {
    prompt = await testFlowSpec(flowSpec)
  }
  if (prompt.length === 0) return flowSpec

  return promptUser(
    'flowSpec',
    promptTypes.TEXT,
    prompt,
    testFlowSpec,
  )
}
