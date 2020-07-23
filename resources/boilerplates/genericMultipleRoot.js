// ns__custom_start unit: {{Unit}}, comp: {{PluralName}}, loc: beforeImports
/*

  This file contains generated code, with some locations for adding modifications.
  This file will occasionally be replaced as needed when a stack changes.  But,
  you are allowed to add code in certain locations.  You may also create additional
  files and include them here.

  IMPORTANT:
    (1) don't ever delete comment lines beginning `// ns__custom`.
    (2) don't modify the code except between matching comment lines `// ns__custom` with `start`
    and `// ns__custom` with `end`
    (3) if you need to modify code outside of those areas, please contact
    info@pivotate.com and send the file with a request.  We can always generate
    new `ns__custom` lines to accommodate you.

 */

'use strict';
/*
    This is a location for anything at the top of your code.  By default,
    `use strict` is shown.
 */
// ns__custom_end unit: {{Unit}}, comp: {{PluralName}}, loc: beforeImports

import React, { Component, createRef } from 'react';
import { Unit } from '@nostack/no-stack';
import styled from 'styled-components';
import { v4 } from 'uuid';

import { flattenData } from '../../../flattenData';

import {{SingularName}}CreationForm from '../{{SingularName}}CreationForm';
import {{SingularName}} from '../{{SingularName}}';

import { {{SOURCE_ID_CONSTANT}} } from '../../../config';
import {
  {{RELATIONSHIPS_NAME}},
  {{SOURCE_QUERY_NAME}},
} from '../../source-props/{{SingularSourceLowercase}}';

// ns__custom_start unit: {{Unit}}, comp: {{PluralName}}, loc: addedImports
/*
    Put any additional import statements here.
 */
// ns__custom_end unit: {{Unit}}, comp: {{PluralName}}, loc: addedImports

// ns__custom_start unit: {{Unit}}, comp: {{PluralName}}, loc: styling
/*
  This section is for styling.  The default below is just a sample and can be replaced.
 */

const {{PluralName}}StyleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;
// ns__custom_end unit: {{Unit}}, comp: {{PluralName}}, loc: styling

class {{PluralName}} extends Component {
// ns__custom_start unit: {{Unit}}, comp: {{PluralName}}, loc: beginning
  /*
      This is a location for anything at the top of your code.  By default,
      `use strict` is shown.
   */
// ns__custom_end unit: {{Unit}}, comp: {{PluralName}}, loc: beginning
  state = {
    selected{{SingularName}}Id: null,
  };

  wrapperRef = createRef();

  componentDidMount() {
    // ns__custom_start unit: {{Unit}}, comp: {{PluralName}}, loc: didMount
    // ns__custom_end unit: {{Unit}}, comp: {{PluralName}}, loc: didMount
    document.addEventListener('mousedown', this.handleClick);
  }

  componentWillUnmount() {
    // ns__custom_start unit: {{Unit}}, comp: {{PluralName}}, loc: willUnmount
    // ns__custom_end unit: {{Unit}}, comp: {{PluralName}}, loc: willUnmount
    document.removeEventListener('mousedown', this.handleClick);
  }

  handleClick = (e) => {
    const node = this.wrapperRef.current;

    if (node && node !== e.target && !node.contains(e.target)) {
      this.setState({ selected{{SingularName}}Id: null });
    }
  };

  handleSelect = (id) => this.setState({ selected{{SingularName}}Id: id });

  render() {
    const { {{SingularParentName}}Id } = this.props;
    const { selected{{SingularName}}Id } = this.state;
    const parameters = {
      {{CONSTRAINT_VALUE}}: {{SingularParentName}}Id,
    };

    {/* ns__custom_start unit: {{Unit}}, comp: {{PluralName}}, loc: renderBeginning */}
    {/* ns__custom_end unit: {{Unit}}, comp: {{PluralName}}, loc: renderBeginning */}

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
            return `Error: ${error.graphQLErrors}`;
          }

          const {{PluralNameLowercase}} = data.unitData.map((el) => flattenData(el));

      // ns__custom_start unit: {{Unit}}, comp: {{PluralName}}, loc: beforeReturn
      // ns__custom_end unit: {{Unit}}, comp: {{PluralName}}, loc: beforeReturn
          return (
            <>
            {/*// ns__custom_start unit: {{Unit}}, comp: {{PluralName}}, loc: creationForm*/}
            {/*// ns__custom_end unit: {{Unit}}, comp: {{PluralName}}, loc: creationForm*/}
              <{{SingularName}}CreationForm  {{SingularParentName}}Id={ {{SingularParentName}}Id } refetchQueries={refetchQueries}/>
              <{{PluralName}}StyleWrapper
                ref={this.wrapperRef}
                onClick={this.handleClick}
              >
                { {{PluralNameLowercase}} &&
                  {{PluralNameLowercase}}.map(({{SingularNameLowercase}}) => (
                  <{{SingularName}}
                    key={v4()}
                    parentId={ {{SingularParentName}}Id }
                    {{SingularNameLowercase}}={ {{SingularNameLowercase}} }
                    selected={ {{SingularNameLowercase}}.id === selected{{SingularName}}Id }
                    refetchQueries={refetchQueries}
                    onSelect={this.handleSelect}
                  />
                )) }
              </{{PluralName}}StyleWrapper>
                {/* ns__custom_start unit: {{Unit}}, comp: {{PluralName}}, loc: renderEnding */}
                {/* ns__custom_end unit: {{Unit}}, comp: {{PluralName}}, loc: renderEnding */}
            </>
          );
        }}
      </Unit>
    );
  }
}

export default {{PluralName}};
