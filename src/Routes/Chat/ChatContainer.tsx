import { useState } from "react";
import { Mutation, MutationFunction, Query } from "react-apollo";
import { useHistory, useLocation } from "react-router-dom";
import { USER_PROFILE } from "../../sharedQueries";
import {
  getChat,
  getChatVariables,
  sendMessage,
  sendMessageVariables,
  userProfile,
} from "../../types/api";
import ChatPresenter from "./ChatPresenter";
import { GET_CHAT, SEND_MESSAGE } from "./ChatQueries";

interface ILocationState {
  chatId: number;
}

const ChatContainer: React.FC = () => {
  const history = useHistory();
  const location = useLocation<ILocationState>();
  const { key, state } = location;
  if (!key || !state?.chatId) {
    history.push("/");
  }

  const [messageState, setMessageState] = useState({
    messageText: "",
  });
  const { messageText } = messageState;

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "message") {
      setMessageState({ messageText: value });
    }
  };

  let sendMessageFunc: MutationFunction<sendMessage, sendMessageVariables>;
  const onSubmit = () => {
    if (messageText !== "") {
      setMessageState({ messageText: "" });
    }
    sendMessageFunc({
      variables: {
        text: messageText,
        chatId: state?.chatId,
      },
    });
  };

  return (
    <Query<userProfile> query={USER_PROFILE}>
      {({ data: userData }) => (
        <Query<getChat, getChatVariables>
          query={GET_CHAT}
          variables={{ chatId: state?.chatId }}
        >
          {({ data, loading }) => (
            <Mutation<sendMessage, sendMessageVariables>
              mutation={SEND_MESSAGE}
            >
              {(sendMessageFn) => {
                sendMessageFunc = sendMessageFn;
                return (
                  <ChatPresenter
                    data={data}
                    loading={loading}
                    userData={userData}
                    messageText={messageText}
                    onInputChange={onInputChange}
                    onSubmit={onSubmit}
                  />
                );
              }}
            </Mutation>
          )}
        </Query>
      )}
    </Query>
  );
};

export default ChatContainer;
