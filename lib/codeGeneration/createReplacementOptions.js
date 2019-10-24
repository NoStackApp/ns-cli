"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const inflections_1 = require("../tools/inflections");
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
function generateSingleChildCreationCode(parentType, childType, source) {
    return `    await create${inflections_1.singularName(childType)}({
      variables: {
        actionId: CREATE_${inflections_1.allCaps(childType)}_FOR_${inflections_1.allCaps(source)}_ACTION_ID,
        executionParameters: JSON.stringify({
          parentInstanceId: new${inflections_1.singularName(parentType)}Data.instanceId,
          value: 'false',
        }),
        unrestricted: false,
      },
      update: (cache, response) => {
        const new${inflections_1.singularName(childType)}Data = JSON.parse(response.data.ExecuteAction);

        const new${inflections_1.singularName(parentType)} = {
          id: new${inflections_1.singularName(parentType)}Data.instanceId,
          instance: {
            id: new${inflections_1.singularName(parentType)}Data.instanceId,
            value: new${inflections_1.singularName(parentType)}Data.value,
            __typename: 'Instance',
          },
          children: [
              {
                typeId: TYPE_${inflections_1.allCaps(childType)}_ID,
                instances: [
                  {
                    id: new${inflections_1.singularName(childType)}Data.instanceId,
                    instance: {
                        id: new${inflections_1.singularName(childType)}Data.instanceId,
                        value: new${inflections_1.singularName(childType)}Data.value,
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

        onAdd(new${inflections_1.singularName(parentType)})(cache);
      },
    });
`;
}
exports.createReplacementOptions = (type, source, boilerPlate, currentStack) => {
    const parentType = currentStack.types[type].sources[source].parentType;
    let childrenImports = '';
    let childrenTypeList = '';
    let childrenBody = '';
    let childrenConstantDeclarations = '';
    let constraintValue = 'ignoredParameter';
    let typeIdsForSingleChildren = '';
    let actionIdsForSingleChildren = '';
    let singleChildrenCreationCode = '';
    let updateOnAddLine = 'refetchQueries';
    let singleChildrenComposeStatements = '';
    let singleChildrenParams = '';
    if (boilerPlate !== constants_1.boilerPlates[constants_1.associationTypes.MULTIPLE]) {
        let children = Object.assign({}, currentStack.sources[source].tree[type]);
        const connectedSource = currentStack.sources[source].connections[type];
        const constraintsInfo = currentStack.sources[source].constraints;
        Object.keys(constraintsInfo).map(key => {
            // if (constraintsInfo[key].constraintType === 'ID' &&
            //   constraintsInfo[key].type === type) {
            //   constraintValue = constraintsInfo[key].value
            // }
            if (constraintsInfo[key].constraintType === 'ID' &&
                constraintsInfo[key].type === parentType) {
                constraintValue = constraintsInfo[key].value;
            }
        });
        Object.keys(children).map(child => {
            // console.log(`child=${child}, children[child]=${children[child]}`)
            let childComponent;
            if (children[child] === constants_1.associationTypes.MULTIPLE) {
                childrenTypeList += `, TYPE_${inflections_1.allCaps(child)}_ID`;
                childrenConstantDeclarations += `\n  const ${child}Data = ${type}.children && ${type}.children.find(child => child.typeId === TYPE_${inflections_1.allCaps(child)}_ID);
  const ${inflections_1.pluralLowercaseName(child)} = ${child}Data ? ${child}Data.instances : [];`;
                childComponent = inflections_1.pluralName(child);
                childrenBody += `
< ${childComponent}
              ${inflections_1.pluralLowercaseName(child)} = { ${inflections_1.pluralLowercaseName(child)} }
              ${type}Id = {${type}.id}
              label="${inflections_1.singularName(child)}?"
              onUpdate={onUpdate}
              refetchQueries={refetchQueries}
      />`;
            }
            else {
                actionIdsForSingleChildren += `, CREATE_${inflections_1.allCaps(child)}_FOR_${inflections_1.allCaps(source)}_ACTION_ID`;
                typeIdsForSingleChildren += `, TYPE_${inflections_1.allCaps(child)}_ID`;
                childrenTypeList += `, TYPE_${inflections_1.allCaps(child)}_ID`;
                childrenConstantDeclarations += `\n  const ${child}Data = ${type}.children && ${type}.children.find(child => child.typeId === TYPE_${inflections_1.allCaps(child)}_ID);
            const ${child} = ${child}Data ? ${child}Data.instances[0] : [];`;
                singleChildrenCreationCode += generateSingleChildCreationCode(type, child, source);
                updateOnAddLine = '';
                singleChildrenComposeStatements += `\n  graphql(EXECUTE_ACTION, { name: 'create${inflections_1.singularName(child)}' }),`;
                singleChildrenParams += `, create${inflections_1.singularName(child)}`;
                childComponent = inflections_1.singularName(child);
                childrenBody += `
< ${childComponent}
              ${child} = { ${child} }
              ${type}Id = {${type}.id}
              label="${inflections_1.singularName(child)}?"
              onUpdate={onUpdate}
              refetchQueries={refetchQueries}
      />`;
            }
            childrenImports += `
import ${childComponent} from '../${childComponent}'; `;
            childrenTypeList += '';
        });
        let connectedChildren = {};
        if (connectedSource) {
            connectedChildren = Object.assign({}, currentStack.sources[connectedSource].tree[type]);
            // console.log(`connectedChildren=${JSON.stringify(connectedChildren)}`)
            Object.keys(connectedChildren).map(child => {
                // console.log(`connected child=${child}, connectedChildren[child]=${connectedChildren[child]}`)
                let childComponent;
                if (connectedChildren[child] === constants_1.associationTypes.MULTIPLE) {
                    // childrenConstantDeclarations += `\n  const ${child} = ${type}.children.find(child => child.typeId === TYPE_${allCaps(child)}_ID);`
                    childComponent = inflections_1.pluralName(child);
                }
                else {
                    // childrenConstantDeclarations += `\n  const ${child} = ${type}.children.find(child => child.typeId === TYPE_${allCaps(child)}_ID).instances[0];`
                    childComponent = inflections_1.singularName(child);
                }
                // childrenSourceDataStatements += `\n${childComponent}: el.children[0].instance`
                childrenImports += `
import ${childComponent} from '../../${inflections_1.singularName(connectedSource)}/${childComponent}'; `;
                childrenBody += `
< ${childComponent} ${type}Id = {${type}.id} />`;
            });
        }
    }
    let options = {
        files: '',
        from: [],
        to: []
    };
    const mapping = {
        Singular: {
            fromRegExp: /__SingularName__/g,
            toString: inflections_1.singularName(type),
        },
        Plural: {
            fromRegExp: /__PluralName__/g,
            toString: inflections_1.pluralName(type),
        },
        pluralLower: {
            fromRegExp: /__PluralNameLowercase__/g,
            toString: inflections_1.pluralLowercaseName(type),
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
            toString: inflections_1.relationshipsForSource(source),
        },
        sourceQuery: {
            fromRegExp: /__SOURCE_QUERY_NAME__/g,
            toString: inflections_1.queryForSource(source),
        },
        SingularAllCaps: {
            fromRegExp: /__SingularNameAllCaps__/g,
            toString: inflections_1.allCaps(type),
        },
        SingularForRelationshipAllCaps: {
            fromRegExp: /__SingularForRelationshipAllCaps__/g,
            toString: `${inflections_1.allCaps(type)}_FOR_${inflections_1.allCaps(source)}`,
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
            toString: inflections_1.allCaps(parentType),
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
    };
    Object.keys(mapping).map((index) => {
        options.from.push(mapping[index].fromRegExp);
        options.to.push(mapping[index].toString);
    });
    return options;
};
