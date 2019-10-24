import React, { useState } from 'react';
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
  const [ __SingularNameLowercase__Value, update__SingularName__Value ] = useState(__SingularNameLowercase__.value);

  async function handle__SingularName__ValueChange() {
    const value = __SingularNameLowercase__Value === 'true' ? 'false' : 'true';

    update__SingularName__Value(value);

    await updateInstance({
      variables: {
        actionId: UPDATE___SingularForRelationshipAllCaps___ACTION_ID,
        executionParameters: JSON.stringify({
          value,
          instanceId: __SingularNameLowercase__.id,
        }),
        unrestricted: false,
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
          checked={__SingularNameLowercase__Value === 'true'}
          onChange={handle__SingularName__ValueChange}
          disabled={disabled}
        />
      </label>
    </__SingularName__StyleWrapper>
  );
}

export default graphql(EXECUTE_ACTION, { name: 'updateInstance' })(__SingularName__);
