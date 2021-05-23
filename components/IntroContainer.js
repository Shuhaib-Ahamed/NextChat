import styled from "styled-components";
import HeaderMain from "../components/HeaderMain";

function IntroContainer() {
  return (
    <Container>
      <HeaderMain />
      <img
        src={require("../assets/Next-2.gif")}
        alt=""
        style={{ width: "30%", height: "auto" }}
      />
    </Container>
  );
}

export default IntroContainer;

const Container = styled.div`
  flex-direction: column;
  display: flex;
  gap: 10%;
  width: 100%;
  height: 100%;
  align-items: center;
`;
