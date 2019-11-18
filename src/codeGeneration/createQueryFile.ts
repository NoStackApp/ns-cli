const fs = require('fs-extra')

import {StackInfo} from '../constants/types'
import {queryForSource, relationshipsForSource} from '../tools/inflections'

import {sourcePropsDir} from './createTopProjectDirs'

export async function createQueryFile(currentStack: StackInfo, source: string) {
  const sourceInfo = currentStack.sources[source]

  let content = "import gql from 'graphql-tag';"
  const queryName = queryForSource(source) // `${allCaps(source)}_QUERY`

  const queryBody = `\nexport const ${queryName} = gql\`
  query UNIT(
    $id: ID!
    $typeRelationships: String!
    $parameters: String
  ) {
    unitData(
      unitId: $id
      typeRelationships: $typeRelationships
      parameters: $parameters
    )
    {
      ${sourceInfo.props.queryBody}
    }
  }
\`;
`

  content += `\n${queryBody}`
  const relationshipsName = relationshipsForSource(source) // `${allCaps(source)}_RELATIONSHIP`
  const relationshipsText = `export const ${relationshipsName} = {
   ${sourceInfo.props.typeRelationships},
};`

  content += `
  ${relationshipsText}`

  const queryFile = `${sourcePropsDir}/${source}.js`
  try {
    await fs.outputFile(queryFile, content)
  } catch (err) {
    console.error(err)
  }

}
