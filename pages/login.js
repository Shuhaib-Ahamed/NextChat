import styled from "styled-components";
import Head from "next/head";
import Animation from "../companants/Animation";
import GoogleIcon from "../Assets/Google.png";

function login() {
  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>
      <LoginContainer>
        <Heading>Next Chat</Heading>
        <Animation />
        <LoginCard>
          <Google src={GoogleIcon} />
          <Text>Login with Google</Text>
        </LoginCard>
      </LoginContainer>
    </Container>
  );
}

export default login;

const Text = styled.h2`
  font-size: 24px;
`;

const Google = styled.img`
  height: 40px;
  width: 40px;
`;

const Heading = styled.h1`
  position: absolute;
  top: 5%;
  left: 5%;
  font-size: 65px;
`;

const LoginCard = styled.div`
  cursor: pointer;
  padding: 0 20px;
  align-items: center;
  justify-content: space-around;
  display: flex;
  position: absolute;
  top: 45%;
  right: 20%;
  width: 400px;
  height: 70px;
  border: 1px solid #91919150;
  border-radius: 50px;
  :hover {
    border: 1px solid #ffffff60;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #150c2e;
  :before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #3a8ad458;
    clip-path: circle(10% at center 10%);
  }
`;

const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: transparent;
  backdrop-filter: blur(150px);
`;
