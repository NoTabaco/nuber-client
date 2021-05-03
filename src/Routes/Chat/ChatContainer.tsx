import { useHistory, useLocation } from "react-router-dom";
import ChatPresenter from "./ChatPresenter";

const ChatContainer = () => {
  const history = useHistory();
  const location = useLocation();
  const { key } = location;
  if (!key) {
    history.push("/");
  }

  return <ChatPresenter />;
};

export default ChatContainer;
