import styled from "styled-components";
import Header from "../../Components/Header";
import Message from "../../Components/Message";
import { getChat, userProfile } from "../../types/api";

const Container = styled.div``;

interface IProps {
  userData?: userProfile;
  data?: getChat;
  loading: boolean;
}

const ChatPresenter: React.FC<IProps> = ({
  userData: { GetMyProfile: { user = null } = {} } = {},
  data: { GetChat: { chat = null } = {} } = {},
  loading,
}) => (
  <Container>
    <Header title={"Chat"} />
    {!loading && chat && user && (
      <>
        {chat.messages &&
          chat.messages.map((message) => {
            if (message) {
              return (
                <Message
                  key={message.id}
                  text={message.text}
                  mine={user.id === message.userId}
                />
              );
            }
            return null;
          })}
      </>
    )}
  </Container>
);

export default ChatPresenter;
