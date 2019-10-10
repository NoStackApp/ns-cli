import React from 'react';
import styled from 'styled-components';

import __SingularName__CreationForm from '../__SingularName__CreationForm';
import __SingularName__ from '../__SingularName__';

const __PluralName__StyleWrapper = styled.div``;

function __PluralName__({ __SingularNameLowercase__s, currentTodoId, onUpdate, refetchQueries }) {
  return (
    <__PluralName__StyleWrapper>
      <__SingularName__CreationForm
        currentTodoId={currentTodoId}
        refetchQueries={refetchQueries}
      />

      {__SingularNameLowercase__s.map(__SingularNameLowercase__ => (
        <__SingularName__
          key={__SingularNameLowercase__.instance.id}
          __SingularNameLowercase__={__SingularNameLowercase__.instance}
          onUpdate={onUpdate}
        />
      ))}
    </__PluralName__StyleWrapper>
  );
}

export default __PluralName__;
