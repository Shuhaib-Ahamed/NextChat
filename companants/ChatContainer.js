import styled from "styled-components";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { Avatar, IconButton } from "@material-ui/core";
import { MoreVertRounded } from "@material-ui/icons";

function ChatContainer({ chat, messages }) {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const showMessages = () => {
    
  }

  return (
    <Container>
      <Header>
        <ChatName>
          <ChatInfo>
            <Avatar />
            <h1>Chat Name</h1>
          </ChatInfo>
          <HeaderIcons>
            <LastSeen>Last Seen</LastSeen>
            <IconButton>
              <MoreVertRounded />
            </IconButton>
          </HeaderIcons>
        </ChatName>
        <ChatDescription>
          <Heading>Welcome to the chat room </Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur, Lorem ipsum dolor sit amet,
            consectetur{" "}
          </Text>
        </ChatDescription>
      </Header>
      <MainChatContainer>
        <EndOfMessage />
      </MainChatContainer>
    </Container>
  );
}

export default ChatContainer;

const EndOfMessage = styled.div``;

const HeaderIcons = styled.div`
  display: flex;
  width: 15%;
  gap: 30px;
  align-items: center;
`;

const LastSeen = styled.p`
  font-size: 14px;
  color: whitesmoke;
`;

const ChatInfo = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
`;

const MainChatContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  height: 65%;
  width: 100%;
  ::webkit-scrollbar {
    display: none;
  }
  --ms-overflow-style: none;
  scrollbar-width: none;
`;

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
  padding: 0px 40px;
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  height: 35%;
  width: 100%;
  z-index: 99;
`;
