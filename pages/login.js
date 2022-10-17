import styled from "styled-components";
import Head from "next/head";
import Animation from "../components/Animation";
import GoogleIcon from "../assets/Google.png";
import { auth, provider } from "../firebase";

const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>
      <LoginContainer>
        <Heading>Next Chat</Heading>
        <Logo src={require("../assets/Logo.gif")} />
        <Animation />
        <LoginCard onClick={signIn}>
          <Google src={GoogleIcon} />
          <Text>Login with Google</Text>
        </LoginCard>
        <MeetCard
          target="_blank"
          onClick={() =>
            window.open("https://www.shuhaibahamed.space", "_blank")
          }
        >
          <Text>Meet the Developer</Text>
        </MeetCard>
        <Description>
          <DescriptionHeading>Welcome to NextChat</DescriptionHeading>
          <P>
            Real time chat application designed and built with Next Js (SSR),
            styled-components, online status and one to one chat functionality.
          </P>
        </Description>
      </LoginContainer>
    </Container>
  );
};

export default Login;

const P = styled.p`
  font-size: 16px;
  color: #b4adad;
  width: 90%;
`;

const DescriptionHeading = styled.h2`
  font-size: 24px;
  color: #3a8ad4;
`;

const Description = styled.div`
  border-radius: 5px;
  display: grid;
  place-items: left;
  padding: 10px 40px;
  top: 38%;
  left: 45%;
  position: absolute;
  width: 35%;
  background-image: linear-gradient(to right, #3a7ebe39, #150c2e6f);
  height: 300px;
`;

const Logo = styled.img`
  top: 12%;
  right: 22%;
  position: absolute;
  width: 50px;
  height: 50px;
`;

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
  right: 26%;
  font-size: 65px;
`;

const LoginCard = styled.div`
  cursor: pointer;
  padding: 0 20px;
  align-items: center;
  justify-content: space-around;
  display: flex;
  position: absolute;
  top: 25%;
  right: 35%;
  width: 400px;
  height: 70px;
  border: 1px solid #91919150;
  border-radius: 50px;
  :hover {
    border: 1px solid #ffffff60;
  }
`;

const MeetCard = styled.div`
  cursor: pointer;
  padding: 0 20px;
  align-items: center;
  justify-content: space-around;
  display: flex;
  position: absolute;
  top: 25%;
  right: 10%;
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
