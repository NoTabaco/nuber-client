import { Mutation, Query } from "react-apollo";
import { useHistory, useLocation } from "react-router-dom";
import { USER_PROFILE } from "../../sharedQueries";
import { getChat, getChatVariables, userProfile } from "../../types/api";
import ChatPresenter from "./ChatPresenter";
import { GET_CHAT } from "./ChatQueries";

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

  return (
    <Query<userProfile> query={USER_PROFILE}>
      {({ data: userData }) => (
        <Query<getChat, getChatVariables>
          query={GET_CHAT}
          variables={{ chatId: state?.chatId }}
        >
          {({ data, loading }) => (
            <ChatPresenter data={data} loading={loading} userData={userData} />
          )}
        </Query>
      )}
    </Query>
  );
};

export default ChatContainer;
