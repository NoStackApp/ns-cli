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

export const imports = Handlebars.compile(`

// ns__start_section imports
{{#if (eq boilerPlateInfo.formType '${formTypes.CREATION}') }}
import React, { useState } from 'react';
import { graphql } from '@apollo/react-hoc';
import styled from 'styled-components';
import { EXECUTE } from '@nostack/no-stack';
import compose from '@shopify/react-compose';

import { CREATE_{{typeSpecifier}}_ACTION_ID{{actionIdsForSingleChildren}}{{typeIdsForSingleChildren}} } from '../../../config';

// ns__custom_start unit: {{Unit}}, comp: {{SingularName}}CreationForm, loc: addedImports
// ns__custom_end unit: {{Unit}}, comp: {{SingularName}}CreationForm, loc: addedImports

{{/if}}
{{#if (eq boilerPlateInfo.formType '${formTypes.LIST}') }}
{{/if}}
{{#if (eq boilerPlateInfo.formType '${formTypes.SINGLE_INSTANCE}') }}
import React, { useState } from 'react';
import styled from 'styled-components';
import { EXECUTE } from '@nostack/no-stack';
import compose from '@shopify/react-compose';
import { graphql } from '@apollo/react-hoc';

import PropTypes from 'prop-types';
import {
  UPDATE_{{typeSpecifier}}_ACTION_ID,
  DELETE_{{typeSpecifier}}_ACTION_ID{{childrenTypeList}},
} from '../../../config';

import EditInstanceForm from '../../EditInstanceForm';
import DeleteInstanceMenu from '../../DeleteInstanceMenu';

{{{childrenImportList}}}
{{/if}}
// ns__custom_start {{tempDetails}} addedImports
// ns__custom_end {{tempDetails}} addedImports
// ns__end_section imports
`)

