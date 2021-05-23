import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { Avatar, IconButton, Menu, MenuItem } from "@material-ui/core";
import { AttachFileRounded, MoreVertRounded, Send } from "@material-ui/icons";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import styled from "styled-components";
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from "timeago-react";
import HeaderMain from "./HeaderMain";

const ChatScreen = ({ chat, messages }) => {
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

  const [recipientSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", getRecipientEmail(chat.users, user))
  );

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const closeMenu = () => {
    setMenuAnchorEl(null);
  };

  const scrollToBottom = () => {
    endOfMessageRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

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
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
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
    scrollToBottom();
  };

  useEffect(scrollToBottom, []);

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(chat.users, user);

  return (
    <Container>
      <HeaderMain
        recipient={recipient}
        recipientEmail={recipientEmail}
        recipientSnapshot={recipientSnapshot}
        setMenuAnchorEl={setMenuAnchorEl}
        menuAnchorEl={menuAnchorEl}
        closeMenu={closeMenu}
      />
      <MessageContainer>
        {showMessages()}
        <EndOfMessage ref={endOfMessageRef} />
      </MessageContainer>

      <InputContainer>
        <AttachFileRounded />
        <InputBackground>
          <Input
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            hidden
            disabled={!input}
            type="submit"
            onClick={sendMessage}
          ></button>
        </InputBackground>
        <IconButton disabled={!input} onClick={sendMessage}>
          <SendIcon />
        </IconButton>
      </InputContainer>
    </Container>
  );
};

export default ChatScreen;

const MessageContainer = styled.div`
  padding: 30px;
  height: 55%;
  overflow-y: auto;
  ::-webkit-scrollbar {
    margin-left: 5px;
    width: 5px;
  }

  scrollbar-width: thin;
  scrollbar-color: var(--thumbBG) transparent;

  ::-webkit-scrollbar-track {
    margin-left: 5px;
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--thumbBG);
    border-radius: 6px;
    border: 3px solid var(--scrollbarBG);
  }
`;

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
  :first-letter {
    text-transform: capitalize;
  }
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
  height: 10%;
  align-items: center;
`;

const EndOfMessage = styled.div`
  margin-bottom: 50px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
