import {formTypes, nodeTypes} from '../../constants'

const Handlebars = require('handlebars')
const H = require('just-handlebars-helpers');

H.registerHelpers(Handlebars);

const startCustomStyling = `// ns__custom_start {{tempDetails}} buttonStyling`;

const endCustomStyling = `// ns__custom_end {{tempDetails}} buttonStyling`

export const button = Handlebars.compile(`

// ns__start_section {{tempDetails}} button
{{#if (eq boilerPlateInfo.formType '${formTypes.CREATION}') }}
const Button = styled.button\`
  ${startCustomStyling}
  margin-left: 1em;
  ${endCustomStyling}
\`;
{{/if}}
{{#if (eq boilerPlateInfo.formType '${formTypes.LIST}') }}
{{#if (neq boilerPlateInfo.nodeType '${nodeTypes.ROOT}') }}
const Button = styled.button\`
  ${startCustomStyling}
  display: block;
  margin: 0 auto;
  ${endCustomStyling}
\`;
{{/if}}{{/if}}
{{#if (eq boilerPlateInfo.formType '${formTypes.SINGLE_INSTANCE}') }}
const Button = styled.button\`
  ${startCustomStyling}
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0;
  color: #bbbbbb;
  transition: color 0.5s ease;
  &:hover {
    color: \${(props) => props.hoverColor || '#000000'};
  }
  ${endCustomStyling}
\`;
{{/if}}
// ns__end_section {{tempDetails}} button
`)

