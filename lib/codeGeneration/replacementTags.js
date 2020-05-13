"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replacementTags = void 0;
const constants_1 = require("../constants");
const inflections_1 = require("../tools/inflections");
const Handlebars = require('handlebars');
const singleChildCreationCodeTemplate = Handlebars.compile(`
{{#children}}
{{#if property}}
    await create{{singularChild}}({
      variables: {
        actionId: CREATE_{{childAllCaps}}_FOR_{{sourceAllCaps}}_ACTION_ID,
        executionParameters: JSON.stringify({
          parentInstanceId: new{{singularParent}}Data.instanceId,
          value: 'false',
        }),
        unrestricted: false,
      },
      refetchQueries,
    });
{{/if}}
{{/children}}
`);
const childrenBodyTemplate = Handlebars.compile(`
{{#children}}
{{#if nonProperty}}
< {{childComponent}}
              {{childPlural}} = { {{childPlural}} }
              {{type}}Id = { {{type}}.id }
              label="{{childSingular}}?"
              refetchQueries={refetchQueries}
      />
{{else}}
< {{childComponent}}
              {{child}} = { {{child}} }
              {{type}}Id = { {{type}}.id }
              label="{{childComponent}}?"
              refetchQueries={refetchQueries}
      />
{{/if}}
{{/children}}
`);
const childrenConstantDeclarationsTemplate = Handlebars.compile(`
{{#children}}
  const {{child}}Data = {{type}}.children && {{type}}.children.find(child => child.typeId === TYPE_{{childAllCaps}}_ID);
{{#if nonProperty}}
  const {{pluralChild}} = {{child}}Data ? {{child}}Data.instances : [];
{{else}}
  const {{child}} = {{child}}Data ? {{child}}Data.instances[0] : [];
{{/if}}
{{/children}}
`);
const childrenTypeListTemplate = Handlebars.compile('{{#children}}, TYPE_{{childAllCaps}}_ID{{/children}}');
const typeIdsForSingleChildrenTemplate = Handlebars.compile('{{#children}}{{#if property}}, TYPE_{{childAllCaps}}_ID{{/if}}{{/children}}');
const singleChildrenParamsTemplate = Handlebars.compile('{{#children}}{{#if property}}, create{{childSingular}}{{/if}}{{/children}}');
const singleChildrenComposeStatementsTemplate = Handlebars.compile(`
  {{#children}}
  {{#if property}}  graphql(EXECUTE_ACTION, { name: 'create{{childSingular}}' }),{{/if}}
  {{/children}}
  `);
