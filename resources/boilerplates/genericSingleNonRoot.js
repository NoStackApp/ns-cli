import React, { useState } from 'react';
import styled from 'styled-components';
import { EXECUTE } from '@nostack/no-stack';
import compose from '@shopify/react-compose';
import { graphql } from '@apollo/react-hoc';

import PropTypes from 'prop-types';
import {
  UPDATE_{{SingularForRelationshipAllCaps}}_ACTION_ID,
  DELETE_{{SingularForRelationshipAllCaps}}_ACTION_ID{{ChildrenTypeList}},
} from '../../../config';

import EditInstanceForm from '../../EditInstanceForm';
import DeleteInstanceMenu from '../../DeleteInstanceMenu';

{{{CHILDREN_IMPORT_LIST}}}

// ns__custom_start unit: {{Unit}}, comp: {{SingularName}}, loc: addedImports
// ns__custom_end unit: {{Unit}}, comp: {{SingularName}}, loc: addedImports


// ns__custom_start unit: {{Unit}}, comp: {{SingularName}}, loc: styling
// add styling here
const {{SingularName}}StyleWrapper = styled.div(({
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
// ns__custom_end unit: {{Unit}}, comp: {{SingularName}}, loc: styling

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0;
  color: #bbbbbb;
  transition: color 0.5s ease;
  &:hover {
    color: ${(props) => props.hoverColor || '#000000'};
  }
`;

function {{SingularName}}({
  {{SingularNameLowercase}},
  parentId,
  selected,
  updateInstance,
  deleteInstance,
  refetchQueries,
  onSelect,
  // ns__custom_start unit: {{Unit}}, comp: {{SingularName}}, loc: addedProps
  // ns__custom_end unit: {{Unit}}, comp: {{SingularName}}, loc: addedProps
}) {
  const [{{SingularNameLowercase}}Value, update{{SingularName}}Value] = useState({{SingularNameLowercase}}.value);
  const [isEditMode, updateIsEditMode] = useState(false);
  const [isSaving, updateIsSaving] = useState(false);
  const [isDeleteMode, updateIsDeleteMode] = useState(false);
  const [isDeleting, updateIsDeleting] = useState(false);
  // ns__custom_start unit: {{Unit}}, comp: {{SingularName}}, loc: beginning
  // ns__custom_end unit: {{Unit}}, comp: {{SingularName}}, loc: beginning

  {{{CHILDREN_CONSTANT_DECLARATIONS}}}

  // ns__custom_start unit: {{Unit}}, comp: {{SingularName}}, loc: beforeReturn
  // ns__custom_end unit: {{Unit}}, comp: {{SingularName}}, loc: beforeReturn

  if (!selected) {
    return (
      <{{SingularName}}StyleWrapper onClick={() => onSelect({{SingularNameLowercase}}.id)}>
        { {{SingularNameLowercase}}Value }
      </{{SingularName}}StyleWrapper>
    );
  }

  function handle{{SingularName}}ValueChange(e) {
    update{{SingularName}}Value(e.target.value);
  }

  async function handle{{SingularName}}ValueSave() {
    updateIsSaving(true);

    await updateInstance({
      variables: {
        actionId: UPDATE_{{SingularForRelationshipAllCaps}}_ACTION_ID,
        executionParameters: JSON.stringify({
          value: {{{SingularNameLowercase}}}Value,
          instanceId: {{SingularNameLowercase}}.id,
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
      <{{SingularName}}StyleWrapper>
        <EditInstanceForm
          id={ {{SingularNameLowercase}}.id }
          label='{{SingularName}} Value:'
          value={ {{SingularNameLowercase}}Value }
          onChange={handle{{SingularName}}ValueChange}
          onSave={handle{{SingularName}}ValueSave}
          onCancel={handleCancelEdit}
          disabled={isSaving}
        />
      </{{SingularName}}StyleWrapper>
    );
  }

  async function handleDelete() {
    updateIsDeleting(true);

    try {
      await deleteInstance({
        variables: {
          actionId: DELETE_{{SingularForRelationshipAllCaps}}_ACTION_ID,
          executionParameters: JSON.stringify({
            parentInstanceId: parentId,
            instanceId: {{SingularNameLowercase}}.id,
          }),
        },
        refetchQueries,
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
      <{{SingularName}}StyleWrapper selected={selected} isDeleting={isDeleting}>
        { {{SingularNameLowercase}}Value }
        <DeleteInstanceMenu
          onDelete={handleDelete}
          onCancel={handleCancelDelete}
          disabled={isDeleting}
        />
      </{{SingularName}}StyleWrapper>
    );
  }

  return (
    <{{SingularName}}StyleWrapper selected={selected}>
      { {{SingularNameLowercase}}Value }
      <Button type='button'   onClick={() => updateIsEditMode(true)}>
        &#9998;
      </Button>
      <Button type='button'   onClick={() => updateIsDeleteMode(true)}>
        &#128465;
      </Button>

      {{{CHILDREN_BODY_LIST}}}

      {/* ns__custom_start unit: {{Unit}}, comp: {{SingularName}}, loc: renderEnding */}
      {/* ns__custom_end unit: {{Unit}}, comp: {{SingularName}}, loc: renderEnding */}

</{{SingularName}}StyleWrapper>
  );
}

export default compose(
  graphql(EXECUTE, { name: 'updateInstance' }),
  graphql(EXECUTE, { name: 'deleteInstance' })
)({{SingularName}});

{{SingularName}}.propTypes = {
{{SingularNameLowercase}}: PropTypes.object,
  parentId: PropTypes.string,
  selected: PropTypes.bool,
  updateInstance: PropTypes.func,
  deleteInstance: PropTypes.func,
  refetchQueries: PropTypes.array,
  onSelect: PropTypes.func,
  {{SingularNameLowercase}}: PropTypes.shape({
    children: PropTypes.array,
    id: PropTypes.string,
  }),
  {{SingularNameLowercase}}: PropTypes.shape({
    value: PropTypes.string,
    id: PropTypes.string,
  }),
  // ns__custom_start unit: {{Unit}}, comp: {{SingularName}}, loc: addedPropTypes
  // ns__custom_end unit: {{Unit}}, comp: {{SingularName}}, loc: addedPropTypes
};

