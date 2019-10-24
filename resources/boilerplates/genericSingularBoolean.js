import React from 'react';
import styled from 'styled-components';
import { graphql } from '@apollo/react-hoc';
import { EXECUTE_ACTION } from '@nostack/no-stack';

import {UPDATE___SingularForRelationshipAllCaps___ACTION_ID} from '../../../config';

// add styling here
const __SingularName__StyleWrapper = styled.span`
  margin-left: 1.5em;
  display: inline-block;
  border: 1px solid #eeeeee;
  padding: 0.5em;
`;

function __SingularName__({ __SingularNameLowercase__, label, updateInstance, disabled = false }) {
  async function handleUpdateCompletion() {
    const value = __SingularNameLowercase__.value === 'true' ? 'false' : 'true';

    await updateInstance({
      variables: {
        actionId: UPDATE___SingularForRelationshipAllCaps___ACTION_ID,
        executionParameters: JSON.stringify({
          value,
          instanceId: __SingularNameLowercase__.id,
        }),
        unrestricted: false,
      },
      optimisticResponse: {
        ExecuteAction: JSON.stringify({
          id: __SingularNameLowercase__.id,
          value,
        }),
      },
    });
  }

  return (
    <__SingularName__StyleWrapper>
      <label htmlFor={__SingularNameLowercase__.id}>
        {label}
        <input
          id={__SingularNameLowercase__.id}
          type="checkbox"
          checked={__SingularNameLowercase__.value === 'true'}
          onChange={handleUpdateCompletion}
          disabled={disabled}
        />
      </label>
    </__SingularName__StyleWrapper>
  );
}

export default graphql(EXECUTE_ACTION, { name: 'updateInstance' })(__SingularName__);