const childrenImportsTemplate = Handlebars.compile(`
{{#children}}
import {{childComponent}} from '../{{childComponent}}';
{{/children}}
`);
const actionIdsForSingleChildrenTemplate = Handlebars.compile(`
{{#children}}
, CREATE_{{childAllCaps}}_FOR_{{sourceAllCaps}}_ACTION_ID
{{/children}}
`);
const connectedChildrenBodyTemplate = Handlebars.compile(`
{{#connectedChildren}}
< {{childComponent}} {{type}}Id = { {{type}}.id} />
{{/connectedChildren}}
`);
const connectedChildrenImportsTemplate = Handlebars.compile(`
{{#connectedChildren}}
import {{childComponent}} from '../../{{singularConnected}}/{{childComponent}}';
{{/connectedChildren}}
`);
exports.replacementTags = (type, source, currentStack) => {
    // we set children and connectedChildren, then derive all of the tag values to pass to the boilerplate templates.
    const sourceInfo = currentStack.sources[source];
    const typeSourceInfo = currentStack.types[type].sources[source];
    const { parentType } = typeSourceInfo;
    let children = sourceInfo.selectedTree[type];
    const connectedSource = sourceInfo.connections[type];
    const constraintsInfo = sourceInfo.constraints;
    let connectedChildren = {};
    if (connectedSource) {
        connectedChildren = Object.assign({}, currentStack.sources[connectedSource].tree[type]);
    }
    // updateOnAddLine is 'refetchQueries' unless the current typeName is a property.
    let updateOnAddLine = '\n      refetchQueries';
    children.map(child => {
        const childInfo = currentStack.types[child];
        const assnInfo = childInfo.sources[source];
        if (assnInfo.assnType === constants_1.associationTypes.SINGLE_REQUIRED) {
            updateOnAddLine = '';
        }
    });
    // constraintValue is is set to 'ignoredParameter' except in specific cases.
    let constraintValue = 'ignoredParameter';
    Object.keys(constraintsInfo).map(key => {
        if (constraintsInfo[key].constraintType === 'ID') {
            if (constraintsInfo[key].typeName === parentType || sourceInfo.selectionRoot) {
                constraintValue = constraintsInfo[key].constraintValue;
            }
        }
    });
    const tags = {
        Unit: source,
        SingularName: inflections_1.singularName(type),
        PluralName: inflections_1.pluralName(type),
        PluralNameLowercase: inflections_1.pluralLowercaseName(type),
        SingularNameLowercase: type,
        SingularSourceLowercase: source,
        SOURCE_ID_CONSTANT: sourceInfo.const,
        RELATIONSHIPS_NAME: inflections_1.relationshipsForSource(source),
        SOURCE_QUERY_NAME: inflections_1.queryForSource(source),
        SingularNameAllCaps: inflections_1.allCaps(type),
        SingularForRelationshipAllCaps: `${inflections_1.allCaps(type)}_FOR_${inflections_1.allCaps(source)}`,
        CHILDREN_IMPORT_LIST: childrenImportsTemplate({
            children: children.map(child => {
                const childInfo = currentStack.types[child];
                const assnInfo = childInfo.sources[source];
                if (assnInfo.assnType !== constants_1.associationTypes.SINGLE_REQUIRED)
                    return { childComponent: inflections_1.pluralName(child) };
                return { childComponent: inflections_1.singularName(child) };
            })
        }) + connectedChildrenImportsTemplate({
            connectedChildren: Object.keys(connectedChildren).map((child) => {
                const singularConnected = inflections_1.singularName(connectedSource);
                if (connectedChildren[child] !== constants_1.associationTypes.SINGLE_REQUIRED)
                    return { childComponent: inflections_1.pluralName(child), singularConnected };
                return { childComponent: inflections_1.singularName(child), singularConnected };
            })
        }),
        ChildrenTypeList: childrenTypeListTemplate({
            children: children.map(child => {
                return { childAllCaps: inflections_1.allCaps(child) };
            }),
        }),
        CHILDREN_BODY_LIST: childrenBodyTemplate({
            children: children.map(child => {
                const childInfo = currentStack.types[child];
                const assnInfo = childInfo.sources[source];
                if (assnInfo.assnType !== constants_1.associationTypes.SINGLE_REQUIRED)
                    return {
                        nonProperty: true,
                        childComponent: inflections_1.pluralName(child),
                        childPlural: inflections_1.pluralLowercaseName(child),
                        childSingular: inflections_1.singularName(child),
                        type,
                    };
                return {
                    nonProperty: false,
                    childComponent: inflections_1.singularName(child),
                    child,
                    type,
                };
            }),
        }) + connectedChildrenBodyTemplate({
            connectedChildren: Object.keys(connectedChildren).map((child) => {
                if (connectedChildren[child] !== constants_1.associationTypes.SINGLE_REQUIRED)
                    return { childComponent: inflections_1.pluralName(child), type };
                return { childComponent: inflections_1.singularName(child), type };
            })
        }),
        CHILDREN_CONSTANT_DECLARATIONS: childrenConstantDeclarationsTemplate({
            children: children.map(child => {
                const childInfo = currentStack.types[child];
                const assnInfo = childInfo.sources[source];
                if (assnInfo.assnType !== constants_1.associationTypes.SINGLE_REQUIRED)
                    return {
                        nonProperty: true,
                        childAllCaps: inflections_1.allCaps(child),
                        child,
                        type,
                        pluralChild: inflections_1.pluralLowercaseName(child)
                    };
                return {
                    nonProperty: false,
                    childAllCaps: inflections_1.allCaps(child),
                    child,
                    type
                };
            }),
        }),
        CONSTRAINT_VALUE: constraintValue,
        SingularParentName: parentType,
        SingularParentNameAllCaps: inflections_1.allCaps(parentType),
        ACTION_IDS_FOR_SINGLE_CHILDREN: actionIdsForSingleChildrenTemplate({
            children: children.map(child => {
                const childInfo = currentStack.types[child];
                const assnInfo = childInfo.sources[source];
                if (assnInfo.assnType === constants_1.associationTypes.SINGLE_REQUIRED)
                    return { childAllCaps: inflections_1.allCaps(child), sourceAllCaps: inflections_1.allCaps(source) };
            }).filter(Boolean)
        }),
        TYPE_IDS_FOR_SINGLE_CHILDREN: typeIdsForSingleChildrenTemplate({
            children: children.map(child => {
                const childInfo = currentStack.types[child];
                const assnInfo = childInfo.sources[source];
                if (assnInfo.assnType === constants_1.associationTypes.SINGLE_REQUIRED)
                    return { property: true, childAllCaps: inflections_1.allCaps(child) };
            }),
        }),
        SINGLE_CHILDREN_CREATION_CODE: singleChildCreationCodeTemplate({
            children: children.map(child => {
                const childInfo = currentStack.types[child];
                const assnInfo = childInfo.sources[source];
                if (assnInfo.assnType === constants_1.associationTypes.SINGLE_REQUIRED)
                    return {
                        property: true,
                        singularChild: inflections_1.singularName(child),
                        childAllCaps: inflections_1.allCaps(child),
                        sourceAllCaps: inflections_1.allCaps(source),
                        singularParent: inflections_1.singularName(type),
                    };
            })
        }),
        SINGLE_CHILDREN_COMPOSE_STATEMENTS: singleChildrenComposeStatementsTemplate({
            children: children.map(child => {
                const childInfo = currentStack.types[child];
                const assnInfo = childInfo.sources[source];
                if (assnInfo.assnType === constants_1.associationTypes.SINGLE_REQUIRED)
                    return { property: true, childSingular: inflections_1.singularName(child) };
            }),
        }),
        SINGLE_CHILDREN_PARAMS: singleChildrenParamsTemplate({
            children: children.map(child => {
                const childInfo = currentStack.types[child];
                const assnInfo = childInfo.sources[source];
                if (assnInfo.assnType === constants_1.associationTypes.SINGLE_REQUIRED)
                    return { property: true, childSingular: inflections_1.singularName(child) };
            }),
        }),
        UPDATE_ON_ADD_LINE: updateOnAddLine,
        SelectionSource: typeSourceInfo.sourceUnit ?
            inflections_1.singularName(typeSourceInfo.sourceUnit) :
            null,
    };
    return tags;
};
