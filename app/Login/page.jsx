'use client';
import { useState } from 'react';
import styled from 'styled-components';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Wrapper>
      <Container>
        <AuthBox>
          <WelcomePanel isLogin={isLogin}>
            <PanelContent>
              <WelcomeText>{isLogin ? 'Welcome Back!' : 'Join Us Now!'}</WelcomeText>
              <WelcomeDescription>
                {isLogin
                  ? 'To keep connected with us, please login with your personal info.'
                  : 'Create an account and start your journey with us.'}
              </WelcomeDescription>
              <PanelButton onClick={toggleForm}>
                {isLogin ? 'Sign Up' : 'Login'}
              </PanelButton>
            </PanelContent>
          </WelcomePanel>

          <FormSection isLogin={isLogin}>
            <Form isLogin={isLogin}>
              <FormTitle>{isLogin ? 'Login' : 'Sign Up'}</FormTitle>
              <FormContent>
                <Input type="email" placeholder="Email" />
                <Input type="password" placeholder="Password" />
                {!isLogin && (
                  <Input type="password" placeholder="Confirm Password" />
                )}
                <SubmitButton>{isLogin ? 'Login' : 'Sign Up'}</SubmitButton>
              </FormContent>
            </Form>
          </FormSection>
        </AuthBox>
      </Container>
    </Wrapper>
  );
}

// Styled Components
const Wrapper = styled.div`
  height: 100vh;
  background: linear-gradient(45deg, #141e30, #243b55);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 1000px;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1200px;
`;

const AuthBox = styled.div`
  width: 1000px;
  height: 600px;
  display: flex;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  transition: transform 1s ease;
`;

const WelcomePanel = styled.div`
  width: 50%;
  background-color: ${(props) => (props.isLogin ? '#1f4068' : '#e43f5a')};
  color: white;
  position: absolute;
  left: ${(props) => (props.isLogin ? '0' : '50%')};
  top: 0;
  height: 100%;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  transition: all 1s ease;
  transform: translateX(${(props) => (props.isLogin ? '0%' : '-100%')});
  box-shadow: 10px 0px 30px rgba(0, 0, 0, 0.3);
`;

const PanelContent = styled.div`
  text-align: center;
`;

const WelcomeText = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const WelcomeDescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 40px;
`;

const PanelButton = styled.button`
  background: none;
  border: 2px solid white;
  color: white;
  padding: 10px 30px;
  border-radius: 30px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.4s ease;

  &:hover {
    background-color: white;
    color: ${(props) => (props.isLogin ? '#1f4068' : '#e43f5a')};
  }
`;

const FormSection = styled.div`
  width: 50%;
  height: 100%;
  position: absolute;
  right: ${(props) => (props.isLogin ? '0' : '50%')};
  left: ${(props) => (props.isLogin ? '50%' : '0')};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 1s ease;
`;

const Form = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background-color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  position: relative;
  z-index: 2;
`;

const FormTitle = styled.h2`
  font-size: 2.2rem;
  color: ${(props) => (props.isLogin ? '#1f4068' : '#e43f5a')};
  margin-bottom: 30px;
`;

const FormContent = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  padding: 12px;
  background-color: ${(props) => (props.isLogin ? '#1f4068' : '#e43f5a')};
  color: white;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.isLogin ? '#2c3e50' : '#c0392b')};
  }
`;
