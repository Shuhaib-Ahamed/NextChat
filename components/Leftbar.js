import styled from "styled-components";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import { Avatar, IconButton, Menu, MenuItem } from "@material-ui/core";
import AppsRoundedIcon from "@material-ui/icons/AppsRounded";
import EqualizerRoundedIcon from "@material-ui/icons/EqualizerRounded";
import DonutSmallRoundedIcon from "@material-ui/icons/DonutSmallRounded";
import GroupAddRoundedIcon from "@material-ui/icons/GroupAddRounded";
import BubbleChartRoundedIcon from "@material-ui/icons/BubbleChartRounded";
import { useState } from "react";
import { auth } from "../firebase";

function Leftbar() {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const closeMenu = () => {
    setMenuAnchorEl(null);
  };

  return (
    <Container>
      <Top>
        <IconButton>
          <MenuButton onClick={(e) => setMenuAnchorEl(e.currentTarget)} />
        </IconButton>
        <Menu
          anchorEl={menuAnchorEl}
          keepMounted
          open={Boolean(menuAnchorEl)}
          onClose={closeMenu}
        >
          <MenuItem onClick={() => auth.signOut()}>Sign Out</MenuItem>
        </Menu>
      </Top>
      <Middle>
        <IconButton>
          <AppsRoundedIcon />
        </IconButton>
        <IconButton>
          <EqualizerRoundedIcon />
        </IconButton>
        <IconButton>
          <DonutSmallRoundedIcon />
        </IconButton>
        <Logo />
        <IconButton>
          <GroupAddRoundedIcon />
        </IconButton>
      </Middle>
    </Container>
  );
}

export default Leftbar;

const Logo = styled(BubbleChartRoundedIcon)`
  margin-right: 5px;
  &&& {
    color: #5b38db;
  }
`;

const MenuButton = styled(MenuRoundedIcon)`
  color: #f7f7f7fb;
  /* &&& {
    transform: scale(1.4);
    background-color: #5b38db;
    padding: 2px;
    border-radius: 50%;
  } */
`;
const Top = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Middle = styled.div`
  height: 95%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 6%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-right: 1px solid #91919150;
`;
