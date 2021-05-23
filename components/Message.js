import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../firebase";
import moment from "moment";

const Message = ({ user, message }) => {
  const [userLoggedIn] = useAuthState(auth);

  const TypeOfMessage = user === userLoggedIn.email ? Sender : Receiver;

  return (
    <Container>
      <TypeOfMessage>
        {message.message}
        <Timestamp>
          {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
        </Timestamp>
      </TypeOfMessage>
    </Container>
  );
};

export default Message;

const Container = styled.div``;

const MessageElement = styled.p`
  width: fit-content;
  min-width: 100px;
  padding: 8px 30px;
  border-radius: 10px;
  margin: 10px;
  min-width: 60px;
  padding-bottom: 26px;
  position: relative;
  text-align: right;
`;

// Extend styles
const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #8a7feeac;
`;

const Receiver = styled(MessageElement)`
  background-color: #f5f5f51f;
  text-align: left;
`;

const Timestamp = styled.span`
  color: #e2e0e0a9;
  padding: 10px;
  font-size: 9px;
  position: absolute;
  bottom: 0;
  right: 0;
  text-align: right;
  &&& {
    letter-spacing: 0px;
  }
`;
