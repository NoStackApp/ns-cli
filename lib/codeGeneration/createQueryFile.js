"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQueryFile = void 0;
const fs = require('fs-extra');
const inflections_1 = require("../tools/inflections");
const Handlebars = require('handlebars');
const createTopProjectDirs_1 = require("./createTopProjectDirs");
const queryFileTemplate = Handlebars.compile(`import gql from 'graphql-tag';

  export const SOURCE_{{sourceAllCaps}}_QUERY = gql\`
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
      {{queryBody}}
    }
  }
\`;

export const {{sourceAllCaps}}_RELATIONSHIPS = {
   {{typeRelationships}},
};`);
async function createQueryFile(currentStack, source) {
    const sourceInfo = currentStack.sources[source];
    const queryFileText = queryFileTemplate({
        sourceAllCaps: inflections_1.allCaps(source),
        queryBody: sourceInfo.props.queryBody,
        typeRelationships: sourceInfo.props.typeRelationships
    });
    const queryFile = `${createTopProjectDirs_1.sourcePropsDir}/${source}.js`;
    try {
        await fs.outputFile(queryFile, queryFileText);
    }
    catch (err) {
        console.error(err);
    }
}
exports.createQueryFile = createQueryFile;
