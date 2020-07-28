{{START_OF_FILE}}

// ns__custom_start unit: {{Unit}}, comp: {{SingularName}}CreationForm, loc: beforeImports
/*

  This file contains generated code, with some locations for adding modifications.
  This file will occasionally be replaced as needed when a stack changes.  But,
  you are allowed to add code in certain locations.  You may also create additional
  files and include them here.

  IMPORTANT:
    (1) don't ever delete comment lines beginning `// ns__custom`.
    (2) don't modify the code except between matching comment lines `// ns__custom with start`
    and `// ns__custom with end`
    (3) if you need to modify code outside of those areas, please contact
    info@pivotate.com and send the file with a request.  We can always generate
    new `ns__custom` lines to accommodate you.

 */

'use strict';
/*
    This is a location for anything at the top of your code.  By default,
    `use strict` is shown.
 */
// ns__custom_end unit: {{Unit}}, comp: {{SingularName}}CreationForm, loc: beforeImports
import React, { useState } from 'react';
import { graphql } from '@apollo/react-hoc';
import styled from 'styled-components';
import { EXECUTE } from '@nostack/no-stack';
import compose from '@shopify/react-compose';

import { CREATE_{{SingularForRelationshipAllCaps}}_ACTION_ID{{ACTION_IDS_FOR_SINGLE_CHILDREN}}{{TYPE_IDS_FOR_SINGLE_CHILDREN}} } from '../../../config';

// ns__custom_start unit: {{Unit}}, comp: {{SingularName}}CreationForm, loc: addedImports
// ns__custom_end unit: {{Unit}}, comp: {{SingularName}}CreationForm, loc: addedImports

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

export default compose(graphql(EXECUTE, { name: 'create{{SingularName}}' }),{{{SINGLE_CHILDREN_COMPOSE_STATEMENTS}}})(
  {{SingularName}}CreationForm
);

{{SingularName}}CreationForm.propTypes = {
  parentId: PropTypes.string,
  refetchQueries: PropTypes.array,
  create{{SingularName}}: PropTypes.func,
  // ns__custom_start unit: {{Unit}}, comp: {{SingularName}}CreationForm, loc: addedPropTypes
  // ns__custom_end unit: {{Unit}}, comp: {{SingularName}}CreationForm, loc: addedPropTypes
};
