import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"
import ChatScreen from "../../components/ChatScreen"
import { db, auth } from "../../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import getRecipientEmail from "../../utils/getRecipientEmail"
import Leftbar from "../../components/Leftbar";
import HeaderTop from "../../components/HeaderTop";
import { Container, MainContainer, FlexContainer, Glass } from "../index";



const Chat = ({ chat, messages }) => {
    const [user] = useAuthState(auth)
    
    return (
<Container>
<Header title={`Chat with ${getRecipientEmail(chat.users, user)}`} />
        <Glass>
          <Leftbar />
          <MainContainer>
            <HeaderTop />
            <FlexContainer>
              <Sidebar />
              <ChatScreen chat={chat} messages={messages} />
            </FlexContainer>
          </MainContainer>
        </Glass>
      </Container>
    )
}

export default Chat

export async function getServerSideProps(context) {
    const ref = db.collection("chats").doc(context.query.id)
    
    // Prepare the messages on the server
    const messagesRes = await ref.collection('messages').orderBy('timestamp', 'asc').get()
    const messages = messagesRes.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })).map(messages => ({
        ...messages,
        timestamp: messages.timestamp.toDate().getTime()
    }))

    // Prepare the chats
    const chatRes = await ref.get()
    const chat = {
        id: chatRes.id,
        ...chatRes.data()
    }

    return {
        props: {
            messages: JSON.stringify(messages),
            chat: chat
        }
    }
}
