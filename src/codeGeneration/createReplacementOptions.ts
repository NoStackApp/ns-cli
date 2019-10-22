import {associationTypes, boilerPlates} from '../constants'
import {StackInfo, TreeTypeChildrenList} from '../constants/types'
import {
  allCaps,
  pluralLowercaseName,
  pluralName,
  queryForSource,
  relationshipsForSource,
  singularName
} from '../tools/inflections'

interface ReplacementPair {
  fromRegExp: RegExp,
  toString: string,
}

interface Mapping {
  [index: string]: ReplacementPair,
}

export interface ReplacementOptions {
  files: string,
  from: RegExp [],
  to: string [],
}

/*
         const newTodo = {
          instance: {
            id: newTodoData.instanceId,
            value: newTodoData.value,
            __typename: 'Instance',
          },
          children: [
            {
              instances: [
                {
                  instance: {
                    id: isCompletedData.instanceId,
                    value: isCompletedData.value,
                    __typename: 'Instance',
                  },
                  __typename: 'InstanceWithTypedChildren',
                },
              ],
              __typename: 'TypeWithInstances',
            },
          ],
          __typename: 'InstanceWithTypedChildren',
        };
 */

function generateSingleChildCreationCode(parentType: string, childType: string, source: string) {
  return `    await create${singularName(childType)}({
      variables: {
        actionId: CREATE_${allCaps(childType)}_FOR_${allCaps(source)}_ACTION_ID,
        executionParameters: JSON.stringify({
          parentInstanceId: new${singularName(parentType)}Data.instanceId,
          value: 'false',
        }),
        unrestricted: false,
      },
      update: (cache, response) => {
        const new${singularName(childType)}Data = JSON.parse(response.data.ExecuteAction);

        const new${singularName(parentType)} = {
          id: new${singularName(parentType)}Data.instanceId,
          instance: {
            id: new${singularName(parentType)}Data.instanceId,
            value: new${singularName(parentType)}Data.value,
            __typename: 'Instance',
          },
          children: [
              {
                typeId: TYPE_${allCaps(childType)}_ID,
                instances: [
                  {
                    id: new${singularName(childType)}Data.instanceId,
                    instance: {
                        id: new${singularName(childType)}Data.instanceId,
                        value: new${singularName(childType)}Data.value,
                        __typename: 'Instance',
                     },
                     __typename: 'InstanceWithTypedChildren',
                  },
                ],
                __typename: 'TypeWithInstances',
              },
          ],
          __typename: 'InstanceWithTypedChildren',
        };

        onAdd(new${singularName(parentType)})(cache);
      },
    });
`
}

