import React from 'react';
import styled from 'styled-components';
import './App.css';
import { NoStackConsumer, LoginForm, RegistrationForm } from '@nostack/no-stack';

import { PLATFORM_ID, TYPE_USER_ID } from './config';

import NavBar from './components/NavBar';
import AuthTabs from './components/AuthTabs';
import __TopComponentName__ from './components/__SourceName__/__TopComponentName__';

const Wrapper = styled.div`
  padding: 5em 5em;
  min-width: 480px;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const App = () => (
  <>
    <NavBar />
    <Wrapper className="App">
      <NoStackConsumer>
        {({ loading, currentUser }) => {
          if (loading) return null;

          if (!currentUser) {
            return (
              <LoginWrapper>
                <AuthTabs
                  menuTitles={[
                    'Login',
                    'Register',
                  ]}
                >
                  <LoginForm />
                  <RegistrationForm 
                    platformId={PLATFORM_ID}
                    userClassId={TYPE_USER_ID}
                  />
                </AuthTabs>
              </LoginWrapper>
            );
          }

          return (
            <__TopComponentName__ __TopComponentPropSetting__ />
          );
        }}
      </NoStackConsumer>
    </Wrapper>
  </>
);

export default App;
