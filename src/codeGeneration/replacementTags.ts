import {associationTypes} from '../constants'
import {StackInfo, TreeTypeChildrenList} from '../constants/types'
import {
  allCaps,
  pluralLowercaseName,
  pluralName,
  queryForSource,
  relationshipsForSource,
  singularName
} from '../tools/inflections'

const Handlebars = require('handlebars')

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
`)

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
`)

const childrenConstantDeclarationsTemplate = Handlebars.compile(`
{{#children}}
  const {{child}}Data = {{type}}.children && {{type}}.children.find(child => child.typeId === TYPE_{{childAllCaps}}_ID);
{{#if nonProperty}}
  const {{pluralChild}} = {{child}}Data ? {{child}}Data.instances : [];
{{else}}
  const {{child}} = {{child}}Data ? {{child}}Data.instances[0] : [];
{{/if}}
{{/children}}
`)

const childrenTypeListTemplate = Handlebars.compile(
  '{{#children}}, TYPE_{{childAllCaps}}_ID{{/children}}')
const typeIdsForSingleChildrenTemplate = Handlebars.compile(
  '{{#children}}{{#if property}}, TYPE_{{childAllCaps}}_ID{{/if}}{{/children}}')
const singleChildrenParamsTemplate = Handlebars.compile(
  '{{#children}}{{#if property}}, create{{childSingular}}{{/if}}{{/children}}')
const singleChildrenComposeStatementsTemplate = Handlebars.compile(
  `
  {{#children}}
  {{#if property}}  graphql(EXECUTE_ACTION, { name: 'create{{childSingular}}' }),{{/if}}
  {{/children}}
  `)

const childrenImportsTemplate = Handlebars.compile(`
{{#children}}
import {{childComponent}} from '../{{childComponent}}';
{{/children}}
`)

const actionIdsForSingleChildrenTemplate = Handlebars.compile(`
{{#children}}
, CREATE_{{childAllCaps}}_FOR_{{sourceAllCaps}}_ACTION_ID
{{/children}}
`)

const connectedChildrenBodyTemplate = Handlebars.compile(`
{{#connectedChildren}}
< {{childComponent}} {{type}}Id = { {{type}}.id} />
{{/connectedChildren}}
`)

const connectedChildrenImportsTemplate = Handlebars.compile(`
{{#connectedChildren}}
import {{childComponent}} from '../../{{singularConnected}}/{{childComponent}}';
{{/connectedChildren}}
`)

