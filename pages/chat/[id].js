import Head from "next/head";
import styled from "styled-components";
import ChatSidebar from "../../companants/ChatSidebar";
import Leftbar from "../../companants/Leftbar";
import getRecipientEmail from "../../utils/getRecipientEmail";
import HeaderTop from "../../companants/HeaderTop";
import { auth, db } from "../../firebase";
import ChatContainer from "../../companants/ChatContainer";
import { useAuthState } from "react-firebase-hooks/auth";
import { Container, MainContainer, FlexContainer, Glass } from "../index";

function Chat({ chat, messages }) {
  const [user] = useAuthState(auth);

  return (
    <Container>
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user)}</title>
      </Head>
      <Container>
        <Glass>
          <Leftbar />
          <MainContainer>
            <HeaderTop />
            <FlexContainer>
              <ChatSidebar />
              <ChatContainer chat={chat} messages={messages} />
            </FlexContainer>
          </MainContainer>
        </Glass>
      </Container>
    </Container>
  );
}

export default Chat;

export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.id);
  const messagesRef = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  const messages = messagesRef.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  //Preaparing the chats
  const chatRef = await ref.get();
  const chat = {
    id: chatRef.id,
    ...chatRef.data(),
  };
  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}
