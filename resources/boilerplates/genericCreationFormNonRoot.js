{{{START_OF_FILE}}}
import React, { useState } from 'react';
import { graphql } from '@apollo/react-hoc';
import styled from 'styled-components';
import { EXECUTE } from '@nostack/no-stack';
import compose from '@shopify/react-compose';

import { CREATE_{{SingularForRelationshipAllCaps}}_ACTION_ID{{ACTION_IDS_FOR_SINGLE_CHILDREN}}{{TYPE_IDS_FOR_SINGLE_CHILDREN}} } from '../../../config';

// ns__custom_start unit: {{Unit}}, comp: {{SingularName}}CreationForm, loc: addedImports
// ns__custom_end unit: {{Unit}}, comp: {{SingularName}}CreationForm, loc: addedImports

{{{STYLING_SECTION}}}

const Button = styled.button`
  margin-left: 1em;
`;

function {{SingularName}}CreationForm({
  parentId,
  create{{SingularName}}{{SINGLE_CHILDREN_PARAMS}},
  refetchQueries,
  // ns__custom_start unit: {{Unit}}, comp: {{SingularName}}CreationForm, loc: addedProps
  // ns__custom_end unit: {{Unit}}, comp: {{SingularName}}CreationForm, loc: addedProps
}) {
  const [ {{SingularNameLowercase}}Value, update{{SingularName}}Value ] = useState('');
  const [ loading, updateLoading ] = useState(false);
// ns__custom_start unit: {{Unit}}, comp: {{SingularName}}CreationForm, loc: beginning
  /* any special declarations etc. */
// ns__custom_end unit: {{Unit}}, comp: {{SingularName}}CreationForm, loc: beginning

  {{{HANDLERS_SECTION}}}

  // ns__custom_start unit: {{Unit}}, comp: {{SingularName}}CreationForm, loc: beforeReturn
  // ns__custom_end unit: {{Unit}}, comp: {{SingularName}}CreationForm, loc: beforeReturn

  // ns__start_section return
  return (
    <Form>
      <label htmlFor='{{SingularNameLowercase}}-value'>
        {{SingularName}}:
        <input
          id='{{SingularNameLowercase}}-value'
          type='text'
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={ {{SingularNameLowercase}}Value }
          disabled={loading}
        />
      </label>
      <Button type='submit'  disabled={loading}  onClick={handleSubmit}>
        {loading ? 'Creating {{SingularName}}...' : 'Create {{SingularName}}'}
      </Button>
    </Form>
  );
  // ns__end_section return

}

{{{COMPOSE_CLAUSE}}}
{{{PROP_TYPES_SECTION}}}
