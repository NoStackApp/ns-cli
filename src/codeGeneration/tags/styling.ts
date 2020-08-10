import {formTypes, dataTypes} from '../../constants'

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
// ns__custom_start {{tempDetails}} styling
// change styling here
{{#if (eq boilerPlateInfo.formType '${formTypes.CREATION}') }}
const Form = styled.div\`
  margin: 2em;
  padding: 1.5em;
  border: none;
  border-radius: 5px;
  background-color: #F5F5F5;
\`;
{{/if}}
{{#if (eq boilerPlateInfo.formType '${formTypes.LIST}') }}
const {{PluralName}}StyleWrapper = styled.div\`
\`;
{{/if}}
{{#if (and (eq boilerPlateInfo.formType '${formTypes.SINGLE_INSTANCE}') (eq boilerPlateInfo.dataType '${dataTypes.STRING}')) }}
const {{SingularName}}StyleWrapper = styled.div(({
  selected,
  isDeleting,
}) => \`
  margin: 2em 1em;
  padding: 1.5em;
  border: \${selected ? '1px solid aquamarine' : '1px solid white'};
  border-radius: 10px;
  box-shadow: 5px 5px 10px #888888;
  background-color: \${isDeleting && 'tomato'};
  cursor: \${selected ? 'auto' : 'pointer'};

  &:hover {
    border: 1px solid aquamarine;
  }
\`);
{{/if}}
{{#if (and (eq boilerPlateInfo.formType '${formTypes.SINGLE_INSTANCE}') (eq boilerPlateInfo.dataType '${dataTypes.BOOLEAN}')) }}
const {{SingularName}}StyleWrapper = styled.span\`
  margin-left: 1.5em;
  display: inline-block;
  border: 1px solid #eeeeee;
  padding: 0.5em;
\`;
{{/if}}
// ns__custom_end {{tempDetails}} styling
`)

