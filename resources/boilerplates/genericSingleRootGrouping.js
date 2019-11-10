import React from 'react';
import { Unit } from '@nostack/no-stack';
import styled from 'styled-components';
import { flattenData } from '../../../flattenData';

import { __SOURCE_ID_CONSTANT____ChildrenTypeList__} from '../../../config';

import { __RELATIONSHIPS_NAME__, __SOURCE_QUERY_NAME__ } from '../../source-props/__SingularSourceLowercase__';

__CHILDREN_IMPORT_LIST__

// add styling here
const __SingularName__StyleWrapper = styled.div`
  margin: 2em 1em;
  padding: 1.5em;
  border: none;
  border-radius: 10px;
  box-shadow: 5px 5px 10px #888888;
`;

function __SingularName__({ __SingularNameLowercase__Id }) {
  const parameters = {
    __CONSTRAINT_VALUE__: __SingularNameLowercase__Id,
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

        const __SingularNameLowercase__ = data.unitData.map(el => flattenData(el));

        const childTypes = __SingularNameLowercase__[0] && __SingularNameLowercase__[0].children;
        if (!childTypes) {
          return null;
        }

        __CHILDREN_CONSTANT_DECLARATIONS__

        return (
          <__SingularName__StyleWrapper>
            __CHILDREN_BODY_LIST__
          </__SingularName__StyleWrapper>
          );
      }}
    </Unit>
  );
}

export default __SingularName__;
