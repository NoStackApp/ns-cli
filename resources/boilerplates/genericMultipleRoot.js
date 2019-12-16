import React, { Component, createRef } from 'react';
import { Unit } from '@nostack/no-stack';
import styled from 'styled-components';
import { v4 } from 'uuid';

import { flattenData } from '../../../flattenData';

import {{SingularName}}CreationForm from '../{{SingularName}}CreationForm';
import {{SingularName}} from '../{{SingularName}}';

import { {{SOURCE_ID_CONSTANT}} } from '../../../config';
import { {{RELATIONSHIPS_NAME}}, {{SOURCE_QUERY_NAME}} } from '../../source-props/{{SingularSourceLowercase}}';

// add styling here
const {{PluralName}}StyleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
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

  render() {
    const { {{SingularParentName}}Id } = this.props;
    const { selected{{SingularName}}Id } = this.state;

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
              <{{SingularName}}CreationForm  {{SingularParentName}}Id={ {{SingularParentName}}Id } refetchQueries={refetchQueries}/>
              <{{PluralName}}StyleWrapper ref={this.wrapperRef} onClick={this.handleClick}>
                { {{PluralNameLowercase}} && {{PluralNameLowercase}}.map({{SingularNameLowercase}} => (
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
            </>
          );
        }}
      </Unit>
    );
  }
}

export default {{PluralName}};
