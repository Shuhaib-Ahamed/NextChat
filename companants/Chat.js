import styled from "styled-components";

function Chat() {
  return (
    <Container>
      <Header>
        <ChatName>
          <h1>Chat Name</h1>
        </ChatName>
        <ChatDescription>
          <Heading>Welcome to the chat room </Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur, Lorem ipsum dolor sit amet,
            consectetur{" "}
          </Text>
        </ChatDescription>
      </Header>
    </Container>
  );
}

export default Chat;

const Container = styled.div`
  width: 70%;
  height: 100%;
`;

const Heading = styled.h3`
  color: #3a8ad4;
`;
const Text = styled.p`
  font-size: 14px;
  color: #b4adad;
  width: 50%;
`;

const ChatName = styled.div`
  padding: 5px 40px;
  height: 50px;
  width: 100%;
`;
const ChatDescription = styled.div`
  padding: 20px 40px;
  height: 160px;
  width: 100%;
  background-image: linear-gradient(to right, #3a7ebe39, #150c2e6f);
`;

const Header = styled.div`
  justify-content: space-around;
  display: flex;
  flex-direction: column;
  position: sticky;
  height: 300px;
  width: 100%;
  z-index: 99;
`;
