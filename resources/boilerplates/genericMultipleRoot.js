import React, { Component, createRef } from 'react';
import { Unit } from '@nostack/no-stack';
import styled from 'styled-components';
import { v4 } from 'uuid';

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

  render() {
    const { __SingularParentName__Id } = this.props;
    const { selected__SingularName__Id } = this.state;

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
              <__SingularName__CreationForm  __SingularParentName__Id={__SingularParentName__Id} refetchQueries={refetchQueries}/>
              <__PluralName__StyleWrapper ref={this.wrapperRef} onClick={this.handleClick}>
                {__PluralNameLowercase__ && __PluralNameLowercase__.map(__SingularNameLowercase__ => (
                  <__SingularName__
                    key={v4()}
                    parentId={__SingularParentName__Id}
                    __SingularNameLowercase__={__SingularNameLowercase__}
                    selected={__SingularNameLowercase__.id === selected__SingularName__Id}
                    refetchQueries={refetchQueries}
                    onSelect={this.handleSelect}
                  />
                ))}
              </__PluralName__StyleWrapper>
            </>
          );
        }}
      </Unit>
    );
  }
}

export default __PluralName__;
