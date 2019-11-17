import React, {useState} from 'react';
import styled from 'styled-components';
import {EXECUTE_ACTION} from '@nostack/no-stack';
import {graphql} from '@apollo/react-hoc';

import {DELETE___SingularForRelationshipAllCaps___ACTION_ID__ChildrenTypeList__} from '../../../config';

__CHILDREN_IMPORT_LIST__

// add styling here
const __SingularName__StyleWrapper = styled.div`
  margin: 2em 1em;
  padding: 1.5em;
  border: none;
  border-radius: 10px;
  box-shadow: 5px 5px 10px #888888;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0;
  color: #bbbbbb;
  transition: color 0.5s ease;
  &:hover {
    color: ${props => props.hoverColor || '#000000'};
  }
`;

const DeleteMenu = styled.div`
  color: red;
  margin: 1em;
  padding: 1em;
  border: 1px solid #eeeeee;
`;

function __SingularName__({__SingularNameLowercase__, parentId, updateInstance, deleteInstance, refetchQueries}) {
  const [ isDeleteMode, updateIsDeleteMode ] = useState(false);
  const [ isDeleting, updateIsDeleting ] = useState(false);

  __CHILDREN_CONSTANT_DECLARATIONS__

  async function handleDelete() {
    updateIsDeleting(true);

    try {
      await deleteInstance({
        variables: {
          actionId: DELETE___SingularForRelationshipAllCaps___ACTION_ID,
          executionParameters: JSON.stringify({
            parentInstanceId: parentId,
            childInstanceId: __SingularNameLowercase__.id,
          }),
        },
        refetchQueries
      });
    } catch (e) {
      updateIsDeleting(false);
    }
  }

    {/*<UserStyleWrapper isDeleting={isDeleting}>*/}
    {/*  {__SingularNameLowercase__.value}*/}
    {/*  {isDeleteMode ? (*/}
    {/*      <DeleteMenu>*/}
    {/*        Delete?*/}
    {/*        <Button*/}
    {/*          type="button"*/}
    {/*          hoverColor="#00FF00"*/}
    {/*          onClick={handleDelete}*/}
    {/*          disabled={isDeleting}*/}
    {/*        >*/}
    {/*          &#10003;*/}
    {/*        </Button>*/}
    {/*        <Button*/}
    {/*          type="button"*/}
    {/*          hoverColor="#FF0000"*/}
    {/*          onClick={() => updateIsDeleteMode(false)}*/}
    {/*          disabled={isDeleting}*/}
    {/*        >*/}
    {/*          &#10005;*/}
    {/*        </Button>*/}
    {/*      </DeleteMenu>*/}
    {/*    ) :*/}
    {/*    (*/}
    {/*      <Button*/}
    {/*        type="button"*/}
    {/*        onClick={() => updateIsDeleteMode(true)}*/}
    {/*      >*/}
    {/*        &#128465;*/}
    {/*      </Button>*/}
    {/*    )*/}
    {/*  }*/}
    {/*</UserStyleWrapper>*/}
  return (
    <__SingularName__StyleWrapper isDeleting={isDeleting}>
      {__SingularNameLowercase__.value}
      {isDeleteMode ? (
          <DeleteMenu>
            Delete?
            <Button
              type="button"
              hoverColor="#00FF00"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              &#10003;
            </Button>
            <Button
              type="button"
              hoverColor="#FF0000"
              onClick={() => updateIsDeleteMode(false)}
              disabled={isDeleting}
            >
              &#10005;
            </Button>
          </DeleteMenu>
        ) :
        (
          <Button
            type="button"
            onClick={() => updateIsDeleteMode(true)}
          >
            &#128465;
          </Button>
        )
      }
      __CHILDREN_BODY_LIST__
    </__SingularName__StyleWrapper>
  );
}

export default graphql(EXECUTE_ACTION, { name: 'deleteInstance' })(__SingularName__);
