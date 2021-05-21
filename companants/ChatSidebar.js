import styled from "styled-components";
import { Avatar, IconButton, Button } from "@material-ui/core";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import SearchIcon from "@material-ui/icons/Search";
import EmailValidator from "email-validator";

function ChatSidebar() {
  const createChat = () => {
    const input = prompt(
      "Please enter an email address of the user you want to chat with."
    );

    if (!input) return null;

    if (EmailValidator.validate(input)) {
      // add Chat into db
    }
  };

  return (
    <Container>
      <Header>
        <h3>Chats</h3>
        <SearchContainer>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton onClick={createChat} >
            <AddIcon/>
          </IconButton>
        </SearchContainer>
      </Header>
    </Container>
  );
}

export default ChatSidebar;

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

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
  background-color: transparent;
  font-family: "KoHo", sans-serif;
  color: white;
  font-size: 16px;
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
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddIcon = styled(AddRoundedIcon)`
  color: #5b38db;
`;
