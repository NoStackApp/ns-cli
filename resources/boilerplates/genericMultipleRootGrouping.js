import React from 'react';
import { Unit } from '@nostack/no-stack';
import styled from 'styled-components';
import { flattenData } from '../../../flattenData';

import __SingularName__CreationForm from '../__SingularName__CreationForm';
import __SingularName__ from '../__SingularName__';

import { __SOURCE_ID_CONSTANT__ } from '../../../config';
import { __RELATIONSHIPS_NAME__, __SOURCE_QUERY_NAME__ } from '../../source-props/__SingularSourceLowercase__';

// add styling here
const __PluralName__StyleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

function __PluralName__({ __SingularParentName__Id }) {
  const parameters = {
    __CONSTRAINT_VALUE__: __SingularParentName__Id,
  };

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

        return (
          <>
          <__PluralName__StyleWrapper>
            {
              __PluralNameLowercase__ && __PluralNameLowercase__.map(__SingularNameLowercase__ => (
                <__SingularName__
                  key={__SingularNameLowercase__.id}
                  parentId={__SingularParentName__Id}
                  __SingularNameLowercase__={__SingularNameLowercase__}
                  refetchQueries={refetchQueries}
                />
              ))
            }
            <__SingularName__CreationForm  __SingularParentName__Id={__SingularParentName__Id} refetchQueries={refetchQueries}/>
          </__PluralName__StyleWrapper>
          </>
        );
      }}
    </Unit>
  );
}
export default __PluralName__;

