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

export const proptypes = Handlebars.compile(`

{{#if (eq boilerPlateInfo.formType '${formTypes.CREATION}') }}
{{/if}}
{{#if (eq boilerPlateInfo.formType '${formTypes.LIST}') }}
{{/if}}
{{#if (eq boilerPlateInfo.formType '${formTypes.SINGLE_INSTANCE}') }}

{{SingularName}}.propTypes = {
{{SingularNameLowercase}}: PropTypes.object,
  parentId: PropTypes.string,
  selected: PropTypes.bool,
  updateInstance: PropTypes.func,
  deleteInstance: PropTypes.func,
  refetchQueries: PropTypes.array,
  {{SingularNameLowercase}}: PropTypes.shape({
    children: PropTypes.array,
    id: PropTypes.string,
  }),
  {{SingularNameLowercase}}: PropTypes.shape({
    value: PropTypes.string,
    id: PropTypes.string,
  }),
  // ns__custom_start {{tempDetails}} addedPropTypes
  // ns__custom_end {{tempDetails}} addedPropTypes
};
{{/if}}
`)

