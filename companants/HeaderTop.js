import { Avatar, IconButton, Button } from "@material-ui/core";
import styled from "styled-components";
import BubbleChartRoundedIcon from "@material-ui/icons/BubbleChartRounded";
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";
import Search from "./Search";

function HeaderTop() {

  return (
    <Container>
      <Header>
        <HeaderRight>
          <Logo />
          <h2>NextChat</h2>
        </HeaderRight>
        <IconsContainer>
          <Search />
          <IconButton>
            <NotificationsRoundedIcon />
          </IconButton>
          <UserAvatar />
        </IconsContainer>
      </Header>
    </Container>
  );
}

export default HeaderTop;

const HeaderRight = styled.div`
  margin-left: 30px;
  height: 80px;
  display: flex;
  align-items: center;
  width: 8%;
  justify-content: space-around;
`;

const Logo = styled(BubbleChartRoundedIcon)`
  margin-right: 5px;
  &&& {
    color: #5b38db;
  }
`;

const Container = styled.div``;

const Header = styled.div`
  z-index: 99;
  display: flex;
  position: sticky;
  top: 0;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 110px;
  border-bottom: 1px solid #91919150;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div`
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-right: 2%;
`;
