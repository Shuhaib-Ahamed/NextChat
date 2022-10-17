import Header from "../components/Header";
import HeaderTop from "../components/HeaderTop";
import Leftbar from "../components/Leftbar";
import Sidebar from "../components/Sidebar";
import styled from "styled-components";
import IntroContainer from "../components/IntroContainer";

export default function Home() {
  function toggleZoomScreen() {
    document.body.style.zoom = "80%";
  }

  toggleZoomScreen();

  return (
    <Container>
      <Header title={"Next Chat"}></Header>
      <Glass>
        <Leftbar />
        <MainContainer>
          <HeaderTop />
          <FlexContainer>
            <Sidebar />
            <IntroContainer />
          </FlexContainer>
        </MainContainer>
      </Glass>
    </Container>
  );
}

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

const MainContainer = styled.div`
  width: 94%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 88%;
`;

const Glass = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: transparent;
  backdrop-filter: blur(150px);
`;

export { Container, MainContainer, FlexContainer, Glass };
