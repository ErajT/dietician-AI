"use client";

import React from "react";
import styled from "styled-components";
import {signInWithEmailAndPassword,createUserWithEmailAndPassword,onAuthStateChanged} from "firebase/auth";
import { auth } from '@/firebase.config';
import {useState} from "react";
// Styled Components
const Container = styled.div`
  background-color: #f0f8f7;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: absolute;
  top: 18%;
  left: 20%;
  overflow: hidden;
  width: 60vw;
  max-width: 100%;
  min-height: 400px;
`;

const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${(props) =>
    !props.signingIn
      ? `
      transform: translateX(100%);
      opacity: 1;
      z-index: 5;
    `
      : null}
`;

const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${(props) => (!props.signingIn ? `transform: translateX(100%);` : null)}
`;

const Form = styled.form`
  background-color: #f0f8f7;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  height: 100%;
  text-align: center;
`;

const Title = styled.h1`
  font-weight: bold;
  margin: 0;
  color: #2b6777;
`;

const PanelTitle = styled.h1`
font-weight: bold;
margin: 0;
color: #f0f8f7;
`;

const Input = styled.input`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
`;

const Button = styled.button`
  border-radius: 20px;
  border: 1px solid #2b6777;
  background-color: #2b6777;
  color: #f0f8f7;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
`;

const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #ffffff;
`;

const Anchor = styled.a`
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
`;

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${(props) => (!props.signingIn ? `transform: translateX(-100%);` : null)}
`;

const Overlay = styled.div`
  background: #2b6777;
  background-repeat: no-repeat;
  background-size: cover;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  ${(props) => (!props.signingIn ? `transform: translateX(50%);` : null)}
`;

const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${(props) => (!props.signingIn ? `transform: translateX(0);` : null)}
`;

const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);
  ${(props) => (!props.signingIn ? `transform: translateX(20%);` : null)}
`;

const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;

// Main App Component
const login = () => {
  const [signIn, toggle] = React.useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async (e) => {
  e.preventDefault();
  console.log("login button pressed")
  console.log(email);
  console.log(password);
  setLoading(true);

  try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setSnackbarMessage('Login successful');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      console.log(email);
      console.log(password);
      setTimeout(() => {
      window.location.href = '/main';
      }, 1500);
  } catch (error) {
      console.log(error);
      setSnackbarMessage('Invalid email or password');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
  } finally {
      setLoading(false);
  }
  };

  onAuthStateChanged(auth, (user) => {
  if (user) {
    sessionStorage.setItem(
      'user',
      JSON.stringify({ userId: user.uid })
    );
  }
});

  const handleSignup = async (e) => {
  e.preventDefault();

  if (!isValidEmail(email)) {
      setSnackbarMessage('Please enter a valid email address.');
      setSnackbarOpen(true);
      return;
  }

  if (password !== confirmPassword) {
      setSnackbarMessage('Passwords do not match.');
      setSnackbarOpen(true);
      return;
  }

  setLoading(true);

  try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      sessionStorage.setItem('user', JSON.stringify({ userId: res.user.uid }));
      setSnackbarMessage('Signup successful!');
      setSnackbarOpen(true);
      setTimeout(() => {
      window.location.href = '/main';
      }, 1500);
  } catch (error) {
      console.error(error);
      setSnackbarMessage('Signup failed. Please try again.');
      setSnackbarOpen(true);
  } finally {
      setLoading(false);
  }
  };
  return (
    <Container>
      <SignUpContainer signingIn={signIn}>
        <Form onSubmit={handleSignup}>
          <Title>Create Account</Title>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button disabled={loading}>Sign Up</Button>
        </Form>
      </SignUpContainer>
      <SignInContainer signingIn={signIn}>
        <Form onSubmit={handleLogin}>
          <Title>Sign In</Title>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Anchor href="#">Forgot your password?</Anchor>
          <Button disabled={loading}>Sign In</Button>
        </Form>
      </SignInContainer>
      <OverlayContainer signingIn={signIn}>
        <Overlay signingIn={signIn}>
          <LeftOverlayPanel signingIn={signIn}>
            <PanelTitle>Welcome Back!</PanelTitle>
            <Paragraph>
              To keep connected with us please login with your personal info
            </Paragraph>
            <GhostButton onClick={() => toggle(true)}>Sign In</GhostButton>
          </LeftOverlayPanel>
          <RightOverlayPanel signingIn={signIn}>
            <PanelTitle>Hello, Friend!</PanelTitle>
            <Paragraph>
              Enter your personal details and start journey with us
            </Paragraph>
            <GhostButton onClick={() => toggle(false)}>Sign Up</GhostButton>
          </RightOverlayPanel>
        </Overlay>
      </OverlayContainer>
    </Container>
  );
};

export default login;
