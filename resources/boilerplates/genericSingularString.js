import React, {useState} from 'react';
import styled from 'styled-components';
import {EXECUTE_ACTION} from '@nostack/no-stack';
import {graphql} from '@apollo/react-hoc';

import {UPDATE___SingularForRelationshipAllCaps___ACTION_ID} from '../../../config';
import {__SingularNameAllCaps___FRAGMENT} from '../../source-props/fragments';

__CHILDREN_IMPORT_LIST__

// add styling here
const __SingularName__StyleWrapper = styled.div`
  margin: 2em 1em;
  padding: 1.5em;
  border: none;
  border-radius: 10px;
  box-shadow: 5px 5px 10px #888888;
`;

const Row = styled.div`
  margin: 1em 0;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0;
  color: #bbbbbb;
  transition: color 0.5s ease;
  &:hover {
    color: ${props => props.hoverColor || '#000000'};
  }
`;

function __SingularName__({__SingularNameLowercase__, updateInstance, onUpdate}) {
  __CHILDREN_CONSTANT_DECLARATIONS__
  const [__SingularNameLowercase__Value, update__SingularName__Value] = useState(__SingularNameLowercase__.value);
  const [isEditMode, updateIsEditMode] = useState(false);
  const [isSaving, updateIsSaving] = useState(false);

  function handle__SingularName__ValueChange(e) {
    update__SingularName__Value(e.target.value);
  }

  async function handle__SingularName__ValueSave() {
    updateIsSaving(true);

    await updateInstance({
      variables: {
        actionId: UPDATE___SingularForRelationshipAllCaps___ACTION_ID,
        executionParameters: JSON.stringify({
          value: __SingularNameLowercase__Value,
          instanceId: __SingularNameLowercase__.id,
        }),
        update: onUpdate(__SingularNameLowercase__.id, __SingularNameAllCaps___FRAGMENT),
      },
    });

    updateIsEditMode(false);
    updateIsSaving(false);
  }

  return (
    <__SingularName__StyleWrapper>
      {isEditMode ?
        (
          <>
            <label htmlFor={__SingularNameLowercase__.id}>
              __SingularName__ Value:
              <input
                id={__SingularNameLowercase__.id}
                type="text"
                value={__SingularNameLowercase__Value}
                onChange={handle__SingularName__ValueChange}
                disabled={isSaving}
              />
            </label>
            <Button
              type="button"
              hoverColor="#00FF00"
              onClick={handle__SingularName__ValueSave}
              disabled={isSaving}
            >
              &#10003;
            </Button>
            <Button
              type="button"
              hoverColor="#FF0000"
              onClick={() => updateIsEditMode(false)}
              disabled={isSaving}
            >
              &#10005;
            </Button>
          </>
        ) :
        (
          <>
            {__SingularNameLowercase__Value}
            <Button
              type="button"
              onClick={() => updateIsEditMode(true)}
            >
              &#9998;
            </Button>
            __CHILDREN_BODY_LIST__
          </>
        )
      }
    </__SingularName__StyleWrapper>
  );
}

export default graphql(EXECUTE_ACTION, {name: 'updateInstance'})(__SingularName__);
