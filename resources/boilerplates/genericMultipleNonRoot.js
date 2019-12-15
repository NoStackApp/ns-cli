import React, { Component, createRef } from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';

import {{SingularName}}CreationForm from '../{{SingularName}}CreationForm';
import {{SingularName}} from '../{{SingularName}}';

const {{PluralName}}StyleWrapper = styled.div``;

const Button = styled.button`
  display: block;
  margin: 0 auto;
`;

class {{PluralName}} extends Component {
  state = {
    selected{{SingularName}}Id: null,
  };

  wrapperRef = createRef();

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick);
  }

  handleClick = e => {
    const node = this.wrapperRef.current;

    if (
      node &&
      node !== e.target &&
      !node.contains(e.target)
    ) {
      this.setState({ selected{{SingularName}}Id: null });
    }
  }

  handleSelect = id => this.setState({ selected{{SingularName}}Id: id });

  render () {
    const { {{SingularParentName}}Id, {{SingularNameLowercase}}s, refetchQueries, onUpdate } = this.props;
    const { selected{{SingularName}}Id } = this.state;

    return (
      <{{PluralName}}StyleWrapper ref={this.wrapperRef} onClick={this.handleClick}>
        <{{SingularName}}CreationForm
          parentId={ {{SingularParentName}}Id }
          refetchQueries={refetchQueries}
        />

        { {{SingularNameLowercase}}s.map({{SingularNameLowercase}} => (
          <{{SingularName}}
            key={v4()}
            {{SingularNameLowercase}}={ {{SingularNameLowercase}} }
            selected={ {{SingularNameLowercase}}.id === selected{{SingularName}}Id }
            onUpdate={onUpdate}
            parentId={ {{SingularParentName}}Id }
            refetchQueries={refetchQueries}
            onSelect={this.handleSelect}
          />
        )) }
      </{{PluralName}}StyleWrapper>
    )
  }
}

export default {{PluralName}};
