import styled from "styled-components";
import { useRouter } from "next/router";
import { Avatar, IconButton, Menu, MenuItem } from "@material-ui/core";
import TimeAgo from "timeago-react";
import { MoreVertRounded } from "@material-ui/icons";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import OnlineDot from "./OnlineDot";
import {
  isOnlineForDatabase,
  isOfflineForDatabase,
} from "../utils/OnlineDetect";

function HeaderMain({
  recipient,
  recipientSnapshot,
  recipientEmail,
  setMenuAnchorEl,
  menuAnchorEl,
  closeMenu,
}) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const online = isOnlineForDatabase.state;
  const offline = isOfflineForDatabase.state;

  console.log(online);
  console.log(isOfflineForDatabase);
  return (
    <Header>
      <ChatName>
        <ChatInfo>
          {router.pathname === "/" ? (
            <h1>{`Welcome,  ${user.displayName}`}</h1>
          ) : (
            <Avatar src={recipient?.photoURL} />
          )}
          <h1>{recipientEmail}</h1>
        </ChatInfo>
        <HeaderIcons>
          {recipientSnapshot ? (
            <LastSeen>
              Last active:
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
              ) : (
                "Unaviable"
              )}
            </LastSeen>
          ) : (
            <LastSeen>
              {" "}
              {online ? `Online` : `Ofline`}{" "}
              <OnlineDot color={online ? `#39ff5a` : `yellow`} />
            </LastSeen>
          )}
          {router.pathname === "/" ? (
            <h1></h1>
          ) : (
            <IconButton onClick={(e) => setMenuAnchorEl(e.currentTarget)}>
              <MoreVertRounded />
            </IconButton>
          )}

          <Menu
            anchorEl={menuAnchorEl}
            keepMounted
            open={Boolean(menuAnchorEl)}
            onClose={closeMenu}
          >
            <MenuItem onClick={() => router.push("/")}>Close Chat</MenuItem>
          </Menu>
        </HeaderIcons>
      </ChatName>

      <ChatDescription>
        <Heading>Welcome to the chat room </Heading>
        <Text>
          Chat with your friends and family, Simply add an email and you're good
          to go.
        </Text>
      </ChatDescription>
    </Header>
  );
}

export default HeaderMain;

const HeaderIcons = styled.div`
  z-index: 99;
  position: sticky;
  display: flex;
  width: 35%;
  gap: 30px;
  justify-content: flex-end;
`;

const LastSeen = styled.div`
  font-size: 14px;
  color: whitesmoke;
  display: flex;
  gap: 5px;
  align-items: center;
`;

const ChatInfo = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
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
  justify-content: space-evenly;
  display: flex;
  flex-direction: column;
  position: sticky;
  height: 32%;
  width: 100%;
  z-index: 99;
`;