export const createReplacementOptions = (type: string, source: string, boilerPlate: string, currentStack: StackInfo) => {
  const parentType = currentStack.types[type].sources[source].parentType
  let childrenImports = ''
  let childrenTypeList = ''
  let childrenBody = ''
  let childrenConstantDeclarations = ''
  let constraintValue = 'ignoredParameter'
  let typeIdsForSingleChildren = ''
  let actionIdsForSingleChildren = ''
  let singleChildrenCreationCode = ''
  let updateOnAddLine = '\n' +
    '      update: onAdd(),'
  let singleChildrenComposeStatements = ''
  let singleChildrenParams = ''


  if (boilerPlate !== boilerPlates[associationTypes.MULTIPLE]) {
    let children = {...currentStack.sources[source].tree[type]}
    const connectedSource: string = currentStack.sources[source].connections[type]
    const constraintsInfo = currentStack.sources[source].constraints

    Object.keys(constraintsInfo).map(key => {
      // if (constraintsInfo[key].constraintType === 'ID' &&
      //   constraintsInfo[key].type === type) {
      //   constraintValue = constraintsInfo[key].value
      // }
      if (constraintsInfo[key].constraintType === 'ID' &&
        constraintsInfo[key].type === parentType) {
        constraintValue = constraintsInfo[key].value
      }
    })

    Object.keys(children).map(
      child => {
        // console.log(`child=${child}, children[child]=${children[child]}`)
        let childComponent
        if (children[child] === associationTypes.MULTIPLE) {
          childrenTypeList += `, TYPE_${allCaps(child)}_ID`
          childrenConstantDeclarations += `\n  const ${child}Data = ${type}.children && ${type}.children.find(child => child.typeId === TYPE_${allCaps(child)}_ID);
  const ${pluralLowercaseName(child)} = ${child}Data ? ${child}Data.instances : [];`
          childComponent = pluralName(child)
          childrenBody += `
< ${childComponent}
              ${pluralLowercaseName(child)} = { ${pluralLowercaseName(child)} }
              ${type}Id = {${type}.id}
              label="${singularName(child)}?"
              onUpdate={onUpdate}
              refetchQueries={refetchQueries}
      />`

        } else {
          actionIdsForSingleChildren += `, CREATE_${allCaps(child)}_FOR_${allCaps(source)}_ACTION_ID`
          typeIdsForSingleChildren += `, TYPE_${allCaps(child)}_ID`
          childrenTypeList += `, TYPE_${allCaps(child)}_ID`
          childrenConstantDeclarations += `\n  const ${child}Data = ${type}.children && ${type}.children.find(child => child.typeId === TYPE_${allCaps(child)}_ID);
            const ${child} = ${child}Data ? ${child}Data.instances[0] : [];`
          singleChildrenCreationCode += generateSingleChildCreationCode(type, child, source)
          updateOnAddLine = ''
          singleChildrenComposeStatements += `\n  graphql(EXECUTE_ACTION, { name: 'create${singularName(child)}' }),`
          singleChildrenParams += `, create${singularName(child)}`
          childComponent = singularName(child)
          childrenBody += `
< ${childComponent}
              ${child} = { ${child} }
              ${type}Id = {${type}.id}
              label="${singularName(child)}?"
              onUpdate={onUpdate}
              refetchQueries={refetchQueries}
      />`

        }
        childrenImports += `
import ${childComponent} from '../${childComponent}'; `
        childrenTypeList += ''
      }
    )

    let connectedChildren: TreeTypeChildrenList = {}
    if (connectedSource) {
      connectedChildren = {
        ...currentStack.sources[connectedSource].tree[type]
      }

      // console.log(`connectedChildren=${JSON.stringify(connectedChildren)}`)

      Object.keys(connectedChildren).map(
        child => {
          // console.log(`connected child=${child}, connectedChildren[child]=${connectedChildren[child]}`)

          let childComponent
          if (connectedChildren[child] === associationTypes.MULTIPLE) {
            // childrenConstantDeclarations += `\n  const ${child} = ${type}.children.find(child => child.typeId === TYPE_${allCaps(child)}_ID);`
            childComponent = pluralName(child)
          } else {
            // childrenConstantDeclarations += `\n  const ${child} = ${type}.children.find(child => child.typeId === TYPE_${allCaps(child)}_ID).instances[0];`
            childComponent = singularName(child)
          }

          // childrenSourceDataStatements += `\n${childComponent}: el.children[0].instance`
          childrenImports += `
import ${childComponent} from '../../${singularName(connectedSource)}/${childComponent}'; `
          childrenBody += `
< ${childComponent} ${type}Id = {${type}.id} />`
        }
      )
    }
  }

  let options: ReplacementOptions = {
    files: '',
    from: [],
    to: []
  }

  const mapping: Mapping = {
    Singular: {
      fromRegExp: /__SingularName__/g,
      toString: singularName(type),
    },
    Plural: {
      fromRegExp: /__PluralName__/g,
      toString: pluralName(type),
    },
    pluralLower: {
      fromRegExp: /__PluralNameLowercase__/g,
      toString: pluralLowercaseName(type),
    },
    singleLower: {
      fromRegExp: /__SingularNameLowercase__/g,
      toString: type,
    },
    sourceLower: {
      fromRegExp: /__SingularSourceLowercase__/g,
      toString: source,
    },
    unitId: {
      fromRegExp: /__SOURCE_ID_CONSTANT__/g,
      toString: currentStack.sources[source].const,
    },
    relationships: {
      fromRegExp: /__RELATIONSHIPS_NAME__/g,
      toString: relationshipsForSource(source),
    },
    sourceQuery: {
      fromRegExp: /__SOURCE_QUERY_NAME__/g,
      toString: queryForSource(source),
    },
    SingularAllCaps: {
      fromRegExp: /__SingularNameAllCaps__/g,
      toString: allCaps(type),
    },
    SingularForRelationshipAllCaps: {
      fromRegExp: /__SingularForRelationshipAllCaps__/g,
      toString: `${allCaps(type)}_FOR_${allCaps(source)}`,
    },
    childrenImports: {
      fromRegExp: /__CHILDREN_IMPORT_LIST__/g,
      toString: childrenImports,
    },
    childrenTypeList: {
      fromRegExp: /__ChildrenTypeList__/g,
      toString: childrenTypeList,
    },
    childrenBody: {
      fromRegExp: /__CHILDREN_BODY_LIST__/g,
      toString: childrenBody,
    },
    childrenConstantDeclarations: {
      fromRegExp: /__CHILDREN_CONSTANT_DECLARATIONS__/g,
      toString: childrenConstantDeclarations,
    },
    constraintValue: {
      fromRegExp: /__CONSTRAINT_VALUE__/g,
      toString: constraintValue,
    },
    singularParentName: {
      fromRegExp: /__SingularParentName__/g,
      toString: parentType,
    },
    singularParentNameAllCaps: {
      fromRegExp: /__SingularParentNameAllCaps__/g,
      toString: allCaps(parentType),
    },
    actionIdsForSingleChildren: {
      fromRegExp: /__ACTION_IDS_FOR_SINGLE_CHILDREN__/g,
      toString: actionIdsForSingleChildren,
    },
    typeIdsForSingleChildren: {
      fromRegExp: /__TYPE_IDS_FOR_SINGLE_CHILDREN__/g,
      toString: typeIdsForSingleChildren,
    },
    singleChildrenCreationCode: {
      fromRegExp: /__SINGLE_CHILDREN_CREATION_CODE__/g,
      toString: singleChildrenCreationCode,
    },
    singleChildrenComposeStatements: {
      fromRegExp: /__SINGLE_CHILDREN_COMPOSE_STATEMENTS__/g,
      toString: singleChildrenComposeStatements,
    },
    singleChildrenParams: {
      fromRegExp: /__SINGLE_CHILDREN_PARAMS__/g,
      toString: singleChildrenParams,
    },
    updateOnAddLine: {
      fromRegExp: /__UPDATE_ON_ADD_LINE__/g,
      toString: updateOnAddLine,
    },
  }

  Object.keys(mapping).map((index: string) => {
    options.from.push(mapping[index].fromRegExp)
    options.to.push(mapping[index].toString)
  })

  return options
}
