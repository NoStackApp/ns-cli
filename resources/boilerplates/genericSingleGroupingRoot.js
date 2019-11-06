import React, {useState} from 'react';
import styled from 'styled-components';
import compose from '@shopify/react-compose';
import {graphql} from '@apollo/react-hoc';

import {__ChildrenTypeList__} from '../../../config';


__CHILDREN_IMPORT_LIST__

// add styling here
const __SingularName__StyleWrapper = styled.div`
  margin: 2em 1em;
  padding: 1.5em;
  border: none;
  border-radius: 10px;
  box-shadow: 5px 5px 10px #888888;
`;


export default function __SingularName__({__SingularNameLowercase__}) {

  __CHILDREN_CONSTANT_DECLARATIONS__

  return (
    <__SingularName__StyleWrapper>
      __CHILDREN_BODY_LIST__
    </__SingularName__StyleWrapper>
  );
}
