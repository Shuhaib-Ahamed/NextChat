import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import getRecipientEmail from "../utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";

function Chat({ id, users }) {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [recipiantSnapshot] = useCollection(
    db.collection("users").where("email", "==", getRecipientEmail(users, user))
  );
  const recipient = recipiantSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(users, user);

  const enterChat = () => {
    router.push(`/chat/${id}`);
  };

  return (
    <Container onClick={enterChat}>
      {recipient ? (
        <Avatar src={recipient?.photoURL} />
      ) : (
        <Avatar>{recipientEmail[0].toUpperCase()}</Avatar>
      )}
      <Name>{recipientEmail}</Name>
    </Container>
  );
}

export default Chat;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  padding: 5px 20px;
  min-height: 80px;
  cursor: pointer;
  word-wrap: break-word;
  border-radius: 50px;
  background-image: linear-gradient(to right, #3a7ebe14, #150c2e6f);
  transition: all 50ms ease-out;
  :hover {
    background-color: #f5f5f51a;
  }
`;

const Name = styled.p`
  color: #f5f5f5;
`;
