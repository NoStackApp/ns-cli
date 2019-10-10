"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs-extra');
const inflections_1 = require("../tools/inflections");
const createTopProjectDirs_1 = require("./createTopProjectDirs");
async function createQueryFile(currentStack, source) {
    // console.log(`in createQueryFile for currentStack.  source= ${source}`)
    const sourceInfo = currentStack.sources[source];
    let content = "import gql from 'graphql-tag';";
    // const selectionRoot = sourceInfo.selectionRoot
    // console.log(`selectionRoot= ${selectionRoot}`)
    // let queryTree: QueryTree = {
    //   [selectionRoot]: deriveTreeChildren(currentStack, source, {}, selectionRoot)
    // }
    //
    const queryName = inflections_1.queryForSource(source); // `${allCaps(source)}_QUERY`
    //
    // // console.log(`currentStack.sources[source]= ${JSON.stringify(currentStack.sources[source])}`)
    const selections = currentStack.sources[source].selections;
    const queryConstsImport = '\n\nimport { ' + selections.map(selection => `${currentStack.types[selection].const}`).join(', ') + '} from \'../../config\';';
    content += queryConstsImport;
    // const queryFragmentsImport = '\n\nimport { ' + selections.map(selection => `${allCaps(selection)}_FRAGMENT`).join(', ') + '} from \'./fragments\';'
    const rootName = sourceInfo.selectionRoot;
    const queryFragmentsImport = `\n\nimport { ${inflections_1.allCaps(rootName)}_FRAGMENT, TO_DO_CHILD_FRAGMENT } from './fragments';`;
    content += queryFragmentsImport;
    const queryFragmentsList = '\n' + selections.map(selection => `$\{${inflections_1.allCaps(selection)}_FRAGMENT\}`).join('\n');
    const queryBody = `\n\nexport const ${queryName} = gql\`
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
      ${sourceInfo.props.queryBody}
  }
  ${queryFragmentsList}
\`;
`;
    // console.log(`sourceInfo.props=${JSON.stringify(sourceInfo.props, null, 2)}`)
    /*
    SAMPLE relationship tree...
  
    export const PROJECTS_FOR_CURRENT_USER_RELATIONSHIPS = {
    [TYPE_PROJECT_ID]: null,
  };
     */
    content += `\n${queryBody}`;
    // console.log(`content=${content}`)
    //
    // //
    const relationshipName = inflections_1.relationshipsForSource(source); // `${allCaps(source)}_RELATIONSHIP`
    const relationshipText = `export const ${relationshipName} = {
   ${sourceInfo.props.typeRelationships},
};`;
    //
    content += `${relationshipText}`;
    // console.log(`content=${content}`)
    const queryFile = `${createTopProjectDirs_1.sourcePropsDir}/${source}.js`;
    try {
        await fs.outputFile(queryFile, content);
    }
    catch (err) {
        console.error(err);
    }
}
exports.createQueryFile = createQueryFile;
