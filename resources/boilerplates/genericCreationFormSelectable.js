import React, { useState } from 'react';
import { graphql } from '@apollo/react-hoc';
import styled from 'styled-components';
import { withNoStack, EXECUTE_ACTION } from '@nostack/no-stack';

// expected: `import UserSelect from '../../AllUsers/UserSelect';`

import { CREATE___SingularForRelationshipAllCaps___ACTION_ID__ACTION_IDS_FOR_SINGLE_CHILDREN____TYPE_IDS_FOR_SINGLE_CHILDREN__ } from '../../../config';

// change styling here
const Form = styled.div`
  margin: 2em;
  padding: 1.5em;
  border: none;
  border-radius: 5px;
  background-color: #F5F5F5;
`;

function __SingularName__CreationForm({ parentId, create__SingularName____SINGLE_CHILDREN_PARAMS__, refetchQueries }) {
  const [ loading, updateLoading ] = useState(false);

  const handleSubmit = async value => {
    if (!value) {
      return;
    }

    updateLoading(true);

    try {
      const create__SingularName__Response = await create__SingularName__({
        variables: {
          actionId: CREATE___SingularForRelationshipAllCaps___ACTION_ID,
          executionParameters: JSON.stringify({
            parentInstanceId: parentId,
            childInstanceId: value,
          }),
          unrestricted: false,
        },
        refetchQueries
      });
    } catch (e) {
      console.log(e);
    }

    updateLoading(false);
  }

  const selectId = `__SingularNameLowercase__-value-${parentId}`;

  return (
    <div>
      <label htmlFor={selectId}>
        __SingularName__:
        <__SingularName__Select
          id={selectId}
          onSubmit={handleSubmit}
          disabled={loading}
        />
      </label>
    </div>
  );
}

export default graphql(EXECUTE_ACTION, { name: 'create__SingularName__' })(__SingularName__CreationForm);
