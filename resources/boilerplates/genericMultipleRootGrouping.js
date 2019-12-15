import React from 'react';
import { Unit } from '@nostack/no-stack';
import styled from 'styled-components';
import { flattenData } from '../../../flattenData';

import {SingularName}CreationForm from '../{{SingularName}}CreationForm';
import {{SingularName}} from '../{{SingularName}}';

import { {{SOURCE_ID_CONSTANT}} } from '../../../config';
import { {{RELATIONSHIPS_NAME}}, {{SOURCE_QUERY_NAME}} } from '../../source-props/{{SingularSourceLowercase}}';

// add styling here
const {{PluralName}}StyleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

function {{PluralName}}({ {{SingularParentName}}Id }) {
  const parameters = {
    {{CONSTRAINT_VALUE}}: {{SingularParentName}}Id,
  };

  return (
    <Unit
      id={ {{SOURCE_ID_CONSTANT}} }
      typeRelationships={ {{RELATIONSHIPS_NAME}} }
      query={ {{SOURCE_QUERY_NAME}} }
      parameters={parameters}
    >
      {({loading, error, data, refetchQueries}) => {
        if (loading) return 'Loading...';

        if (error) {
          console.error(error);
          return `Error: ${error.graphQLErrors}`
        };

        const {{PluralNameLowercase}} = data.unitData.map(el => flattenData(el));

        return (
          <>
          <{{PluralName}}StyleWrapper>
            {
              {{PluralNameLowercase}} && {{PluralNameLowercase}}.map({{SingularNameLowercase}} => (
                <{{SingularName}}
                  key={ {{SingularNameLowercase}}.id }
                  parentId={ {{SingularParentName}}Id }
                  {{SingularNameLowercase}}={ {{SingularNameLowercase}} }
                  refetchQueries={refetchQueries}
                />
              ))
            }
            <{{SingularName}}CreationForm  {{SingularParentName}}Id={ {{SingularParentName}}Id } refetchQueries={refetchQueries}/>
          </{{PluralName}}StyleWrapper>
          </>
        );
      }}
    </Unit>
  );
}
export default {{PluralName}};

