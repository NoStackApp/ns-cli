import React from 'react';
import { Unit } from '@nostack/no-stack';
import styled from 'styled-components';
import { flattenData } from '../../../flattenData';

// NEXT LINE SHOULD BE:
// import {
//   SOURCE_USER_PROFILE_ID,
//   TYPE_LAST_NAME_ID,
//   TYPE_ADDRESS_ID,
//   TYPE_FIRST_NAME_ID,
// TYPE_ACTIVE_ID} from '../../../config';
import { __SOURCE_ID_CONSTANT__ } from '../../../config';
import { __RELATIONSHIPS_NAME__, __SOURCE_QUERY_NAME__ } from '../../source-props/__SingularSourceLowercase__';

// import LastName from '../LastName'; 
// import Address from '../Address'; 
// import FirstName from '../FirstName'; 
// import Active from '../Active'; 

// add styling here
const __SingularName__StyleWrapper = styled.div`
  import LastName from '../LastName'; 
  import Address from '../Address'; 
  import FirstName from '../FirstName'; 
  import Active from '../Active'; 
`;

function __SingularName__({ __SingularName__Id }) {
  const parameters = {
    __CONSTRAINT_VALUE__: __SingularName__Id,
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

        const __SingularNameLowercase__ = data.unitData.map(el => flattenData(el));

        // const childTypes = user && user.children;
        // if (!childTypes) {
        //   return null;
        // }

        // const firstNameData = childTypes.find(child => child.typeId === TYPE_FIRST_NAME_ID);
        // const firstName = firstNameData ? firstNameData.instances[0] : [];

        // const lastNameData = childTypes.find(child => child.typeId === TYPE_LAST_NAME_ID);
        // const  lastName = lastNameData ? lastNameData.instances[0] : [];

        // const addressData = childTypes.find(child => child.typeId === TYPE_ADDRESS_ID);
        // const  address = addressData ? addressData.instances[0] : [];

        // const activeData = childTypes.find(child => child.typeId === TYPE_ACTIVE_ID);
        // const  active = activeData ? activeData.instances[0] : [];

        // RETURN SHOULD BE:
        // return (
        //   <UserStyleWrapper>
        //     <FirstName
        //       firstName={firstName}
        //       userId={userId}
        //       refetchQueries={refetchQueries}
        //     />
        //     <LastName
        //       lastName={lastName}
        //       userId={userId}
        //       refetchQueries={refetchQueries}
        //     />
        //     <Address
        //       address={address}
        //       userId={userId}
        //       refetchQueries={refetchQueries}
        //     />
        //     <Active
        //       active={active}
        //       userId={userId}
        //       label="Active?"
        //       refetchQueries={refetchQueries}
        //     />
        //   </UserStyleWrapper>
        // );
        return (
          <>
          <__SingularName__StyleWrapper>
            {
              __SingularNameLowercase__ && __SingularNameLowercase__.map(__SingularNameLowercase__ => (
                <__SingularName__
                  key={__SingularNameLowercase__.id}
                  parentId={__SingularParentName__Id}
                  __SingularNameLowercase__={__SingularNameLowercase__}
                  refetchQueries={refetchQueries}
                />
              ))
            }
          </__SingularName__StyleWrapper>
          </>
        );
      }}
    </Unit>
  );
}

export default __SingularName__;

