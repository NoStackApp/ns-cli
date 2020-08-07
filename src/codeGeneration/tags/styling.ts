import {formTypes} from '../../constants'

const Handlebars = require('handlebars')
const H = require('just-handlebars-helpers');

H.registerHelpers(Handlebars);

// const helpers = require('handlebars-helpers');

/*
export default compose(graphql(EXECUTE, { name: 'create{{SingularName}}' }),{{{SINGLE_CHILDREN_COMPOSE_STATEMENTS}}})(
  {{SingularName}}CreationForm
);
)({{SingularName}});
 */

export const compose = Handlebars.compile(`
{{#if (eq formType '${formTypes.CREATION}') }}
export default compose(graphql(EXECUTE, { name: 'create{{SingularName}}' }){{{SINGLE_CHILDREN_COMPOSE_STATEMENTS}}})({{SingularName}}CreationForm);
{{/if}}
{{#if (eq formType '${formTypes.SINGLE_INSTANCE}') }}
export default compose(
  graphql(EXECUTE, { name: 'updateInstance' }),
  graphql(EXECUTE, { name: 'deleteInstance' })
)({{SingularName}})
{{/if}}`)

/*
// ns__custom_start unit: {{Unit}}, comp: {{SingularName}}CreationForm, loc: styling
// change styling here
const Form = styled.div`
  margin: 2em;
  padding: 1.5em;
  border: none;
  border-radius: 5px;
  background-color: #F5F5F5;
`;
// ns__custom_end unit: {{Unit}}, comp: {{SingularName}}CreationForm, loc: styling

 */

export const styling = Handlebars.compile(`
// ns__custom_start styling
// change styling here
{{#if (eq formType '${formTypes.CREATION}') }}
const Form = styled.div\`
  margin: 2em;
  padding: 1.5em;
  border: none;
  border-radius: 5px;
  background-color: #F5F5F5;
\`;
{{/if}}
{{#if (eq formType '${formTypes.LIST}') }}
const {{PluralName}}StyleWrapper = styled.div\`
\`;
{{/if}}
// ns__custom_end styling
`)

