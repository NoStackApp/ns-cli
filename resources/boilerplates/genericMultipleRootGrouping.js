/*

  This file contains generated code, with some locations for adding modifications.
  This file will occasionally be replaced as needed when a stack changes.  But,
  you are allowed to add code in certain locations.  You may also create additional
  files and include them here.

  IMPORTANT:
    (1) don't ever delete comment lines beginning `// ns__custom`.
    (2) don't modify the code except between matching comment lines `// ns__custom_start`
    and `// ns__custom_end`
    (3) if you need to modify code outside of those areas, please contact
    info@pivotate.com and send the file with a request.  We can always generate
    new `ns__custom` lines to accommodate you.

 */

// ns__custom_start unit: {{Unit}}, comp: {{PluralName}}, loc: beforeImports
'use strict';
/*
    This is a location for anything at the top of your code.  By default,
    `use strict` is shown.
 */
// ns__custom_end unit: {{Unit}}, comp: {{PluralName}}, loc: beforeImports

import React from 'react';
import { Unit } from '@nostack/no-stack';
import styled from 'styled-components';
import { flattenData } from '../../../flattenData';

import {SingularName}CreationForm from '../{{SingularName}}CreationForm';
import {{SingularName}} from '../{{SingularName}}';

import { {{SOURCE_ID_CONSTANT}} } from '../../../config';
import {
import {getDescriptionChild} from "../../../../temp/pivotateraw/src/custom/getDescriptionChild";
import FirstTimeAppCreationForm from "../../../../temp/pivotateraw/src/components/AppSpec/FirstTimeAppCreationForm"; {{RELATIONSHIPS_NAME}}, {{SOURCE_QUERY_NAME}} } from '../../source-props/{{SingularSourceLowercase}}';

// ns__custom_start unit: {{Unit}}, comp: {{PluralName}}, loc: addedImports
// ns__custom_end unit: {{Unit}}, comp: {{PluralName}}, loc: addedImports

// ns__custom_start unit: {{Unit}}, comp: {{PluralName}}, loc: styling
// add styling here
const {{PluralName}}StyleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;
// ns__custom_end unit: {{Unit}}, comp: {{PluralName}}, loc: styling


function {{PluralName}}({ {{SingularParentName}}Id }) {
// ns__custom_start {{Unit}}, comp: {{PluralName}}, loc: beginning
// ns__custom_end {{Unit}}, comp: {{PluralName}}, loc: beginning
  const parameters = {
    {{CONSTRAINT_VALUE}}: {{SingularParentName}}Id,
  };

  // ns__custom_start {{Unit}}, comp: {{PluralName}}, loc: beforeReturn
  // ns__custom_end {{Unit}}, comp: {{PluralName}}, loc: beforeReturn
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
          {/*// ns__custom_start unit: {{Unit}}, comp: {{PluralName}}, loc: creationForm*/}
          {/*// ns__custom_end unit: {{Unit}}, comp: {{PluralName}}, loc: creationForm*/}

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
    {/* ns__custom_start unit: {{Unit}}, comp: {{PluralName}}, loc: renderEnding */}
    {/* ns__custom_end unit: {{Unit}}, comp: {{PluralName}}, loc: renderEnding */}

  </>
        );
      }}
    </Unit>
  );
}
export default {{PluralName}};

