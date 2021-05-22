import Head from "next/head";
import styled from "styled-components";

function Loading() {
  return (
    <Container>
      <Head>
        <title>Loading ...</title>
      </Head>
      <Load src={require("../assets/Loading.gif")} />
    </Container>
  );
}

export default Loading;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Load = styled.img`
  width: 100px;
`;
