import { useState } from "react";
import {
  Avatar,
  IconButton,
  Button,
  Tooltip,
  Menu,
  MenuItem,
} from "@material-ui/core";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import Chat from "../components/Chat";
import * as EmailValidator from "email-validator";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import styled from "styled-components";

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const closeMenu = () => {
    setMenuAnchorEl(null);
  };

  const createChat = () => {
    const input = prompt(
      "Please enter an email address for the user you wish to chat with"
    );

    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      // add the chat into the DB 'chats' collection if it is valid and it doesn't already exist
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };

  // !! converts result to boolean
  // ?  can be undefined
  const chatAlreadyExists = (recipientEmail) =>
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );

  return (
    <Container>
      <Header>
        <h3>Chats</h3>

        {/* <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton onClick={(e) => setMenuAnchorEl(e.currentTarget)}>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer> */}
        <SearchContainer>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton onClick={createChat}>
            <AddIcon />
          </IconButton>
        </SearchContainer>
      </Header>

      <Menu
        anchorEl={menuAnchorEl}
        keepMounted
        open={Boolean(menuAnchorEl)}
        onClose={closeMenu}
      >
        <MenuItem onClick={() => auth.signOut()}>Sign Out</MenuItem>
      </Menu>
      {/** List of chats */}
      {chatsSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
};

export default Sidebar;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
`;
const AddIcon = styled(AddRoundedIcon)`
  color: #5b38db;
`;

const Container = styled.div`
  padding: 10px 30px;
  flex: 0.45;
  height: 88vh;
  border-right: 1px solid #91919150;
  min-width: 500px;
  max-width: 550px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
`;
