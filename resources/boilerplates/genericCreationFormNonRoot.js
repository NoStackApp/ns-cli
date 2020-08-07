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

  function handleChange(e) {
    update{{SingularName}}Value(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!{{SingularNameLowercase}}Value) {
      return;
    }

    updateLoading(true);

    const create{{SingularName}}Response = await create{{SingularName}}({
      variables: {
        actionId: CREATE_{{SingularForRelationshipAllCaps}}_ACTION_ID,
        executionParameters: JSON.stringify({
          parentInstanceId: parentId,
          value: {{{SingularNameLowercase}}}Value,
        }),
        unrestricted: false,
      },
      refetchQueries,
    });

    {{{SINGLE_CHILDREN_CREATION_CODE}}}

    update{{SingularName}}Value('');
    updateLoading(false);
  }

  function handleKeyPress(e) {
    if (e.charCode === 13) {
      handleSubmit(e);
    }
  }

  // ns__custom_start unit: {{Unit}}, comp: {{SingularName}}CreationForm, loc: beforeReturn
  // ns__custom_end unit: {{Unit}}, comp: {{SingularName}}CreationForm, loc: beforeReturn

  // ns__start_section unit: {{Unit}}, comp: {{SingularName}}CreationForm, loc: return
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
  // ns__end_section unit: {{Unit}}, comp: {{SingularName}}CreationForm, loc: return

}

{{{COMPOSE_CLAUSE}}}

{{SingularName}}CreationForm.propTypes = {
  parentId: PropTypes.string,
  refetchQueries: PropTypes.array,
  create{{SingularName}}: PropTypes.func,
  // ns__custom_start unit: {{Unit}}, comp: {{SingularName}}CreationForm, loc: addedPropTypes
  // ns__custom_end unit: {{Unit}}, comp: {{SingularName}}CreationForm, loc: addedPropTypes
};
