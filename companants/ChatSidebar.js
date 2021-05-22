import styled from "styled-components";
import { IconButton, Button } from "@material-ui/core";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import SearchIcon from "@material-ui/icons/Search";
import EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import Chat from "../companants/Chat";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

function ChatSidebar() {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt(
      "Please enter an email address of the user you want to chat with."
    );

    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      //we add the chat if it doesn't exist
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };

  const chatAlreadyExists = (recipientEmail) =>
    !!chatSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );

  return (
    <Container>
      <Header>
        <h3>Chats</h3>
        <SearchContainer>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton onClick={createChat}>
            <AddIcon />
          </IconButton>
        </SearchContainer>
      </Header>
      <ChatScrollContainer>
        {chatSnapshot?.docs.map((chat) => (
          <Chat key={chat.id} id={chat.id} users={chat.data().users} />
        ))}
      </ChatScrollContainer>
    </Container>
  );
}

export default ChatSidebar;

const ChatScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
  height: 90%;
  padding-top: 17px;
  overflow-y: auto;
`;

const Container = styled.div`
  border-right: 1px solid #91919150;
  height: 100%;
  padding: 20px 50px;
  width: 30%;
`;

const SidebarButton = styled(Button)`
  width: 100%;
  &&& {
    border-top: 1px solid #f5f5f581;
    border-bottom: 1px solid #f5f5f581;
    color: #ffffff96;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
`;

const Header = styled.div`
  padding-top: 20px;
  width: 100%;
  z-index: 99;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddIcon = styled(AddRoundedIcon)`
  color: #5b38db;
`;