export const replacementTags = (type: string, source: string, currentStack: StackInfo) => {
  // we set children and connectedChildren, then derive all of the tag values to pass to the boilerplate templates.
  const sourceInfo = currentStack.sources[source]
  const typeSourceInfo = currentStack.types[type].sources[source]
  const {parentType} = typeSourceInfo

  let children = sourceInfo.selectedTree[type]
  const connectedSource: string = sourceInfo.connections[type]
  const constraintsInfo = sourceInfo.constraints

  let connectedChildren: TreeTypeChildrenList = {}
  if (connectedSource) {
    connectedChildren = {
      ...currentStack.sources[connectedSource].tree[type]
    }
  }

  // updateOnAddLine is 'refetchQueries' unless the current typeName is a property.
  let updateOnAddLine = '\n      refetchQueries'
  children.map(
    child => {
      const childInfo = currentStack.types[child]
      const assnInfo = childInfo.sources[source]
      if (assnInfo.assnType === associationTypes.SINGLE_REQUIRED) {
        updateOnAddLine = ''
      }
    }
  )

  // constraintValue is is set to 'ignoredParameter' except in specific cases.
  let constraintValue = 'ignoredParameter'
  Object.keys(constraintsInfo).map(key => {
    if (constraintsInfo[key].constraintType === 'ID') {
      if (constraintsInfo[key].typeName === parentType || sourceInfo.selectionRoot) {
        constraintValue = constraintsInfo[key].constraintValue
      }
    }
  })

  const tags = {
    Unit: source,
    SingularName: singularName(type),
    PluralName: pluralName(type),
    PluralNameLowercase: pluralLowercaseName(type),
    SingularNameLowercase: type,
    SingularSourceLowercase: source,
    SOURCE_ID_CONSTANT: sourceInfo.const,
    RELATIONSHIPS_NAME: relationshipsForSource(source),
    SOURCE_QUERY_NAME: queryForSource(source),
    SingularNameAllCaps: allCaps(type),
    SingularForRelationshipAllCaps: `${allCaps(type)}_FOR_${allCaps(source)}`,
    CHILDREN_IMPORT_LIST: childrenImportsTemplate({
      children: children.map(child => {
        const childInfo = currentStack.types[child]
        const assnInfo = childInfo.sources[source]
        if (assnInfo.assnType !== associationTypes.SINGLE_REQUIRED)
          return {childComponent: pluralName(child)}
        return {childComponent: singularName(child)}
      })
    }) + connectedChildrenImportsTemplate(
      {
        connectedChildren: Object.keys(connectedChildren).map((child: string) => {
          const singularConnected = singularName(connectedSource)
          if (connectedChildren[child] !== associationTypes.SINGLE_REQUIRED)
            return {childComponent: pluralName(child), singularConnected}
          return {childComponent: singularName(child), singularConnected}
        })
      }
    )
    ,
    ChildrenTypeList: childrenTypeListTemplate({
      children: children.map(child => {
        return {childAllCaps: allCaps(child)}
      }),
    }),
    CHILDREN_BODY_LIST: childrenBodyTemplate({
      children: children.map(child => {
        const childInfo = currentStack.types[child]
        const assnInfo = childInfo.sources[source]
        if (assnInfo.assnType !== associationTypes.SINGLE_REQUIRED)
          return {
            nonProperty: true,
            childComponent: pluralName(child),
            childPlural: pluralLowercaseName(child),
            childSingular: singularName(child),
            type,
          }
        return {
          nonProperty: false,
          childComponent: singularName(child),
          child,
          type,
        }

      }),
    }) + connectedChildrenBodyTemplate(
      {
        connectedChildren: Object.keys(connectedChildren).map((child: string) => {
          if (connectedChildren[child] !== associationTypes.SINGLE_REQUIRED)
            return {childComponent: pluralName(child), type}
          return {childComponent: singularName(child), type}
        })
      }
    ),
    CHILDREN_CONSTANT_DECLARATIONS: childrenConstantDeclarationsTemplate({
      children: children.map(child => {
        const childInfo = currentStack.types[child]
        const assnInfo = childInfo.sources[source]
        if (assnInfo.assnType !== associationTypes.SINGLE_REQUIRED)
          return {
            nonProperty: true,
            childAllCaps: allCaps(child),
            child,
            type,
            pluralChild: pluralLowercaseName(child)
          }
        return {
          nonProperty: false,
          childAllCaps: allCaps(child),
          child,
          type
        }

      }),
    }),
    CONSTRAINT_VALUE: constraintValue,
    SingularParentName: parentType,
    SingularParentNameAllCaps: allCaps(parentType),
    ACTION_IDS_FOR_SINGLE_CHILDREN: actionIdsForSingleChildrenTemplate({
      children: children.map(child => {
        const childInfo = currentStack.types[child]
        const assnInfo = childInfo.sources[source]
        if (assnInfo.assnType === associationTypes.SINGLE_REQUIRED)
          return {childAllCaps: allCaps(child), sourceAllCaps: allCaps(source)}
      }).filter(Boolean)
    }),
    TYPE_IDS_FOR_SINGLE_CHILDREN: typeIdsForSingleChildrenTemplate({
      children: children.map(child => {
        const childInfo = currentStack.types[child]
        const assnInfo = childInfo.sources[source]
        if (assnInfo.assnType === associationTypes.SINGLE_REQUIRED)
          return {property: true, childAllCaps: allCaps(child)}
      }),
    }),
    SINGLE_CHILDREN_CREATION_CODE: singleChildCreationCodeTemplate({
      children: children.map(child => {
        const childInfo = currentStack.types[child]
        const assnInfo = childInfo.sources[source]
        if (assnInfo.assnType === associationTypes.SINGLE_REQUIRED)
          return {
            property: true,
            singularChild: singularName(child),
            childAllCaps: allCaps(child),
            sourceAllCaps: allCaps(source),
            singularParent: singularName(type),
          }
      })
    }),
    SINGLE_CHILDREN_COMPOSE_STATEMENTS: singleChildrenComposeStatementsTemplate({
      children: children.map(child => {
        const childInfo = currentStack.types[child]
        const assnInfo = childInfo.sources[source]
        if (assnInfo.assnType === associationTypes.SINGLE_REQUIRED)
          return {property: true, childSingular: singularName(child)}
      }),
    }),
    SINGLE_CHILDREN_PARAMS: singleChildrenParamsTemplate({
      children: children.map(child => {
        const childInfo = currentStack.types[child]
        const assnInfo = childInfo.sources[source]
        if (assnInfo.assnType === associationTypes.SINGLE_REQUIRED)
          return {property: true, childSingular: singularName(child)}
      }),
    }),
    UPDATE_ON_ADD_LINE: updateOnAddLine,
    SelectionSource: typeSourceInfo.sourceUnit ?
      singularName(typeSourceInfo.sourceUnit) :
      null,
  }

  return tags
}
