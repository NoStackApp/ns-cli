import React, { useState } from 'react';
import styled from 'styled-components';
import { EXECUTE_ACTION } from '@nostack/no-stack';
import compose from '@shopify/react-compose';
import { graphql } from '@apollo/react-hoc';

import {
  UPDATE___SingularForRelationshipAllCaps___ACTION_ID,
  DELETE___SingularForRelationshipAllCaps___ACTION_ID__ChildrenTypeList__,
} from '../../../config';

import EditInstanceForm from '../../EditInstanceForm';
import DeleteInstanceMenu from '../../DeleteInstanceMenu';

__CHILDREN_IMPORT_LIST__

// add styling here
const __SingularName__StyleWrapper = styled.div(({
  selected,
  isDeleting,
}) => `
  margin: 2em 1em;
  padding: 1.5em;
  border: ${selected ? '1px solid aquamarine': '1px solid white'};
  border-radius: 10px;
  box-shadow: 5px 5px 10px #888888;
  background-color: ${isDeleting && 'tomato'};
  cursor: ${selected ? 'auto' : 'pointer'};

  &:hover {
    border: 1px solid aquamarine;
  }
`);

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

function __SingularName__({
  __SingularNameLowercase__,
  parentId,
  selected,
  updateInstance,
  deleteInstance,
  refetchQueries,
  onSelect,
}) {
  const [__SingularNameLowercase__Value, update__SingularName__Value] = useState(__SingularNameLowercase__.value);
  const [isEditMode, updateIsEditMode] = useState(false);
  const [isSaving, updateIsSaving] = useState(false);
  const [isDeleteMode, updateIsDeleteMode] = useState(false);
  const [isDeleting, updateIsDeleting] = useState(false);

  __CHILDREN_CONSTANT_DECLARATIONS__

  if (!selected) {
    return (
      <__SingularName__StyleWrapper onClick={() => onSelect(__SingularNameLowercase__.id)}>
        {__SingularNameLowercase__Value}
      </__SingularName__StyleWrapper>
    );
  }

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
      },
      refetchQueries,
    });

    updateIsEditMode(false);
    updateIsSaving(false);
  }

  function handleCancelEdit() {
    updateIsEditMode(false);
  }

  if (isEditMode) {
    return (
      <__SingularName__StyleWrapper>
        <EditInstanceForm
          id={__SingularNameLowercase__.id}
          label="__SingularName__ Value:" 
          value={__SingularNameLowercase__Value}
          onChange={handle__SingularName__ValueChange}
          onSave={handle__SingularName__ValueSave}
          onCancel={handleCancelEdit}
          disabled={isSaving}
        />
      </__SingularName__StyleWrapper>
    );
  }

  async function handleDelete() {
    updateIsDeleting(true);

    try {
      await deleteInstance({
        variables: {
          actionId: DELETE___SingularForRelationshipAllCaps___ACTION_ID,
          executionParameters: JSON.stringify({
            parentInstanceId: parentId,
            instanceId: __SingularNameLowercase__.id,
          }),
        },
        refetchQueries
      });
    } catch (e) {
      updateIsDeleting(false);
    }
  }

  function handleCancelDelete() {
    updateIsDeleteMode(false);
  }

  if (isDeleteMode) {
    return (
      <__SingularName__StyleWrapper 
        selected={selected}
        isDeleting={isDeleting}
      >
        {__SingularNameLowercase__Value}
        <DeleteInstanceMenu
          onDelete={handleDelete}
          onCancel={handleCancelDelete}
          disabled={isDeleting}
        />
      </__SingularName__StyleWrapper>
    );
  }

  return (
    <__SingularName__StyleWrapper selected={selected}>
      {__SingularNameLowercase__Value}
      <Button
        type="button"
        onClick={() => updateIsEditMode(true)}
      >
        &#9998;
      </Button>
      <Button
        type="button"
        onClick={() => updateIsDeleteMode(true)}
      >
        &#128465;
      </Button>

      __CHILDREN_BODY_LIST__
    </__SingularName__StyleWrapper>
  );
}

export default compose(
  graphql(EXECUTE_ACTION, { name: 'updateInstance' }),
  graphql(EXECUTE_ACTION, { name: 'deleteInstance' })
)(__SingularName__);
