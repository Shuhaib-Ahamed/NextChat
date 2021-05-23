import styled from "styled-components";
import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFileRounded, MoreVertRounded, Send } from "@material-ui/icons";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import { useEffect, useState, useRef } from "react";
import firebase from "firebase";
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from "timeago-react";

function ChatContainer() {
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("");
  const endOfMessageRef = useRef(null);
  const router = useRouter();
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  // const [recipientSnapshot] = useCollection(
  //   db
  //     .collection("users")
  //     .where("email", "==", getRecipientEmail(chat.users, user))
  // );

  // const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  // const closeMenu = () => {
  //   setMenuAnchorEl(null);
  // };

  // const scrollToBottom = () => {
  //   endOfMessageRef.current.scrollIntoView({
  //     behavior: "smooth",
  //     block: "start",
  //   });
  // };

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } 
    // else {
    //   return JSON.parse(messages).map((message) => (
    //     <Message key={message.id} user={message.user} message={message} />
    //   ));
    // }
  };

  const sendMessage = (e) => {
    e.preventDefault();

    // Update the 'last seen...'
    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    // Send message
    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      photoURL: user.photoURL,
      user: user.email,
    });

    setInput("");
    // scrollToBottom();
  };

  // useEffect(scrollToBottom, []);

  // useEffect(() => {
  //   scrollToBottom();
  // }, [chat]);

  // const recipient = recipientSnapshot?.docs?.[0]?.data();
  // const recipientEmail = getRecipientEmail(chat.users, user);
  return (
    <Container>
      <Header>
        <ChatName>
          <ChatInfo>
            <Avatar />
            <h1>Chat Name</h1>
          </ChatInfo>
          <HeaderIcons>
            {/* {recipientSnapshot ? (
              <LastSeen>
                Last active:{" "}
                {recipient?.lastSeen?.toDate() ? (
                  <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
                ) : (
                  "Unaviable"
                )}
              </LastSeen>
            ) : (
              <p>Loading...</p>
            )} */}

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
        {showMessages()}
        <EndOfMessage />
      </MainChatContainer>
      <InputContainer>
        <IconButton>
          <AttachFileRounded />
        </IconButton>
        <InputBackground>
          <Input
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </InputBackground>
        <IconButton onClick={sendMessage}>
          <SendIcon />
        </IconButton>
        <button
          hidden
          disabled={!input}
          type="submit"
          onClick={sendMessage}
        ></button>
      </InputContainer>
    </Container>
  );
}

export default ChatContainer;

const InputBackground = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #91919150;
  border-radius: 15px;
  padding: 8px 20px;
  width: 80%;
  height: 60px;
`;

const Input = styled.input`
  position: sticky;
  outline-width: 0;
  letter-spacing: 2px;
  border: none;
  flex: 1;
  background-color: transparent;
  font-family: "KoHo", sans-serif;
  color: white;
  font-size: 18px;
`;

const SendIcon = styled(Send)`
  &&& {
    color: #5b38db;
  }
`;

const InputContainer = styled.form`
  z-index: 100;
  display: flex;
  justify-content: space-around;
  position: sticky;
  width: 100%;
  height: 15%;
  align-items: center;
`;

const EndOfMessage = styled.div``;

const HeaderIcons = styled.div`
  z-index: 99;
  position: sticky;
  display: flex;
  width: 20%;
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
  min-height: 50%;
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
