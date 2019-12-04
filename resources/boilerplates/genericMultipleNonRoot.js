import React, { Component, createRef } from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';

import __SingularName__CreationForm from '../__SingularName__CreationForm';
import __SingularName__ from '../__SingularName__';

const __PluralName__StyleWrapper = styled.div``;

const Button = styled.button`
  display: block;
  margin: 0 auto;
`;

class __PluralName__ extends Component {
  state = {
    selected__SingularName__Id: null,
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
      this.setState({ selected__SingularName__Id: null });
    }
  }

  handleSelect = id => this.setState({ selected__SingularName__Id: id });

  render () {
    const { __SingularParentName__Id, __SingularNameLowercase__s, refetchQueries, onUpdate } = this.props;
    const { selected__SingularName__Id } = this.state;

    return (
      <__PluralName__StyleWrapper ref={this.wrapperRef} onClick={this.handleClick}>
        <__SingularName__CreationForm
          parentId={__SingularParentName__Id}
          refetchQueries={refetchQueries}
        />

        {__SingularNameLowercase__s.map(__SingularNameLowercase__ => (
          <__SingularName__
            key={v4()}
            __SingularNameLowercase__={__SingularNameLowercase__}
            selected={__SingularNameLowercase__.id === selected__SingularName__Id}
            onUpdate={onUpdate}
            parentId={__SingularParentName__Id}
            refetchQueries={refetchQueries}
            onSelect={this.handleSelect}
          />
        ))}
      </__PluralName__StyleWrapper>
    )
  }
}

export default __PluralName__;
