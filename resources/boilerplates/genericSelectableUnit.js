import React, { useState } from 'react';
import { Unit } from '@nostack/no-stack';
import styled from 'styled-components';
import Select from 'react-select';

import { flattenData } from '../../../flattenData';

import { __SOURCE_ID_CONSTANT__ } from '../../../config';
import { __RELATIONSHIPS_NAME__, __SOURCE_QUERY_NAME__ } from '../../source-props/__SingularSourceLowercase__';

// add styling here
const __SingularName__SelectStyleWrapper = styled.div``;

const Button = styled.button`
  margin-left: 1em;
`;

function __SingularName__Select({ id, onSubmit, disabled }) {
  const [selected, updateSelected] = useState();

  const handleChange = option => updateSelected(option);

  const handleSubmit = async () => {
    if (!selected || !selected.value || !selected.label ) {
      return;
    }

    await onSubmit(selected.value);

    updateSelected(null);
  }

  const parameters = {};

  return (
    <Unit
      id={__SOURCE_ID_CONSTANT__}
      typeRelationships={__RELATIONSHIPS_NAME__}
      query={__SOURCE_QUERY_NAME__}
      parameters={parameters}
    >
      {({loading, error, data, refetchQueries}) => {
        if (loading) return 'Loading...';

        if (error) {
          console.error(error);
          return `Error: ${error.graphQLErrors}`
        };

        const __PluralNameLowercase__ = data.unitData.map(el => flattenData(el));

        const options = __PluralNameLowercase__.map(__SingularNameLowercase__ => ({
          value: __SingularNameLowercase__.id,
          label: __SingularNameLowercase__.value,
        }));

        return (
          <__SingularName__StyleWrapper>
            <Select
              inputId={id}
              isClearable={true}
              value={selected}
              onChange={handleChange}
              options={options}
              isDisabled={disabled}
            />
            <Button 
              onClick={handleSubmit}
              disabled={disabled
                || !selected 
                || !selected.value}
            >
              Add User
            </Button>
          </__SingularName__StyleWrapper>
        );
      }}
    </Unit>
  );
}

export default __SingularName__Select;
