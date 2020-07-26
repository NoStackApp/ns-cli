// ns__file unit: {{Unit}}, comp: {{PluralName}}
// ns__custom_start unit: {{Unit}}, comp: {{PluralName}}, loc: beforeImports
/*

  This file contains generated code, with some locations for adding modifications.
  This file will occasionally be replaced as needed when a stack changes.  But,
  you are allowed to add code in certain locations.  You may also create additional
  files and include them here.

  IMPORTANT:
    (1) don't ever delete comment lines beginning `// ns__custom`.
    (2) don't modify the code except between matching comment lines `// ns__custom` with`start`
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
import styled from 'styled-components';
import { v4 } from 'uuid';

import {{SingularName}}CreationForm from '../{{SingularName}}CreationForm';
import {{SingularName}} from '../{{SingularName}}';

// ns__custom_start unit: {{Unit}}, comp: {{PluralName}}, loc: addedImports
/*
    Put any additional import statements here.
 */
// ns__custom_end unit: {{Unit}}, comp: {{PluralName}}, loc: addedImports

// ns__custom_start unit: {{Unit}}, comp: {{PluralName}}, loc: styling
/*
  This section is for styling.  The default below is just a sample and can be replaced.
 */

const {{PluralName}}StyleWrapper = styled.div``;

const Button = styled.button`
  display: block;
  margin: 0 auto;
`;
// ns__custom_end unit: {{Unit}}, comp: {{PluralName}}, loc: styling

class {{PluralName}} extends Component {
// ns__custom_start unit: {{Unit}}, comp: {{PluralName}}, loc: beginning
  /* any special declarations etc. */
// ns__custom_end unit: {{Unit}}, comp: {{PluralName}}, loc: beginning
  state = {
    selected{{SingularName}}Id: null,
      // ns__custom_start unit: {{Unit}}, comp: {{PluralName}}, loc: addedState
      // ns__custom_end unit: {{Unit}}, comp: {{PluralName}}, loc: addedState
  };

  wrapperRef = createRef();

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick);
    // ns__custom_start unit: {{Unit}}, comp: {{PluralName}}, loc: componentDidMount
    // ns__custom_end unit: {{Unit}}, comp: {{PluralName}}, loc: componentDidMount
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick);
    // ns__custom_start unit: {{Unit}}, comp: {{PluralName}}, loc: componentWillUnmount
    // ns__custom_end unit: {{Unit}}, comp: {{PluralName}}, loc: componentWillUnmount
  }

  handleClick = (e) => {
    const node = this.wrapperRef.current;

    if (node && node !== e.target && !node.contains(e.target)) {
      this.setState({ selected{{SingularName}}Id: null });
    }
  };

  handleSelect = (id) => this.setState({ selected{{SingularName}}Id: id });

  render () {
    const { {{SingularParentName}}Id, {{PluralNameLowercase}}, refetchQueries, onUpdate } = this.props;
    const { selected{{SingularName}}Id } = this.state;

    // ns__custom_start unit: {{Unit}}, comp: {{PluralName}}, loc: renderBeginning
    // ns__custom_end unit: {{Unit}}, comp: {{PluralName}}, loc: renderBeginning

    return (
      <{{PluralName}}StyleWrapper
        ref={this.wrapperRef}
        onClick={this.handleClick}
      >
        <{{SingularName}}CreationForm
          parentId={ {{SingularParentName}}Id }
          refetchQueries={refetchQueries}
          // ns__custom_start unit: {{Unit}}, comp: {{PluralName}}, loc: addedPropsForCreationForm
          // ns__custom_end unit: {{Unit}}, comp: {{PluralName}}, loc: addedPropsForCreationForm
        />

        { {{PluralNameLowercase}}.map(({{SingularNameLowercase}}) => (
          <{{SingularName}}
            key={v4()}
            {{SingularNameLowercase}}={ {{SingularNameLowercase}} }
            selected={ {{SingularNameLowercase}}.id === selected{{SingularName}}Id }
            onUpdate={onUpdate}
            parentId={ {{SingularParentName}}Id }
            refetchQueries={refetchQueries}
            onSelect={this.handleSelect}
            // ns__custom_start unit: {{Unit}}, comp: {{PluralName}}, loc: addedPropsForChildren
            // ns__custom_end unit: {{Unit}}, comp: {{PluralName}}, loc: addedPropsForChildren
          />
        )) }
  {/* ns__custom_start unit: {{Unit}}, comp: {{PluralName}}, loc: renderEnding */}
  {/* ns__custom_end unit: {{Unit}}, comp: {{PluralName}}, loc: renderEnding */}

  </{{PluralName}}StyleWrapper>
  );
  }
}

export default {{PluralName}};
