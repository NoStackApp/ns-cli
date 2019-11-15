"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs-extra');
const inflections_1 = require("../tools/inflections");
const createTopProjectDirs_1 = require("./createTopProjectDirs");
async function createQueryFile(currentStack, source) {
    const sourceInfo = currentStack.sources[source];
    let content = "import gql from 'graphql-tag';";
    const queryName = inflections_1.queryForSource(source); // `${allCaps(source)}_QUERY`
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
`;
    content += `\n${queryBody}`;
    const relationshipsName = inflections_1.relationshipsForSource(source); // `${allCaps(source)}_RELATIONSHIP`
    const relationshipsText = `export const ${relationshipsName} = {
   ${sourceInfo.props.typeRelationships},
};`;
    content += `
  ${relationshipsText}`;
    const queryFile = `${createTopProjectDirs_1.sourcePropsDir}/${source}.js`;
    try {
        await fs.outputFile(queryFile, content);
    }
    catch (err) {
        console.error(err);
    }
}
exports.createQueryFile = createQueryFile;
