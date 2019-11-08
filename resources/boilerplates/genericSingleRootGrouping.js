import React from 'react';
import { Unit } from '@nostack/no-stack';
import styled from 'styled-components';
import { flattenData } from '../../../flattenData';

// import {
//   SOURCE_USER_PROFILE_ID,
//   TYPE_LAST_NAME_ID,
//   TYPE_ADDRESS_ID,
//   TYPE_FIRST_NAME_ID,
// TYPE_ACTIVE_ID} from '../../../config';
import { __RELATIONSHIPS_NAME__, __SOURCE_QUERY_NAME__ } from '../../source-props/__SingularSourceLowercase__';

// import LastName from '../LastName'; 
// import Address from '../Address'; 
// import FirstName from '../FirstName'; 
// import Active from '../Active'; 

// add styling here
const __SingularName__StyleWrapper = styled.div`
  margin: 2em 1em;
  padding: 1.5em;
  border: none;
  border-radius: 10px;
  box-shadow: 5px 5px 10px #888888;
`;

function __SingularName__({ __SingularNameLowercase__Id }) {
  const parameters = {
    __CONSTRAINT_VALUE__: __SingularNameLowercase__Id,
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

        const childTypes = __SingularNameLowercase__ && __SingularNameLowercase__.children;
        if (!childTypes) {
          return null;
        }

        // const firstNameData = childTypes.find(child => child.typeId === TYPE_FIRST_NAME_ID);
        // const firstName = firstNameData ? firstNameData.instances[0] : [];

        // const lastNameData = childTypes.find(child => child.typeId === TYPE_LAST_NAME_ID);
        // const  lastName = lastNameData ? lastNameData.instances[0] : [];

        // const addressData = childTypes.find(child => child.typeId === TYPE_ADDRESS_ID);
        // const  address = addressData ? addressData.instances[0] : [];

        // const activeData = childTypes.find(child => child.typeId === TYPE_ACTIVE_ID);
        // const  active = activeData ? activeData.instances[0] : [];

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
      }}
    </Unit>
  );
}

export default __SingularName__;
