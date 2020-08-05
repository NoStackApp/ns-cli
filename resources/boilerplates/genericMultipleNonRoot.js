{{{START_OF_FILE}}}
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

  {/* ns__start_section listElements */}
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
  {/* ns__end_section listElements */}

  {/* ns__custom_start unit: {{Unit}}, comp: {{PluralName}}, loc: renderEnding */}
  {/* ns__custom_end unit: {{Unit}}, comp: {{PluralName}}, loc: renderEnding */}

  </{{PluralName}}StyleWrapper>
  );
  }
}

export default {{PluralName}};
