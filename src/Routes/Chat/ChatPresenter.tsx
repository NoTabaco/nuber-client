import styled from "styled-components";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import Message from "../../Components/Message";
import { getChat, userProfile } from "../../types/api";

const Container = styled.div``;

const Chat = styled.div`
  height: 75vh;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const InputCont = styled.div`
  padding: 0 20px;
`;

interface IProps {
  userData?: userProfile;
  data?: getChat;
  loading: boolean;
  messageText: string;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: () => void;
}

const ChatPresenter: React.FC<IProps> = ({
  userData: { GetMyProfile: { user = null } = {} } = {},
  data: { GetChat: { chat = null } = {} } = {},
  loading,
  messageText,
  onInputChange,
  onSubmit,
}) => (
  <Container>
    <Header title={"Chat"} />
    {!loading && chat && user && (
      <>
        <Chat>
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
        </Chat>
        <InputCont>
          <Form submitFn={onSubmit}>
            <Input
              value={messageText}
              placeholder={"Type your message"}
              onChange={onInputChange}
              name={"message"}
            />
          </Form>
        </InputCont>
      </>
    )}
  </Container>
);

export default ChatPresenter;
